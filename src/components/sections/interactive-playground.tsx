'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Play, Pause, Maximize2, Minimize2, RefreshCw } from 'lucide-react';
import * as React from "react";
import { cn } from "../../lib/utils";
import { MemoryGame } from '../gamification/MemoryGame';
import LiveCodeEditor from '../shared/code-editor'; // Import the code editor and its props

// Tabs Component Implementation
interface TabsContextType {
  selectedTab: string | undefined;
  setSelectedTab: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined);

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(({ className, defaultValue, ...props }, ref) => {
  const [selectedTab, setSelectedTab] = React.useState(defaultValue);

  return (
    <TabsContext.Provider value={{ selectedTab, setSelectedTab }}>
      <div ref={ref} className={cn("w-full", className)} {...props} />
    </TabsContext.Provider>
  );
});
Tabs.displayName = "Tabs";

const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-auto sm:h-10 flex-wrap gap-1 sm:gap-0 items-center justify-center rounded-md bg-slate-100 p-1 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
      className
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(({ className, value, ...props }, ref) => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("TabsTrigger must be used within a Tabs");
  }

  const { selectedTab, setSelectedTab } = context;
  const isSelected = selectedTab === value;

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={isSelected}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-800",
        isSelected
          ? "bg-white text-slate-900 shadow-sm dark:bg-slate-950 dark:text-slate-50"
          : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50",
        className
      )}
      onClick={() => setSelectedTab(value)}
      {...props}
    />
  );
});
TabsTrigger.displayName = "TabsTrigger";

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(({ className, value, ...props }, ref) => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("TabsContent must be used within a Tabs");
  }

  const { selectedTab } = context;
  const isSelected = selectedTab === value;

  if (!isSelected) return null;

  return (
    <div
      ref={ref}
      role="tabpanel"
      className={cn(
        "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-800",
        className
      )}
      {...props}
    />
  );
});
TabsContent.displayName = "TabsContent";

// Slider Component Implementation
interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  name?: string;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, min = 0, max = 100, step = 1, value, defaultValue, onChange, ...props }, ref) => {
    interface ChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

    const handleChange = (e: ChangeEvent): void => {
      const newValue: number = Number(e.target.value);
      onChange?.(newValue);
    };

    return (
      <div className={cn("relative w-full touch-none select-none", className)}>
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="absolute h-full bg-slate-900 dark:bg-slate-400"
            style={{
              width: `${((value ?? defaultValue ?? min) / max) * 100}%`,
            }}
          />
        </div>
        <input
          type="range"
          ref={ref}
          min={min}
          max={max}
          step={step}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0"
          disabled={props.disabled}
          id={props.id}
          name={props.name}
        />
      </div>
    );
  }
);
Slider.displayName = "Slider";

// Demo projects for the interactive playground
const demoProjects = [
  {
    id: 'code-editor',
    title: 'Live Code Editor',
    description: 'Try modifying the code to see real-time changes',
    initialCode: `
// Try editing this code!
function Welcome() {
  const [count, setCount] = React.useState(0);
  
  return (
    <div className="p-4 bg-blue-100 rounded-lg">
      <h2 className="text-xl font-bold mb-2">
        Welcome to my interactive demo
      </h2>
      <p className="mb-4">
        You've clicked the button {count} times
      </p>
      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setCount(count + 1)}
      >
        Click me
      </button>
    </div>
  );
}

// This renders the component
render(<Welcome />);
    `,
    type: 'code-editor'
  },
  {
    id: 'ui-components',
    title: 'UI Component Playground',
    description: 'Interact with and customize UI components',
    components: [
      {
        name: 'Button',
        props: {
          variant: ['default', 'outline', 'ghost', 'link'],
          size: ['default', 'sm', 'lg'],
          disabled: [true, false],
          text: 'Click Me'
        }
      },
      {
        name: 'Card',
        props: {
          variant: ['default', 'bordered'],
          size: ['default', 'sm', 'lg'],
          withShadow: [true, false],
          content: 'This is a customizable card component'
        }
      }
    ],
    type: 'ui-components'
  },
  {
    id: 'before-after',
    title: 'Before/After Design Slider',
    description: 'Compare before and after versions of design projects',
    images: {
      before: 'placeholder',
      after: 'placeholder'
    },
    type: 'before-after'
  },
  {
    id: 'mini-app',
    title: 'Try My Mini App',
    description: 'A simplified version of one of my applications you can test',
    appType: 'data-visualizer',
    demoData: [
      { month: 'Jan', value: 30 },
      { month: 'Feb', value: 45 },
      { month: 'Mar', value: 25 },
      { month: 'Apr', value: 60 },
      { month: 'May', value: 40 },
      { month: 'Jun', value: 80 }
    ],
    type: 'mini-app'
  }
];

// UI Component Playground
interface UIComponent {
  name: string;
  props: {
    [key: string]: string[] | boolean[] | string | boolean | undefined;
  };
}

function UIComponentPlayground({ components }: { components: UIComponent[] }) {
  const [selectedComponent, setSelectedComponent] = useState(components[0]);
  const [props, setProps] = useState<{ [key: string]: any }>({});
  
  useEffect(() => {
    // Initialize with first values
    const initialProps: { [key: string]: string | boolean } = {};
    Object.entries(selectedComponent.props).forEach(([key, values]) => {
      initialProps[key] = Array.isArray(values) ? values[0] : (values ?? '');
    });
    setProps(initialProps);
  }, [selectedComponent]);
  
  interface Props {
    [key: string]: string | boolean;
  }

  const handlePropChange = (prop: string, value: string | boolean): void => {
    setProps((prev: Props) => ({ ...prev, [prop]: value }));
  };
  
  // Render the selected component with current props
  const renderComponent = () => {
    switch (selectedComponent.name) {
      case 'Button':
        return (
          <Button
            variant={props.variant as any}
            size={props.size as any}
            disabled={!!props.disabled}
          >
            {props.text}
          </Button>
        );
      case 'Card':
        return (
          <Card
            className={`p-4 ${props.withShadow ? 'shadow-lg' : ''} ${
              props.variant === 'bordered' ? 'border border-slate-200 dark:border-slate-700' : ''
            } ${props.size === 'sm' ? 'max-w-sm' : props.size === 'lg' ? 'max-w-lg' : 'max-w-md'}`}
          >
            <h3 className="text-lg font-semibold mb-2">Card Component</h3>
            <p>{props.content}</p>
          </Card>
        );
      default:
        return <div>Component not found</div>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {components.map(comp => (
          <Button
            key={comp.name}
            variant={selectedComponent.name === comp.name ? 'default' : 'outline'}
            onClick={() => setSelectedComponent(comp)}
            size="sm"
          >
            {comp.name}
          </Button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Customize Properties</h3>
          {Object.entries(selectedComponent.props).map(([propName, values]) => (
            <div key={propName} className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                {propName.charAt(0).toUpperCase() + propName.slice(1)}
              </label>
              {Array.isArray(values) ? (
                <div className="flex flex-wrap gap-2">
                  {values.map((value) => (
                    <Button
                      key={String(value)}
                      size="sm"
                      variant={props[propName] === value ? 'default' : 'outline'}
                      onClick={() => handlePropChange(propName, value)}
                    >
                      {typeof value === 'boolean' ? (value ? 'True' : 'False') : String(value)}
                    </Button>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  value={props[propName] || ''}
                  onChange={e => handlePropChange(propName, e.target.value)}
                  className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md"
                />
              )}
            </div>
          ))}
        </div>
        
        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 sm:p-8 flex items-center justify-center">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}

// Before/After Slider Component
function BeforeAfterSlider() {
  const [sliderValue, setSliderValue] = useState(50);
  const containerRef = useRef(null);
  
  return (
    <div className="space-y-4">
      <div 
        ref={containerRef}
        className="relative h-60 sm:h-80 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700"
      >
        {/* Before side (placeholder) */}
        <div className="absolute inset-0 bg-slate-300 dark:bg-slate-700">
          <div className="h-full w-full flex items-center justify-center">
            <div className="bg-black/50 text-white px-3 py-1 rounded">Before</div>
          </div>
        </div>
        
        {/* After side (placeholder) */}
        <div 
          className="absolute inset-y-0 left-0 bg-blue-300 dark:bg-blue-700" 
          style={{ width: `${sliderValue}%` }}
        >
          <div className="h-full w-full flex items-center justify-center">
            <div className="bg-black/50 text-white px-3 py-1 rounded">After</div>
          </div>
        </div>
        
        {/* Divider line */}
        <div 
          className="absolute inset-y-0 w-1 bg-white shadow-lg"
          style={{ left: `${sliderValue}%`, transform: 'translateX(-50%)' }}
        ></div>
      </div>
      
      <div className="px-4">
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={(e) => setSliderValue(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
}

// Mini App Component
interface DemoDataItem {
  month: string;
  value: number;
}

function MiniApp({ demoData }: { demoData: DemoDataItem[] }) {
  const [data, setData] = useState<DemoDataItem[]>(demoData);
  const [chartType, setChartType] = useState('bar');
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Function to randomize data
  const randomizeData = () => {
    const newData = data.map(item => ({
      ...item,
      value: Math.floor(Math.random() * 100)
    }));
    setData(newData);
  };
  
  // Auto-update data when playing
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isPlaying) {
      interval = setInterval(() => {
        randomizeData();
      }, 2000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);
  
  // Calculate max value for scaling
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={chartType === 'bar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('bar')}
          >
            Bar Chart
          </Button>
          <Button
            variant={chartType === 'line' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setChartType('line')}
          >
            Line Chart
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={randomizeData}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Randomize
          </Button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 sm:p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold mb-4">Data Visualization Demo</h3>
        
        <div className="h-48 sm:h-64 flex items-end space-x-1 sm:space-x-2">
          {chartType === 'bar' ? (
            // Bar chart
            data.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-blue-500 dark:bg-blue-600 rounded-t"
                  style={{ height: `${(item.value / maxValue) * 100}%` }}
                ></div>
                <div className="text-xs mt-2">{item.month}</div>
              </div>
            ))
          ) : (
            // Line chart
            <svg className="w-full h-full" viewBox={`0 0 ${data.length * 100} 100`}>
              <polyline
                points={data.map((item, i) => `${i * 100 + 50},${100 - (item.value / maxValue) * 100}`).join(' ')}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-blue-500 dark:text-blue-400"
              />
              {data.map((item, i) => (
                <circle
                  key={i}
                  cx={i * 100 + 50}
                  cy={100 - (item.value / maxValue) * 100}
                  r="4"
                  className="fill-blue-500 dark:fill-blue-400"
                />
              ))}
            </svg>
          )}
        </div>
        
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-2">
          {data.map((item, index) => (
            <div key={index} className="text-center">
              <div className="font-medium">{item.value}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{item.month}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Define the missing CodeEditorProps interface
interface CodeEditorProps {
  initialCode: string;
  onChange?: (code: string) => void;
  onRun?: (result: any) => void;
  manualExecution?: boolean;
}

const EnhancedCodeEditor = React.forwardRef<{ runCode: () => void }, CodeEditorProps>(
  ({ initialCode, onChange, onRun, manualExecution = true }, ref) => {
    const [code, setCode] = useState(initialCode);
    const [result, setResult] = useState<React.ReactNode | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    
    // Function to handle code changes
    const handleCodeChange = (newCode: string) => {
      setCode(newCode);
      if (onChange) onChange(newCode);
    };
    
    // Function to run code
    const runCode = () => {
      setIsRunning(true);
      setError(null);
      
      try {
        // This should be replaced by the actual code execution logic
        // from your LiveCodeEditor component
        const executionResult = "Code execution placeholder";
        setResult(executionResult);
        if (onRun) onRun(executionResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setIsRunning(false);
      }
    };
    
    // Make the runCode function available to parent components
    React.useImperativeHandle(ref, () => ({
      runCode
    }));
    
    return (
      <div className="space-y-4">
        <div className="relative rounded-md border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 min-h-[250px]">
          {/* This is where your code editor component goes */}
          <LiveCodeEditor
            initialCode={code}
            onCodeChange={handleCodeChange}
            manualExecution={manualExecution}
          />
        </div>
        
        {error && (
          <div className="p-3 rounded-md bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm">
            <strong>Error:</strong> {error}
          </div>
        )}
        
        <div className="p-4 rounded-md border border-slate-300 dark:border-slate-700 min-h-[100px] bg-white dark:bg-slate-900">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
            Output: {isRunning && <span className="text-blue-500">Running...</span>}
          </h3>
          <div className="output-area">
            {result ? result : <span className="text-slate-400">Run your code to see the output</span>}
          </div>
        </div>
      </div>
    );
  }
);
EnhancedCodeEditor.displayName = "EnhancedCodeEditor";

// Code Editor Demo with Run Button
function CodeEditorDemo() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [code, setCode] = useState(demoProjects.find(p => p.id === 'code-editor')?.initialCode || '');
  const [output, setOutput] = useState<any>(null);
  const editorRef = useRef<{ runCode: () => void }>(null);
  
  // Function to handle running code
  const runCode = () => {
    if (editorRef.current) {
      editorRef.current.runCode();
    }
  };
  
  // Handle output changes
  const handleOutput = (result: any) => {
    setOutput(result);
    // You can do additional processing with the output here
    console.log("Code execution result:", result);
  };
  
  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-slate-900 p-2 sm:p-6' : ''}`}>
      <div className="relative">
        <div className="flex justify-between items-center mb-4">
          <Button 
            variant="default" 
            size="sm"
            onClick={runCode}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center"
          >
            <Play className="w-4 h-4 mr-2" /> Run Code
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>
        
        <div className="min-h-[350px] sm:min-h-[400px]">
          <EnhancedCodeEditor
            ref={editorRef}
            initialCode={code}
            onChange={setCode}
            onRun={handleOutput}
          />
        </div>
        
        {/* Display output information if needed */}
        {output && (
          <div className="mt-4 p-3 bg-slate-100 dark:bg-slate-800 rounded-md">
            <p className="text-sm">Latest execution completed successfully.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Tabs Component
function TabsComponent() {
  // SSR check
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return null;
  }
  
  return (
    <Tabs defaultValue="code-editor" className="w-full">
      <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1 sm:gap-0">
        <TabsTrigger value="code-editor">Code Editor</TabsTrigger>
        <TabsTrigger value="ui-components">UI Components</TabsTrigger>
        <TabsTrigger value="before-after">Before/After</TabsTrigger>
        <TabsTrigger value="mini-app">Mini App</TabsTrigger>
        <TabsTrigger value="memory-game">Memory Game</TabsTrigger>
      </TabsList>
      
      <TabsContent value="code-editor" className="mt-6">
        <CodeEditorDemo />
      </TabsContent>
      
      <TabsContent value="ui-components" className="mt-6">
        <UIComponentPlayground components={demoProjects.find(p => p.id === 'ui-components')?.components || []} />
      </TabsContent>
      
      <TabsContent value="before-after" className="mt-6">
        <BeforeAfterSlider />
      </TabsContent>
      
      <TabsContent value="mini-app" className="mt-6">
        <MiniApp demoData={demoProjects.find(p => p.id === 'mini-app')?.demoData || []} />
      </TabsContent>
      
      <TabsContent value="memory-game" className="mt-6">
        <MemoryGame />
      </TabsContent>
    </Tabs>
  );
}

// Main Interactive Playground Component
export default function InteractivePlayground() {
  return (
    <section id="interactive-playground" className="py-12 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
            Interactive Project Playground
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Don't just look at my projects—interact with them! Try out live demos, modify code, and see how things work.
          </p>
        </div>
        
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-3 sm:p-6">
            <TabsComponent />
          </div>
        </div>
        
        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-4 sm:mb-6">
            Want to see more of my work? Check out my full projects or get in touch!
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:space-x-4">
            <Button asChild>
              <a href="#projects">View All Projects</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#contact">Contact Me</a>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}