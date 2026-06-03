import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Exercise } from '../types'
import { SEED_EXERCISES } from '../data/regions'

const STORAGE_KEY = 'flexmuscles.exercises.v1'

function loadInitial(): Exercise[] {
  if (typeof window === 'undefined') return SEED_EXERCISES
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return SEED_EXERCISES
    const parsed = JSON.parse(raw) as Exercise[]
    if (!Array.isArray(parsed)) return SEED_EXERCISES
    return parsed
  } catch {
    return SEED_EXERCISES
  }
}

export type ExerciseDraft = Omit<Exercise, 'id' | 'seed'>

export function useExercises() {
  const [exercises, setExercises] = useState<Exercise[]>(loadInitial)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(exercises))
    } catch {
      /* storage full / unavailable — ignore */
    }
  }, [exercises])

  const addExercise = useCallback((draft: ExerciseDraft) => {
    const created: Exercise = {
      ...draft,
      id: `ex-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    }
    setExercises((prev) => [created, ...prev])
    return created
  }, [])

  const updateExercise = useCallback((id: string, draft: ExerciseDraft) => {
    setExercises((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...draft, id, seed: e.seed } : e)),
    )
  }, [])

  const deleteExercise = useCallback((id: string) => {
    setExercises((prev) => prev.filter((e) => e.id !== id))
  }, [])

  const resetToSeed = useCallback(() => {
    setExercises(SEED_EXERCISES)
  }, [])

  const byMuscle = useMemo(() => {
    const map: Record<string, Exercise[]> = {}
    for (const e of exercises) {
      ;(map[e.muscleId] ??= []).push(e)
    }
    return map
  }, [exercises])

  const countByMuscle = useCallback(
    (muscleId: string) => byMuscle[muscleId]?.length ?? 0,
    [byMuscle],
  )

  return {
    exercises,
    byMuscle,
    countByMuscle,
    addExercise,
    updateExercise,
    deleteExercise,
    resetToSeed,
  }
}
