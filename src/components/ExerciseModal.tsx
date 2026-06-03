import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Youtube, Sparkles } from 'lucide-react'
import type { Exercise, Region } from '../types'
import type { ExerciseDraft } from '../hooks/useExercises'

const EQUIPMENT_OPTIONS = ['Dumbbells', 'Barbells', 'Machine', 'Cable', 'Bodyweight'] as const

/** Accepts a full URL, a youtu.be link, an embed link or a raw 11-char id. */
export function parseYouTubeId(input: string): string {
  const trimmed = input.trim()
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed
  const patterns = [
    /[?&]v=([\w-]{11})/,
    /youtu\.be\/([\w-]{11})/,
    /embed\/([\w-]{11})/,
    /shorts\/([\w-]{11})/,
  ]
  for (const p of patterns) {
    const m = trimmed.match(p)
    if (m) return m[1]
  }
  return trimmed
}

interface Props {
  open: boolean
  group: Region
  /** present when editing, undefined when creating */
  initial?: Exercise
  onClose: () => void
  onSubmit: (draft: ExerciseDraft) => void
}

const empty = (muscleId: string): ExerciseDraft => ({
  muscleId,
  name: '',
  youtubeId: '',
  description: '',
  equipment: 'Dumbbells', // Default to a standard option
})

export default function ExerciseModal({ open, group, initial, onClose, onSubmit }: Props) {
  const [form, setForm] = useState<ExerciseDraft>(empty(group.id))
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    if (open) {
      setForm(
        initial
          ? {
              muscleId: initial.muscleId,
              name: initial.name,
              youtubeId: initial.youtubeId,
              description: initial.description,
              equipment: initial.equipment,
            }
          : empty(group.id),
      )
      setTouched(false)
    }
  }, [open, initial, group.id])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const id = parseYouTubeId(form.youtubeId)
  const validId = /^[\w-]{11}$/.test(id)
  const canSave = form.name.trim().length > 0 && validId

  const submit = () => {
    setTouched(true)
    if (!canSave) return
    onSubmit({ ...form, youtubeId: id, name: form.name.trim() })
  }

  const field = 'w-full rounded-xl bg-ink-900/70 border border-white/10 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-brand-500/70 focus:ring-2 focus:ring-brand-500/20 placeholder:text-slate-500 appearance-none'

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="glass relative w-full max-w-lg rounded-3xl p-6 shadow-card"
            initial={{ scale: 0.92, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 24, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          >
            <div className="mb-5 flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-brand-400">
                  {group.name}
                </p>
                <h3 className="font-display text-2xl font-bold text-white">
                  {initial ? 'Edit exercise' : 'New exercise'}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-300">Exercise name</label>
                <input
                  className={field}
                  placeholder="e.g. Incline Dumbbell Press"
                  value={form.name}
                  autoFocus
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                {touched && form.name.trim().length === 0 && (
                  <p className="mt-1 text-xs text-flame-400">A name is required.</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-300">
                  <Youtube size={14} className="text-red-400" /> YouTube link or video ID
                </label>
                <input
                  className={field}
                  placeholder="  or  gRVjAtPip0Y"
                  value={form.youtubeId}
                  onChange={(e) => setForm({ ...form, youtubeId: e.target.value })}
                />
                {form.youtubeId && validId ? (
                  <p className="mt-1 flex items-center gap-1 text-xs text-brand-400">
                    <Sparkles size={12} /> Detected video id: {id}
                  </p>
                ) : touched && form.youtubeId.length > 0 ? (
                  <p className="mt-1 text-xs text-flame-400">Couldn’t find a valid YouTube id.</p>
                ) : (
                  <p className="mt-1 text-xs text-slate-500">Paste any YouTube URL — we’ll extract the id.</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-300">Equipment</label>
                <div className="relative">
                  <select
                    className={`${field} pr-10 cursor-pointer`}
                    value={form.equipment}
                    onChange={(e) => setForm({ ...form, equipment: e.target.value })}
                  >
                    {EQUIPMENT_OPTIONS.map((option) => (
                      <option key={option} value={option} className="bg-ink-950 text-slate-100">
                        {option}
                      </option>
                    ))}
                  </select>
                  {/* Visual Dropdown Arrow Indicator */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-300">Notes / cues</label>
                <textarea
                  className={`${field} min-h-[80px] resize-none`}
                  placeholder="How to perform it, coaching cues, rep ranges…"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                onClick={submit}
                disabled={!canSave}
                className="rounded-xl bg-gradient-to-r from-brand-500 to-flame-500 px-5 py-2.5 text-sm font-bold text-ink-950 shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
              >
                {initial ? 'Save changes' : 'Add exercise'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}