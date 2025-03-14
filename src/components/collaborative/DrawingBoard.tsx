import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Paintbrush, Eraser, Save, Trash2, Download, Users } from 'lucide-react';

type Point = {
  x: number;
  y: number;
  color: string;
  size: number;
  type: 'draw' | 'erase';
};

type DrawingData = {
  id: string;
  points: Point[][];
  author: string;
  timestamp: number;
};

export const DrawingBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState<'draw' | 'erase'>('draw');
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  const [strokes, setStrokes] = useState<Point[][]>([]);
  const [savedDrawings, setSavedDrawings] = useState<DrawingData[]>([]);
  const [authorName, setAuthorName] = useState('');
  const [showGallery, setShowGallery] = useState(false);
  const [activeUsers, setActiveUsers] = useState(1);

  // Mock data for saved drawings
  useEffect(() => {
    // In a real app, this would come from a database or API
    setSavedDrawings([
      {
        id: '1',
        points: [
          [
            { x: 50, y: 50, color: '#ff0000', size: 5, type: 'draw' },
            { x: 100, y: 100, color: '#ff0000', size: 5, type: 'draw' },
          ],
        ],
        author: 'John',
        timestamp: Date.now() - 86400000,
      },
      {
        id: '2',
        points: [
          [
            { x: 150, y: 50, color: '#0000ff', size: 5, type: 'draw' },
            { x: 200, y: 100, color: '#0000ff', size: 5, type: 'draw' },
          ],
        ],
        author: 'Sarah',
        timestamp: Date.now() - 43200000,
      },
    ]);

    // Simulate active users changing
    const interval = setInterval(() => {
      setActiveUsers(Math.floor(Math.random() * 3) + 1);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Draw on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw all strokes
    strokes.forEach(stroke => {
      if (stroke.length < 2) return;

      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);

      for (let i = 1; i < stroke.length; i++) {
        const point = stroke[i];
        
        if (point.type === 'draw') {
          ctx.strokeStyle = point.color;
          ctx.lineWidth = point.size;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
        } else {
          ctx.strokeStyle = 'white';
          ctx.lineWidth = point.size;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
        }
        
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
        
        // Start a new path for the next segment to apply new styles
        if (i < stroke.length - 1 && (point.color !== stroke[i + 1].color || point.size !== stroke[i + 1].size || point.type !== stroke[i + 1].type)) {
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
        }
      }
    });
  }, [strokes]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    const newPoint: Point = {
      x,
      y,
      color,
      size: brushSize,
      type: tool,
    };
    
    setCurrentStroke([newPoint]);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
      e.preventDefault(); // Prevent scrolling on touch devices
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    const newPoint: Point = {
      x,
      y,
      color,
      size: brushSize,
      type: tool,
    };
    
    setCurrentStroke(prev => [...prev, newPoint]);
  };

  const endDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    
    if (currentStroke.length > 0) {
      setStrokes(prev => [...prev, currentStroke]);
      setCurrentStroke([]);
      
      // In a real app, you would send this stroke to a server
      // to be shared with other users
    }
  };

  const clearCanvas = () => {
    setStrokes([]);
  };

  const saveDrawing = () => {
    if (strokes.length === 0) {
      alert('Please draw something first!');
      return;
    }
    
    if (!authorName.trim()) {
      alert('Please enter your name');
      return;
    }
    
    const newDrawing: DrawingData = {
      id: Date.now().toString(),
      points: [...strokes],
      author: authorName,
      timestamp: Date.now(),
    };
    
    setSavedDrawings(prev => [newDrawing, ...prev]);
    
    // In a real app, you would save this to a database
    alert('Drawing saved to gallery!');
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = dataURL;
    link.click();
  };

  const loadDrawing = (drawing: DrawingData) => {
    setStrokes(drawing.points);
    setShowGallery(false);
  };

  return (
    <div className="w-full">
      <Card className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Collaborative Drawing Board</h2>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1 text-blue-500" />
            <span className="text-sm text-blue-500">{activeUsers} active now</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Button 
            variant={tool === 'draw' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setTool('draw')}
            className="flex items-center"
          >
            <Paintbrush className="h-4 w-4 mr-1" />
            Draw
          </Button>
          <Button 
            variant={tool === 'erase' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setTool('erase')}
            className="flex items-center"
          >
            <Eraser className="h-4 w-4 mr-1" />
            Erase
          </Button>
          <div className="flex items-center ml-2">
            <label htmlFor="color-picker" className="mr-2 text-sm">Color:</label>
            <input 
              id="color-picker"
              type="color" 
              value={color} 
              onChange={(e) => setColor(e.target.value)} 
              className="w-8 h-8 rounded cursor-pointer"
              disabled={tool === 'erase'}
            />
          </div>
          <div className="flex items-center ml-2">
            <label htmlFor="brush-size" className="mr-2 text-sm">Size:</label>
            <input 
              id="brush-size"
              type="range" 
              min="1" 
              max="20" 
              value={brushSize} 
              onChange={(e) => setBrushSize(parseInt(e.target.value))} 
              className="w-24"
            />
          </div>
        </div>
        
        <div className="border border-slate-200 dark:border-slate-700 rounded-md mb-4 relative">
          <canvas
            ref={canvasRef}
            width={800}
            height={400}
            className="w-full h-[400px] bg-white cursor-crosshair touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
            onMouseLeave={endDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={endDrawing}
          />
        </div>
        
        <div className="flex flex-wrap gap-2 justify-between">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearCanvas}
              className="flex items-center"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={downloadCanvas}
              className="flex items-center"
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowGallery(!showGallery)}
              className="flex items-center"
            >
              {showGallery ? 'Hide Gallery' : 'View Gallery'}
            </Button>
          </div>
          
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Your name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="px-3 py-1 border border-slate-300 dark:border-slate-600 rounded-md text-sm"
            />
            <Button 
              size="sm" 
              onClick={saveDrawing}
              className="flex items-center"
            >
              <Save className="h-4 w-4 mr-1" />
              Save to Gallery
            </Button>
          </div>
        </div>
        
        {showGallery && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4"
          >
            <h3 className="text-lg font-semibold mb-2">Community Gallery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {savedDrawings.map((drawing) => (
                <div 
                  key={drawing.id} 
                  className="border border-slate-200 dark:border-slate-700 rounded-md p-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
                  onClick={() => loadDrawing(drawing)}
                >
                  <div className="h-32 bg-white rounded-md mb-2">
                    {/* In a real app, this would be a thumbnail of the drawing */}
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      Preview
                    </div>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">{drawing.author}</p>
                    <p className="text-slate-500 text-xs">
                      {new Date(drawing.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        
        <div className="mt-4 text-sm text-slate-500">
          <p>This is a collaborative drawing board. Your drawings are visible to all visitors and will be saved for others to see.</p>
          <p>In a production environment, this would use WebSockets for real-time collaboration.</p>
        </div>
      </Card>
    </div>
  );
}; 