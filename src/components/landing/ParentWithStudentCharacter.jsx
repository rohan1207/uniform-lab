import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { QuadraticBezierCurve3, Vector3 } from 'three';
import { useLookTarget } from './LookTargetContext';

export function ParentWithStudentCharacter() {
  const parentHeadRef = useRef(null);
  const studentHeadRef = useRef(null);
  const lookTarget = useLookTarget();

  useFrame(() => {
    if (parentHeadRef.current) parentHeadRef.current.lookAt(lookTarget);
    if (studentHeadRef.current) studentHeadRef.current.lookAt(lookTarget);
  });

  const skin = '#e8d5c4';
  const eyes = '#1a1512';
  const parentTop = '#334155';
  const studentShirt = '#fafafa';
  const studentTie = '#b45309';
  const bag = '#0f172a';
  const uniformBlazer = '#4b5563';
  const uniformPants = '#374151';
  const hairParent = '#4a3728';
  const hairStudent = '#2d1f14';

  return (
    <group position={[0, -1.5, 0]} scale={1.85}>
      <mesh position={[0.14, 0.62, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.24, 0.28, 20]} />
        <meshStandardMaterial attach="material" color={parentTop} roughness={0.82} metalness={0.02} />
      </mesh>
      <mesh position={[0.14, 0.38, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.2, 0.1, 20]} />
        <meshStandardMaterial attach="material" color={parentTop} roughness={0.82} />
      </mesh>
      <mesh position={[0.14, 0.22, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.21, 0.22, 0.2, 20]} />
        <meshStandardMaterial attach="material" color="#1e293b" roughness={0.88} metalness={0} />
      </mesh>
      <mesh position={[0.06, 0.08, 0.02]} castShadow>
        <cylinderGeometry args={[0.065, 0.08, 0.18, 12]} />
        <meshStandardMaterial attach="material" color="#1e293b" roughness={0.88} />
      </mesh>
      <mesh position={[0.22, 0.08, 0.02]} castShadow>
        <cylinderGeometry args={[0.065, 0.08, 0.18, 12]} />
        <meshStandardMaterial attach="material" color="#1e293b" roughness={0.88} />
      </mesh>
      <mesh position={[0.14, 0.82, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.09, 0.1, 16]} />
        <meshStandardMaterial attach="material" color={skin} roughness={0.7} metalness={0} />
      </mesh>
      <mesh position={[0.36, 0.4, 0.06]} rotation={[0, 0, -0.1]} castShadow>
        <cylinderGeometry args={[0.038, 0.042, 0.32, 12]} />
        <meshStandardMaterial attach="material" color={parentTop} roughness={0.82} />
      </mesh>
      <mesh position={[0.46, 0.22, 0.08]} rotation={[0, 0, -0.06]} castShadow>
        <boxGeometry args={[0.11, 0.16, 0.06]} />
        <meshStandardMaterial attach="material" color={bag} roughness={0.9} metalness={0} />
      </mesh>
      <mesh position={[-0.08, 0.4, 0]} rotation={[0, 0, 0.04]} castShadow>
        <cylinderGeometry args={[0.036, 0.04, 0.3, 12]} />
        <meshStandardMaterial attach="material" color={parentTop} roughness={0.82} />
      </mesh>

      <group ref={parentHeadRef} position={[0.14, 0.94, 0]}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshStandardMaterial attach="material" color={skin} roughness={0.72} metalness={0} />
        </mesh>
        <mesh position={[0, 0.008, 0.17]} castShadow>
          <sphereGeometry args={[0.025, 12, 12]} />
          <meshStandardMaterial attach="material" color={skin} roughness={0.7} />
        </mesh>
        <mesh position={[0.06, 0.035, 0.165]} castShadow>
          <sphereGeometry args={[0.032, 16, 16]} />
          <meshStandardMaterial attach="material" color={eyes} roughness={0.2} />
        </mesh>
        <mesh position={[-0.06, 0.035, 0.165]} castShadow>
          <sphereGeometry args={[0.032, 16, 16]} />
          <meshStandardMaterial attach="material" color={eyes} roughness={0.2} />
        </mesh>
        <mesh position={[0.06, 0.075, 0.19]} castShadow>
          <boxGeometry args={[0.032, 0.01, 0.006]} />
          <meshStandardMaterial attach="material" color={hairParent} roughness={0.9} />
        </mesh>
        <mesh position={[-0.06, 0.075, 0.19]} castShadow>
          <boxGeometry args={[0.032, 0.01, 0.006]} />
          <meshStandardMaterial attach="material" color={hairParent} roughness={0.9} />
        </mesh>
        <mesh position={[0, -0.05, 0.175]} castShadow>
          <tubeGeometry args={[
            new QuadraticBezierCurve3(
              new Vector3(-0.05, 0, 0),
              new Vector3(0, -0.018, 0),
              new Vector3(0.05, 0, 0)
            ),
            32,
            0.003,
            8,
            false
          ]} />
          <meshStandardMaterial attach="material" color="#1a1512" roughness={0.2} metalness={0} />
        </mesh>
        <mesh position={[0, 0.08, -0.06]} castShadow>
          <sphereGeometry args={[0.18, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
          <meshStandardMaterial attach="material" color={hairParent} roughness={0.92} metalness={0} />
        </mesh>
      </group>

      <mesh position={[-0.3, 0.38, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.11, 0.13, 0.2, 20]} />
        <meshStandardMaterial attach="material" color={studentShirt} roughness={0.88} metalness={0} />
      </mesh>
      <mesh position={[-0.3, 0.32, 0.02]} castShadow receiveShadow>
        <cylinderGeometry args={[0.12, 0.13, 0.18, 20]} />
        <meshStandardMaterial attach="material" color={uniformBlazer} roughness={0.85} metalness={0.02} />
      </mesh>
      <mesh position={[-0.3, 0.16, 0.02]} castShadow receiveShadow>
        <cylinderGeometry args={[0.115, 0.12, 0.14, 20]} />
        <meshStandardMaterial attach="material" color={uniformPants} roughness={0.88} />
      </mesh>
      <mesh position={[-0.36, 0.06, 0.02]} castShadow>
        <cylinderGeometry args={[0.04, 0.05, 0.14, 10]} />
        <meshStandardMaterial attach="material" color={uniformPants} roughness={0.88} />
      </mesh>
      <mesh position={[-0.24, 0.06, 0.02]} castShadow>
        <cylinderGeometry args={[0.04, 0.05, 0.14, 10]} />
        <meshStandardMaterial attach="material" color={uniformPants} roughness={0.88} />
      </mesh>
      <mesh position={[-0.3, 0.52, 0]} castShadow>
        <cylinderGeometry args={[0.055, 0.065, 0.06, 14]} />
        <meshStandardMaterial attach="material" color={skin} roughness={0.7} />
      </mesh>
      <mesh position={[-0.3, 0.42, 0.14]} castShadow>
        <boxGeometry args={[0.03, 0.12, 0.006]} />
        <meshStandardMaterial attach="material" color={studentTie} roughness={0.6} />
      </mesh>
      <mesh position={[-0.42, 0.22, 0.04]} rotation={[0, 0, 0.12]} castShadow>
        <cylinderGeometry args={[0.022, 0.026, 0.2, 10]} />
        <meshStandardMaterial attach="material" color={studentShirt} roughness={0.88} />
      </mesh>
      <mesh position={[-0.5, 0.14, 0.05]} rotation={[0, 0, 0.06]} castShadow>
        <boxGeometry args={[0.06, 0.09, 0.018]} />
        <meshStandardMaterial attach="material" color={uniformBlazer} roughness={0.85} />
      </mesh>
      <mesh position={[-0.18, 0.22, 0]} rotation={[0, 0, -0.04]} castShadow>
        <cylinderGeometry args={[0.02, 0.024, 0.18, 10]} />
        <meshStandardMaterial attach="material" color={studentShirt} roughness={0.88} />
      </mesh>

      <group ref={studentHeadRef} position={[-0.3, 0.6, 0]}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.11, 28, 28]} />
          <meshStandardMaterial attach="material" color={skin} roughness={0.72} metalness={0} />
        </mesh>
        <mesh position={[0, 0.006, 0.105]} castShadow>
          <sphereGeometry args={[0.018, 10, 10]} />
          <meshStandardMaterial attach="material" color={skin} roughness={0.7} />
        </mesh>
        <mesh position={[0.035, 0.025, 0.1]} castShadow>
          <sphereGeometry args={[0.022, 14, 14]} />
          <meshStandardMaterial attach="material" color={eyes} roughness={0.2} />
        </mesh>
        <mesh position={[-0.035, 0.025, 0.1]} castShadow>
          <sphereGeometry args={[0.022, 14, 14]} />
          <meshStandardMaterial attach="material" color={eyes} roughness={0.2} />
        </mesh>
        <mesh position={[0.035, 0.055, 0.108]} castShadow>
          <boxGeometry args={[0.022, 0.008, 0.005]} />
          <meshStandardMaterial attach="material" color={hairStudent} roughness={0.9} />
        </mesh>
        <mesh position={[-0.035, 0.055, 0.108]} castShadow>
          <boxGeometry args={[0.022, 0.008, 0.005]} />
          <meshStandardMaterial attach="material" color={hairStudent} roughness={0.9} />
        </mesh>
        <mesh position={[0, -0.035, 0.105]} castShadow>
          <tubeGeometry args={[
            new QuadraticBezierCurve3(
              new Vector3(-0.03, 0, 0),
              new Vector3(0, -0.012, 0),
              new Vector3(0.03, 0, 0)
            ),
            32,
            0.0025,
            8,
            false
          ]} />
          <meshStandardMaterial attach="material" color="#1a1512" roughness={0.2} metalness={0} />
        </mesh>
        <mesh position={[0, 0.06, -0.04]} castShadow>
          <sphereGeometry args={[0.11, 20, 20, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <meshStandardMaterial attach="material" color={hairStudent} roughness={0.94} metalness={0} />
        </mesh>
      </group>
    </group>
  );
}
