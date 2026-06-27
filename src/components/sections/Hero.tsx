import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, Github, Linkedin, Mail, Twitter, FileText, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useRef } from 'react';

const techIcons = [
  { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', size: 'lg', pos: 'col-start-3 row-start-1' },
  { name: 'JavaScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', size: 'md', pos: 'col-start-4 row-start-2' },
  { name: 'TypeScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', size: 'md', pos: 'col-start-3 row-start-3' },
  { name: 'Node.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', size: 'md', pos: 'col-start-2 row-start-3' },
  { name: 'Tailwind', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', size: 'md', pos: 'col-start-1 row-start-2' },
  { name: 'Firebase', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', size: 'md', pos: 'col-start-2 row-start-2' },
  { name: 'Vite', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg', size: 'sm', pos: 'col-start-2 row-start-4' },
  { name: 'GitHub', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', size: 'sm', pos: 'col-start-4 row-start-4', invert: true },
  { name: 'CSS3', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', size: 'sm', pos: 'col-start-1 row-start-5' },
  { name: 'HTML5', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', size: 'sm', pos: 'col-start-4 row-start-5' },
  { name: 'Figma', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', size: 'sm', pos: 'col-start-3 row-start-5' },
];

const sizeMap = {
  lg: 'w-20 h-20',
  md: 'w-16 h-16',
  sm: 'w-14 h-14',
} as const;

const iconSizeMap = {
  lg: 'w-10 h-10',
  md: 'w-8 h-8',
  sm: 'w-7 h-7',
} as const;

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

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
    >
      {/* Cosmic glow backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.45),transparent_60%)] blur-3xl" />
        <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[800px] h-[160px] rounded-full bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.55),transparent_70%)] blur-2xl" />
      </div>

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* LEFT: Profile + name + copy */}
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
                  <AvatarImage src="/profile.jpg" alt="Samuel Nkanor" className="object-cover" />
                  <AvatarFallback className="bg-gradient-primary text-lg font-bold text-primary-foreground">
                    SN
                  </AvatarFallback>
                </Avatar>
              </motion.div>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold uppercase leading-[1.05] tracking-tight mb-6">
              Samuel<br />Nkanor
            </h1>

            <p className="text-muted-foreground text-lg max-w-xl mb-10 leading-relaxed">
              I'm Samuel Nkanor — a Full Stack Software Engineer with 2+ years of
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
                  download="Samuel_Nkanor_Resume.pdf"
                >
                  <FileText className="w-4 h-4 mr-2" /> Resume
                </a>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <a
                  href={`${import.meta.env.BASE_URL}resume.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Eye className="w-4 h-4 mr-2" /> View
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

          {/* RIGHT: Tech orbit grid */}
          <motion.div
            style={{ y: contentY, opacity: contentOpacity, scale: gridScale }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square max-w-[560px] mx-auto">
              {/* Circular guide rings */}
              <div className="absolute inset-[8%] rounded-full border border-primary/15" />
              <div className="absolute inset-[22%] rounded-full border border-primary/10" />
              <div className="absolute inset-[36%] rounded-full border border-accent/15" />
              {/* Crosshair lines */}
              <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
              <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-primary/15 to-transparent" />

              {/* Icon grid */}
              <div className="relative grid grid-cols-4 grid-rows-5 gap-3 w-full h-full p-4">
                {techIcons.map((t, i) => (
                  <motion.div
                    key={t.name}
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      delay: 0.4 + i * 0.07,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`${t.pos} self-center justify-self-center`}
                  >
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 4 + (i % 3),
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.2,
                      }}
                      className={`${sizeMap[t.size as keyof typeof sizeMap]} rounded-2xl glass border border-border/50 shadow-elevated flex items-center justify-center backdrop-blur-xl hover:border-primary/60 hover:glow-primary transition-all`}
                      title={t.name}
                    >
                      <img
                        src={t.url}
                        alt={t.name}
                        className={`${iconSizeMap[t.size as keyof typeof iconSizeMap]} object-contain ${t.invert ? 'dark:invert' : ''}`}
                        loading="lazy"
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
