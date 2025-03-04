'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Clock, CheckCircle, Github, Linkedin, Twitter } from 'lucide-react';
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
  
  const [formFocus, setFormFocus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleFocus = (field: string) => {
    setFormFocus(field);
  };

  const handleBlur = () => {
    setFormFocus(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const contactInfo = [
    { icon: <Mail size={20} />, title: 'Email', content: 'your.email@example.com', link: 'mailto:your.email@example.com' },
    { icon: <Phone size={20} />, title: 'Phone', content: '+1 (123) 456-7890', link: 'tel:+11234567890' },
    { icon: <MapPin size={20} />, title: 'Location', content: 'City, Country', link: null },
    { icon: <Clock size={20} />, title: 'Working Hours', content: 'Mon - Fri, 9AM - 5PM', link: null }
  ];

  const socialLinks = [
    { icon: <Github size={16} />, name: 'GitHub', url: 'https://github.com/yourusername' },
    { icon: <Linkedin size={16} />, name: 'LinkedIn', url: 'https://linkedin.com/in/yourusername' },
    { icon: <Twitter size={16} />, name: 'Twitter', url: 'https://twitter.com/yourusername' }
  ];

  // Animation variants
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
      scale: 1.03,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-3">
            <motion.div 
              className="w-16 h-1 bg-blue-500 mx-auto mb-2"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Get In Touch</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Have a question or want to work together? Fill out the form below or reach out directly.
          </p>
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
                  <h3 className="text-2xl font-semibold mb-6">Send Message</h3>
                  
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 p-6 rounded-lg flex items-center space-x-4"
                      >
                        <div className="bg-green-100 dark:bg-green-800 rounded-full p-2">
                          <CheckCircle size={24} />
                        </div>
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
                                className={`border-2 transition-all duration-300 ${formFocus === 'name' ? 'border-blue-500 shadow-sm shadow-blue-100 dark:shadow-blue-900/20' : 'border-slate-200 dark:border-slate-700'}`}
                                required
                              />
                              {formFocus === 'name' && (
                                <motion.div
                                  className="absolute bottom-0 left-0 h-0.5 bg-blue-500"
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
                                className={`border-2 transition-all duration-300 ${formFocus === 'email' ? 'border-blue-500 shadow-sm shadow-blue-100 dark:shadow-blue-900/20' : 'border-slate-200 dark:border-slate-700'}`}
                                required
                              />
                              {formFocus === 'email' && (
                                <motion.div
                                  className="absolute bottom-0 left-0 h-0.5 bg-blue-500"
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
                              className={`border-2 transition-all duration-300 ${formFocus === 'subject' ? 'border-blue-500 shadow-sm shadow-blue-100 dark:shadow-blue-900/20' : 'border-slate-200 dark:border-slate-700'}`}
                              required
                            />
                            {formFocus === 'subject' && (
                              <motion.div
                                className="absolute bottom-0 left-0 h-0.5 bg-blue-500"
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
                              className={`border-2 transition-all duration-300 ${formFocus === 'message' ? 'border-blue-500 shadow-sm shadow-blue-100 dark:shadow-blue-900/20' : 'border-slate-200 dark:border-slate-700'}`}
                              required
                            />
                            {formFocus === 'message' && (
                              <motion.div
                                className="absolute bottom-0 left-0 h-0.5 bg-blue-500"
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 0.4 }}
                              />
                            )}
                          </div>
                        </motion.div>
                        
                        <motion.div variants={itemVariants}>
                          <motion.div 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
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
                                  <Send size={18} className="mr-2" />
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
              
              {/* Decorative Elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -z-10"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -z-10"></div>
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
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            
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
                >
                  <Card className="border border-slate-200 dark:border-slate-700 h-full transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700">
                    <CardContent className="p-5 flex items-center space-x-4">
                      <motion.div 
                        className="rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 p-3"
                        whileHover={{ 
                          scale: 1.1, 
                          rotate: [0, 5, -5, 0],
                          transition: { rotate: { repeat: 0, duration: 0.5 } }
                        }}
                      >
                        <div className="text-blue-500">{item.icon}</div>
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
                  <h4 className="font-medium text-xl mb-3">Connect with me</h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-5">
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
                          variant="outline" 
                          size="sm" 
                          className="rounded-full border-2 hover:border-blue-500 hover:text-blue-500 dark:hover:text-blue-400 flex items-center space-x-2 px-4" 
                          asChild
                        >
                          <a href={social.url} target="_blank" rel="noopener noreferrer">
                            {social.icon}
                            <span className="ml-2">{social.name}</span>
                          </a>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}