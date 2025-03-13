import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Stars, useTexture, Trail, Float, MeshDistortMaterial } from '@react-three/drei';
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

// Animated trail component for skill nodes
function SkillTrail({ position, color }: { position: [number, number, number], color: string }) {
  const trailRef = useRef<THREE.Mesh>(null);
  
  return (
    <Trail
      width={0.5}
      length={8}
      color={color}
      attenuation={(t) => t * t}
    >
      <mesh ref={trailRef} position={position}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </Trail>
  );
}

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
  const glowRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const orbitRef = useRef<THREE.Group>(null);
  
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
  
  // Create mini-orbits for each skill
  const orbitTrails = [];
  const orbitCount = 3;
  for (let i = 0; i < orbitCount; i++) {
    const orbitAngle = (i / orbitCount) * Math.PI * 2;
    const orbitX = Math.cos(orbitAngle) * 0.8;
    const orbitZ = Math.sin(orbitAngle) * 0.8;
    orbitTrails.push(
      <SkillTrail 
        key={i} 
        position={[orbitX, 0, orbitZ]} 
        color={skill.color} 
      />
    );
  }
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Add subtle animation
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
      meshRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
      
      // Pulse effect when hovered
      if (hovered === index) {
        meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1.3, 0.1);
        meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, 1.3, 0.1);
        meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, 1.3, 0.1);
      } else {
        meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1);
        meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, 1, 0.1);
        meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, 1, 0.1);
      }
    }
    
    // Animate glow effect
    if (glowRef.current && glowRef.current.material instanceof THREE.Material) {
      glowRef.current.scale.x = 1 + Math.sin(time) * 0.1;
      glowRef.current.scale.y = 1 + Math.sin(time) * 0.1;
      glowRef.current.scale.z = 1 + Math.sin(time) * 0.1;
      
      if (hovered === index) {
        glowRef.current.material.opacity = THREE.MathUtils.lerp(glowRef.current.material.opacity, 0.8, 0.1);
      } else {
        glowRef.current.material.opacity = THREE.MathUtils.lerp(glowRef.current.material.opacity, 0.4, 0.1);
      }
    }
    
    // Animate particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.3;
      
      // Make particles more active when hovered
      if (hovered === index) {
        particlesRef.current.scale.x = THREE.MathUtils.lerp(particlesRef.current.scale.x, 1.5, 0.1);
        particlesRef.current.scale.y = THREE.MathUtils.lerp(particlesRef.current.scale.y, 1.5, 0.1);
        particlesRef.current.scale.z = THREE.MathUtils.lerp(particlesRef.current.scale.z, 1.5, 0.1);
      } else {
        particlesRef.current.scale.x = THREE.MathUtils.lerp(particlesRef.current.scale.x, 1, 0.1);
        particlesRef.current.scale.y = THREE.MathUtils.lerp(particlesRef.current.scale.y, 1, 0.1);
        particlesRef.current.scale.z = THREE.MathUtils.lerp(particlesRef.current.scale.z, 1, 0.1);
      }
    }
    
    // Rotate orbiting elements
    if (orbitRef.current) {
      orbitRef.current.rotation.y = time * 0.5;
    }
    
    // Make text always face the camera
    if (textRef.current) {
      textRef.current.lookAt(state.camera.position);
    }
  });

  // Create particles geometry
  const particlesGeometry = new THREE.BufferGeometry();
  const particleCount = 30;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);
  
  const color = new THREE.Color(skill.color);
  
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 3;
    positions[i3 + 1] = (Math.random() - 0.5) * 3;
    positions[i3 + 2] = (Math.random() - 0.5) * 3;
    
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
    
    sizes[i] = Math.random() * 0.1 + 0.03;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  return (
    <Float 
      speed={2} 
      rotationIntensity={0.5} 
      floatIntensity={0.5}
      position={[x, y, z]}
    >
      <group>
        {/* Glow effect */}
        <mesh 
          ref={glowRef}
          scale={[1.8, 1.8, 1.8]}
        >
          <sphereGeometry args={[skill.level * 0.5, 32, 32]} />
          <meshBasicMaterial 
            color={skill.color} 
            transparent 
            opacity={0.4}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        
        {/* Main sphere */}
        <mesh 
          ref={meshRef}
          onPointerOver={() => setHovered(index)}
          onPointerOut={() => setHovered(null)}
        >
          <sphereGeometry args={[skill.level * 0.5, 32, 32]} />
          <MeshDistortMaterial
            color={skill.color}
            emissive={skill.color}
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.9}
            speed={3}
            distort={hovered === index ? 0.4 : 0.2}
          />
        </mesh>
        
        {/* Orbiting elements */}
        <group ref={orbitRef}>
          {orbitTrails}
        </group>
        
        {/* Orbiting particles */}
        <points ref={particlesRef}>
          <primitive object={particlesGeometry} />
          <pointsMaterial 
            size={0.08} 
            vertexColors
            transparent 
            opacity={0.8}
            blending={THREE.AdditiveBlending}
            sizeAttenuation
          />
        </points>
        
        {/* Skill name text */}
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
    </Float>
  );
}

// Galaxy background component
function GalaxyBackground() {
  const particlesRef = useRef<THREE.Group>(null);
  const starsRef = useRef<THREE.Group>(null);
  const saturnRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Group>(null);
  const nebulaRef = useRef<THREE.Group>(null);
  const meteorRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.05;
    }
    
    if (starsRef.current) {
      starsRef.current.rotation.z = time * 0.02;
      starsRef.current.rotation.x = Math.sin(time * 0.001) * 0.1;
    }
    
    // Rotate Saturn
    if (saturnRef.current) {
      saturnRef.current.rotation.y = time * 0.1;
      saturnRef.current.rotation.z = Math.sin(time * 0.05) * 0.02;
    }
    
    // Rotate distant planet
    if (planetRef.current) {
      planetRef.current.rotation.y = time * 0.15;
    }
    
    // Animate nebula
    if (nebulaRef.current) {
      nebulaRef.current.rotation.z = time * 0.01;
      nebulaRef.current.rotation.x = Math.sin(time * 0.02) * 0.05;
      // Pulsate nebula
      const pulse = Math.sin(time * 0.2) * 0.1 + 1;
      nebulaRef.current.scale.set(pulse, pulse, pulse);
    }
    
    // Animate meteor
    if (meteorRef.current) {
      // Move meteor across the scene
      const meteorX = ((time * 5) % 100) - 50;
      const meteorY = ((time * 2) % 40) - 20;
      const meteorZ = ((time * 3) % 60) - 30;
      meteorRef.current.position.set(meteorX, meteorY, meteorZ);
      meteorRef.current.rotation.x = time * 2;
      meteorRef.current.rotation.z = time * 3;
    }
  });
  
  // Create Saturn's rings
  const createRings = () => {
    const rings = [];
    const ringColors = ['#A49966', '#C6B978', '#E0D297', '#F0E2A7'];
    
    for (let i = 0; i < 4; i++) {
      const innerRadius = 2.5 + i * 0.2;
      const outerRadius = innerRadius + 0.15;
      rings.push(
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[innerRadius, outerRadius, 64]} />
          <meshStandardMaterial 
            color={ringColors[i]} 
            side={THREE.DoubleSide} 
            transparent 
            opacity={0.8 - i * 0.1}
          />
        </mesh>
      );
    }
    
    return rings;
  };
  
  // Create meteor with trail
  const createMeteor = () => {
    return (
      <group ref={meteorRef} position={[0, 0, -30]}>
        <Trail
          width={1}
          length={20}
          color={'#ff8844'}
          attenuation={(t) => t * t}
        >
          <mesh>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshBasicMaterial color="#ff5500" />
          </mesh>
        </Trail>
      </group>
    );
  };
  
  return (
    <>
      <group ref={particlesRef}>
        <Stars 
          radius={100} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0.8} 
          fade 
          speed={1.5} 
        />
      </group>
      
      {/* Second layer of stars with different rotation for parallax effect */}
      <group ref={starsRef}>
        <Stars 
          radius={80} 
          depth={60} 
          count={3000} 
          factor={6} 
          saturation={0.6} 
          fade 
          speed={0.5}
        />
      </group>
      
      {/* Saturn-like planet with rings */}
      <group ref={saturnRef} position={[40, 8, -30]}>
        <mesh>
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial 
            color="#E4B45A" 
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>
        {createRings()}
      </group>
      
      {/* Distant blue planet */}
      <group ref={planetRef} position={[-35, -15, -40]}>
        <mesh>
          <sphereGeometry args={[3, 32, 32]} />
          <meshStandardMaterial 
            color="#4287f5" 
            metalness={0.1}
            roughness={0.7}
            emissive="#1a3a7a"
            emissiveIntensity={0.2}
          />
        </mesh>
        {/* Moon orbiting the planet */}
        <mesh position={[5, 1, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color="#aaaaaa" roughness={0.9} />
        </mesh>
      </group>
      
      {/* Colorful nebula */}
      <group ref={nebulaRef} position={[15, -25, -50]}>
        {/* Create nebula using multiple overlapping transparent spheres */}
        <mesh>
          <sphereGeometry args={[10, 32, 32]} />
          <meshBasicMaterial 
            color="#ff3377" 
            transparent 
            opacity={0.05} 
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <mesh position={[3, 2, 1]}>
          <sphereGeometry args={[8, 32, 32]} />
          <meshBasicMaterial 
            color="#3366ff" 
            transparent 
            opacity={0.05} 
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <mesh position={[-2, -3, 2]}>
          <sphereGeometry args={[9, 32, 32]} />
          <meshBasicMaterial 
            color="#33ddff" 
            transparent 
            opacity={0.05} 
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
      
      {/* Add a subtle fog effect */}
      <fog attach="fog" args={['#000', 15, 50]} />
      
      {/* Add a subtle ambient glow */}
      <mesh position={[0, 0, -30]}>
        <sphereGeometry args={[20, 32, 32]} />
        <meshBasicMaterial color="#1a0033" transparent opacity={0.3} />
      </mesh>
      
      {/* Distant stars/galaxies */}
      <mesh position={[50, 25, -70]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-45, 20, -80]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial color="#ffaa00" />
      </mesh>
      <mesh position={[35, -30, -60]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial color="#ff5500" />
      </mesh>
      
      {/* Meteor with trail */}
      {createMeteor()}
    </>
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
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 max-w-xs w-full backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80"
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
        <color attach="background" args={['#000']} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <spotLight position={[-10, -10, -10]} intensity={0.5} />
        <pointLight position={[40, 8, -30]} intensity={0.3} color="#E4B45A" /> {/* Light from Saturn */}
        <pointLight position={[-35, -15, -40]} intensity={0.2} color="#4287f5" /> {/* Light from blue planet */}
        
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
        
        {/* Add post-processing effects */}
        <Effects />
      </Canvas>
    </motion.div>
  );
}

// Post-processing effects component
function Effects() {
  return (
    <>
      {/* Add any post-processing effects here if needed */}
    </>
  );
}
 