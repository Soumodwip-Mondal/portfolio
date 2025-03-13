import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Define your skills with categories, proficiency levels, and colors
const skillsData = [
  { name: 'React', category: 'Frontend', level: 0.9, color: '#61DAFB' },
  { name: 'TypeScript', category: 'Languages', level: 0.85, color: '#3178C6' },
  { name: 'Python', category: 'Languages', level: 0.8, color: '#3776AB' },
  { name: 'Data Analysis', category: 'Data', level: 0.75, color: '#FF6B6B' },
  { name: 'Tailwind', category: 'Frontend', level: 0.9, color: '#38B2AC' },
  { name: 'SQL', category: 'Data', level: 0.7, color: '#336791' },
  { name: 'Tableau', category: 'Data', level: 0.65, color: '#E97627' },
  { name: 'JavaScript', category: 'Languages', level: 0.85, color: '#F7DF1E' },
  { name: 'HTML/CSS', category: 'Frontend', level: 0.9, color: '#E34F26' },
  { name: 'Node.js', category: 'Backend', level: 0.7, color: '#339933' },
  { name: 'Git', category: 'Tools', level: 0.8, color: '#F05032' },
  { name: 'Figma', category: 'Design', level: 0.6, color: '#F24E1E' },
];

// Skill node component for the 3D visualization
function SkillNode({ skill, index, totalSkills, hovered, setHovered }: {
  skill: { name: string; category: string; level: number; color: string };
  index: number;
  totalSkills: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Mesh | null>(null);
  
  // Calculate position in 3D space based on skill category and level
  const angle = (index / totalSkills) * Math.PI * 2;
  const radius = 5 + skill.level * 2;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  
  // Position based on category
  let y = 0;
  switch(skill.category) {
    case 'Frontend': y = 2; break;
    case 'Languages': y = 0; break;
    case 'Data': y = -2; break;
    case 'Backend': y = 1; break;
    case 'Tools': y = -1; break;
    case 'Design': y = -3; break;
    default: y = 0;
  }
  
  useFrame((state) => {
    // Add subtle animation
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
      
      // Pulse effect when hovered
      if (hovered === index) {
        meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1.2, 0.1);
        meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, 1.2, 0.1);
        meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, 1.2, 0.1);
      } else {
        meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1);
        meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, 1, 0.1);
        meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, 1, 0.1);
      }
    }
    
    // Make text always face the camera
    if (textRef.current) {
      textRef.current.lookAt(state.camera.position);
    }
  });

  return (
    <group position={[x, y, z]}>
      <mesh 
        ref={meshRef}
        onPointerOver={() => setHovered(index)}
        onPointerOut={() => setHovered(null)}
      >
        <sphereGeometry args={[skill.level * 0.5, 32, 32]} />
        <meshStandardMaterial 
          color={skill.color} 
          emissive={skill.color} 
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
      <Text
        ref={textRef}
        position={[0, 1, 0]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {skill.name}
      </Text>
    </group>
  );
}

// Galaxy background component
function GalaxyBackground() {
  const particlesRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });
  
  return (
    <group ref={particlesRef}>
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0.5} 
        fade 
        speed={1} 
      />
    </group>
  );
}

// Skill info panel component
function SkillInfoPanel({ skill }: { skill: { name: string; category: string; level: number; color: string } | null }) {
  if (!skill) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 max-w-xs w-full"
    >
      <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">Category: {skill.category}</p>
      <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full" 
          style={{ 
            width: `${skill.level * 100}%`,
            backgroundColor: skill.color 
          }}
        />
      </div>
      <p className="text-xs text-right mt-1 text-slate-500 dark:text-slate-400">
        {Math.round(skill.level * 100)}% proficiency
      </p>
    </motion.div>
  );
}

// Main component
export default function Skills3D() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Categories for filtering
  const categories = ['All', 'Frontend', 'Languages', 'Data', 'Backend', 'Tools', 'Design'];
  
  // Filter skills based on active category
  const filteredSkills = activeCategory === 'All' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeCategory);
  
  // Get the hovered skill
  const hoveredSkill = hovered !== null ? filteredSkills[hovered] : null;
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section id="skills-3d" className="py-20 relative min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-4 text-center mb-12"
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
          Skills Universe
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
          Explore my skills in this interactive 3D visualization. Drag to rotate, scroll to zoom.
        </p>
        
        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(category => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>
      
      {/* 3D Canvas */}
      <div className="h-[600px] w-full relative">
        <AnimatedCanvas isLoaded={isLoaded} filteredSkills={filteredSkills} hovered={hovered} setHovered={setHovered} />
        <SkillInfoPanel skill={hoveredSkill} />
      </div>
      
      {/* Skills list */}
      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.slice(1).map(category => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {skillsData
                  .filter(skill => skill.category === category)
                  .map(skill => (
                    <li key={skill.name} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {Math.round(skill.level * 100)}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full" 
                          style={{ 
                            width: `${skill.level * 100}%`,
                            backgroundColor: skill.color 
                          }}
                        />
                      </div>
                    </li>
                  ))
                }
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Animated Canvas component with loading state
function AnimatedCanvas({ isLoaded, filteredSkills, hovered, setHovered }: {
  isLoaded: boolean;
  filteredSkills: { name: string; category: string; level: number; color: string }[];
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 1 }}
      className="w-full h-full"
    >
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <GalaxyBackground />
        
        {filteredSkills.map((skill, index) => (
          <SkillNode 
            key={skill.name} 
            skill={skill} 
            index={index} 
            totalSkills={filteredSkills.length} 
            hovered={hovered}
            setHovered={setHovered}
          />
        ))}
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          autoRotate={true} 
          autoRotateSpeed={0.5} 
          minDistance={8}
          maxDistance={20}
        />
      </Canvas>
    </motion.div>
  );
} 