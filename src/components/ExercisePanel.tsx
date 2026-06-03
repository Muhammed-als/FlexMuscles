import { AnimatePresence, motion } from 'framer-motion'
import { Plus, Dumbbell, Inbox } from 'lucide-react'
import type { Exercise, Region } from '../types'
import ExerciseCard from './ExerciseCard'

interface Props {
  group: Region
  exercises: Exercise[]
  onAdd: () => void
  onEdit: (e: Exercise) => void
  onDelete: (e: Exercise) => void
}

export default function ExercisePanel({ group, exercises, onAdd, onEdit, onDelete }: Props) {
  return (
    <div className="flex h-full flex-col">
      <motion.div
        key={group.id}
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35 }}
        className="mb-5"
      >
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">
              {group.group === group.category ? group.category : `${group.group} · ${group.category}`}
            </p>
            <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
              {group.name}
            </h2>
          </div>
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-flame-500 px-4 py-2.5 text-sm font-bold text-ink-950 shadow-glow transition hover:brightness-110"
          >
            <Plus size={18} /> Add exercise
          </button>
        </div>


        

        <div className="mt-4 inline-flex items-center gap-2 text-sm text-slate-400">
          <Dumbbell size={15} className="text-brand-400" />
          <span className="font-semibold text-white">{exercises.length}</span>
          {exercises.length === 1 ? 'exercise' : 'exercises'} for this group
        </div>
      </motion.div>

      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        {exercises.length === 0 ? (
          <div className="grid h-full min-h-[300px] place-items-center rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center">
            <div>
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-white/5 text-slate-500">
                <Inbox size={28} />
              </div>
              <h3 className="font-display text-lg font-bold text-white">No exercises yet</h3>
              <p className="mx-auto mt-1 max-w-xs text-sm text-slate-400">
                Add your first {group.name.toLowerCase()} exercise with a YouTube tutorial.
              </p>
              <button
                onClick={onAdd}
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-brand-500/40 px-4 py-2 text-sm font-semibold text-brand-300 transition hover:bg-brand-500/10"
              >
                <Plus size={16} /> Add exercise
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {exercises.map((e) => (
                <ExerciseCard key={e.id} exercise={e} onEdit={onEdit} onDelete={onDelete} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}
