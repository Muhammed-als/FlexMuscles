import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, RotateCcw, Dumbbell, Search, Filter, ChevronDown, ChevronRight, Layers } from 'lucide-react'
import { REGIONS, CATEGORY_ORDER } from './data/regions'
import { useExercises } from './hooks/useExercises'
import type { BodyRegion, Exercise, Region } from './types'
import ExercisePanel from './components/ExercisePanel'
import ExerciseModal from './components/ExerciseModal'
import ConfirmDialog from './components/ConfirmDialog'

type WorkoutTypeTab = 'All' | 'Dumbbells' | 'Barbells' | 'Machines & Cables' | 'Home / Bodyweight'

function readHash(): string | undefined {
  if (typeof window === 'undefined') return undefined
  const h = window.location.hash.replace(/^#\/?/, '')
  if (!h) return undefined
  const valid = REGIONS.some((g) => g.id === h) || h.startsWith('group-')
  return valid ? h : undefined
}

export default function App() {
  const store = useExercises()
  
  // Navigation & Hierarchy States
  const [selectedId, setSelectedId] = useState<string>(readHash() ?? 'group-Chest')
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    'Chest': true, // default open
    'Back': false,
    'Shoulders': false,
    'Biceps': false,
    'Triceps': false,
    'Forearms': false,
    'Core': false,
    'Legs': false,
    'Neck': false
  })

  // Filter States
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<WorkoutTypeTab>('All')

  // Modals
  const [modal, setModal] = useState<{ open: boolean; editing?: Exercise }>({ open: false })
  const [confirm, setConfirm] = useState<{ open: boolean; target?: Exercise }>({ open: false })

  // Sync state with URL hash
  useEffect(() => {
    const next = `#/${selectedId}`
    if (window.location.hash !== next) {
      window.history.replaceState(null, '', next)
    }
  }, [selectedId])

  // Group anatomical regions by their logical Parent Group (e.g., "Chest", "Shoulders")
  const parentGroups = useMemo(() => {
    const map = {} as Record<string, { category: BodyRegion; regions: Region[] }>
    for (const r of REGIONS) {
      if (!map[r.group]) {
        map[r.group] = { category: r.category, regions: [] }
      }
      map[r.group].regions.push(r)
    }
    return map
  }, [])

  // Manage expandable states for groups
  const toggleGroupExpand = (groupName: string, e: React.MouseEvent) => {
    e.stopPropagation() // Don't select the group, just expand it
    setExpandedGroups((prev) => ({ ...prev, [groupName]: !prev[groupName] }))
  }

  // Aggregate exercise count for an entire parent group
  const getGroupExerciseCount = (groupName: string) => {
    const regions = parentGroups[groupName]?.regions ?? []
    return regions.reduce((sum, r) => sum + store.countByMuscle(r.id), 0)
  }

  // Live sidebar filtration (Filters categories, groups, and children correctly)
  const filteredGroupsByCategory = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    const result = {} as Record<
      BodyRegion,
      Array<[string, { category: BodyRegion; regions: Region[] }]>
    >

    for (const category of CATEGORY_ORDER) {
      result[category] = []
    }

    for (const [groupName, data] of Object.entries(parentGroups)) {
      if (!query) {
        result[data.category].push([groupName, data])
        continue
      }

      const matchesGroup = groupName.toLowerCase().includes(query)
      const matchedRegions = data.regions.filter(
        (r) =>
          r.name.toLowerCase().includes(query) 
      )

      // Only include parent group if either the parent name or any nested sub-muscles match the search query
      if (matchesGroup || matchedRegions.length > 0) {
        result[data.category].push([
          groupName,
          {
            category: data.category,
            // Reveal only the sub-muscles matching the search query, or all if the group name itself was matched
            regions: matchesGroup ? data.regions : matchedRegions,
          },
        ])
      }
    }

    return result
  }, [searchQuery, parentGroups])

  // Determine if there are any results at all for the current search
  const hasSearchResults = useMemo(() => {
    return Object.values(filteredGroupsByCategory).some((groups) => groups.length > 0)
  }, [filteredGroupsByCategory])

  // Determine active target region(s) based on selection
  const activeRegions = useMemo(() => {
    if (selectedId.startsWith('group-')) {
      const groupName = selectedId.replace('group-', '')
      return parentGroups[groupName]?.regions ?? []
    } else {
      const single = REGIONS.find((r) => r.id === selectedId)
      return single ? [single] : []
    }
  }, [selectedId, parentGroups])

  // Virtualized unified Region object passed to standard components
  const displayGroup = useMemo<Region>(() => {
    if (selectedId.startsWith('group-')) {
      const groupName = selectedId.replace('group-', '')
      const regions = parentGroups[groupName]?.regions ?? []
      return {
        id: selectedId,
        name: `${groupName} (All Areas)`,
        group: groupName,
        category: regions[0]?.category ?? 'Upper Body',
        side: 'front',
      }
    }
    return REGIONS.find((g) => g.id === selectedId) ?? REGIONS[0]
  }, [selectedId, parentGroups])

  // Filter and load exercises based on dynamic tabs, difficulty, and query
  const selectedExercises = useMemo(() => {
    const list: Exercise[] = []
    activeRegions.forEach((reg) => {
      list.push(...(store.byMuscle[reg.id] ?? []))
    })

    return list.filter((ex) => {
      // Tab-Based Equipment Filtration
      let matchType = false
      const equip = ex.equipment.toLowerCase()
      if (activeTab === 'All') {
        matchType = true
      } else if (activeTab === 'Dumbbells') {
        matchType = equip.includes('dumbbell')
      } else if (activeTab === 'Barbells') {
        matchType = equip.includes('barbell')
      } else if (activeTab === 'Machines & Cables') {
        matchType = equip.includes('machine') || equip.includes('cable') || equip.includes('bench') || equip.includes('press')
      } else if (activeTab === 'Home / Bodyweight') {
        matchType = equip.includes('bodyweight') || equip.includes('band') || !equip.trim()
      }

      return matchType
    })
  }, [activeRegions, store.byMuscle, activeTab])

  const totalExercises = store.exercises.length

  return (
    <div className="min-h-screen">
      <div className="app-bg" />
      <div className="app-grid" />

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/5 bg-ink-950/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-flame-500 text-ink-950 shadow-glow">
              <Activity size={22} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="font-display text-xl font-extrabold leading-none tracking-tight text-white">
                FLEX<span className="text-gradient">MUSCLES</span>
              </h1>
              <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-slate-500">
                Studio Directory System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 sm:flex">
              <span className="font-bold text-white">{totalExercises}</span> exercises total
            </div>
            <button
              onClick={() => {
                store.resetToSeed()
                setSelectedId('group-Chest')
                setActiveTab('All')
                setSearchQuery('')
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
              title="Restore bundled exercises"
            >
              <RotateCcw size={13} /> Reset System
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
        
        {/* Dynamic Navigation Dashboard */}
        <div className="grid items-start gap-6 lg:grid-cols-[340px_1fr]">
          
          {/* LEFT SIDEBAR: Hierarchical Muscle Group Menu */}
          <div className="lg:sticky lg:top-24 space-y-4">
            <div className="glass rounded-3xl p-5 shadow-card">
              <div className="mb-4">
                <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                  <Layers size={16} className="text-brand-400" />
                  Muscle Directory Tree
                </h3>
                <p className="text-[11px] text-slate-400 mt-1">
                  Select a main day group or expand to choose sub-targets.
                </p>
              </div>

              {/* Dynamic Search */}
              <div className="relative mb-5">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search regions or muscles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl bg-ink-900/80 border border-white/5 pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20"
                />
              </div>

              {/* Tree Root */}
              <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-1">
                {CATEGORY_ORDER.map((category) => {
                  const groups = filteredGroupsByCategory[category] ?? []
                  if (groups.length === 0) return null

                  return (
                    <div key={category} className="space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-400/80 border-b border-white/5 pb-1">
                        {category}
                      </p>
                      
                      <div className="space-y-1.5">
                        {groups.map(([groupName, data]) => {
                          const isParentSelected = selectedId === `group-${groupName}`
                          // If there's an active search query, expand the group automatically to show matched children
                          const isExpanded = searchQuery.trim() ? true : !!expandedGroups[groupName]
                          const groupCount = getGroupExerciseCount(groupName)

                          return (
                            <div key={groupName} className="space-y-1">
                              {/* Parent Row */}
                              <div
                                onClick={() => setSelectedId(`group-${groupName}`)}
                                className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold cursor-pointer transition ${
                                  isParentSelected
                                    ? 'bg-gradient-to-r from-brand-500 to-flame-500 text-ink-950 shadow-glow'
                                    : 'bg-white/[0.02] border border-white/5 text-slate-200 hover:bg-white/[0.05]'
                                }`}
                              >
                                <div className="flex items-center gap-1.5 min-w-0">
                                  <button
                                    onClick={(e) => toggleGroupExpand(groupName, e)}
                                    className="p-1 rounded hover:bg-white/10 transition shrink-0"
                                    aria-label="Toggle Sub-Muscles"
                                  >
                                    {isExpanded ? (
                                      <ChevronDown size={14} className={isParentSelected ? 'text-ink-950' : 'text-slate-400'} />
                                    ) : (
                                      <ChevronRight size={14} className={isParentSelected ? 'text-ink-950' : 'text-slate-400'} />
                                    )}
                                  </button>
                                  <span className="truncate">{groupName}</span>
                                  <span className="text-[10px] opacity-60 font-normal">(All)</span>
                                </div>
                                <span className={`grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[9px] font-bold ${
                                  isParentSelected ? 'bg-ink-950/20 text-ink-950' : 'bg-white/5 text-slate-400'
                                }`}>
                                  {groupCount}
                                </span>
                              </div>

                              {/* Nested Children Tree */}
                              <AnimatePresence initial={false}>
                                {isExpanded && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.15, ease: 'easeOut' }}
                                    className="overflow-hidden pl-4 border-l border-white/5 ml-4 space-y-1"
                                  >
                                    {data.regions.map((reg) => {
                                      const isChildSelected = selectedId === reg.id
                                      const childCount = store.countByMuscle(reg.id)

                                      return (
                                        <button
                                          key={reg.id}
                                          onClick={() => setSelectedId(reg.id)}
                                          className={`w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs transition ${
                                            isChildSelected
                                              ? 'bg-brand-500/15 border border-brand-500/30 text-brand-300 font-bold'
                                              : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
                                          }`}
                                        >
                                          <span className="truncate">{reg.name}</span>
                                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                                            isChildSelected ? 'bg-brand-500/20 text-brand-300' : 'bg-white/5 text-slate-500'
                                          }`}>
                                            {childCount}
                                          </span>
                                        </button>
                                      )
                                    })}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}

                {!hasSearchResults && (
                  <div className="py-8 text-center text-xs text-slate-500">
                    No matching muscle groups found.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT VIEW: Exercises Workspace */}
          <div className="glass rounded-3xl p-5 shadow-card sm:p-6 space-y-6">
            
            {/* 1. Quick Target Overview Card */}
            <div className="flex flex-col gap-2 bg-white/[0.01] border border-white/5 rounded-2xl p-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-400">
                {displayGroup.category} · {displayGroup.group} Target
              </span>
              <h2 className="font-display text-2xl font-bold text-white leading-none">
                {displayGroup.name}
              </h2>                     
            </div>

            {/* 2. Style & Equipment Filter Segment Control tabs */}
            <div className="flex flex-col gap-4 border-b border-white/5 pb-5">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Filter size={13} className="text-brand-400" />
                <span>Interactive Selection Filters:</span>
              </div>

              {/* Segmented Tab controls matching "Dumbbells", "Machines", "Home/Bodyweight" */}
              <div className="flex flex-wrap gap-1 bg-ink-950/80 p-1 rounded-xl border border-white/5">
                {(['All', 'Dumbbells', 'Barbells', 'Machines & Cables', 'Home / Bodyweight'] as WorkoutTypeTab[]).map((tab) => {
                  const isActive = activeTab === tab
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 min-w-[80px] text-center py-1.5 px-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-brand-500/20 to-flame-500/20 border border-brand-500/30 text-brand-300 font-bold'
                          : 'text-slate-400 hover:text-white hover:bg-white/[0.01]'
                      }`}
                    >
                      {tab}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 3. Standard Exercises List */}
            <ExercisePanel
              group={displayGroup}
              exercises={selectedExercises}
              onAdd={() => setModal({ open: true })}
              onEdit={(e) => setModal({ open: true, editing: e })}
              onDelete={(e) => setConfirm({ open: true, target: e })}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>
            FLEXMUSCLES · Optimized Directory Tree Navigation.
          </p>
          <span className="text-center sm:text-right">
            Configure, manage, and customize routines on any device.
          </span>
        </footer>
      </main>

      {/* Add / Edit modal */}
      <ExerciseModal
        open={modal.open}
        group={displayGroup}
        initial={modal.editing}
        onClose={() => setModal({ open: false })}
        onSubmit={(draft) => {
          if (modal.editing) store.updateExercise(modal.editing.id, draft)
          else store.addExercise(draft)
          setModal({ open: false })
        }}
      />

      {/* Delete confirm */}
      <ConfirmDialog
        open={confirm.open}
        title="Delete exercise?"
        message={`“${confirm.target?.name ?? ''}” will be removed. This action cannot be undone.`}
        onCancel={() => setConfirm({ open: false })}
        onConfirm={() => {
          if (confirm.target) store.deleteExercise(confirm.target.id)
          setConfirm({ open: false })
        }}
      />
    </div>
  )
}