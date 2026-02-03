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

export default function Projects() {
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

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <FadeIn key={project.title} delay={index * 0.1} direction="up">
              <div className="glass rounded-2xl overflow-hidden shadow-card hover-lift group h-full flex flex-col">
                <div className="aspect-video bg-secondary relative overflow-hidden">
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
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">
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
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
