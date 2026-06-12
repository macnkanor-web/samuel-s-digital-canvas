import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import FadeIn from '@/components/ui/FadeIn';
import { ExternalLink, Github, Figma } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'Date of Birth Calculator',
    description: 'An interactive web application that calculates age from date inputs with exact calendar arithmetic, CSV bulk processing, and shareable links.',
    tags: ['JavaScript', 'HTML/CSS', 'Calendar Math'],
    image: '/projects/dob-calculator.jpeg',
    github: 'https://github.com/macnkanor-web/DOB-Cal',
    live: 'https://macnkanor-web.github.io/DOB-Cal/',
    type: 'web',
  },
  {
    title: 'Task Manager',
    description: 'A productivity app with Kanban boards, calendar view, priority levels, and task statistics to help you plan, organize, and complete tasks.',
    tags: ['JavaScript', 'HTML/CSS', 'LocalStorage'],
    image: '/projects/task-manager.jpeg',
    github: 'https://github.com/macnkanor-web/taskmanager',
    live: 'https://macnkanor-web.github.io/taskmanager/',
    type: 'web',
  },
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce website with shopping cart, user authentication, payment integration, and admin dashboard.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    video: '/projects/e-commerce.mp4',
    github: '#',
    live: '#',
    type: 'web',
  },
  {
    title: 'Portfolio Website',
    description: 'This personal portfolio showcasing my work, built with React, Three.js for 3D effects, and Framer Motion animations.',
    tags: ['React', 'Three.js', 'Framer Motion', 'Tailwind'],
    video: '/projects/portfolio-web.mp4',
    github: '#',
    live: '#',
    type: 'web',
  },
];

type Project = (typeof projects)[number];

function ProjectCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Each card occupies an equal slice of the parent scroll progress.
  const start = index / total;
  const end = (index + 1) / total;

  // While the next card slides in, scale + fade the current one down a touch.
  const scale = useTransform(
    progress,
    [start, end],
    [1, index === total - 1 ? 1 : 0.92],
    { ease: (t) => 1 - Math.pow(1 - t, 3) } // easeOutCubic
  );
  const opacity = useTransform(
    progress,
    [start, end],
    [1, index === total - 1 ? 1 : 0.6]
  );

  return (
    <div
      className="sticky top-24"
      style={{ height: 'calc(100vh - 8rem)' }}
    >
      <motion.div
        style={{ scale, opacity, transformOrigin: 'center top' }}
        className="glass rounded-2xl overflow-hidden shadow-elevated group flex flex-col bg-card h-full"
      >
        <div className="flex-1 bg-secondary relative overflow-hidden min-h-0">
          {'video' in project && project.video ? (
            <video
              src={project.video}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover object-top"
            />
          ) : 'image' in project && project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top"
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-primary opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-display font-bold text-foreground/20">
                  {project.title.charAt(0)}
                </span>
              </div>
            </>
          )}
        </div>

        <div className="p-6 flex flex-col">
          <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-3">
            {project.github && (
              <Button variant="ghost" size="sm" asChild>
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  Code
                </a>
              </Button>
            )}
            {project.live && (
              <Button variant="ghost" size="sm" asChild>
                <a href={project.live} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live
                </a>
              </Button>
            )}
            {'figma' in project && typeof project.figma === 'string' && (
              <Button variant="ghost" size="sm" asChild>
                <a href={project.figma} target="_blank" rel="noopener noreferrer">
                  <Figma className="w-4 h-4 mr-2" />
                  Design
                </a>
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="projects" className="section-padding relative">
      <div className="container-custom">
        <FadeIn>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4 text-center">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">
            A selection of my recent work and designs
          </p>
        </FadeIn>

        {/* Tall scroll track: one viewport of scroll per card gives consistent timing. */}
        <div
          ref={containerRef}
          className="relative max-w-5xl mx-auto"
          style={{ height: `${projects.length * 100}vh` }}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              total={projects.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
