import { useRef, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import FadeIn from '@/components/ui/FadeIn';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Project = {
  title: string;
  description: string;
  tags: string[];
  category: string;
  image?: string;
  video?: string;
  github?: string;
  live?: string;
};

const projects: Project[] = [
  {
    title: 'E-Commerce Platform',
    description:
      'Full-stack e-commerce platform with shopping cart, secure authentication, Stripe payments, and an admin dashboard for inventory and orders.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'Full Stack',
    video: '/projects/e-commerce.mp4',
    live: '#',
    github: '#',
  },
  {
    title: 'Task Manager',
    description:
      'Productivity app with Kanban boards, calendar view, priority levels, and task statistics.',
    tags: ['JavaScript', 'HTML/CSS', 'LocalStorage'],
    category: 'Web App',
    image: '/projects/task-manager.jpeg',
    github: 'https://github.com/macnkanor-web/taskmanager',
    live: 'https://macnkanor-web.github.io/taskmanager/',
  },
  {
    title: 'Portfolio Website',
    description:
      'This personal portfolio built with React, Three.js, and Framer Motion — focused on motion design and depth.',
    tags: ['React', 'Three.js', 'Framer Motion', 'Tailwind'],
    category: 'Design',
    video: '/projects/portfolio-web.mp4',
    live: '#',
    github: '#',
  },
  {
    title: 'Date of Birth Calculator',
    description:
      'Interactive web app that calculates age with exact calendar arithmetic, CSV bulk processing, and shareable links.',
    tags: ['JavaScript', 'Calendar Math'],
    category: 'Web App',
    image: '/projects/dob-calculator.jpeg',
    github: 'https://github.com/macnkanor-web/DOB-Cal',
    live: 'https://macnkanor-web.github.io/DOB-Cal/',
  },
  {
    title: 'More coming soon',
    description: 'New work currently in design and development. Check back shortly.',
    tags: ['WIP'],
    category: 'Upcoming',
    live: '#',
  },
];

const layoutClasses = [
  // Hero: full width, taller
  'md:col-span-12 md:row-span-2 min-h-[420px] md:min-h-[500px]',
  // Two medium side-by-side
  'md:col-span-6 min-h-[340px]',
  'md:col-span-6 min-h-[340px]',
  // Two smaller
  'md:col-span-7 min-h-[300px]',
  'md:col-span-5 min-h-[300px]',
];

function ProjectCard({
  project,
  className,
  index,
  hero,
}: {
  project: Project;
  className?: string;
  index: number;
  hero?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Tilt
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18, mass: 0.4 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18, mass: 0.4 });
  const rotateX = useTransform(srx, (v) => `${v}deg`);
  const rotateY = useTransform(sry, (v) => `${v}deg`);
  const imgRX = useTransform(srx, (v) => `${-v * 0.5}deg`);
  const imgRY = useTransform(sry, (v) => `${-v * 0.5}deg`);

  // Glow
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const sgx = useSpring(gx, { stiffness: 200, damping: 25 });
  const sgy = useSpring(gy, { stiffness: 200, damping: 25 });
  const background = useTransform(
    [sgx, sgy],
    ([x, y]) =>
      `radial-gradient(360px circle at ${x}% ${y}%, hsl(265 90% 70% / 0.18), transparent 55%)`
  );

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 16); // max ~8deg
    rx.set(-(py - 0.5) * 16);
    gx.set(px * 100);
    gy.set(py * 100);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
    gx.set(50);
    gy.set(50);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className={cn(
        'group/card relative rounded-3xl p-[1.5px] [transform-style:preserve-3d]',
        'bg-gradient-to-br from-primary/40 via-accent/25 to-primary/40',
        'transition-[opacity,filter] duration-500 ease-out',
        'group-hover/grid:opacity-70 group-hover/grid:saturate-75 hover:!opacity-100 hover:!saturate-100',
        className
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[calc(1.5rem-1.5px)] bg-[hsl(225_30%_8%)] flex flex-col">
        {/* Thumbnail */}
        <div
          className={cn(
            'relative overflow-hidden bg-[hsl(225_30%_5%)]',
            hero ? 'h-[58%]' : 'h-[55%]'
          )}
        >
          <motion.div
            style={{ rotateX: imgRX, rotateY: imgRY, transformPerspective: 1200 }}
            className="absolute inset-0 [transform-style:preserve-3d]"
          >
            {project.video ? (
              <video
                src={project.video}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/card:scale-[1.04]"
              />
            ) : project.image ? (
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/card:scale-[1.04]"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[hsl(265_60%_25%)] to-[hsl(220_60%_20%)]">
                <span className="text-6xl font-display font-bold text-foreground/20">
                  {project.title.charAt(0)}
                </span>
              </div>
            )}
          </motion.div>

          {/* Cursor glow */}
          <motion.div
            style={{ background }}
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover/card:opacity-100"
          />

          {/* Gradient fade into content */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[hsl(225_30%_8%)] to-transparent" />

          {/* Category chip */}
          <span className="absolute top-4 left-4 px-3 py-1 text-[10px] uppercase tracking-[0.14em] rounded-full bg-black/40 backdrop-blur-md text-white/85 border border-white/10">
            {project.category}
          </span>
        </div>

        {/* Body */}
        <div className="relative flex-1 p-5 sm:p-6 flex flex-col">
          <h3
            className={cn(
              'font-display font-semibold text-foreground mb-2',
              hero ? 'text-2xl sm:text-3xl' : 'text-xl'
            )}
          >
            {project.title}
          </h3>
          <p
            className={cn(
              'text-muted-foreground text-sm leading-relaxed mb-4',
              hero ? 'max-w-xl' : 'line-clamp-2'
            )}
          >
            {project.description}
          </p>

          {/* Floating tech badges */}
          <div className="mt-auto flex flex-wrap items-center gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[11px] rounded-full bg-white/5 backdrop-blur border border-white/10 text-foreground/80"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Hover slide-up CTA */}
          <div className="pointer-events-none absolute inset-x-5 sm:inset-x-6 bottom-5 sm:bottom-6 translate-y-[140%] opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-500 ease-out">
            <a
              href={project.live || project.github || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-foreground text-background text-sm font-medium shadow-lg hover:gap-3 transition-all duration-300 ease-out"
            >
              View Project
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const items = projects.slice(0, 5);

  return (
    <section
      id="projects"
      className="relative section-padding bg-[hsl(225_35%_5%)] text-foreground"
    >
      {/* Soft ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] rounded-full bg-[hsl(265_80%_50%/0.08)] blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[hsl(220_80%_50%/0.08)] blur-3xl" />
      </div>

      <div className="container-custom relative">
        <FadeIn>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4 text-center">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-center mb-14 max-w-xl mx-auto">
            A selection of recent work — built with care, motion, and attention to detail.
          </p>
        </FadeIn>

        <div className="group/grid grid grid-cols-1 md:grid-cols-12 auto-rows-auto gap-5 max-w-7xl mx-auto">
          {items.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              className={layoutClasses[i]}
              index={i}
              hero={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
