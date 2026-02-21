import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

const SKIN = '#e8d5c4';
const HAIR = '#3d2914';
const EYES = '#1a1512';
const SMILE = '#1a1512';

/**
 * Standalone hero CTA face – circle face with hair, nose, mustache, smile, eyes.
 * Smooth cursor-based eye/face movement. Does not use teacher/student or landing context.
 */
function FaceMesh({ mouse, bounds }) {
  const groupRef = useRef(null);
  const target = useRef(new THREE.Vector3(0, 0, 0.5));
  const temp = useRef(new THREE.Vector3());

  useFrame((state) => {
    if (!groupRef.current || !bounds?.width || !bounds?.height) return;
    const { camera } = state;
    const mx = mouse?.x ?? 0;
    const my = mouse?.y ?? 0;
    const ndcX = ((mx - bounds.left) / bounds.width) * 2 - 1;
    const ndcY = -((my - bounds.top) / bounds.height) * 2 + 1;
    // Much smaller range – restrict how far head can move
    const damp = 0.07;
    temp.current.set(ndcX * damp, ndcY * damp, 0.5).unproject(camera);
    // Keep easing reasonably quick so it still feels responsive
    target.current.lerp(temp.current, 0.08);
    groupRef.current.lookAt(target.current);
  });

  return (
    // Slightly larger student-style face to match CTA
    <group ref={groupRef} position={[0, 0, 0]} scale={[1.4, 1.4, 1.4]}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[2, 2, 3]} intensity={1} />
      <directionalLight position={[-1, 1, 2]} intensity={0.4} />

      {/* Head sphere – student style */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.11, 28, 28]} />
        <meshStandardMaterial color={SKIN} roughness={0.72} metalness={0} />
      </mesh>

      {/* Nose – small and cute */}
      <mesh position={[0, 0.006, 0.105]} castShadow>
        <sphereGeometry args={[0.018, 10, 10]} />
        <meshStandardMaterial color={SKIN} roughness={0.7} />
      </mesh>

      {/* Eyes – same positions as choose-path student */}
      <mesh position={[0.035, 0.025, 0.1]} castShadow>
        <sphereGeometry args={[0.022, 14, 14]} />
        <meshStandardMaterial color={EYES} roughness={0.2} metalness={0} />
      </mesh>
      <mesh position={[-0.035, 0.025, 0.1]} castShadow>
        <sphereGeometry args={[0.022, 14, 14]} />
        <meshStandardMaterial color={EYES} roughness={0.2} metalness={0} />
      </mesh>

      {/* Brows – soft student look */}
      <mesh position={[0.035, 0.055, 0.108]} castShadow>
        <boxGeometry args={[0.022, 0.008, 0.005]} />
        <meshStandardMaterial color={HAIR} roughness={0.9} />
      </mesh>
      <mesh position={[-0.035, 0.055, 0.108]} castShadow>
        <boxGeometry args={[0.022, 0.008, 0.005]} />
        <meshStandardMaterial color={HAIR} roughness={0.9} />
      </mesh>

      {/* Smile – innocent thin U-curve like student */}
      <mesh position={[0, -0.035, 0.105]} castShadow>
        <tubeGeometry
          args={[
            new THREE.QuadraticBezierCurve3(
              new THREE.Vector3(-0.03, 0, 0),
              new THREE.Vector3(0, -0.012, 0),
              new THREE.Vector3(0.03, 0, 0)
            ),
            32,
            0.0025,
            8,
            false,
          ]}
        />
        <meshStandardMaterial color={SMILE} roughness={0.2} metalness={0} />
      </mesh>

      {/* Hair cap – student style */}
      <mesh position={[0, 0.06, -0.04]} castShadow>
        <sphereGeometry args={[0.11, 20, 20, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color={HAIR} roughness={0.94} metalness={0} />
      </mesh>
    </group>
  );
}

export function HeroCTAFace({ mouse, bounds, containerRef, className = '' }) {
  return (
    <div
      ref={containerRef}
      className={`w-14 h-14 sm:w-16 sm:h-16 shrink-0 ${className}`.trim()}
      style={{
        position: 'relative',
        zIndex: 10,
        clipPath: 'circle(50% at 50% 50%)',
        WebkitClipPath: 'circle(50% at 50% 50%)',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 0.56], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        style={{ width: '100%', height: '100%', display: 'block', background: 'transparent' }}
      >
        <FaceMesh mouse={mouse} bounds={bounds} />
      </Canvas>
    </div>
  );
}
