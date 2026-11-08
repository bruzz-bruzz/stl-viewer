import { useLoader } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import * as THREE from 'three';
import './App.css'
export default function Model({ 
  url, 
  color, 
  position = [0, 0, 0],
  rotation = [0, 0, 0] 
}: { 
  url: string; 
  color: string; 
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const geometry = useLoader(STLLoader, url);
  const rotationRad = rotation.map(deg => THREE.MathUtils.degToRad(deg)) as [number, number, number];

  return (
    <mesh geometry={geometry} position={position} rotation={rotationRad}>
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
