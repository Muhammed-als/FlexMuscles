export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced'

export interface Exercise {
  id: string
  /** id of the region this exercise trains */
  muscleId: string
  name: string
  /** YouTube video id (the part after v=) */
  youtubeId: string
  description: string
  equipment: string
  /** true for the bundled seed exercises */
  seed?: boolean
}

export type BodyRegion =
  | 'Upper Body'
  | 'Arms'
  | 'Core'
  | 'Lower Body'
  | 'Neck & Stabilizers'

export interface Region {
  id: string
  /** display name, e.g. "Upper Chest" */
  name: string
  /** parent muscle group label, e.g. "Chest" */
  group: string
  category: BodyRegion
  /** which side of the body the muscle sits on (drives the camera) */
  side: 'front' | 'back'
  /** anatomical muscles trained */
}
