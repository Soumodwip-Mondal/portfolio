'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { QrCode, Smartphone, Box, BadgeInfo } from 'lucide-react';

export default function AugmentedReality() {
  const [activeQR, setActiveQR] = useState<string | null>(null);
  
  // QR code data for different AR experiences
  const arExperiences = [
    {
      id: 'project1',
      title: 'Portfolio Viewer',
      description: 'View my portfolio projects in augmented reality',
      qrImageUrl: '/images/ar/qr-portfolio.png',
      arUrl: '/ar/portfolio-viewer.html',
      icon: <Box className="h-8 w-8 text-blue-500" />,
    },
    {
      id: 'project2',
      title: 'Interactive Resume',
      description: 'Scan to see my resume come to life with interactive elements',
      qrImageUrl: '/images/ar/qr-resume.png',
      arUrl: '/ar/resume-viewer.html',
      icon: <BadgeInfo className="h-8 w-8 text-purple-500" />,
    },
    {
      id: 'businesscard',
      title: 'AR Business Card',
      description: 'Scan my business card to see contact information and portfolio highlights',
      qrImageUrl: '/images/ar/qr-card.png',
      arUrl: '/ar/business-card.html',
      icon: <QrCode className="h-8 w-8 text-green-500" />,
    },
  ];

  // Generate a QR code for the selected experience
  const showQRCode = (id: string) => {
    setActiveQR(id);
  };

  return (
    <section id="ar-experience" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
            Augmented Reality Experience
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Explore my portfolio in augmented reality. Scan the QR codes with your smartphone to view interactive 3D models of my projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="p-6">
            <h3 className="text-2xl font-bold mb-4">AR Portfolio Viewer</h3>
            
            <Tabs defaultValue="instructions">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="instructions">Instructions</TabsTrigger>
                <TabsTrigger value="experiences">Experiences</TabsTrigger>
              </TabsList>
              
              <TabsContent value="instructions" className="space-y-4 mt-4">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                    <Smartphone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Step 1: Use Your Smartphone</h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      Open the camera app on your smartphone or a QR code scanner.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                    <QrCode className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Step 2: Scan QR Code</h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      Select an experience from the "Experiences" tab and scan the QR code.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                    <Box className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Step 3: Explore in AR</h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      Point your camera at a flat surface to place the 3D model and interact with it.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="experiences" className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {arExperiences.map((exp) => (
                    <Button
                      key={exp.id}
                      variant={activeQR === exp.id ? "default" : "outline"}
                      className="h-auto py-3 px-4 justify-start text-left"
                      onClick={() => showQRCode(exp.id)}
                    >
                      <div className="flex items-center">
                        {exp.icon}
                        <div className="ml-3">
                          <div className="font-medium">{exp.title}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            {exp.description}
                          </div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </Card>
          
          <Card className="p-6 flex flex-col items-center justify-center">
            {activeQR ? (
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">
                  {arExperiences.find(exp => exp.id === activeQR)?.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {arExperiences.find(exp => exp.id === activeQR)?.description}
                </p>
                <div className="bg-white p-4 rounded-lg inline-block mb-4">
                  {/* In a real implementation, this would be an actual QR code */}
                  <div className="w-48 h-48 bg-slate-100 flex items-center justify-center">
                    <QrCode className="h-32 w-32 text-slate-400" />
                    <span className="sr-only">QR Code for AR experience</span>
                  </div>
                </div>
                <p className="text-sm text-slate-500">
                  Scan this QR code with your smartphone camera
                </p>
              </div>
            ) : (
              <div className="text-center p-8">
                <QrCode className="h-16 w-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Select an Experience</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Choose an AR experience from the left panel to view its QR code.
                </p>
              </div>
            )}
          </Card>
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">About This AR Experience</h3>
          <p className="mb-4 text-slate-600 dark:text-slate-300">
            This augmented reality feature demonstrates my ability to work with emerging technologies. The AR experiences are built using:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4 text-slate-600 dark:text-slate-300">
            <li>WebXR API for browser-based augmented reality</li>
            <li>Three.js for 3D rendering and interactions</li>
            <li>AR.js for marker-based augmented reality</li>
            <li>Custom 3D models created with Blender</li>
            <li>Responsive design that works across devices</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-300">
            In a production environment, these AR experiences would be optimized for performance and include more interactive elements.
          </p>
        </div>
      </motion.div>
    </section>
  );
} 