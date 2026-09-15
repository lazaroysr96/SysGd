// components/descubre-post-card.tsx
import { Card } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { VoteButton } from "@/components/vote-button"
import {
	Calendar,
	ImageIcon,
	MapPin,
	MessageCircle,
	Pencil,
	Trash2,
	User,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import type { DescubrePost } from "@/hooks/useDescubrePosts"
import { buildPreview, toPublicSupabaseUrl } from "@/lib/format"

interface DescubrePostCardProps {
	post: DescubrePost
	currentUserId?: string | null
	onVote?: (post: DescubrePost) => void
	onEdit?: (post: DescubrePost) => void
	onDelete?: (post: DescubrePost) => void
}

function formatPrice(precio: string, moneda: string): string {
	if (!precio) return "Consultar"
	if (moneda) return `${precio} ${moneda}`
	return precio
}

function formatWhatsAppUrl(contactNumber: string): string {
	const digits = contactNumber.replace(/\D/g, "")
	if (!digits) return ""
	return `https://wa.me/${digits}`
}

export function DescubrePostCard({
	post,
	currentUserId,
	onVote,
	onEdit,
	onDelete,
}: DescubrePostCardProps) {
	const navigate = useNavigate()
	const formattedDate = new Date(post.date).toLocaleDateString("es-ES", {
		year: "numeric",
		month: "short",
		day: "numeric",
	})

	const featuredImage = toPublicSupabaseUrl(post.imageUrls?.[0])
	const whatsAppUrl = formatWhatsAppUrl(post.contactNumber)
	const priceLabel = formatPrice(post.precio, post.moneda)
	const preview = buildPreview(post.description)
	const isOwner = !!currentUserId && currentUserId === post.userId

	const openDetail = () => navigate(`/descubre/post/${post.id}`)

	return (
		<Card
			onClick={openDetail}
			className="overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full cursor-pointer group py-0 gap-0"
		>
			{/* ---------- Imagen con overlays ---------- */}
			<div className="relative aspect-[16/10] overflow-hidden bg-muted">
				{featuredImage ? (
					<img
						src={featuredImage}
						alt={post.title}
						loading="lazy"
						className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center">
						<ImageIcon className="w-10 h-10 text-muted-foreground/40" />
					</div>
				)}

				<div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

				{post.category && (
					<span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-[11px] font-medium uppercase tracking-wide">
						{post.category}
					</span>
				)}

				<span className="absolute bottom-3 left-3 text-white font-bold text-xl drop-shadow-sm">
					{priceLabel}
				</span>
			</div>

			<div className="p-5 flex flex-col flex-1 gap-3">
				<div className="flex items-start justify-between gap-3">
					<h3 className="text-lg font-bold text-balance line-clamp-2 leading-snug">
						{post.title}
					</h3>
					{onVote && (
						<div className="shrink-0">
							<VoteButton
								votesCount={post.votesCount ?? 0}
								voted={!!post.viewerVoted}
								onVote={() => onVote(post)}
							/>
						</div>
					)}
				</div>

				{preview && (
					<p className="text-muted-foreground leading-relaxed text-sm line-clamp-3">
						{preview}
					</p>
				)}

				<div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-auto pt-1">
					{post.userName && (
						<span className="flex items-center gap-1 min-w-0">
							<User className="w-3.5 h-3.5 shrink-0" />
							<span className="truncate max-w-[100px]">{post.userName}</span>
						</span>
					)}
					{post.province && (
						<span className="flex items-center gap-1">
							<MapPin className="w-3.5 h-3.5" />
							{post.province}
						</span>
					)}
					<span className="flex items-center gap-1">
						<Calendar className="w-3.5 h-3.5" />
						{formattedDate}
					</span>
				</div>

				<div className="flex items-center justify-between gap-2 pt-3 border-t border-border/50">
					{isOwner ? (
						<div className="flex items-center gap-1">
							{onEdit && (
								<Button
									variant="ghost"
									size="icon-sm"
									title="Editar publicación"
									onClick={(e) => {
										e.stopPropagation()
										onEdit(post)
									}}
								>
									<Pencil className="w-4 h-4" />
								</Button>
							)}
							{onDelete && (
								<Button
									variant="ghost"
									size="icon-sm"
									title="Eliminar publicación"
									onClick={(e) => {
										e.stopPropagation()
										onDelete(post)
									}}
								>
									<Trash2 className="w-4 h-4 text-destructive" />
								</Button>
							)}
						</div>
					) : (
						<span />
					)}

					{whatsAppUrl && (
						<Button
							asChild
							size="sm"
							className="bg-emerald-600 hover:bg-emerald-700 text-white"
							onClick={(e) => e.stopPropagation()}
						>
							<a href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
								<MessageCircle className="w-4 h-4" />
								WhatsApp
							</a>
						</Button>
					)}
				</div>
			</div>
		</Card>
	)
}