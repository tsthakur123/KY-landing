
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';


    
const Cyl = () => {
    let tex = useTexture("./image.png");
    let cyl = useRef(null);
    useFrame((state, delta) => {
        cyl.current.rotation.y += delta*.5;
    })

    useEffect(() => {
        // Function to handle mouse movement
        const handleMouseMove = (e) => {
          const { x, y } = e.detail;
    
          // Smoothly animate the cylinder's rotation with GSAP
          gsap.to(cyl.current.rotation, {
            x: -y * .2, // Rotate around the x-axis
            z: x * .2, // Rotate around the y-axis
            duration: 0.5, // Adjust duration for smoothness
            ease: "power2.out", // Ease out for smooth transition
          });
        };
    
        // Add the mousemove event listener
        window.addEventListener('mouseMoveOnCanvas', handleMouseMove);
    
        // Cleanup on unmount
        return () => window.removeEventListener('mouseMoveOnCanvas', handleMouseMove);
      }, []);
    

    return (
        <mesh ref={cyl} rotation={[0.2, 0, 0.1]}>
            <cylinderGeometry args={[1, 1, 1, 60, 60, true]} />
            <meshStandardMaterial map={tex} transparent side={THREE.DoubleSide} />
        </mesh>
    )
}

export default Cyl