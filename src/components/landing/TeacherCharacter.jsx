import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { QuadraticBezierCurve3, Vector3 } from 'three';
import { useLookTarget } from './LookTargetContext';

export function TeacherCharacter() {
  const headRef = useRef(null);
  const lookTarget = useLookTarget();

  useFrame(() => {
    if (headRef.current) headRef.current.lookAt(lookTarget);
  });

  const skin = '#e8d5c4';
  const eyes = '#1a1512';
  const blazer = '#0f172a';
  const shirt = '#f5f5f4';
  const tie = '#b45309';
  const hair = '#3d2914';

  return (
    <group position={[0, -1.5, 0]} scale={1.85}>
      <mesh position={[0, 0.62, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.24, 0.28, 0.32, 20]} />
        <meshStandardMaterial attach="material" color={blazer} roughness={0.85} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.25, 0.24, 0.12, 20]} />
        <meshStandardMaterial attach="material" color={blazer} roughness={0.85} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0.26, 0.02]} castShadow receiveShadow>
        <cylinderGeometry args={[0.26, 0.28, 0.22, 20]} />
        <meshStandardMaterial attach="material" color={blazer} roughness={0.85} metalness={0.05} />
      </mesh>
      <mesh position={[-0.08, 0.06, 0.02]} castShadow>
        <cylinderGeometry args={[0.07, 0.09, 0.2, 12]} />
        <meshStandardMaterial attach="material" color={blazer} roughness={0.88} />
      </mesh>
      <mesh position={[0.08, 0.06, 0.02]} castShadow>
        <cylinderGeometry args={[0.07, 0.09, 0.2, 12]} />
        <meshStandardMaterial attach="material" color={blazer} roughness={0.88} />
      </mesh>
      <mesh position={[0, 0.82, 0]} castShadow>
        <cylinderGeometry args={[0.26, 0.26, 0.06, 20]} />
        <meshStandardMaterial attach="material" color={blazer} roughness={0.85} metalness={0.05} />
      </mesh>
      <mesh position={[0, 1.02, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.1, 0.12, 16]} />
        <meshStandardMaterial attach="material" color={skin} roughness={0.7} metalness={0} />
      </mesh>
      <mesh position={[0, 0.96, 0.12]} rotation={[0.15, 0, 0]} castShadow>
        <boxGeometry args={[0.26, 0.1, 0.05]} />
        <meshStandardMaterial attach="material" color={shirt} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.78, 0.18]} castShadow>
        <boxGeometry args={[0.05, 0.32, 0.015]} />
        <meshStandardMaterial attach="material" color={tie} roughness={0.6} metalness={0} />
      </mesh>
      <mesh position={[-0.12, 0.48, 0.22]} rotation={[0.3, 0, 0.35]} castShadow>
        <cylinderGeometry args={[0.042, 0.046, 0.28, 12]} />
        <meshStandardMaterial attach="material" color={blazer} roughness={0.85} />
      </mesh>
      <mesh position={[0.12, 0.48, 0.22]} rotation={[0.3, 0, -0.35]} castShadow>
        <cylinderGeometry args={[0.042, 0.046, 0.28, 12]} />
        <meshStandardMaterial attach="material" color={blazer} roughness={0.85} />
      </mesh>
      <mesh position={[0.14, 0.68, 0.27]} castShadow>
        <boxGeometry args={[0.06, 0.05, 0.018]} />
        <meshStandardMaterial attach="material" color="#fafaf9" roughness={0.8} />
      </mesh>

      <group ref={headRef} position={[0, 1.16, 0]}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial attach="material" color={skin} roughness={0.72} metalness={0} />
        </mesh>
        <mesh position={[0, 0.01, 0.2]} castShadow>
          <sphereGeometry args={[0.03, 12, 12]} />
          <meshStandardMaterial attach="material" color={skin} roughness={0.7} />
        </mesh>
        <mesh position={[0.068, 0.04, 0.18]} castShadow>
          <sphereGeometry args={[0.038, 16, 16]} />
          <meshStandardMaterial attach="material" color={eyes} roughness={0.2} metalness={0} />
        </mesh>
        <mesh position={[-0.068, 0.04, 0.18]} castShadow>
          <sphereGeometry args={[0.038, 16, 16]} />
          <meshStandardMaterial attach="material" color={eyes} roughness={0.2} metalness={0} />
        </mesh>
        <mesh position={[0.068, 0.09, 0.21]} rotation={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.04, 0.012, 0.008]} />
          <meshStandardMaterial attach="material" color={hair} roughness={0.9} />
        </mesh>
        <mesh position={[-0.068, 0.09, 0.21]} rotation={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.04, 0.012, 0.008]} />
          <meshStandardMaterial attach="material" color={hair} roughness={0.9} />
        </mesh>
        <mesh position={[0, -0.045, 0.198]} castShadow>
          <boxGeometry args={[0.035, 0.014, 0.007]} />
          <meshStandardMaterial attach="material" color={hair} roughness={0.85} metalness={0} />
        </mesh>
        <mesh position={[-0.038, -0.05, 0.196]} rotation={[0, 0, 0.25]} castShadow>
          <boxGeometry args={[0.04, 0.016, 0.007]} />
          <meshStandardMaterial attach="material" color={hair} roughness={0.85} metalness={0} />
        </mesh>
        <mesh position={[-0.078, -0.058, 0.192]} rotation={[0, 0, 0.5]} castShadow>
          <boxGeometry args={[0.038, 0.018, 0.007]} />
          <meshStandardMaterial attach="material" color={hair} roughness={0.85} metalness={0} />
        </mesh>
        <mesh position={[0.038, -0.05, 0.196]} rotation={[0, 0, -0.25]} castShadow>
          <boxGeometry args={[0.04, 0.016, 0.007]} />
          <meshStandardMaterial attach="material" color={hair} roughness={0.85} metalness={0} />
        </mesh>
        <mesh position={[0.078, -0.058, 0.192]} rotation={[0, 0, -0.5]} castShadow>
          <boxGeometry args={[0.038, 0.018, 0.007]} />
          <meshStandardMaterial attach="material" color={hair} roughness={0.85} metalness={0} />
        </mesh>
        <mesh position={[0, -0.08, 0.195]} castShadow>
          <tubeGeometry args={[
            new QuadraticBezierCurve3(
              new Vector3(-0.045, 0, 0),
              new Vector3(0, -0.015, 0),
              new Vector3(0.045, 0, 0)
            ),
            32,
            0.003,
            8,
            false
          ]} />
          <meshStandardMaterial attach="material" color="#1a1512" roughness={0.2} metalness={0} />
        </mesh>
        <mesh position={[0, 0.12, -0.08]} castShadow>
          <sphereGeometry args={[0.2, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
          <meshStandardMaterial attach="material" color={hair} roughness={0.95} metalness={0} />
        </mesh>
      </group>
    </group>
  );
}
