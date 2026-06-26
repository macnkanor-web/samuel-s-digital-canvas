import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, FileText, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/samuel-nkanor-172a83381', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/MarNkanor', label: 'X' },
  { icon: Mail, href: 'mailto:mac.nkanor@gmail.com', label: 'Email' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-background/70 backdrop-blur-md shadow-card' : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 lg:px-8">
            <a href="#" className="flex items-center gap-2">
              <span className="font-display text-xl sm:text-2xl font-bold text-gradient uppercase">
                SAMUEL.DEV
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              {/* Social handles — top right corner */}
              <div className="hidden lg:flex items-center gap-1">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
              <div className="h-6 w-px bg-border hidden lg:block" />
              <ThemeToggle />
              <Button variant="outline" size="sm" asChild>
                <a
                  href={`${import.meta.env.BASE_URL}resume.pdf`}
                  download="Samuel_Nkanor_Resume.pdf"
                  aria-label="Download resume PDF"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Resume
                </a>
              </Button>
              <Button variant="hero" size="sm" asChild>
                <a href="#contact">Hire Me</a>
              </Button>
              <a
                href="#about"
                aria-label="View profile"
                className="rounded-full transition-transform hover:scale-105"
              >
                <Avatar className="w-9 h-9 border-2 border-primary/40 shadow-elevated">
                  <AvatarImage src="/profile.jpg" alt="Samuel Nkanor" className="object-cover" />
                  <AvatarFallback className="bg-gradient-primary text-sm font-bold text-primary-foreground">
                    SN
                  </AvatarFallback>
                </Avatar>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 md:hidden">
              <ThemeToggle />
              <button
                className="p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
        }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-40 md:hidden"
      >
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-lg"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: isMobileMenuOpen ? 0 : '100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute right-0 top-0 h-full w-3/4 max-w-sm glass-strong p-8 pt-24"
        >
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-4 mt-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-3 rounded-full glass border border-border/50 text-foreground hover:text-primary hover:border-primary/60 transition-all"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <Button variant="outline" className="justify-start" asChild>
              <a
                href={`${import.meta.env.BASE_URL}resume.pdf`}
                download="Samuel_Nkanor_Resume.pdf"
                aria-label="Download resume PDF"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FileText className="w-4 h-4 mr-2" />
                Download Resume
              </a>
            </Button>
            <Button variant="hero" className="mt-2" asChild>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                Hire Me
              </a>
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
