import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, FileText, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative section-padding">
      <div className="container-custom text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <Avatar className="w-32 h-32 sm:w-40 sm:h-40 border-4 border-primary/30 shadow-xl">
              <AvatarImage src="/profile.jpg" alt="Samuel Nkanor" className="object-cover" />
              <AvatarFallback className="bg-gradient-primary text-3xl font-bold text-primary-foreground">
                SN
              </AvatarFallback>
            </Avatar>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-primary font-medium mb-4 tracking-wider uppercase text-sm"
          >
            Full-Stack Developer & Designer
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            Hi, I'm{' '}
            <span className="text-gradient">Samuel</span>
            <br />
            <span className="text-gradient">Nkanor</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            A passionate Nigerian developer crafting beautiful web experiences 
            with 2+ years of expertise in frontend, backend, and UI/UX design.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <Button variant="hero" size="lg" asChild>
              <a href="#projects">View My Work</a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href="#contact">Get In Touch</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mb-12"
          >
            <Button variant="outline" size="lg" asChild className="group">
              <a href="/resume.pdf" download="Samuel_Nkanor_Resume.pdf">
                <FileText className="w-5 h-5 mr-2 group-hover:text-primary transition-colors" />
                Download Resume
              </a>
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex gap-6 justify-center"
          >
            {[
              { icon: Github, href: 'https://github.com', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/samuel-nkanor-172a83381', label: 'LinkedIn' },
              { icon: Twitter, href: 'https://x.com/MarNkanor', label: 'X/Twitter' },
              { icon: Mail, href: 'mailto:mac.nkanor@gmail.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass hover-lift hover:glow-primary transition-all duration-300"
                aria-label={label}
              >
                <Icon className="w-5 h-5 text-foreground hover:text-primary transition-colors" />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a 
          href="#about" 
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-sm">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
