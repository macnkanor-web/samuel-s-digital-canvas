import FadeIn from '@/components/ui/FadeIn';
import { Calendar, MapPin, Code2, User } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="container-custom">
        <FadeIn>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4 text-center">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">
            Get to know the person behind the code
          </p>
        </FadeIn>

        {/* Profile Photo */}
        <FadeIn delay={0.1}>
          <div className="flex justify-center mb-12">
            <div className="relative">
              <Avatar className="w-40 h-40 sm:w-48 sm:h-48 border-4 border-primary/30 shadow-xl">
                {/* Replace the src below with your photo path, e.g., "/profile.jpg" */}
                <AvatarImage src="/profile.jpg" alt="Samuel Nkanor" className="object-cover" />
                <AvatarFallback className="bg-gradient-primary text-4xl font-bold text-primary-foreground">
                  <User className="w-16 h-16" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg">
                <Code2 className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn direction="left" delay={0.2}>
            <div className="glass rounded-2xl p-8 shadow-card hover-lift">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <Code2 className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold">Samuel Nkanor</h3>
                    <p className="text-muted-foreground">Full-Stack Developer & Designer</p>
                  </div>
                </div>

                <p className="text-foreground/90 leading-relaxed">
                  I'm a passionate software engineer from Nigeria with a deep love for creating 
                  exceptional digital experiences. With 2+ years of hands-on experience across 
                  the full development stack, I bring ideas to life through clean code and 
                  intuitive design.
                </p>

                <p className="text-foreground/90 leading-relaxed">
                  My journey in tech started early, and I've since mastered frontend and backend 
                  development, UI/UX design, and Python engineering. I believe in writing code 
                  that's not just functional, but elegant and maintainable.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>Born July 23, 2008</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>Nigeria</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.4}>
            <div className="space-y-6">
              <div className="glass rounded-2xl p-6 shadow-card hover-lift">
                <h4 className="font-display text-lg font-semibold mb-3 text-primary">
                  What I Do
                </h4>
                <ul className="space-y-3">
                  {[
                    'Frontend Development (React, TypeScript, Next.js)',
                    'Backend Development (Node.js, Python, APIs)',
                    'UI/UX Design (Figma, Framer)',
                    'Full-Stack Web Applications',
                    'Responsive & Accessible Design',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-foreground/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '2+', label: 'Years Exp.' },
                  { value: '10+', label: 'Projects' },
                  { value: '5+', label: 'Certifications' },
                ].map((stat, index) => (
                  <div key={index} className="glass rounded-xl p-4 text-center hover-lift">
                    <div className="font-display text-3xl font-bold text-gradient">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
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
