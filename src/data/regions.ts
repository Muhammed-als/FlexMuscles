import type { Exercise, Region, BodyRegion } from '../types'

export const REGIONS: Region[] = [
  // ---------------- CHEST ----------------
  {
    id: 'chest-upper',
    name: 'Upper Chest',
    group: 'Chest',
    category: 'Upper Body',
    side: 'front',    
  },
  {
    id: 'chest-mid',
    name: 'Middle Chest',
    group: 'Chest',
    category: 'Upper Body',
    side: 'front',
  },
  {
    id: 'chest-lower',
    name: 'Lower Chest',
    group: 'Chest',
    category: 'Upper Body',
    side: 'front',
  },

  // ---------------- BACK ----------------
  {
    id: 'back-upper',
    name: 'Upper Back',
    group: 'Back',
    category: 'Upper Body',
    side: 'back',
  },
  {
    id: 'back-mid',
    name: 'Mid Back',
    group: 'Back',
    category: 'Upper Body',
    side: 'back',
  },
  {
    id: 'back-lats',
    name: 'Lats',
    group: 'Back',
    category: 'Upper Body',
    side: 'back',
  },
  {
    id: 'back-lower',
    name: 'Lower Back',
    group: 'Back',
    category: 'Upper Body',
    side: 'back',
  },
  
  // ---------------- SHOULDERS ----------------
  {
    id: 'shoulders-front',
    name: 'Front Delts',
    group: 'Shoulders',
    category: 'Upper Body',
    side: 'front',
  },
  {
    id: 'shoulders-side',
    name: 'Side Delts',
    group: 'Shoulders',
    category: 'Upper Body',
    side: 'front',
  },
  {
    id: 'shoulders-rear',
    name: 'Rear Delts',
    group: 'Shoulders',
    category: 'Upper Body',
    side: 'back',
  },

  // ---------------- BICEPS ----------------
  {
    id: 'biceps-long',
    name: 'Long Head',
    group: 'Biceps',
    category: 'Arms',
    side: 'front',
  },
  {
    id: 'biceps-short',
    name: 'Short Head',
    group: 'Biceps',
    category: 'Arms',
    side: 'front',
  },
  {
    id: 'biceps-brachialis',
    name: 'Brachialis',
    group: 'Biceps',
    category: 'Arms',
    side: 'front',
  },

  // ---------------- TRICEPS ----------------
  {
    id: 'triceps-long',
    name: 'Long Head',
    group: 'Triceps',
    category: 'Arms',
    side: 'back',
  },
  {
    id: 'triceps-medial',
    name: 'Medial Head',
    group: 'Triceps',
    category: 'Arms',
    side: 'back',
  },
  {
    id: 'triceps-lateral',
    name: 'Lateral Head',
    group: 'Triceps',
    category: 'Arms',
    side: 'back',
  },

  // ---------------- FOREARMS ----------------
  {
    id: 'forearms-extensors',
    name: 'Extensors',
    group: 'Forearms',
    category: 'Arms',
    side: 'back',
  },
  {
    id: 'forearms-flexors',
    name: 'Flexors',
    group: 'Forearms',
    category: 'Arms',
    side: 'front',
  },
  {
    id: 'forearms-brachioradialis',
    name: 'Brachioradialis',
    group: 'Forearms',
    category: 'Arms',
    side: 'front',
  },

  // ---------------- CORE ----------------
  {
    id: 'core-upper-abs',
    name: 'Upper Abs',
    group: 'Core',
    category: 'Core',
    side: 'front',
  },
  {
    id: 'core-lower-abs',
    name: 'Lower Abs',
    group: 'Core',
    category: 'Core',
    side: 'front',
  },
  {
    id: 'core-obliques',
    name: 'Obliques',
    group: 'Core',
    category: 'Core',
    side: 'front',
  },

  // ---------------- LEGS ----------------
  {
    id: 'legs-quads',
    name: 'Quads',
    group: 'Legs',
    category: 'Lower Body',
    side: 'front',
  },
  {
    id: 'legs-hamstrings',
    name: 'Hamstrings',
    group: 'Legs',
    category: 'Lower Body',
    side: 'back',
  },
  {
    id: 'legs-glutes',
    name: 'Glutes',
    group: 'Legs',
    category: 'Lower Body',
    side: 'back',
  },
  {
    id: 'legs-adductors',
    name: 'Adductors',
    group: 'Legs',
    category: 'Lower Body',
    side: 'front',
  },
  {
    id: 'legs-calves',
    name: 'Calves',
    group: 'Legs',
    category: 'Lower Body',
    side: 'back',
  },

  // ---------------- NECK ----------------
  {
    id: 'neck-stabilizers',
    name: 'Neck & Stabilizers',
    group: 'Neck',
    category: 'Neck & Stabilizers',
    side: 'front',
  },
]

export const CATEGORY_ORDER: BodyRegion[] = [
  'Upper Body',
  'Arms',
  'Core',
  'Lower Body',
  'Neck & Stabilizers',
]

const ex = (
  muscleId: string,
  name: string,
  youtubeId: string,
  equipment: string,
  description: string,
): Exercise => ({
  id: `seed-${muscleId}-${youtubeId}`,
  muscleId,
  name,
  youtubeId,
  equipment,
  description,
  seed: true,
})

export const SEED_EXERCISES: Exercise[] = [
  // Chest
  ex('chest-upper', 'Incline Dumbbell Press', 'Gruq177Psnk', 'Dumbbells', 'Incline Chest Press Mistake (STOP DOING THIS!).'),
  ex('chest-upper', 'Incline Bench Press', '98HWfiRonkE', 'Barbells', 'The Perfect Incline Bench Press !!'),
  ex('chest-upper', 'Hammer Strength Incline Press Machine', 'hkU6fSHcslw', 'Machine', 'Hammer Strength Incline Press Machine'),
  ex('chest-upper', 'Low to High Cable Fly', 'ZWa8v57fCZ8', 'Cable', 'Low to High Cable Fly (Avoid This Common Mistake!)'),
  ex('chest-upper', 'No Money Incline Press', 'QaaWQkBcPpk', 'Bodyweight', '3 Exercises for a Bigger Upper Chest! (Without Weights)'),

  ex('chest-mid', 'Dumbell Chest Fly', 'rk8YayRoTRQ', 'Dumbbells', 'FIX THESE Dumbbell Chest Fly Mistakes!.'),
  ex('chest-mid', 'Bench Press', '_FkbD0FhgVE', 'Barbell', 'Perfect Bench Press Form (DO THIS!)'),
  ex('chest-mid', 'Mid Cable Chest Fly', 'P2QigTGUiDw', 'Cable', 'MID CABLE CHEST FLY TUTORIAL'),
  ex('chest-mid', 'Mid Chest on the Pec Fly Machine', 'K15uV7lcNqs', 'Machine', 'Target the Upper, Middle & Lower Chest on the Pec Fly Machine (DO THIS!)'),
  ex('chest-mid', 'Push-Up', 'rh-6Svx08Bo', 'Bodyweight', 'PUSHUP HACK TO BUILD A FULLER CHEST'),

  ex('chest-lower', 'Decline Dumbbell Press', 'x7aJLvuy6I4', 'Dumbbells', 'HOW TO IMPROVE your Lower Chest IN 5 exercises!'),
  ex('chest-lower', 'Decline Bench Press', 'a-UFQE4oxWY', 'Barbells', 'Decline Bench Press Mistake (AVOID THIS!)'),
  ex('chest-lower', 'High to Low Cable Fly', 'CYviQI1Mnwg', 'Cable', 'Cable Fly Mistake!  STOP DOING THIS!'),
  ex('chest-lower', 'Lower Chest on the Pec Fly Machine', 'K15uV7lcNqs', 'Machine', 'Target the Upper, Middle & Lower Chest on the Pec Fly Machine (DO THIS!)'),
  ex('chest-lower', 'Push-Up', 'rh-6Svx08Bo', 'Bodyweight', 'PUSHUP HACK TO BUILD A FULLER CHEST'),

  // Back
  ex('back-upper', 'Chest Supported DB Row', '4csS_e4Sy7A', 'Dumbbells', 'Chest Supported DB Row (Upper Back)'),
  ex('back-upper', 'Barbell Row Grip', '7SzAgsAVzMo', 'Barbells', 'Barbell Row Grip Widths & Muscles Worked'),
  ex('back-upper', 'Cable Row Grip', 'vqPY3fDessY', 'Cable', 'Cable Row Grip Widths & Muscles Worked!'),
  ex('back-upper', 'Upper Back Pulldown', '4XZaSpgHF4Q', 'Machine', 'Upper Back Pulldown Machine'),
  ex('back-upper', 'Back Muscles Home Exercises', '3HPU-jkUpHQ', 'Bodyweight', 'Back Muscles Home Exercises (NO EQUIPMENT)'),

  ex('back-mid', 'Dumbell Row', 'PilFW4QEFwc', 'Dumbbells', 'Maximize your Dumbbell Rows'),
  ex('back-mid', 'Barbell Row Grip', '7SzAgsAVzMo', 'Barbells', 'Barbell Row Grip Widths & Muscles Worked'),
  ex('back-mid', 'Chest Supported Cable Row', 'G18ysBYu5Mw', 'Cable', 'Cable Row Technique'),
  ex('back-mid', 'Chest Supported Rows', 'fgSyNdEsqlM', 'Machine',   ' Chest Supported Row Machine'),
  ex('back-mid', 'Back Muscles Home Exercises', '3HPU-jkUpHQ', 'Bodyweight', 'Back Muscles Home Exercises (NO EQUIPMENT)'),

  
  ex('back-lats', 'Pull-up', '9rckBLbVe8c', 'Barbells', 'How To Do The Perfect Pull-up'),
  ex('back-lats', 'Straight Arm Pulldown', 'hAMcfubonDc', 'Cable', 'The Perfect Straight Arm Pulldown'),
  ex('back-lats', 'Lat Pulldown', '5s6KGLTMgoI', 'Machine', 'Lat Pulldown Mistakes (FIX THESE!)'),
  ex('back-lats', 'Back Muscles Home Exercises', '3HPU-jkUpHQ', 'Bodyweight', 'Back Muscles Home Exercises (NO EQUIPMENT)'),

  
  ex('back-lower', 'Hyper Extensions', 'gLT-WLH84B4', 'Machine', 'Hinge at the hip to contract the lower back erector spinae.'),
  ex('back-lower', 'Lowr Back Exercises', 'JRjWhzxe8ks', 'Barbells', 'Weak Lower Back? Do This'),

  // Shoulders
  ex('shoulders-front', 'Dumbell Shoulder Press', 'OLePvpxQEGk', 'Dumbbells', 'Best Shoulder Press Tutorial Ever Made | Dumbbells'),
  ex('shoulders-front', 'Dumbell Front Raise', 'h9xfpTrAvkE', 'Dumbbells', 'Dumbbell Front Raise'),
  ex('shoulders-front', 'Barbell Front Delt Raise', 'LvtS8tZ8hUs', 'Barbells', 'Barbell Front Delt Raise Tutorial For Beginners - Shoulder Exercise For Front Delts'),
  ex('shoulders-front', 'Machine Should Press', '6v4nrRVySj0', 'Machine', '✅ The PERFECT Machine Shoulder Press!'),
  ex('shoulders-front', 'Cable Single Arm Front Raise', 'i6Qwd2Ebi44', 'Cable', 'Cable Single Arm Front Raise'),
  ex('shoulders-front', 'Get Wider Shoulders At Home', 'guWmxcdmnwc', 'Bodyweight', 'GET WIDER SHOULDERS AT HOME'),

  ex('shoulders-side', 'Dumbbell Lateral Raise', 'mRfJZsn5DYY', 'Dumbbells', '🔥How To Do A Lateral Raise Correctly ✅'),
  ex('shoulders-side', 'Upright Row', 'YfFzykXvkLs', 'Barbells', 'Maximize your Upright Rows.'),
  ex('shoulders-side', 'Atlantis Lateral Raise', 'ODV5FncMCy0', 'Machine', 'Atlantis Lateral Raise: The Secret to Insane Side Delts Growth!'),
  ex('shoulders-side', 'Lateral Raise', 'f_OGBg2KxgY', 'Cable', 'Stop Messing Up Lateral Raises (Easy Fix)'),
  ex('shoulders-side', 'Get Wider Shoulders At Home', 'guWmxcdmnwc', 'Bodyweight', 'GET WIDER SHOULDERS AT HOME'),

  ex('shoulders-rear', 'Dumbbell Rear Delt Fly', 'LsT-bR_zxLo', 'Dumbbells', 'The PERFECT Dumbbell Rear Delt Fly (DO THIS!)'),
  ex('shoulders-rear', 'Rear Delt Machine Flyes', '7tgx6QHB0-A', 'Machine', '❌ Rear Delt Machine Flyes Mistakes (FIX THESE!)'),
  ex('shoulders-rear', 'Rear Delt Cable Fly', 'FeERX9UwspY', 'Cable', 'The PERFECT Rear Delt Cable Fly'),
  ex('shoulders-rear', 'Get Wider Shoulders At Home', 'guWmxcdmnwc', 'Bodyweight', 'GET WIDER SHOULDERS AT HOME'),

  // Biceps
  ex('biceps-long', 'Incline Dumbbell Curl', 'uCUaRFlA9vE', 'Dumbbells', 'How to Perform the PERFECT Incline Bicep Curl'),
  ex('biceps-long', 'Barbell Drag Curls', 'HY8DVRxWU3Q', 'Barbells', '4 Best Exercises for BIGGER Biceps Peak!'),
  ex('biceps-long', 'Bayesian Curl', 'w3sXATQzGvc', 'Cable', '✅ The PERFECT Bayesian Curl (DO THIS!)'),  
  ex('biceps-long', 'Biceps Workout At Home', 'SNVw8dZaKaU', 'Bodyweight', 'How to get Bigger Biceps WITHOUT EQUIPMENT!'),  

  ex('biceps-short', 'Seated Dumbbell Preacher Curls', 'Mv-KfOHYnGg', 'Dumbbells', 'If you Avoid Doing this on Preacher Curl There is No Point'),
  ex('biceps-short', 'Preacher Curl', 'dhMKHFcoXB0', 'Barbells', 'Preacher Curl Mistake (DO THIS INSTEAD!)'),
  ex('biceps-short', 'Wide-Grip Barbell Curls', 'ez3YoWf62Eg', 'Barbells', 'TARGET the Inner & Outer Biceps on the Barbell Curl (DO THIS!)'),
  ex('biceps-short', 'Wide-Grip Cable Straight Bar Curls', 'a5dGx8szsLY', 'Cable', 'Cable Straight Bar Bicep Curl'),
  ex('biceps-short', 'Biceps Workout At Home', 'SNVw8dZaKaU', 'Bodyweight', 'How to get Bigger Biceps WITHOUT EQUIPMENT!'),  

  ex('biceps-brachialis', 'Dumbbell Hammer Curl', '_aoad2yuP5w', 'Dumbbells', 'Dumbbell Bicep Curl Variations (KNOW THE DIFFERENCE!)'),
  ex('biceps-brachialis', 'Barbell Reverse Curls', 'ZG2n5IcYIcY', 'Barbells', 'Avoid this on Reverse Curls'),
  ex('biceps-brachialis', 'Cable Rope Hammer Curl', 'p1XzMk3gsU0', 'Cable', 'Cable Rope Hammer Curl Tutorial'),
  ex('biceps-brachialis', 'Biceps Workout At Home', 'SNVw8dZaKaU', 'Bodyweight', 'How to get Bigger Biceps WITHOUT EQUIPMENT!'),  

  // Triceps
  ex('triceps-long', 'Overhead Dumbbell Extension', 'b_r_LW4HEcM', 'Dumbbells', 'The PERFECT Overhead DB Tricep Extension'),
  ex('triceps-long', 'EZ-Bar Overhead Triceps Extension', '5IscnabWzKg', 'Barbells', 'Overhead Tricep Extension With EZ Bar: How To Do And Muscles Worked'),
  ex('triceps-long', 'Lying EZ-Bar Triceps Extension', 'K3mFeNz4e3w', 'Barbells', ' The Perfect Lying Triceps Extension (DO THIS!)'),
  ex('triceps-long', 'Single Arm Overhead Tricep Extension', 'MjVYIwVy_1k', 'Cable', 'The BEST Way to do Overhead Tricep Extensions'),
  ex('triceps-long', 'Tricep Workout At Home', '_HG2mNfIaYk', 'Bodyweight', 'OVERHEAD TRICEP EXTENSIONS AT HOME (NO EQUIPMENT)'),

  ex('triceps-medial', 'Reverse-Grip Dumbbell Kickbacks', 'tPgaQuT9V4o', 'Dumbbells', 'Reverse Grip Tricep Kickbacks'),
  ex('triceps-medial', 'Close-Grip Barbell Bench Press', 'xXd7sddHGa0', 'Barbells', 'How to Perform the Perfect Close-Grip Bench Press'),
  ex('triceps-medial', 'V bar pushdown', 'u6sqENBsXjg', 'Cable', 'V bar pushdown'),
  ex('triceps-medial', 'Reverse-Grip Cable Pushdown', '8IK6BkC0lWE', 'Cable', 'Do THESE to GROW Your Triceps!'),
  ex('triceps-medial', 'Tricep Workout At Home', '_HG2mNfIaYk', 'Bodyweight', 'OVERHEAD TRICEP EXTENSIONS AT HOME (NO EQUIPMENT)'),

  ex('triceps-lateral', 'Standard Dumbbell Kickbacks', 'SLDF8kqH0MY', 'Dumbbells', 'Tricep Kickback Mistake (DONT DO THIS!)'),
  ex('triceps-lateral', 'JM PRESS', 'jmgz4ILVveM', 'Barbells', 'Correct way to perform JM PRESS'),
  ex('triceps-lateral', 'Triceps Rope Extensions', '6Dh8sD6aNQE', 'Cable', 'Triceps Rope Extensions Setup in 10 Seconds'),
  ex('triceps-lateral', 'Tricep Workout At Home', '_HG2mNfIaYk', 'Bodyweight', 'OVERHEAD TRICEP EXTENSIONS AT HOME (NO EQUIPMENT)'),

  // Forearms
  ex('forearms-extensors', 'Extensors', 'LHFo6OzRW80', 'Cable', '✅ Build BIGGER 3D Forearms using Cables!'),
  ex('forearms-extensors', 'Extensors', 'gKmfiIDuHLo', 'Cable', '✅ Build BIGGER 3D Forearms using Cables!'),

  ex('forearms-flexors', 'Flexors', 'LHFo6OzRW80', 'Cable', '✅ Build BIGGER 3D Forearms using Cables!'),
  ex('forearms-flexors', 'Flexors', 'gKmfiIDuHLo', 'Cable', 'Curl your wrists upward with palms facing up to target flexors.'),

  ex('forearms-brachioradialis', 'Brachioradialis', 'LHFo6OzRW80', 'Cable', '✅ Build BIGGER 3D Forearms using Cables!'),
  ex('forearms-brachioradialis', 'Brachioradialis', 'gKmfiIDuHLo', 'Cable', 'Overhand grip curls to isolate the brachioradialis muscle on top of the forearm.'),

  // Core
  ex('core-upper-abs', 'Weighted Crunch', 'Yg6GsyZoqK0', 'Dumbbells', 'Weighted Crunch'),
  ex('core-upper-abs', 'Cable Kneeling Crunches', 'ByZJuk85YuE', 'Cable', '❌ Cable Crunch Mistakes (FIX THESE!)'),

  ex('core-lower-abs', 'Hanging Leg Raises', '7DoFMV1Dnow', 'Bodyweight', 'STOP HANGING leg raises like this = ABS!'),
  ex('core-lower-abs', 'Barbell Rollouts', 'XWJmFD_AdbM', 'Bodyweight', 'STOP Using The Ab Roller Like This'),

  ex('core-obliques', 'Russian Twist', 'aRUMRbl7KS4', 'Bodyweight', 'Avoid This Russian Twist Mistake'),

  // Legs
  ex('legs-quads', 'Dumbbell Bulgarian Split Squats', 'or1frhkjBDc', 'Dumbbells', 'Bulgarian Split Squat Setup & Form Tips (DO THIS!)'),
  ex('legs-quads', 'Barbell Back Squats', 'PPmvh7gBTi0', 'Barbells', 'Do You Have A Perfect Squat? (Find Out)'),
  ex('legs-quads', 'Hack Squat Machine', 'g9i05umL5vc', 'Machine', 'How to Hack Squat '),
  ex('legs-quads', 'Seated Leg Extension Machine', 'iQ92TuvBqRo', 'Machine', 'The Perfect Leg Extension'),

  ex('legs-glutes', 'Dumbbell Romanian Deadlifts', 'hu3jRvTc_po', 'Dumbbells', 'The PERFECT Dumbbell Romanian Deadlift'),
  ex('legs-glutes', 'Dumbbell Bulgarian Split Squats', 'or1frhkjBDc', 'Dumbbells', 'Bulgarian Split Squat Setup & Form Tips (DO THIS!)'),
  ex('legs-glutes', 'Barbell Back Squats', 'PPmvh7gBTi0', 'Barbells', 'Do You Have A Perfect Squat? (Find Out)'),
  ex('legs-glutes', 'Machine Hip Thrust', 'iWMyK0mOSGs', 'Machine', 'How to Hip Thrust Correctly'),
  ex('legs-glutes', 'Leg Press Machine', 'EotSw18oR9w', 'Machine', 'The PERFECT Leg Press'),

  ex('legs-hamstrings', 'Lying Leg Curl Machine', 'lGNeJsdqJwg', 'Machine', 'Fix your hamstring curls!'),
  ex('legs-hamstrings', 'Seated Leg Curl Machine', '_lgE0gPvbik', 'Machine', 'Leg Curl Form Tips (DO THIS!)'),
  ex('legs-hamstrings', 'Dumbbell Romanian Deadlifts', 'hu3jRvTc_po', 'Dumbbells', 'The PERFECT Dumbbell Romanian Deadlift'),

  ex('legs-adductors', 'Seated Hip Adduction', 'BmMmt-c9aNM', 'Machine', 'Squeeze pads together to target inner thigh adductors.'),
  
  ex('legs-calves', 'Seated Calf Raise Machine', '60XGTGOjdXA', 'Machine', 'How to do Seated Calf Raises to actually grow your calves'),

  // Neck
  ex('neck-stabilizers', 'Lying Weighted Neck Crunch', 'fmhaM_xXiSk', 'Bodyweight', 'Neck flexion" to strengthen in front of your neck.'),
  ex('neck-stabilizers', 'Lying Pronated Neck Extension', '3-yAPkua_cA', 'Bodyweight', 'Neck extension to strengthen the back of your neck.'),
  ex('neck-stabilizers', 'Lying Side Neck Raise', 'xm__5GzDkzw', 'Bodyweight', 'Side Lying Neck Raises'),

]