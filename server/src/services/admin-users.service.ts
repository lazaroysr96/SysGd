import { pool } from "../db";

export interface AdminUserListItem {
	id: string;
	name: string | null;
	email: string;
	privileges: "admin" | "user";
	status: string;
	is_public: boolean;
	user_data: unknown;
	created_at: string;
	registration_source: string;
	last_activity_at: string | null;
}

export interface AdminUsersPage {
	users: AdminUserListItem[];
	total: number;
	page: number;
	pageSize: number;
	totalPages: number;
	summary: {
		total: number;
		admins: number;
		regular: number;
	};
}

interface AdminUserRow {
	id: string;
	name: string | null;
	email: string;
	privileges: string;
	status: string;
	is_public: boolean;
	user_data: unknown;
	created_at: string;
	registration_source: string | null;
	last_activity_at: string | null;
}

interface AdminUsersCountRow {
	total: string;
	admins: string;
	regular: string;
}

const clampInt = (value: unknown, fallback: number, min: number, max: number): number => {
	const parsed = typeof value === "string" ? Number.parseInt(value, 10) : Number.NaN;
	if (!Number.isFinite(parsed)) return fallback;
	return Math.min(Math.max(parsed, min), max);
};

export async function listAdminUsersPage(input?: {
	page?: unknown;
	pageSize?: unknown;
	q?: unknown;
}): Promise<AdminUsersPage> {
	const page = clampInt(input?.page, 1, 1, Number.MAX_SAFE_INTEGER);
	const pageSize = clampInt(input?.pageSize, 20, 1, 100);
	const searchTerm =
		typeof input?.q === "string" && input.q.trim() ? input.q.trim().slice(0, 100) : null;

	const offset = (page - 1) * pageSize;

	const [usersResult, countResult] = await Promise.all([
		pool.query<AdminUserRow>(
			`SELECT
				u.id,
				u.name,
				u.email,
				u.privileges,
				u.status,
				u.is_public,
				u.user_data,
				u.created_at,
				u.registration_source,
				MAX(ua.created_at) AS last_activity_at
			FROM users u
			LEFT JOIN user_activity ua ON ua.user_id = u.id
			WHERE ($1::text IS NULL OR u.name ILIKE '%' || $1 || '%' OR u.email ILIKE '%' || $1 || '%')
			GROUP BY u.id
			ORDER BY u.created_at DESC
			LIMIT $2 OFFSET $3`,
			[searchTerm, pageSize, offset],
		),
		pool.query<AdminUsersCountRow>(
			`SELECT
				COUNT(*) AS total,
				COUNT(*) FILTER (WHERE privileges = 'admin') AS admins,
				COUNT(*) FILTER (WHERE privileges = 'user') AS regular
			FROM users
			WHERE ($1::text IS NULL OR name ILIKE '%' || $1 || '%' OR email ILIKE '%' || $1 || '%')`,
			[searchTerm],
		),
	]);

	const countRow = countResult.rows[0];

	const users: AdminUserListItem[] = usersResult.rows.map((row) => ({
		id: row.id,
		name: row.name,
		email: row.email,
		privileges: row.privileges === "admin" ? "admin" : "user",
		status: row.status,
		is_public: row.is_public,
		user_data: row.user_data,
		created_at: row.created_at,
		registration_source: row.registration_source ?? "unknown",
		last_activity_at: row.last_activity_at ?? null,
	}));

	const total = Number(countRow?.total ?? "0");

	return {
		users,
		total,
		page,
		pageSize,
		totalPages: Math.max(Math.ceil(total / pageSize), 1),
		summary: {
			total,
			admins: Number(countRow?.admins ?? "0"),
			regular: Number(countRow?.regular ?? "0"),
		},
	};
}