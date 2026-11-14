export interface AcademicBranchData {
  id: string
  code: string
  name: string
  description: string
  icon: string
  color: string
}

export interface LessonData {
  id: string
  title: string
  slug: string
  durationMinutes: number
  duration?: string
  isFreePreview: boolean
  isPreview?: boolean
  muxPlaybackId?: string
  videoUrl?: string
  pdfNotesUrl?: string
  pdfNotesName?: string
  order: number
}

export interface SectionData {
  id: string
  title: string
  order: number
  lessons: LessonData[]
}

export interface QuizQuestionData {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface CourseData {
  id: string
  title: string
  slug: string
  tagline: string
  subtitle?: string
  description: string
  category: string
  thumbnail: string
  instructor: {
    name: string
    title: string
    avatar: string
  }
  price: number
  originalPrice: number
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  durationHours: number
  duration?: string
  rating?: string
  reviews?: string
  lessonsCount: number
  isPublished: boolean
  isFeatured: boolean
  eligibleBranches: string[] // Branch codes e.g. ['CSE', 'IT', 'AI_ML']
  sections: SectionData[]
  quizzes?: {
    id: string
    title: string
    passingScore: number
    questions: QuizQuestionData[]
  }[]
}

export const ACADEMIC_BRANCHES: AcademicBranchData[] = [
  {
    id: 'branch-cse',
    code: 'CSE',
    name: 'Computer Science & Engineering',
    description: 'Software development, algorithms, system architecture & full stack.',
    icon: '💻',
    color: '#3b82f6',
  },
  {
    id: 'branch-aiml',
    code: 'AI_ML',
    name: 'Artificial Intelligence & Machine Learning',
    description: 'Neural networks, computer vision, NLP, and modern generative AI models.',
    icon: '🤖',
    color: '#8b5cf6',
  },
  {
    id: 'branch-it',
    code: 'IT',
    name: 'Information Technology',
    description: 'Cloud systems, enterprise databases, cybersecurity, and web networks.',
    icon: '🌐',
    color: '#06b6d4',
  },
  {
    id: 'branch-ece',
    code: 'ECE',
    name: 'Electronics & Communication',
    description: 'VLSI design, embedded microcontrollers, IoT, and signal communication.',
    icon: '📡',
    color: '#f59e0b',
  },
  {
    id: 'branch-eee',
    code: 'EEE',
    name: 'Electrical & Electronics',
    description: 'Power electronics, smart energy grids, electrical machinery, and automation.',
    icon: '⚡',
    color: '#eab308',
  },
  {
    id: 'branch-mech',
    code: 'MECH',
    name: 'Mechanical Engineering',
    description: 'CAD/CAM modeling, robotics, thermodynamics, and industrial engineering.',
    icon: '⚙️',
    color: '#ef4444',
  },
  {
    id: 'branch-civil',
    code: 'CIVIL',
    name: 'Civil Engineering',
    description: 'Structural engineering, AutoCAD, geotechnics, and smart infrastructure.',
    icon: '🏗️',
    color: '#10b981',
  },
]

export const COURSES_DATA: CourseData[] = [
  {
    id: 'course-py-01',
    title: 'Python for Beginners to Master',
    slug: 'python-for-beginners',
    tagline: 'Master Python programming from core syntax to OOP, algorithms and real-world projects.',
    description:
      'A comprehensive roadmap designed specifically for engineering students to build strong foundations in Python 3. Covers logic building, functions, object-oriented concepts, error handling, file I/O, and data processing libraries.',
    category: 'Programming',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    instructor: {
      name: 'Dr. Ramesh Sharma',
      title: 'Senior Software Architect & Ex-Googler',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    },
    price: 999,
    originalPrice: 2999,
    level: 'Beginner',
    durationHours: 12,
    lessonsCount: 6,
    isPublished: true,
    isFeatured: true,
    eligibleBranches: ['CSE', 'IT', 'AI_ML', 'ECE', 'EEE', 'MECH', 'CIVIL'],
    sections: [
      {
        id: 'sec-1',
        title: 'Section 1: Python Fundamentals & Setup',
        order: 1,
        lessons: [
          {
            id: 'les-py-1',
            title: 'Welcome to Saryonaya & Course Overview',
            slug: 'welcome-overview',
            durationMinutes: 10,
            isFreePreview: true,
            videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/person-bicycle-car-detection.mp4',
            pdfNotesUrl: '/materials/python-intro.pdf',
            pdfNotesName: 'Lecture-01-Python-Basics.pdf',
            order: 1,
          },
          {
            id: 'les-py-2',
            title: 'Variables, Data Types and Operators',
            slug: 'variables-data-types',
            durationMinutes: 18,
            isFreePreview: true,
            videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/classroom.mp4',
            pdfNotesUrl: '/materials/python-variables.pdf',
            pdfNotesName: 'Lecture-02-Variables-Operators.pdf',
            order: 2,
          },
          {
            id: 'les-py-3',
            title: 'Conditionals and Decision Making',
            slug: 'conditionals-branching',
            durationMinutes: 22,
            isFreePreview: false,
            videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/face-demographics-walking.mp4',
            pdfNotesUrl: '/materials/python-conditionals.pdf',
            pdfNotesName: 'Lecture-03-Conditionals.pdf',
            order: 3,
          },
        ],
      },
      {
        id: 'sec-2',
        title: 'Section 2: Data Structures & OOP',
        order: 2,
        lessons: [
          {
            id: 'les-py-4',
            title: 'Lists, Tuples, Dictionaries & Sets',
            slug: 'python-data-structures',
            durationMinutes: 28,
            isFreePreview: false,
            videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/classroom.mp4',
            pdfNotesUrl: '/materials/python-collections.pdf',
            pdfNotesName: 'Lecture-04-Collections.pdf',
            order: 4,
          },
          {
            id: 'les-py-5',
            title: 'Functions, Scopes, and Lambda Expressions',
            slug: 'functions-lambdas',
            durationMinutes: 24,
            isFreePreview: false,
            videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/classroom.mp4',
            pdfNotesUrl: '/materials/python-functions.pdf',
            pdfNotesName: 'Lecture-05-Functions.pdf',
            order: 5,
          },
          {
            id: 'les-py-6',
            title: 'Object-Oriented Programming (Classes & Objects)',
            slug: 'object-oriented-python',
            durationMinutes: 35,
            isFreePreview: false,
            videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/classroom.mp4',
            pdfNotesUrl: '/materials/python-oop.pdf',
            pdfNotesName: 'Lecture-06-OOP-Principles.pdf',
            order: 6,
          },
        ],
      },
    ],
    quizzes: [
      {
        id: 'quiz-py-1',
        title: 'Python Core Assessment',
        passingScore: 75,
        questions: [
          {
            id: 'q1',
            question: 'What is the output of print(type([])) in Python 3?',
            options: ["<class 'list'>", "<class 'tuple'>", "<class 'array'>", "<class 'dict'>"],
            correctIndex: 0,
            explanation: 'In Python, square brackets define a list object, which belongs to <class "list">.',
          },
          {
            id: 'q2',
            question: 'Which keyword is used to define an anonymous function in Python?',
            options: ['func', 'def', 'lambda', 'anonymous'],
            correctIndex: 2,
            explanation: 'The "lambda" keyword is used to create one-line anonymous functions.',
          },
          {
            id: 'q3',
            question: 'How do you insert an element at the end of a list in Python?',
            options: ['list.add(x)', 'list.append(x)', 'list.push(x)', 'list.insert_end(x)'],
            correctIndex: 1,
            explanation: 'The append() method appends an element to the end of an existing list.',
          },
          {
            id: 'q4',
            question: 'What is the correct syntax for inheritance in Python?',
            options: ['class Child extends Parent:', 'class Child(Parent):', 'class Child : Parent', 'class Child inherits Parent:'],
            correctIndex: 1,
            explanation: 'Python uses parenthesis notation: class Child(Parent): to inherit from a base class.',
          },
        ],
      },
    ],
  },
  {
    id: 'course-react-02',
    title: 'Modern Full-Stack React & Next.js',
    slug: 'react-nextjs-development',
    tagline: 'Build scalable web apps with React 19, Next.js App Router, Tailwind CSS and Server Components.',
    description:
      'Learn production frontend and full-stack development. Master React hooks, server actions, client components, API routes, database connectivity, and deployment.',
    category: 'Programming',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
    instructor: {
      name: 'Priya Sundaram',
      title: 'Lead Frontend Engineer & Tech Speaker',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    },
    price: 1299,
    originalPrice: 3499,
    level: 'Intermediate',
    durationHours: 15,
    lessonsCount: 5,
    isPublished: true,
    isFeatured: true,
    eligibleBranches: ['CSE', 'IT', 'AI_ML'],
    sections: [
      {
        id: 'sec-r1',
        title: 'Section 1: React 19 Foundations',
        order: 1,
        lessons: [
          {
            id: 'les-r-1',
            title: 'Next.js App Router Architecture',
            slug: 'nextjs-app-router',
            durationMinutes: 15,
            isFreePreview: true,
            videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/classroom.mp4',
            pdfNotesUrl: '/materials/react-architecture.pdf',
            pdfNotesName: 'React-App-Router-Overview.pdf',
            order: 1,
          },
          {
            id: 'les-r-2',
            title: 'Server vs Client Components in Practice',
            slug: 'server-client-components',
            durationMinutes: 20,
            isFreePreview: false,
            videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/classroom.mp4',
            pdfNotesUrl: '/materials/rsc-guide.pdf',
            pdfNotesName: 'Server-Components-Cheatsheet.pdf',
            order: 2,
          },
        ],
      },
      {
        id: 'sec-r2',
        title: 'Section 2: State, APIs and Database Integration',
        order: 2,
        lessons: [
          {
            id: 'les-r-3',
            title: 'Server Actions & Form Handling',
            slug: 'server-actions',
            durationMinutes: 25,
            isFreePreview: false,
            videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/classroom.mp4',
            order: 3,
          },
          {
            id: 'les-r-4',
            title: 'Connecting Supabase with Next.js',
            slug: 'supabase-nextjs',
            durationMinutes: 30,
            isFreePreview: false,
            videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/classroom.mp4',
            order: 4,
          },
        ],
      },
    ],
    quizzes: [
      {
        id: 'quiz-r-1',
        title: 'React & Next.js Quiz',
        passingScore: 80,
        questions: [
          {
            id: 'qr1',
            question: 'What directive declares a Next.js App Router Client Component?',
            options: ["'use client'", "'use server'", "'client only'", "'@client'"],
            correctIndex: 0,
            explanation: "'use client' at the top of a file flags it as a client component.",
          },
          {
            id: 'qr2',
            question: 'Do React Server Components send JavaScript bundle to the browser by default?',
            options: ['No, only HTML and RSC payload', 'Yes, full component code is bundled', 'Only in development mode', 'Only if using styled-components'],
            correctIndex: 0,
            explanation: 'RSC code stays on the server, resulting in 0 client-side JS bundle overhead.',
          },
        ],
      },
    ],
  },
  {
    id: 'course-ai-03',
    title: 'Applied Machine Learning & Deep Learning',
    slug: 'applied-machine-learning',
    tagline: 'End-to-end ML pipeline: Scikit-learn, PyTorch, Model Evaluation and Cloud Deployment.',
    description:
      'Designed for AI & ML, CSE, and IT students. Work with real-world datasets, build neural networks, train transformers, and serve predictive APIs.',
    category: 'Data Science',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80',
    instructor: {
      name: 'Dr. Anand Verma',
      title: 'AI Research Director & Author',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    },
    price: 1499,
    originalPrice: 3999,
    level: 'Advanced',
    durationHours: 18,
    lessonsCount: 6,
    isPublished: true,
    isFeatured: true,
    eligibleBranches: ['AI_ML', 'CSE', 'IT'],
    sections: [
      {
        id: 'sec-ai-1',
        title: 'Section 1: Data Engineering & Supervised Learning',
        order: 1,
        lessons: [
          {
            id: 'les-ai-1',
            title: 'Pandas & Feature Engineering Masterclass',
            slug: 'pandas-features',
            durationMinutes: 25,
            isFreePreview: true,
            videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/classroom.mp4',
            pdfNotesUrl: '/materials/ml-features.pdf',
            pdfNotesName: 'ML-Feature-Engineering.pdf',
            order: 1,
          },
          {
            id: 'les-ai-2',
            title: 'Regression and Classification Algorithms',
            slug: 'classification-algorithms',
            durationMinutes: 30,
            isFreePreview: false,
            videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/classroom.mp4',
            order: 2,
          },
        ],
      },
      {
        id: 'sec-ai-2',
        title: 'Section 2: Neural Networks with PyTorch',
        order: 2,
        lessons: [
          {
            id: 'les-ai-3',
            title: 'Building Feed-Forward Networks from Scratch',
            slug: 'neural-networks-pytorch',
            durationMinutes: 35,
            isFreePreview: false,
            videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/classroom.mp4',
            order: 3,
          },
        ],
      },
    ],
  },
  {
    id: 'course-vlsi-04',
    title: 'Embedded Systems & VLSI Digital Design',
    slug: 'embedded-systems-vlsi',
    tagline: 'ARM Cortex programming, Verilog HDL synthesis, and FPGA prototyping.',
    description:
      'Curated specifically for Electronics (ECE) and Electrical (EEE) students. Master register-level microcontroller programming, RTOS basics, and Verilog digital design.',
    category: 'Core Engineering',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    instructor: {
      name: 'Prof. K. Venkatesh',
      title: 'VLSI Specialist & Hardware Consultant',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    },
    price: 1199,
    originalPrice: 2999,
    level: 'Intermediate',
    durationHours: 14,
    lessonsCount: 5,
    isPublished: true,
    isFeatured: false,
    eligibleBranches: ['ECE', 'EEE'],
    sections: [
      {
        id: 'sec-vl-1',
        title: 'Section 1: Microcontrollers & ARM Architecture',
        order: 1,
        lessons: [
          {
            id: 'les-vl-1',
            title: 'Introduction to Embedded C & Register Map',
            slug: 'embedded-c-basics',
            durationMinutes: 20,
            isFreePreview: true,
            videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/classroom.mp4',
            pdfNotesUrl: '/materials/arm-registers.pdf',
            pdfNotesName: 'ARM-Cortex-Architecture.pdf',
            order: 1,
          },
          {
            id: 'les-vl-2',
            title: 'GPIO, Timers, and Interrupt Controllers',
            slug: 'gpio-interrupts',
            durationMinutes: 25,
            isFreePreview: false,
            videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/classroom.mp4',
            order: 2,
          },
        ],
      },
    ],
  },
  {
    id: 'course-cad-05',
    title: 'SolidWorks 3D CAD & FEA Analysis',
    slug: 'solidworks-cad-fea',
    tagline: 'Parametric 3D modeling, assembly design, stress simulation, and GD&T standards.',
    description:
      'Essential for Mechanical Engineering students. Design complex mechanical parts, perform stress analysis, and generate industry-standard drafting blueprints.',
    category: 'Core Engineering',
    thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    instructor: {
      name: 'Er. Rajesh Kulkarni',
      title: 'Certified SolidWorks Expert (CSWE)',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    },
    price: 999,
    originalPrice: 2499,
    level: 'Beginner',
    durationHours: 11,
    lessonsCount: 4,
    isPublished: true,
    isFeatured: false,
    eligibleBranches: ['MECH'],
    sections: [
      {
        id: 'sec-cd-1',
        title: 'Section 1: 2D Sketching to 3D Features',
        order: 1,
        lessons: [
          {
            id: 'les-cd-1',
            title: 'Interface Setup and Parametric Constraints',
            slug: 'sketch-constraints',
            durationMinutes: 18,
            isFreePreview: true,
            videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/classroom.mp4',
            pdfNotesUrl: '/materials/cad-guidelines.pdf',
            pdfNotesName: 'SolidWorks-Cheat-Sheet.pdf',
            order: 1,
          },
        ],
      },
    ],
  },
  {
    id: 'course-civil-06',
    title: 'AutoCAD Civil 3D & Structural Analysis',
    slug: 'autocad-civil-structural',
    tagline: 'Surveying layout, reinforced concrete design, and building information modeling.',
    description:
      'Curated for Civil Engineering students. Learn plan drawings, elevations, structural load calculations, and BIM workflows for modern building projects.',
    category: 'Core Engineering',
    thumbnail: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop&q=80',
    instructor: {
      name: 'Er. Sandeep Reddy',
      title: 'Senior Structural Consultant',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    },
    price: 999,
    originalPrice: 2499,
    level: 'Beginner',
    durationHours: 10,
    lessonsCount: 4,
    isPublished: true,
    isFeatured: false,
    eligibleBranches: ['CIVIL'],
    sections: [
      {
        id: 'sec-cv-1',
        title: 'Section 1: Blueprint Drafting and Layer Management',
        order: 1,
        lessons: [
          {
            id: 'les-cv-1',
            title: 'AutoCAD Civil 3D Coordinate Setup',
            slug: 'coordinate-setup',
            durationMinutes: 20,
            isFreePreview: true,
            videoUrl: 'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/classroom.mp4',
            pdfNotesUrl: '/materials/civil-drafting.pdf',
            pdfNotesName: 'Civil-Drafting-Standards.pdf',
            order: 1,
          },
        ],
      },
    ],
  },
]

export const SUBSCRIPTION_PLANS = [
  {
    id: 'plan-monthly',
    name: 'Monthly Pro',
    price: 499,
    interval: 'month',
    description: 'Unlimited access to all courses in your engineering branch.',
    badge: 'Flexible',
    features: [
      'Full access to all branch-specific courses',
      'High-definition video streaming',
      'Downloadable PDF notes & resources',
      'Interactive quizzes & assessments',
      'Cancel anytime with one click',
    ],
  },
  {
    id: 'plan-quarterly',
    name: 'Quarterly Accelerator',
    price: 1299,
    interval: '3 months',
    description: 'Best for semester preparation and exam revisions.',
    badge: 'Popular',
    isPopular: true,
    features: [
      'Everything in Monthly Pro',
      'Save 15% compared to monthly',
      'Verified branch course completion certificates',
      'Priority doubt solving forum',
      'Exam question bank access',
    ],
  },
  {
    id: 'plan-yearly',
    name: 'Annual Mastery',
    price: 3999,
    interval: 'year',
    description: 'Complete academic year pass for ambitious engineers.',
    badge: 'Best Value',
    features: [
      'Everything in Quarterly plan',
      'Access across ALL engineering branches',
      'Save over 35% annually',
      'Guaranteed internship interview referrals',
      'Unlimited verified certificate downloads',
      'Direct 1-on-1 mentor guidance sessions',
    ],
  },
]

export const SAMPLE_CERTIFICATES = [
  {
    id: 'cert-py-01',
    courseId: 'course-py-01',
    courseTitle: 'Python for Beginners to Master',
    studentName: 'Naveen Kumar',
    issuedDate: 'November 12, 2026',
    certificateNumber: 'SAR-2026-PY-8842',
    verificationUrl: 'https://saryonaya.com/verify/SAR-2026-PY-8842',
    grade: 'Grade A+ (94%)',
  },
  {
    id: 'cert-react-02',
    courseId: 'course-react-02',
    courseTitle: 'Modern Full-Stack React & Next.js',
    studentName: 'Naveen Kumar',
    issuedDate: 'October 28, 2026',
    certificateNumber: 'SAR-2026-RCT-4129',
    verificationUrl: 'https://saryonaya.com/verify/SAR-2026-RCT-4129',
    grade: 'Grade A (88%)',
  },
]

