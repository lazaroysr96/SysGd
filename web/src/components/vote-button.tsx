// components/vote-button.tsx
import { useState } from "react"
import { Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface VoteButtonProps {
	votesCount: number
	voted: boolean
	onVote: () => Promise<boolean | null> | void
	requireAuth?: () => boolean
}

/**
 * Botón de voto ("energía") de una publicación.
 * requireAuth devuelve false si el usuario no está logueado (para abrir el login).
 */
export function VoteButton({ votesCount, voted, onVote, requireAuth }: VoteButtonProps) {
	const [pending, setPending] = useState(false)
	const [pulse, setPulse] = useState(false)

	async function handleClick() {
		if (requireAuth && !requireAuth()) return
		setPending(true)
		setPulse(true)
		setTimeout(() => setPulse(false), 350)
		try {
			await onVote()
		} finally {
			setPending(false)
		}
	}

	return (
		<button
			type="button"
			onClick={(e) => {
				e.stopPropagation()
				handleClick()
			}}
			disabled={pending}
			aria-pressed={voted}
			title={voted ? "Quitar energía" : "Dar energía a esta publicación"}
			className={cn(
				"relative inline-flex items-center gap-1.5 pl-2.5 pr-3.5 py-1.5 rounded-full text-sm font-bold select-none",
				"border transition-all duration-200 disabled:opacity-60",
				voted
					? "bg-amber-400 border-amber-400 text-amber-950 shadow-[0_0_0_3px_rgba(251,191,36,0.25)]"
					: "bg-transparent border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400",
			)}
		>
			<Zap
				className={cn(
					"w-4 h-4 transition-transform duration-300",
					voted && "fill-current",
					pulse && "scale-125 rotate-[-8deg]",
				)}
			/>
			{votesCount ?? 0}

			{/* Anillo de "pulso" al votar */}
			{pulse && (
				<span className="absolute inset-0 rounded-full border-2 border-amber-400 animate-ping pointer-events-none" />
			)}
		</button>
	)
}