import type { Request } from "express";
import { pool } from "../db";
import { normalizeClientSource, type ClientSource } from "../utils/client-source";
import { getClientIp } from "../utils/ip";

export type ActivityEventType =
	| "app_start"
	| "plan_check"
	| "data_fetch"
	| "data_sync"
	| "workspace_fetch";

const DEFAULT_THROTTLE_SECONDS = 60;

export const ACTIVITY_EVENT_TYPES: readonly string[] = [
	"app_start",
	"plan_check",
	"data_fetch",
	"data_sync",
	"workspace_fetch",
];

/**
 * Registra actividad de un usuario (arranque de app, sincronizaciones, etc.)
 * con throttle: como máximo un evento por user+event_type cada N segundos,
 * para no saturar la tabla con heartbeats. Nunca lanza errores: la telemetría
 * no debe romper la petición original.
 */
export async function recordUserActivity(
	req: Request,
	userId: string | undefined,
	eventType: string,
	meta: Record<string, unknown> = {},
): Promise<void> {
	if (!userId) return;

	const throttleSeconds = parseInt(
		process.env.ACTIVITY_THROTTLE_SECONDS || String(DEFAULT_THROTTLE_SECONDS),
		10,
	);

	try {
		const { rows } = await pool.query(
			`SELECT 1 AS hit
			 FROM user_activity
			 WHERE user_id = $1
			   AND event_type = $2
			   AND created_at > NOW() - ($3 || ' seconds')::interval
			 LIMIT 1`,
			[userId, eventType, throttleSeconds],
		);

		if (rows.length > 0) return;

		const source: ClientSource = normalizeClientSource(req.headers["x-app-source"]);
		const ipAddress = getClientIp(req);
		const userAgent =
			typeof req.headers["user-agent"] === "string" ? req.headers["user-agent"] : null;

		await pool.query(
			`INSERT INTO user_activity (user_id, event_type, client_source, ip_address, user_agent, meta)
			 VALUES ($1, $2, $3, $4, $5, $6)`,
			[userId, eventType, source, ipAddress, userAgent, JSON.stringify(meta)],
		);
	} catch (error) {
		console.error("Error registrando actividad de usuario:", error);
	}
}