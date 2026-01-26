import { Canvas } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingShape({ position, color, size, speed }: { 
  position: [number, number, number]; 
  color: string; 
  size: number;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[size, 1]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.15}
          distort={0.4}
          speed={2}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

function FloatingTorus({ position, color, size }: { 
  position: [number, number, number]; 
  color: string; 
  size: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[size, size * 0.3, 16, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 200;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20;
    positions[i + 1] = (Math.random() - 0.5) * 20;
    positions[i + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#22d3ee"
        size={0.03}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#22d3ee" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
      
      <FloatingShape position={[-4, 2, -5]} color="#22d3ee" size={1.5} speed={1} />
      <FloatingShape position={[4, -1, -3]} color="#a855f7" size={1} speed={1.5} />
      <FloatingShape position={[0, 3, -8]} color="#06b6d4" size={2} speed={0.8} />
      <FloatingShape position={[-3, -3, -6]} color="#8b5cf6" size={0.8} speed={1.2} />
      
      <FloatingTorus position={[5, 2, -7]} color="#22d3ee" size={1.5} />
      <FloatingTorus position={[-5, -2, -4]} color="#a855f7" size={1} />
      
      <Particles />
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
      <div className="absolute inset-0 bg-gradient-hero opacity-80" />
    </div>
  );
}
