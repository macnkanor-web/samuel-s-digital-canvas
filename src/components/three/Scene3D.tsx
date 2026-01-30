import { Canvas } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import { Suspense, useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Anime-style soft glowing orb with hover pulsing
function GlowOrb({ position, color, size, speed = 1 }: { 
  position: [number, number, number]; 
  color: string; 
  size: number;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const outerGlowRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const pulseIntensity = useRef(0);

  useFrame((state) => {
    // Smooth pulse transition
    const targetIntensity = hovered ? 1 : 0;
    pulseIntensity.current += (targetIntensity - pulseIntensity.current) * 0.1;
    
    const basePulse = Math.sin(state.clock.elapsedTime * speed * 2) * 0.1;
    const hoverPulse = Math.sin(state.clock.elapsedTime * 4) * 0.3 * pulseIntensity.current;
    
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
      const baseOpacity = 0.8 + pulseIntensity.current * 0.2;
      (meshRef.current.material as THREE.MeshBasicMaterial).opacity = baseOpacity;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.5 + basePulse + hoverPulse);
      const glowOpacity = 0.15 + pulseIntensity.current * 0.25;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = glowOpacity;
    }
    if (outerGlowRef.current) {
      outerGlowRef.current.scale.setScalar(2.5 + hoverPulse * 1.5);
      const outerOpacity = 0.05 + pulseIntensity.current * 0.1;
      (outerGlowRef.current.material as THREE.MeshBasicMaterial).opacity = outerOpacity;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.2} floatIntensity={0.5}>
      <group 
        ref={groupRef} 
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Core orb */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.8} />
        </mesh>
        {/* Glow effect */}
        <mesh ref={glowRef} scale={1.5}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.15} />
        </mesh>
        {/* Outer glow */}
        <mesh ref={outerGlowRef} scale={2.5}>
          <sphereGeometry args={[size, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.05} />
        </mesh>
      </group>
    </Float>
  );
}

// Floating ring with anime glow
function FloatingRing({ position, color, size, rotationSpeed = 0.5 }: { 
  position: [number, number, number]; 
  color: string; 
  size: number;
  rotationSpeed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * rotationSpeed;
      meshRef.current.rotation.z = state.clock.elapsedTime * rotationSpeed * 0.5;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[size, size * 0.08, 16, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
    </Float>
  );
}

// Sparkle particles with twinkling effect
function Sparkles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 300;

  const { positions, sizes, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    
    const colorPalette = [
      new THREE.Color('#ff6b9d'), // pink
      new THREE.Color('#c084fc'), // purple
      new THREE.Color('#60a5fa'), // blue
      new THREE.Color('#34d399'), // mint
      new THREE.Color('#fbbf24'), // gold
      new THREE.Color('#ffffff'), // white
    ];
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
      
      sizes[i] = Math.random() * 0.08 + 0.02;
      
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return { positions, sizes, colors };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      const material = particlesRef.current.material as THREE.PointsMaterial;
      material.opacity = 0.6 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        transparent
        opacity={0.8}
        vertexColors
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Floating crystal with anime shader look
function Crystal({ position, color, size }: { 
  position: [number, number, number]; 
  color: string; 
  size: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.4} floatIntensity={0.8}>
      <group position={position}>
        <mesh ref={meshRef}>
          <octahedronGeometry args={[size, 0]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>
        {/* Inner glow */}
        <mesh scale={0.7}>
          <octahedronGeometry args={[size, 0]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

// Soft dreamy clouds
function DreamCloud({ position, scale }: { position: [number, number, number]; scale: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.2) * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#e0b4ff" transparent opacity={0.08} />
      </mesh>
      <mesh position={[0.8, 0.2, 0]}>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshBasicMaterial color="#b4d4ff" transparent opacity={0.06} />
      </mesh>
      <mesh position={[-0.7, 0.1, 0.2]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial color="#ffb4d4" transparent opacity={0.07} />
      </mesh>
    </group>
  );
}

function SceneContent() {
  return (
    <>
      {/* Soft anime lighting */}
      <ambientLight intensity={0.4} color="#e8d5ff" />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ff6b9d" />
      <pointLight position={[-10, 5, 5]} intensity={0.8} color="#60a5fa" />
      <pointLight position={[0, -10, 5]} intensity={0.6} color="#c084fc" />
      
      {/* Background stars */}
      <Stars 
        radius={50} 
        depth={50} 
        count={1000} 
        factor={3} 
        saturation={0.5}
        fade 
        speed={0.5}
      />
      
      {/* Glowing orbs - anime style */}
      <GlowOrb position={[-5, 3, -8]} color="#ff6b9d" size={0.8} speed={0.8} />
      <GlowOrb position={[6, -2, -10]} color="#60a5fa" size={1.2} speed={0.6} />
      <GlowOrb position={[0, 4, -12]} color="#c084fc" size={1.5} speed={0.5} />
      <GlowOrb position={[-4, -3, -6]} color="#34d399" size={0.5} speed={1.2} />
      <GlowOrb position={[4, 2, -5]} color="#fbbf24" size={0.4} speed={1.5} />
      
      {/* Floating rings */}
      <FloatingRing position={[5, 3, -7]} color="#ff6b9d" size={1.2} rotationSpeed={0.3} />
      <FloatingRing position={[-6, -1, -9]} color="#60a5fa" size={1.8} rotationSpeed={0.4} />
      <FloatingRing position={[2, -4, -6]} color="#c084fc" size={0.8} rotationSpeed={0.5} />
      
      {/* Crystals */}
      <Crystal position={[-3, 1, -4]} color="#c084fc" size={0.6} />
      <Crystal position={[3, -2, -8]} color="#60a5fa" size={0.8} />
      <Crystal position={[0, -1, -5]} color="#ff6b9d" size={0.4} />
      
      {/* Dream clouds */}
      <DreamCloud position={[-8, 5, -15]} scale={2} />
      <DreamCloud position={[10, -4, -18]} scale={2.5} />
      <DreamCloud position={[0, 6, -20]} scale={3} />
      
      {/* Sparkle particles */}
      <Sparkles />
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-anime opacity-90" />
    </div>
  );
}