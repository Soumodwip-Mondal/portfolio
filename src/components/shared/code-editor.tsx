'use client';

import { useState, useEffect, useRef } from 'react';
import { RefreshCw } from 'lucide-react';

export function CodeEditor({ initialCode, onCodeChange }: { initialCode: string, onCodeChange?: (code: string) => void }) {
  const [code, setCode] = useState(initialCode);
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    onCodeChange?.(newCode);
  };
  
  return (
    <div className="rounded-md overflow-hidden border border-slate-200 dark:border-slate-700">
      <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 flex justify-between items-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-400">script.jsx</div>
      </div>
      <textarea
        value={code}
        onChange={handleChange}
        className="w-full h-64 p-4 font-mono text-sm bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none"
        spellCheck="false"
      />
    </div>
  );
}

export function CodePreview({ code }: { code: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [key, setKey] = useState(0); // Used to force iframe refresh
  
  const refreshPreview = () => {
    setKey(prev => prev + 1);
  };
  
  useEffect(() => {
    if (!iframeRef.current) return;
    
    try {
      const iframe = iframeRef.current;
      const document = iframe.contentDocument;
      
      const documentContents = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Preview</title>
            <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
            <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
            <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            <style>
              body { padding: 1rem; }
            </style>
          </head>
          <body>
            <div id="root"></div>
            <script type="text/babel">
              const render = (Component) => {
                ReactDOM.render(Component, document.getElementById('root'));
              };
              
              try {
                ${code}
              } catch (error) {
                document.getElementById('root').innerHTML = 
                  '<div class="p-4 bg-red-100 text-red-700 rounded">' + 
                  '<strong>Error:</strong> ' + error.message + '</div>';
              }
            </script>
          </body>
        </html>
      `;
      
      document?.open();
      document?.write(documentContents);
      document?.close();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  }, [code, key]);
  
  return (
    <div className="rounded-md overflow-hidden border border-slate-200 dark:border-slate-700 h-64">
      <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 flex justify-between items-center">
        <div className="text-sm text-slate-500 dark:text-slate-400">Preview</div>
        <button 
          onClick={refreshPreview}
          className="focus:outline-none"
          aria-label="Refresh preview"
        >
          <RefreshCw className="w-4 h-4 text-slate-500 dark:text-slate-400" />
        </button>
      </div>
      {error ? (
        <div className="p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400">
          <strong>Error:</strong> {error}
        </div>
      ) : (
        <iframe
          key={key}
          ref={iframeRef}
          title="preview"
          className="w-full h-full bg-white dark:bg-slate-950"
          sandbox="allow-scripts"
        />
      )}
    </div>
  );
}

export default function LiveCodeEditor({ initialCode = '',
}: {
  initialCode?: string,
  onCodeChange?: (code: string) => void,
  manualExecution?: boolean
}) {
  const [code, setCode] = useState(initialCode);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CodeEditor initialCode={code} onCodeChange={setCode} />
      <CodePreview code={code} />
    </div>
  );
}