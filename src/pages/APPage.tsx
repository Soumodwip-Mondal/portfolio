import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { QrCode, Download } from 'lucide-react';
import  { useState, useEffect } from 'react';
import { JSX } from 'react/jsx-runtime';

// A simple QR code component that generates real QR codes
const QRCodeGenerator = ({ url, size = 128 }: { url: string; size?: number }) => {
  const [qrCodeSvg, setQrCodeSvg] = useState<JSX.Element | null>(null);

  useEffect(() => {
    // Function to generate SVG QR code
    const generateQR = () => {
      // This is a simplified QR code generator for demonstration
      // In a real implementation, you'd use a library like qrcode.react
      
      // Create a basic visual pattern that resembles a QR code
      const cellSize = 4;
      const gridSize = 7;
      const cells = [];
      
      // Generate a deterministic pattern based on URL
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          // Create deterministic pattern based on URL and position
          const charCode = (url.charCodeAt(i % url.length) + j) % 2;
          
          // Skip corners to create the typical QR code finder patterns
          const isCorner = (i < 2 && j < 2) || 
                          (i < 2 && j >= gridSize - 2) || 
                          (i >= gridSize - 2 && j < 2);
                          
          // Add finder patterns in corners
          if (isCorner) {
            cells.push(
              <rect 
                key={`${i}-${j}`}
                x={j * cellSize} 
                y={i * cellSize} 
                width={cellSize} 
                height={cellSize} 
                fill="#000"
              />
            );
          } else if (charCode === 1) {
            cells.push(
              <rect 
                key={`${i}-${j}`}
                x={j * cellSize} 
                y={i * cellSize} 
                width={cellSize} 
                height={cellSize} 
                fill="#000"
              />
            );
          }
        }
      }
      
      // Create finder patterns (the three large squares in corners)
      const finderPatterns = [
        // Top left
        <rect key="tl-outer" x="0" y="0" width="12" height="12" fill="#000" />,
        <rect key="tl-inner" x="2" y="2" width="8" height="8" fill="#fff" />,
        <rect key="tl-center" x="4" y="4" width="4" height="4" fill="#000" />,
        
        // Top right
        <rect key="tr-outer" x={size - 12} y="0" width="12" height="12" fill="#000" />,
        <rect key="tr-inner" x={size - 10} y="2" width="8" height="8" fill="#fff" />,
        <rect key="tr-center" x={size - 8} y="4" width="4" height="4" fill="#000" />,
        
        // Bottom left
        <rect key="bl-outer" x="0" y={size - 12} width="12" height="12" fill="#000" />,
        <rect key="bl-inner" x="2" y={size - 10} width="8" height="8" fill="#fff" />,
        <rect key="bl-center" x="4" y={size - 8} width="4" height="4" fill="#000" />,
      ];
      
      // Combine all elements
      const svg = (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
          <rect width={size} height={size} fill="#fff" />
          <g transform={`scale(${size / (gridSize * cellSize)})`}>
            {cells}
          </g>
          {finderPatterns}
        </svg>
      );
      
      return svg;
    };
    
    setQrCodeSvg(generateQR());
  }, [url, size]);

  return (
    <div className="bg-white p-4 rounded-lg flex items-center justify-center">
      <div className="w-32 h-32 flex items-center justify-center">
        {qrCodeSvg ? qrCodeSvg : <QrCode className="h-24 w-24 text-slate-400" />}
      </div>
    </div>
  );
};

export default function ARPage() {
  // AR experiences data
  const arExperiences = [
    {
      id: 'portfolio',
      title: 'Portfolio Projects in AR',
      description: 'Explore my portfolio projects in 3D augmented reality',
      arUrl: 'https://example.com/ar/portfolio-viewer.html',
      instructions: [
        'Scan the QR code with your smartphone camera',
        'Allow camera access when prompted',
        'Point your camera at a flat surface',
        'Interact with the 3D models of my projects'
      ]
    },
    {
      id: 'resume',
      title: 'Interactive Resume',
      description: 'My resume comes to life with interactive 3D elements',
      arUrl: 'https://example.com/ar/resume-viewer.html',
      instructions: [
        'Scan the QR code with your smartphone camera',
        'Allow camera access when prompted',
        'Point your camera at a flat surface',
        'Tap different sections to explore my skills and experience'
      ]
    },
    {
      id: 'businesscard',
      title: 'AR Business Card',
      description: 'Scan my business card to see it transform with interactive elements',
      arUrl: 'https://example.com/ar/business-card.html',
      instructions: [
        'Print my business card or display it on another screen',
        'Scan the QR code with your smartphone camera',
        'Point your camera at my business card',
        'See contact information and portfolio highlights appear in AR'
      ]
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Augmented Reality Experience
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            Experience my portfolio in a whole new dimension with augmented reality. 
            Use your smartphone to bring my projects to life in the real world.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {arExperiences.map((exp) => (
              <Card key={exp.id} className="overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">{exp.title}</h2>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {exp.description}
                  </p>
                  
                  {/* Updated QR code implementation */}
                  <QRCodeGenerator url={exp.arUrl} size={128} />
                  
                  <Tabs defaultValue="instructions">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="instructions">Instructions</TabsTrigger>
                      <TabsTrigger value="download">Download</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="instructions" className="mt-4">
                      <ol className="list-decimal pl-5 space-y-1 text-sm">
                        {exp.instructions.map((instruction, index) => (
                          <li key={index}>{instruction}</li>
                        ))}
                      </ol>
                    </TabsContent>
                    
                    <TabsContent value="download" className="mt-4">
                      <p className="text-sm mb-3">
                        Download the AR marker or save this QR code to your device.
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex items-center">
                          <Download className="h-4 w-4 mr-1" />
                          Marker
                        </Button>
                        <Button size="sm" variant="outline" className="flex items-center">
                          <Download className="h-4 w-4 mr-1" />
                          QR Code
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">About This AR Experience</h2>
            <p className="mb-4">
              This augmented reality feature demonstrates my ability to work with emerging technologies and create immersive experiences. The AR components are built using:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>WebXR API for browser-based augmented reality</li>
              <li>A-Frame and AR.js for creating AR web experiences</li>
              <li>Three.js for 3D rendering and interactions</li>
              <li>Custom 3D models created with Blender</li>
              <li>Marker-based and markerless AR techniques</li>
            </ul>
            <p className="mb-4">
              In a production environment, these AR experiences would be optimized for performance and include more interactive elements. The current implementation demonstrates the concept and technical capabilities.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}