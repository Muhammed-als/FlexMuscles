/**
 * Maps an anatomical mesh name (from the Z-Anatomy export, e.g.
 * "Clavicular head of pectoralis major muscle.l") to one of our trainable
 * region ids. Rules are evaluated in order — the first whose token matches
 * (case-insensitive substring) wins, so put specific rules before generic
 * ones (foot/hand before thigh/arm, deltoid parts before generic deltoid).
 * Returns null for muscles we don't expose as a workout target (face, jaw,
 * eye, larynx, pharynx, pelvic floor, diaphragm, intercostals, hand/foot
 * intrinsics) — those still render as part of the figure but aren't clickable.
 */
const RULES: Array<[string[], string]> = [
  // Chest (specific heads first)
  [['clavicular head of pectoralis'], 'chest-upper'],
  [['sternocostal head of pectoralis'], 'chest-mid'],
  [['abdominal part of pectoralis', 'pectoralis minor'], 'chest-lower'],
  [['pectoralis major'], 'chest-mid'],
  // Deltoid parts (before generic deltoid)
  [['clavicular part of deltoid'], 'delt-front'],
  [['acromial part of deltoid'], 'delt-side'],
  [['scapular spinal part of deltoid'], 'delt-rear'],
  [['deltoid'], 'delt-side'],
  // Rotator cuff
  [['supraspinatus', 'infraspinatus', 'teres minor', 'subscapularis'], 'rotator-cuff'],
  // Upper back
  [['trapezius', 'rhomboid', 'levator scapulae'], 'traps'],
  [['latissimus dorsi', 'teres major', 'serratus anterior'], 'lats'],
  // Deep spinal erectors / lower back
  [
    [
      'iliocostalis', 'longissimus', 'spinalis', 'semispinalis', 'multifidus',
      'quadratus lumborum', 'rotatores', 'interspinales', 'intertransversarii',
      'serratus posterior', 'levatores', 'erector',
    ],
    'lower-back',
  ],
  // Abs / obliques
  [['rectus abdominis', 'transversus abdominis', 'pyramidalis'], 'abs'],
  [['abdominal oblique'], 'obliques'],
  // Neck (before generic capitis/colli land elsewhere)
  [
    [
      'sternocleidomastoid', 'scalenus', 'splenius', 'longus capitis', 'longus colli',
      'platysma', 'omohyoid', 'sternohyoid', 'sternothyroid', 'thyrohyoid', 'digastric',
      'mylohyoid', 'geniohyoid', 'stylohyoid', 'rectus anterior capitis',
      'rectus lateralis capitis', 'rectus posterior',
    ],
    'neck',
  ],
  // Lower leg & foot (before forearm/hand generic + before thigh adductors)
  [
    [
      'gastrocnemius', 'soleus', 'plantaris', 'tibialis', 'fibularis', 'calcaneal tendon',
      'flexor hallucis', 'extensor hallucis', 'flexor digitorum longus', 'flexor digitorum brevis',
      'extensor digitorum longus', 'extensor digitorum brevis', 'quadratus plantae',
      'abductor hallucis', 'adductor hallucis', 'digiti minimi of foot', 'interossei muscles of foot',
      'lumbrical muscles of foot', 'plantar aponeurosis', 'fibular retinaculum', 'retinaculum of ankle',
      'iliotibial', 'patellar retinaculum',
    ],
    'calves',
  ],
  // Forearm & hand (before generic arm)
  [
    [
      'flexor carpi', 'extensor carpi', 'flexor digitorum profundus', 'flexor digitorum superficialis',
      'extensor digitorum', 'flexor pollicis', 'extensor pollicis', 'abductor pollicis',
      'adductor pollicis', 'opponens pollicis', 'pronator', 'supinator', 'palmaris',
      'extensor indicis', 'extensor digiti minimi', 'digiti minimi of hand', 'interossei muscles of hand',
      'lumbrical muscles of hand', 'retinaculum of wrist',
    ],
    'forearms',
  ],
  // Upper arm
  [['biceps brachii', 'brachialis', 'brachioradialis', 'coracobrachialis'], 'biceps'],
  [['triceps brachii', 'anconeus'], 'triceps'],
  // Thigh
  [['rectus femoris', 'vastus'], 'quads'],
  [['biceps femoris', 'semimembranosus', 'semitendinosus'], 'hamstrings'],
  [['gluteus maximus'], 'glutes'],
  [
    ['gluteus medius', 'gluteus minimus', 'tensor fasciae latae', 'piriformis', 'gemellus', 'obturator', 'quadratus femoris'],
    'abductors',
  ],
  [['adductor', 'pectineus', 'gracilis', 'psoas', 'iliacus', 'sartorius', 'inguinal ligament'], 'adductors'],
]

const cache = new Map<string, string | null>()

const DISPLAY_NAME_MAP: Record<string, string> = {
  'Clavicular head of pectoralis major': 'Upper Chest',
  'Sternocostal head of pectoralis major': 'Middle Chest',
  'Abdominal part of pectoralis major': 'Lower Chest',
  'Pectoralis minor': 'Lower Chest',
}

function normalizeMeshName(meshName: string): string {
  let s = meshName.trim()
  s = s.replace(/\.\d{3}$/i, '') // Blender duplicate suffix (.001)
  s = s.replace(/_/g, ' ')
  s = s.replace(/\.(l|r)$/i, '') // explicit side suffix
  s = s.replace(/\bmuscle([lr])$/i, 'muscle') // fused side suffix from some exports
  s = s.replace(/^\(/, '').replace(/\)$/, '') // surrounding parens
  s = s.replace(/\s+muscle$/i, '') // trailing " muscle"
  s = s.replace(/\s+/g, ' ')
  return s.trim()
}

export function matchRegion(meshName: string): string | null {
  if (cache.has(meshName)) return cache.get(meshName)!
  const n = normalizeMeshName(meshName).toLowerCase()
  let result: string | null = null
  for (const [tokens, region] of RULES) {
    if (tokens.some((t) => n.includes(t))) {
      result = region
      break
    }
  }
  cache.set(meshName, result)
  return result
}

/**
 * Reduces a Z-Anatomy mesh name to a stable "muscle key" that's shared by
 * the left and right copy and any Blender ".001" duplicates. Used so that
 * hovering the left long-head of biceps highlights both sides together but
 * not the short head.
 *
 *   "Long head of biceps brachii.l"              → "Long head of biceps brachii"
 *   "(Abdominal part of pectoralis major muscle).r" → "Abdominal part of pectoralis major"
 *   "Brachialis muscle.l"                         → "Brachialis"
 *   "Multifidus_thoracis_muscler"                 → "Multifidus thoracis"
 */
export function muscleKeyOf(meshName: string): string {
  return normalizeMeshName(meshName)
}

export function displayMuscleName(muscleKey: string): string {
  return DISPLAY_NAME_MAP[muscleKey] ?? muscleKey
}
