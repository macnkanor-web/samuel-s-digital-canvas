import FadeIn from '@/components/ui/FadeIn';
import { Briefcase, GraduationCap, Award } from 'lucide-react';

const experiences = [
  {
    type: 'work',
    title: 'Software Engineering Intern',
    company: 'CodeAlpha',
    period: '2023 - Present',
    description: 'Developed web applications and contributed to various frontend and backend projects.',
  },
  {
    type: 'work',
    title: 'Freelance Web Developer',
    company: 'Self-Employed',
    period: '2022 - Present',
    description: 'Building custom websites and applications for clients worldwide.',
  },
];

const certifications = [
  {
    title: 'Web Development Bootcamp',
    issuer: 'Udemy',
    year: '2023',
  },
  {
    title: 'Python for Everybody',
    issuer: 'Coursera',
    year: '2023',
  },
  {
    title: 'Frontend Development',
    issuer: 'Udemy',
    year: '2022',
  },
  {
    title: 'UI/UX Design Fundamentals',
    issuer: 'Coursera',
    year: '2022',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section-padding relative">
      <div className="container-custom">
        <FadeIn>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4 text-center">
            Experience & <span className="text-gradient">Certifications</span>
          </h2>
          <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">
            My professional journey and achievements
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Experience */}
          <FadeIn direction="left" delay={0.2}>
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-display text-2xl font-semibold">Work Experience</h3>
              </div>

              <div className="space-y-4">
                {experiences.map((exp, index) => (
                  <div key={index} className="glass rounded-xl p-6 shadow-card hover-lift">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-display font-semibold text-lg">{exp.title}</h4>
                      <span className="text-sm text-primary font-medium">{exp.period}</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{exp.company}</p>
                    <p className="text-foreground/80 text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Certifications */}
          <FadeIn direction="right" delay={0.4}>
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Award className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-display text-2xl font-semibold">Certifications</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="glass rounded-xl p-5 shadow-card hover-lift group">
                    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center mb-3 group-hover:bg-primary transition-colors">
                      <GraduationCap className="w-4 h-4 text-secondary-foreground group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h4 className="font-display font-medium text-sm mb-1">{cert.title}</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-xs">{cert.issuer}</span>
                      <span className="text-primary text-xs font-medium">{cert.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
