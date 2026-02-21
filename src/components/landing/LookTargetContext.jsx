import { createContext, useContext, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const LookTargetContext = createContext(new THREE.Vector3(0, 0, 5));

export function useLookTarget() {
  return useContext(LookTargetContext);
}

export function LookTargetProvider({ mouse, bounds, children }) {
  const target = useRef(new THREE.Vector3(0, 1.2, 5));
  const temp = useRef(new THREE.Vector3());

  useFrame((state) => {
    if (!bounds?.width || !bounds?.height) return;
    const { camera } = state;
    const mx = mouse?.x ?? 0;
    const my = mouse?.y ?? 0;
    const ndcX = ((mx - bounds.left) / bounds.width) * 2 - 1;
    const ndcY = -((my - bounds.top) / bounds.height) * 2 + 1;
    temp.current.set(ndcX, ndcY, 0.5).unproject(camera);
    target.current.lerp(temp.current, 1);
  });

  return (
    <LookTargetContext.Provider value={target.current}>
      {children}
    </LookTargetContext.Provider>
  );
}
