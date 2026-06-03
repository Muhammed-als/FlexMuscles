import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pencil, Trash2, ExternalLink, Dumbbell } from 'lucide-react'
import type { Exercise } from '../types'

interface Props {
  exercise: Exercise
  onEdit: (e: Exercise) => void
  onDelete: (e: Exercise) => void
}

export default function ExerciseCard({ exercise, onEdit, onDelete }: Props) {
  const [playing, setPlaying] = useState(false)
  const { youtubeId, name, description, equipment} = exercise

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 280, damping: 26 }}
      className="group glass overflow-hidden rounded-2xl shadow-card transition hover:border-brand-500/40"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-ink-950">
        {playing ? (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            className="relative block h-full w-full"
            aria-label={`Play ${name}`}
          >
            <img
              src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
              alt={name}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              onError={(e) => {
                ;(e.currentTarget as HTMLImageElement).style.opacity = '0'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
            <div className="absolute inset-0 grid place-items-center">
              <span className="relative grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-flame-500 text-ink-950 shadow-glow transition group-hover:scale-110">
                <span className="absolute inset-0 animate-pulseRing rounded-full bg-brand-500/40" />
                <Play size={26} className="ml-1 fill-current" />
              </span>
            </div>
          </button>
        )}
      </div>

      <div className="p-4">
        
        {description && (
          <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-slate-400">{description}</p>
        )}

        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <Dumbbell size={13} className="text-brand-400" />
            {equipment || 'Any'}
          </span>

          <div className="flex items-center gap-1">
            <a
              href={`https://www.youtube.com/watch?v=${youtubeId}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
              title="Open on YouTube"
            >
              <ExternalLink size={15} />
            </a>
            <button
              onClick={() => onEdit(exercise)}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-brand-400"
              title="Edit"
            >
              <Pencil size={15} />
            </button>
            <button
              onClick={() => onDelete(exercise)}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-500/15 hover:text-rose-400"
              title="Delete"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
