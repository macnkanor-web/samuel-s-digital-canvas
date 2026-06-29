import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Twitter, FileText, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useRef } from 'react';
import { useTypewriter } from '@/hooks/useTypewriter';

// Tech nodes with normalized (0-100) positions for the graph
const nodes = [
  { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', x: 50, y: 12, size: 'lg' },
  { name: 'TypeScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', x: 78, y: 28, size: 'md' },
  { name: 'JavaScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', x: 22, y: 28, size: 'md' },
  { name: 'Node.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', x: 50, y: 45, size: 'md' },
  { name: 'Tailwind', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', x: 14, y: 58, size: 'md' },
  { name: 'Firebase', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', x: 84, y: 58, size: 'md' },
  { name: 'Vite', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg', x: 34, y: 75, size: 'sm' },
  { name: 'GitHub', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', x: 66, y: 75, size: 'sm', invert: true },
  { name: 'CSS3', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', x: 18, y: 88, size: 'sm' },
  { name: 'HTML5', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', x: 50, y: 92, size: 'sm' },
  { name: 'Figma', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', x: 82, y: 88, size: 'sm' },
];

// Edges: indices into nodes[]
const edges: [number, number][] = [
  [0, 1], [0, 2], [0, 3],
  [1, 3], [2, 3], [1, 5], [2, 4],
  [3, 4], [3, 5], [3, 6], [3, 7],
  [4, 6], [5, 7], [4, 8], [6, 8], [6, 9], [7, 9], [7, 10], [5, 10],
  [8, 9], [9, 10],
];

const sizeMap = { lg: 'w-20 h-20', md: 'w-16 h-16', sm: 'w-14 h-14' } as const;
const iconSizeMap = { lg: 'w-10 h-10', md: 'w-8 h-8', sm: 'w-7 h-7' } as const;

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/samuel-nkanor-172a83381', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/MarNkanor', label: 'X' },
  { icon: Mail, href: 'mailto:mac.nkanor@gmail.com', label: 'Email' },
];

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const gridScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  const { text: typed } = useTypewriter({
    words: [
      'Full Stack Software Engineer',
      'React & Node.js Developer',
      'SaaS Builder',
      'UI/UX Designer',
    ],
    typeSpeed: 70,
    deleteSpeed: 35,
    delayBetweenWords: 2000,
  });

  const handleViewWork = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
    >
      {/* Faint dot grid backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          aria-hidden
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'radial-gradient(hsl(var(--foreground) / 0.35) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage:
              'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          }}
          animate={{ opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* LEFT */}
          <motion.div
            style={{ y: contentY, opacity: contentOpacity }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-left"
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Avatar className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-primary/40 shadow-elevated">
                  <AvatarImage src="/profile.jpg" alt="Samuel Nep" className="object-cover" />
                  <AvatarFallback className="bg-gradient-primary text-lg font-bold text-primary-foreground">
                    SN
                  </AvatarFallback>
                </Avatar>
              </motion.div>
            </div>

            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 mb-4 text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Available for work
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold uppercase leading-[1.05] tracking-tight mb-4">
              Samuel<br />Nep
            </h1>

            {/* Typing subtitle */}
            <p className="text-foreground/80 text-lg sm:text-xl mb-6 min-h-[1.75rem]">
              <span>{typed}</span>
              <span className="inline-block w-[2px] h-[1.1em] ml-1 align-[-0.15em] bg-primary animate-pulse" />
            </p>

            <p className="text-muted-foreground text-lg max-w-xl mb-10 leading-relaxed">
              I'm Samuel Nep — a Full Stack Software Engineer with 2+ years of
              experience crafting beautiful websites, mobile interfaces, and
              software. Check out my projects and skills.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Button variant="hero" size="lg" asChild>
                <a href="#about">
                  Learn More! <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a
                  href={`${import.meta.env.BASE_URL}resume.pdf`}
                  download="Samuel_Nep_Resume.pdf"
                >
                  <FileText className="w-4 h-4 mr-2" /> Resume
                </a>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <a href="#projects" onClick={handleViewWork}>
                  <Eye className="w-4 h-4 mr-2" /> View Work
                </a>
              </Button>
            </div>

            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-full glass border border-border/50 hover:border-primary/60 hover:glow-primary transition-all"
                >
                  <Icon className="w-4 h-4 text-foreground" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Connected node graph */}
          <motion.div
            style={{ y: contentY, opacity: contentOpacity, scale: gridScale }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square max-w-[560px] mx-auto">
              {/* Edges */}
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full"
              >
                <defs>
                  <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.55" />
                  </linearGradient>
                  <filter id="edgeGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="0.6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {edges.map(([a, b], i) => (
                  <motion.line
                    key={i}
                    x1={nodes[a].x}
                    y1={nodes[a].y}
                    x2={nodes[b].x}
                    y2={nodes[b].y}
                    stroke="url(#edgeGrad)"
                    strokeWidth="0.18"
                    strokeLinecap="round"
                    filter="url(#edgeGlow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0.4, 0.85, 0.4] }}
                    transition={{
                      pathLength: { duration: 1.2, delay: 0.3 + i * 0.05, ease: 'easeOut' },
                      opacity: { duration: 4 + (i % 3), delay: 0.3 + i * 0.05, repeat: Infinity, ease: 'easeInOut' },
                    }}
                  />
                ))}
              </svg>

              {/* Nodes */}
              {nodes.map((n, i) => (
                <motion.div
                  key={n.name}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: [0, (i % 2 ? 4 : -4), 0],
                    y: [0, (i % 3 ? -5 : 4), 0],
                  }}
                  transition={{
                    opacity: { delay: 0.4 + i * 0.06, duration: 0.5 },
                    scale: { delay: 0.4 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                    x: { duration: 8 + (i % 4), repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 },
                    y: { duration: 9 + (i % 5), repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 },
                  }}
                >
                  <div
                    className={`${sizeMap[n.size as keyof typeof sizeMap]} rounded-2xl glass border border-border/50 shadow-elevated flex items-center justify-center backdrop-blur-xl hover:border-primary/60 hover:glow-primary transition-all`}
                    title={n.name}
                  >
                    <img
                      src={n.url}
                      alt={n.name}
                      className={`${iconSizeMap[n.size as keyof typeof iconSizeMap]} object-contain ${n.invert ? 'dark:invert' : ''}`}
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
