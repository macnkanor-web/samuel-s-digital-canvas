import FadeIn from '@/components/ui/FadeIn';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(2, { message: 'Name must be at least 2 characters' }).max(100, { message: 'Name must be less than 100 characters' }),
  email: z.string().trim().email({ message: 'Invalid email address' }).max(255, { message: 'Email must be less than 255 characters' }),
  message: z.string().trim().min(10, { message: 'Message must be at least 10 characters' }).max(2000, { message: 'Message must be less than 2000 characters' }),
});

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      toast({
        title: 'Invalid input',
        description: validation.error.issues[0]?.message ?? 'Please check your input.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '92379596-d560-4984-a4e9-a224d0035ca3',
          ...validation.data,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="container-custom">
        <FadeIn>
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4 text-center">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">
            Have a project in mind? I'd love to hear from you.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <FadeIn direction="left" delay={0.2}>
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-2xl font-semibold mb-4">
                  Get in Touch
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  I'm always open to discussing new projects, creative ideas, or opportunities 
                  to be part of your vision. Feel free to reach out!
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a 
                      href="mailto:mac.nkanor@gmail.com" 
                      className="font-medium hover:text-primary transition-colors"
                    >
                      mac.nkanor@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">Calabar, Cross River State, Nigeria</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.4}>
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8 shadow-card">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    placeholder=""
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    placeholder=""
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>

                <Button type="submit" variant="hero" className="w-full" size="lg" disabled={isSubmitting}>
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
