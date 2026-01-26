import FadeIn from '@/components/ui/FadeIn';

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'HTML/CSS'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Python', 'Express.js', 'REST APIs', 'PostgreSQL', 'MongoDB'],
  },
  {
    title: 'Design',
    skills: ['Figma', 'Framer', 'UI/UX Design', 'Prototyping', 'Wireframing', 'Design Systems'],
  },
  {
    title: 'Tools & Other',
    skills: ['Git', 'GitHub', 'VS Code', 'Vercel', 'Responsive Design', 'SEO'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section-padding relative">
      <div className="container-custom">
        <FadeIn>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4 text-center">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">
            Technologies and tools I work with
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <FadeIn key={category.title} delay={categoryIndex * 0.1} direction="up">
              <div className="glass rounded-2xl p-6 h-full shadow-card hover-lift group">
                <h3 className="font-display text-xl font-semibold mb-4 text-primary group-hover:text-accent transition-colors">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
