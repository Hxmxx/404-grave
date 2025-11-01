export const techStacks = [
    // Frontend
    'React',
    'Next.js',
    'Vue.js',
    'Angular',
    'Svelte',
    'TypeScript',
    'JavaScript',
    'HTML/CSS',
    'Tailwind CSS',
    'styled-components',

    // Backend
    'Node.js',
    'Express',
    'NestJS',
    'Python',
    'Django',
    'FastAPI',
    'Flask',
    'Java',
    'Spring Boot',
    'Go',
    'Rust',
    'Ruby on Rails',
    'PHP',
    'Laravel',

    // Mobile
    'React Native',
    'Flutter',
    'Swift',
    'Kotlin',
    'Expo',

    // Database
    'PostgreSQL',
    'MySQL',
    'MongoDB',
    'Redis',
    'Supabase',
    'Firebase',
    'SQLite',
    'Prisma',

    // Cloud & DevOps
    'AWS',
    'Google Cloud',
    'Azure',
    'Vercel',
    'Netlify',
    'Docker',
    'Kubernetes',

    // AI/ML
    'OpenAI API',
    'TensorFlow',
    'PyTorch',
    'Stable Diffusion',

    // Others
    'GraphQL',
    'REST API',
    'WebSocket',
    'Socket.io',
    'Git',
    'GitHub Actions',
] as const

export type TechStack = (typeof techStacks)[number]
