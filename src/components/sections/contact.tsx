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
    { icon: <Mail size={20} />, title: 'Email', content: 'msoumo005@gmail.com', link: 'mailto:msoumo005@gmail.com', color: 'from-blue-400 to-blue-600' },
    { icon: <Phone size={20} />, title: 'Phone', content: '+91 8348017580', link: 'tel:+918348017580', color: 'from-green-400 to-green-600' },
    { icon: <MapPin size={20} />, title: 'Location', content: 'City-Jalpaiguri, Country-India', link: null, color: 'from-red-400 to-red-600' },
    { icon: <Clock size={20} />, title: 'Working Hours', content: 'Any Time', link: null, color: 'from-purple-400 to-purple-600' }
  ];

  const socialLinks = [
    { icon: <Github size={16} />, name: 'GitHub', url: 'https://github.com/Soumodwip-Mondal', color: 'from-gray-600 to-gray-800' },
    { icon: <Linkedin size={16} />, name: 'LinkedIn', url: 'https://linkedin.com/in/soumodwip-mondal-805243298', color: 'from-blue-500 to-blue-700' },
    { icon: <X size={16} />, name: 'Twitter', url: 'https://twitter.com/@SouravMond17180', color: 'from-blue-400 to-blue-600' }
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
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: 'spring',
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
        repeatType: "mirror",
        ease: "easeInOut"
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
        repeatType: "mirror",
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 overflow-hidden relative">
      {/* Animated background shapes */}
      <motion.div 
        className="absolute top-20 left-20 w-64 h-64 bg-blue-300 dark:bg-blue-800 rounded-full opacity-10 -z-10"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 180, 270, 360],
          borderRadius: ["50%", "40%", "50%"]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div 
        className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 dark:bg-purple-800 rounded-full opacity-10 -z-10"
        animate={{ 
          scale: [1.2, 1, 1.2],
          rotate: [360, 270, 180, 90, 0],
          borderRadius: ["50%", "40%", "30%", "40%", "50%"]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
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
              className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-2"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.h2 
              className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Get In Touch
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
            className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg"
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
            transition={{ duration: 0.7, type: 'spring' }}
          >
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              <Card className="overflow-hidden shadow-lg border-0 dark:bg-slate-800/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-2xl font-semibold mb-6">Send Message</h3>
                  </motion.div>
                  
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 p-6 rounded-lg flex items-center space-x-4"
                      >
                        <motion.div 
                          className="bg-green-100 dark:bg-green-800 rounded-full p-2"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0]
                          }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <CheckCircle size={24} />
                        </motion.div>
                        <div>
                          <h4 className="font-semibold text-lg">Message Sent!</h4>
                          <p>Thank you for reaching out. I'll get back to you soon.</p>
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
                                className={`border-2 transition-all duration-300 ${formFocus === 'name' ? 'border-blue-500 shadow-md shadow-blue-100 dark:shadow-blue-900/20' : 'border-slate-200 dark:border-slate-700'}`}
                                required
                              />
                              {formFocus === 'name' && (
                                <motion.div
                                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
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
                                className={`border-2 transition-all duration-300 ${formFocus === 'email' ? 'border-blue-500 shadow-md shadow-blue-100 dark:shadow-blue-900/20' : 'border-slate-200 dark:border-slate-700'}`}
                                required
                              />
                              {formFocus === 'email' && (
                                <motion.div
                                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
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
                              className={`border-2 transition-all duration-300 ${formFocus === 'subject' ? 'border-blue-500 shadow-md shadow-blue-100 dark:shadow-blue-900/20' : 'border-slate-200 dark:border-slate-700'}`}
                              required
                            />
                            {formFocus === 'subject' && (
                              <motion.div
                                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
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
                              className={`border-2 transition-all duration-300 ${formFocus === 'message' ? 'border-blue-500 shadow-md shadow-blue-100 dark:shadow-blue-900/20' : 'border-slate-200 dark:border-slate-700'}`}
                              required
                            />
                            {formFocus === 'message' && (
                              <motion.div
                                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
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
                              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
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
                className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -z-10"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.div 
                className="absolute -top-8 -left-8 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl -z-10"
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", delay: 2 }}
              />
            </motion.div>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring' }}
          >
            <motion.h3 
              className="text-2xl font-semibold mb-6"
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
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border border-slate-200 dark:border-slate-700 h-full transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700 relative overflow-hidden">
                    {/* Subtle background pattern */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br opacity-0 from-blue-200/5 to-purple-200/5 dark:from-blue-500/5 dark:to-purple-500/5"
                      whileHover={{ opacity: 1 }}
                    />
                    
                    <CardContent className="p-5 flex items-center space-x-4 relative z-10">
                      <motion.div 
                        className={`rounded-full bg-gradient-to-br ${item.color} p-3 text-white`}
                        whileHover={{ 
                          scale: 1.2, 
                          rotate: [0, 10, -10, 0],
                          transition: { rotate: { repeat: 0, duration: 0.5 } }
                        }}
                      >
                        {item.icon}
                      </motion.div>
                      <div>
                        <h4 className="font-medium text-lg mb-1">{item.title}</h4>
                        {item.link ? (
                          <a 
                            href={item.link} 
                            className="text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <p className="text-slate-600 dark:text-slate-400">{item.content}</p>
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
              <Card className="border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/20 to-purple-500/0 rounded-bl-full"></div>
                <CardContent className="p-6 relative">
                  <motion.h4 
                    className="font-medium text-xl mb-3"
                    animate={pulseAnimation}
                  >
                    Connect with me
                  </motion.h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-5">
                    Find me on social media or check out my other profiles.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((social, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 + 0.5 }}
                        whileHover={{ scale: 1.1, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className={`rounded-full border-2 hover:border-blue-500 hover:bg-gradient-to-r ${social.color} hover:text-white flex items-center space-x-2 px-4 transition-all duration-300`}
                          asChild
                        >
                          <a href={social.url} target="_blank" rel="noopener noreferrer">
                            <motion.span
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                            >
                              {social.icon}
                            </motion.span>
                            <span className="ml-2">{social.name}</span>
                          </a>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Animated decorative elements */}
                  <motion.div 
                    className="absolute -bottom-4 -right-4 w-12 h-12 bg-blue-500/10 rounded-full"
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