import { useMemo, useState, forwardRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import FadeIn from '@/components/ui/FadeIn';
import { ExternalLink, Github, Figma } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const projects = [
  {
    title: 'Date of Birth Calculator',
    description:
      'Interactive web app that calculates age with exact calendar arithmetic, CSV bulk processing, and shareable links.',
    tags: ['JavaScript', 'HTML/CSS', 'Calendar Math'],
    category: 'Web App',
    image: '/projects/dob-calculator.jpeg',
    github: 'https://github.com/macnkanor-web/DOB-Cal',
    live: 'https://macnkanor-web.github.io/DOB-Cal/',
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
    title: 'E-Commerce Platform',
    description:
      'Full-stack e-commerce website with shopping cart, authentication, payments, and admin dashboard.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'Full Stack',
    video: '/projects/e-commerce.mp4',
    github: '#',
    live: '#',
  },
  {
    title: 'Portfolio Website',
    description:
      'This personal portfolio showcasing my work, built with React, Three.js, and Framer Motion.',
    tags: ['React', 'Three.js', 'Framer Motion', 'Tailwind'],
    category: 'Design',
    video: '/projects/portfolio-web.mp4',
    github: '#',
    live: '#',
  },
];

type Project = (typeof projects)[number];

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.9, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -16 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group glass rounded-2xl overflow-hidden bg-card border border-border/40 shadow-elevated flex flex-col hover:border-primary/40 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative aspect-[4/3] bg-secondary overflow-hidden">
        {'video' in project && project.video ? (
          <video
            src={project.video}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        ) : 'image' in project && project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-primary opacity-20">
            <span className="text-4xl font-display font-bold text-foreground/30">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
        <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-full bg-background/80 backdrop-blur text-foreground/80 border border-border/40">
          {project.category}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[11px] rounded-md bg-secondary text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-2 pt-2 border-t border-border/40">
          {project.github && (
            <Button variant="ghost" size="sm" asChild>
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-1.5" />
                Code
              </a>
            </Button>
          )}
          {project.live && (
            <Button variant="ghost" size="sm" asChild>
              <a href={project.live} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-1.5" />
                Live
              </a>
            </Button>
          )}
          {'figma' in project && typeof project.figma === 'string' && (
            <Button variant="ghost" size="sm" asChild>
              <a href={project.figma} target="_blank" rel="noopener noreferrer">
                <Figma className="w-4 h-4 mr-1.5" />
                Design
              </a>
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(projects.map((p) => p.category)))],
    []
  );
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="section-padding relative">
      <div className="container-custom">
        <FadeIn>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4 text-center">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
            A selection of my recent work and designs
          </p>
        </FadeIn>

        {/* Category filter */}
        <FadeIn>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={cn(
                  'relative px-4 py-2 text-sm rounded-full border transition-colors',
                  active === cat
                    ? 'text-primary-foreground border-primary'
                    : 'bg-card/50 text-muted-foreground border-border/50 hover:text-foreground hover:border-border'
                )}
              >
                {active === cat && (
                  <motion.span
                    layoutId="active-filter-pill"
                    className="absolute inset-0 rounded-full bg-primary shadow-elevated"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Classic grid */}
        <LayoutGroup>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}
