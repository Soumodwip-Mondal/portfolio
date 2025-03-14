import { motion } from 'framer-motion';
import { DrawingBoard } from '../components/collaborative/DrawingBoard';

export default function CollaborativePage() {
  return (
    <>
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Collaborative Drawing Board
            </h1>
            
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
              Express yourself and collaborate with other visitors on this shared canvas. 
              See what others have created and leave your own mark!
            </p>
            
            <DrawingBoard />
            
            <div className="mt-12 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">About This Feature</h2>
              <p className="mb-4">
                This collaborative drawing board demonstrates my ability to build interactive, real-time features. 
                In a production environment, this would be implemented with:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>WebSockets for real-time collaboration between users</li>
                <li>Canvas API for drawing functionality</li>
                <li>Database storage for persisting drawings</li>
                <li>Authentication to track user contributions</li>
                <li>Optimized rendering for smooth performance</li>
              </ul>
              <p>
                The current implementation is a simplified version that demonstrates the UI and basic functionality.
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
}