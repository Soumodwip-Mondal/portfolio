'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Clock, CheckCircle, Github, Linkedin, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent } from '../ui/card';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formFocus, setFormFocus] = useState<'name' | 'email' | 'subject' | 'message' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    if (name === 'name' || name === 'email' || name === 'subject' || name === 'message') {
      setFormState(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  interface FormField {
    field: 'name' | 'email' | 'subject' | 'message';
  }

  const handleFocus = (field: FormField['field']): void => {
    setFormFocus(field);
  };

  const handleBlur = () => {
    setFormFocus(null);
  };

  interface FormSubmitEvent extends React.FormEvent<HTMLFormElement> {
    preventDefault: () => void;
  }

  interface FormSubmitResponse {
    success: boolean;
    [key: string]: any;
  }

  const handleSubmit = async (e: FormSubmitEvent): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData: FormData = new FormData();
    formData.append('access_key', 'beb41ca4-f602-4142-a73d-1fd89c43edf2');
    formData.append('name', formState.name);
    formData.append('email', formState.email);
    formData.append('subject', formState.subject);
    formData.append('message', formState.message);

    try {
      const response: Response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const result: FormSubmitResponse = await response.json();

      if (result.success) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormState({ name: '', email: '', subject: '', message: '' });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        console.error('Form submission failed:', result);
        setIsSubmitting(false);
      }
    } catch (error: unknown) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: <Mail size={20} />, title: 'Email', content: 'msoumo005@gmail.com', link: 'mailto:msoumo005@gmail.com' },
    { icon: <Phone size={20} />, title: 'Phone', content: '+91 8348017580', link: 'tel:+918348017580' },
    { icon: <MapPin size={20} />, title: 'Location', content: 'City-Jalpaiguri, Country-India', link: null },
    { icon: <Clock size={20} />, title: 'Working Hours', content: 'Any Time', link: null }
  ];

  const socialLinks = [
    { icon: <Github size={16} />, name: 'GitHub', url: 'https://github.com/Soumodwip-Mondal' },
    { icon: <Linkedin size={16} />, name: 'LinkedIn', url: 'https://linkedin.com/in/soumodwip-mondal-805243298' },
    { icon: <X size={16} />, name: 'Twitter', url: 'https://twitter.com/@SouravMond17180' }
  ];

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Floating animation for decorative elements
  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      y: {
        duration: 6,
        repeat: Infinity,
        repeatType: 'mirror' as const,
        ease: 'easeInOut' as const
      }
    }
  };

  // Pulse animation for focused elements
  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      scale: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'mirror' as const,
        ease: 'easeInOut' as const
      }
    }
  };

  return (
    <section id="contact" className="py-20 bg-background overflow-hidden relative">
      {/* Animated background shapes - Subtle Atmospheric Depth */}
      <motion.div 
        className="absolute top-20 left-10 w-80 h-80 bg-[#5dd7e6]/5 rounded-full blur-[100px] -z-10"
        animate={{ 
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <motion.div 
        className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-[#5dd7e6]/[0.03] rounded-full blur-[120px] -z-10"
        animate={{ 
          x: [0, -40, 0],
          y: [0, -60, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-3 relative">
            <motion.div 
              className="w-16 h-1 bg-gradient-to-r from-[#5dd7e6] to-[#005f68] mx-auto mb-2"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.h2 
              className="text-4xl md:text-5xl font-extrabold tracking-tight"
            >
              {['Get', 'In', 'Touch'].map((word, i) => (
                <motion.span
                  key={word}
                  className="inline-block bg-gradient-to-r from-white via-[#5dd7e6] to-white/40 bg-clip-text text-transparent animate-gradient-x"
                  initial={{ opacity: 0, y: 18, filter: 'blur(5px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 + i * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {word}{i < 2 ? '\u00a0' : ''}
                </motion.span>
              ))}
            </motion.h2>
            
            {/* Floating stars decoration */}
            <motion.div 
              className="absolute -top-4 -right-8 text-lg text-yellow-500"
              animate={floatingAnimation}
            >
              ✨
            </motion.div>
            <motion.div 
              className="absolute -bottom-4 -left-8 text-lg text-yellow-500"
              animate={{
                ...floatingAnimation,
                transition: { ...floatingAnimation.transition, delay: 1 }
              }}
            >
              ✨
            </motion.div>
          </div>
          
          <motion.p 
            className="text-[#bec8ca] max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Have a question or want to work together? Fill out the form below or reach out directly.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' as const }}
          >
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring' as const, stiffness: 300, damping: 15 }}
            >
              <Card className="glass-card overflow-hidden shadow-2xl border-white/5 bg-white/[0.01] transition-all duration-500">
                <CardContent className="p-8">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-xl font-bold mb-8 text-white/90 tracking-wide uppercase">Send Message</h3>
                  </motion.div>
                  
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-[#5dd7e6]/10 border border-[#5dd7e6]/20 text-[#5dd7e6] p-8 rounded-2xl flex items-center space-x-6 backdrop-blur-md"
                      >
                        <motion.div 
                          className="bg-[#5dd7e6]/20 rounded-full p-4 shadow-[0_0_20px_rgba(93,215,230,0.2)]"
                          animate={{ 
                            scale: [1, 1.1, 1],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <CheckCircle size={32} />
                        </motion.div>
                        <div>
                          <h4 className="font-bold text-xl mb-1">Transmission Received</h4>
                          <p className="opacity-80">I've captured your message. Expect a response shortly.</p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.form 
                        key="form"
                        onSubmit={handleSubmit} 
                        className="space-y-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <motion.div className="space-y-2" variants={itemVariants}>
                            <label htmlFor="name" className="text-sm font-medium">
                              Name
                            </label>
                            <div className="relative">
                              <Input
                                id="name"
                                name="name"
                                placeholder="Your name"
                                value={formState.name}
                                onChange={handleChange}
                                onFocus={() => handleFocus('name')}
                                onBlur={handleBlur}
                                className={`border-2 transition-all duration-300 ${formFocus === 'name' ? 'border-[#5dd7e6]/60 shadow-md shadow-[#5dd7e6]/10' : 'border-[#3f484a]'}`}
                                required
                              />
                              {formFocus === 'name' && (
                                <motion.div
                                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#5dd7e6] to-[#005f68]"
                                  initial={{ width: 0 }}
                                  animate={{ width: '100%' }}
                                  transition={{ duration: 0.4 }}
                                />
                              )}
                            </div>
                          </motion.div>
                          <motion.div className="space-y-2" variants={itemVariants}>
                            <label htmlFor="email" className="text-sm font-medium">
                              Email
                            </label>
                            <div className="relative">
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="your.email@example.com"
                                value={formState.email}
                                onChange={handleChange}
                                onFocus={() => handleFocus('email')}
                                onBlur={handleBlur}
                                className={`border-2 transition-all duration-300 ${formFocus === 'email' ? 'border-[#5dd7e6]/60 shadow-md shadow-[#5dd7e6]/10' : 'border-[#3f484a]'}`}
                                required
                              />
                              {formFocus === 'email' && (
                                <motion.div
                                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#5dd7e6] to-[#005f68]"
                                  initial={{ width: 0 }}
                                  animate={{ width: '100%' }}
                                  transition={{ duration: 0.4 }}
                                />
                              )}
                            </div>
                          </motion.div>
                        </div>
                        
                        <motion.div className="space-y-2" variants={itemVariants}>
                          <label htmlFor="subject" className="text-sm font-medium">
                            Subject
                          </label>
                          <div className="relative">
                            <Input
                              id="subject"
                              name="subject"
                              placeholder="What is this regarding?"
                              value={formState.subject}
                              onChange={handleChange}
                              onFocus={() => handleFocus('subject')}
                              onBlur={handleBlur}
                              className={`border-2 transition-all duration-300 ${formFocus === 'subject' ? 'border-[#5dd7e6]/60 shadow-md shadow-[#5dd7e6]/10' : 'border-[#3f484a]'}`}
                              required
                            />
                            {formFocus === 'subject' && (
                              <motion.div
                                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#5dd7e6] to-[#005f68]"
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 0.4 }}
                              />
                            )}
                          </div>
                        </motion.div>
                        
                        <motion.div className="space-y-2" variants={itemVariants}>
                          <label htmlFor="message" className="text-sm font-medium">
                            Message
                          </label>
                          <div className="relative">
                            <Textarea
                              id="message"
                              name="message"
                              placeholder="Your message here..."
                              rows={5}
                              value={formState.message}
                              onChange={handleChange}
                              onFocus={() => handleFocus('message')}
                              onBlur={handleBlur}
                              className={`border-2 transition-all duration-300 ${formFocus === 'message' ? 'border-[#5dd7e6]/60 shadow-md shadow-[#5dd7e6]/10' : 'border-[#3f484a]'}`}
                              required
                            />
                            {formFocus === 'message' && (
                              <motion.div
                                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#5dd7e6] to-[#005f68]"
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 0.4 }}
                              />
                            )}
                          </div>
                        </motion.div>
                        
                        <motion.div variants={itemVariants}>
                          <motion.div 
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            <Button 
                              type="submit" 
                              className="w-full h-12 bg-gradient-to-r from-[#5dd7e6] to-[#005f68] text-[#00363c] font-bold hover:shadow-[0_0_20px_rgba(93,215,230,0.2)] transition-all duration-300 border-0"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Sending...
                                </span>
                              ) : (
                                <span className="flex items-center justify-center">
                                  <motion.span
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                                  >
                                    <Send size={18} className="mr-2" />
                                  </motion.span>
                                  Send Message
                                </span>
                              )}
                            </Button>
                          </motion.div>
                        </motion.div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
              
              {/* Enhanced Decorative Elements */}
              <motion.div 
                className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#5dd7e6]/8 rounded-full blur-3xl -z-10"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' as const }}
              />
              <motion.div 
                className="absolute -top-8 -left-8 w-40 h-40 bg-[#005f68]/10 rounded-full blur-3xl -z-10"
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' as const, delay: 2 }}
              />
            </motion.div>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' as const }}
          >
            <motion.h3 
              className="text-xl font-bold mb-8 text-white/90 tracking-wide uppercase"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Contact Information
            </motion.h3>
            
            <motion.div 
              className="grid grid-cols-1 gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover="hover"
                  custom={index}
                >
                  <Card className="glass-card border border-white/5 h-full transition-all duration-300 hover:border-[#5dd7e6]/30 relative overflow-hidden bg-white/[0.01]">
                    <CardContent className="p-6 flex items-center space-x-5 relative z-10">
                      <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 text-[#5dd7e6] shadow-[0_0_15px_rgba(93,215,230,0.1)] transition-colors group-hover:bg-[#5dd7e6]/10">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-white/90 mb-1">{item.title}</h4>
                        {item.link ? (
                          <a 
                            href={item.link} 
                            className="text-zinc-500 hover:text-[#5dd7e6] transition-colors text-sm font-light"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <p className="text-zinc-500 text-sm font-light">{item.content}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover="hover"
              className="mt-8"
            >
              <Card className="border border-[#3f484a]/30 transition-all duration-300 hover:border-[#5dd7e6]/30 overflow-hidden bg-[#1c1b1b] relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#5dd7e6]/10 to-transparent rounded-bl-full"></div>
                <CardContent className="p-6 relative">
                  <motion.h4 
                    className="font-bold text-lg text-white mb-3"
                    animate={pulseAnimation}
                  >
                    Connect with me
                  </motion.h4>
                  <p className="text-zinc-500 mb-6 text-sm font-light">
                    Find me on social media or check out my other profiles.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((social, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="rounded-xl border border-white/10 bg-white/[0.02] text-zinc-400 hover:border-[#5dd7e6]/40 hover:text-[#5dd7e6] hover:bg-[#5dd7e6]/5 flex items-center space-x-2 px-5 py-5 transition-all duration-300 backdrop-blur-md"
                          asChild
                        >
                          <a href={social.url} target="_blank" rel="noopener noreferrer">
                             {social.icon}
                             <span className="ml-2 font-medium tracking-wide text-xs uppercase">{social.name}</span>
                          </a>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Animated decorative elements */}
                  <motion.div 
                    className="absolute -bottom-4 -right-4 w-12 h-12 bg-[#5dd7e6]/8 rounded-full"
                    animate={floatingAnimation}
                  />
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}