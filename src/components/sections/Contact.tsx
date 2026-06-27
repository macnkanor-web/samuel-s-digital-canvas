import FadeIn from '@/components/ui/FadeIn';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Mail, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { z } from 'zod';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(100, { message: 'Name must be less than 100 characters' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Please enter a valid email address' })
    .max(255, { message: 'Email must be less than 255 characters' }),
  message: z
    .string()
    .trim()
    .min(10, { message: 'Message must be at least 10 characters' })
    .max(2000, { message: 'Message must be less than 2000 characters' }),
});

type FormFields = z.infer<typeof contactSchema>;
type FieldErrors = Partial<Record<keyof FormFields, string>>;

const initialForm: FormFields = { name: '', email: '', message: '' };

export default function Contact() {
  const [formData, setFormData] = useState<FormFields>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateField = (field: keyof FormFields, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateField = (field: keyof FormFields) => {
    const result = contactSchema.shape[field].safeParse(formData[field]);
    setErrors((prev) => ({
      ...prev,
      [field]: result.success ? undefined : result.error.issues[0]?.message,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      const nextErrors: FieldErrors = {};
      validation.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof FormFields;
        if (key && !nextErrors[key]) nextErrors[key] = issue.message;
      });
      setErrors(nextErrors);
      toast({
        title: 'Please fix the errors',
        description: 'Check the highlighted fields and try again.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '92379596-d560-4984-a4e9-a224d0035ca3',
          ...validation.data,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData(initialForm);
        setErrors({});
        toast({
          title: 'Message sent!',
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'Your message could not be sent. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: keyof FormFields) =>
    cn(
      'w-full px-4 py-3 rounded-lg bg-secondary border outline-none transition-colors',
      errors[field]
        ? 'border-destructive focus:border-destructive focus:ring-1 focus:ring-destructive'
        : 'border-border focus:border-primary focus:ring-1 focus:ring-primary'
    );

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
                <h3 className="font-display text-2xl font-semibold mb-4">Get in Touch</h3>
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
            <div className="glass rounded-2xl p-6 sm:p-8 shadow-card relative overflow-hidden">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center justify-center text-center py-10 min-h-[420px]"
                  >
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
                      className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5"
                    >
                      <CheckCircle2 className="w-9 h-9 text-primary" />
                    </motion.div>
                    <h3 className="font-display text-2xl font-semibold mb-2">
                      Message sent successfully
                    </h3>
                    <p className="text-muted-foreground max-w-sm mb-6">
                      Thanks for reaching out — I'll get back to you within 24–48 hours.
                    </p>
                    <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                      Send another message
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Your Name <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={(e) => updateField('name', e.target.value)}
                          onBlur={() => validateField('name')}
                          className={inputClass('name')}
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? 'name-error' : undefined}
                          required
                        />
                        {errors.name && (
                          <p id="name-error" className="mt-1.5 text-xs text-destructive">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address <span className="text-destructive">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          onBlur={() => validateField('email')}
                          className={inputClass('email')}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                          required
                        />
                        {errors.email && (
                          <p id="email-error" className="mt-1.5 text-xs text-destructive">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          Message <span className="text-destructive">*</span>
                        </label>
                        <textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => updateField('message', e.target.value)}
                          onBlur={() => validateField('message')}
                          rows={5}
                          className={cn(inputClass('message'), 'resize-none')}
                          placeholder="Tell me about your project..."
                          aria-invalid={!!errors.message}
                          aria-describedby={errors.message ? 'message-error' : 'message-hint'}
                          required
                        />
                        <div className="flex justify-between mt-1.5 text-xs">
                          {errors.message ? (
                            <p id="message-error" className="text-destructive">
                              {errors.message}
                            </p>
                          ) : (
                            <p id="message-hint" className="text-muted-foreground">
                              Minimum 10 characters
                            </p>
                          )}
                          <p
                            className={cn(
                              'text-muted-foreground tabular-nums',
                              formData.message.length > 2000 && 'text-destructive'
                            )}
                          >
                            {formData.message.length}/2000
                          </p>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        variant="hero"
                        className="w-full"
                        size="lg"
                        disabled={isSubmitting}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
