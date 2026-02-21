import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { CityBuilding } from './CityBuilding';

const GROUND_COLOR = '#e2e8f0';
const ROAD_COLOR = '#64748b';

export function SchoolsCityScene({ schools, onSchoolSelect }) {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.04;
    }
  });

  const buildingPositions = [
    [-4, 0, -3],
    [4, 0, -4],
    [-5, 0, 4],
    [3, 0, 3],
  ];

  return (
    <>
      <color attach="background" args={['#cbd5e1']} />
      <fog attach="fog" args={['#94a3b8', 15, 45]} />

      <ambientLight intensity={0.85} />
      <directionalLight
        position={[12, 25, 12]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={60}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <directionalLight position={[-8, 15, -8]} intensity={0.35} />

      <group ref={groupRef}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color={GROUND_COLOR} roughness={0.95} metalness={0} />
        </mesh>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[30, 4]} />
          <meshStandardMaterial color={ROAD_COLOR} roughness={0.9} metalness={0} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[4, 30]} />
          <meshStandardMaterial color={ROAD_COLOR} roughness={0.9} metalness={0} />
        </mesh>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-8, 0.005, -8]} receiveShadow>
          <planeGeometry args={[4, 4]} />
          <meshStandardMaterial color="#86efac" roughness={0.95} metalness={0} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[8, 0.005, 8]} receiveShadow>
          <planeGeometry args={[3, 3]} />
          <meshStandardMaterial color="#86efac" roughness={0.95} metalness={0} />
        </mesh>

        {[[-7, 2], [6, -7], [-6, -6], [7, 0]].map(([px, pz], i) => (
          <mesh key={`filler-${i}`} position={[px, 1.2 + i * 0.3, pz]} castShadow receiveShadow>
            <boxGeometry args={[1.2, 2 + i * 0.4, 1]} />
            <meshStandardMaterial color="#475569" roughness={0.75} metalness={0.08} />
          </mesh>
        ))}

        {schools.map((school, i) => (
          <CityBuilding
            key={school.id}
            school={school}
            position={buildingPositions[i % buildingPositions.length]}
            onSelect={onSchoolSelect}
          />
        ))}
      </group>
    </>
  );
}
