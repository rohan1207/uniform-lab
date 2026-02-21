import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const PIN_COLOR = '#b45309';
const PIN_HEAD = '#0f172a';

export function CityBuilding({ school, position, onSelect }) {
  const groupRef = useRef(null);
  const pinRef = useRef(null);

  useFrame((state) => {
    if (pinRef.current) {
      pinRef.current.position.y = 0.8 + Math.sin(state.clock.elapsedTime * 2.2) * 0.12;
    }
  });

  const [x, y, z] = position;
  const height = 2.2 + (school.name.length % 3) * 0.6;
  const color = [
    '#0f172a',
    '#1e293b',
    '#334155',
    '#475569',
  ][school.name.length % 4];

  return (
    <group
      ref={groupRef}
      position={[x, 0, z]}
      onClick={() => onSelect(school.id)}
      onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { document.body.style.cursor = 'default'; }}
    >
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, height, 1.2]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.1} />
      </mesh>
      <mesh position={[0, height + 0.08, 0]} castShadow>
        <boxGeometry args={[1.5, 0.12, 1.3]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} metalness={0.05} />
      </mesh>
      <mesh position={[0.32, height * 0.6, 0.52]} castShadow>
        <boxGeometry args={[0.15, 0.25, 0.02]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.2} />
      </mesh>
      <mesh position={[-0.32, height * 0.6, 0.52]} castShadow>
        <boxGeometry args={[0.15, 0.25, 0.02]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.2} />
      </mesh>

      <group ref={pinRef} position={[0, 0.8, 0]}>
        <mesh position={[0, 0.4, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.06, 0.5, 8]} />
          <meshStandardMaterial color={PIN_COLOR} roughness={0.5} metalness={0} />
        </mesh>
        <mesh position={[0, 0.75, 0]} castShadow>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color={PIN_HEAD} roughness={0.4} metalness={0.1} />
        </mesh>
      </group>
    </group>
  );
}
