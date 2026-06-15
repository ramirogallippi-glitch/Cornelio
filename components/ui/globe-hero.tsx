"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { PerspectiveCamera } from "@react-three/drei"
import React, { useRef } from "react"
import * as THREE from "three"

const Globe: React.FC<{ rotationSpeed: number; radius: number }> = ({ rotationSpeed, radius }) => {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed
      groupRef.current.rotation.x += rotationSpeed * 0.3
      groupRef.current.rotation.z += rotationSpeed * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[radius, 48, 48]} />
        <meshBasicMaterial color="#C9A84C" transparent opacity={0.12} wireframe />
      </mesh>
      <mesh>
        <sphereGeometry args={[radius * 0.98, 24, 24]} />
        <meshBasicMaterial color="#C4727A" transparent opacity={0.05} wireframe />
      </mesh>
    </group>
  )
}

interface GlobeHeroProps {
  rotationSpeed?: number
  globeRadius?: number
  children?: React.ReactNode
}

export function GlobeHero({ rotationSpeed = 0.003, globeRadius = 1.4, children }: GlobeHeroProps) {
  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", padding: "0 24px" }}>
        {children}
      </div>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.7 }}>
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 3.5]} fov={65} />
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 5, 5]} intensity={1.2} color="#F5C518" />
          <pointLight position={[-5, -5, -5]} intensity={0.4} color="#C4727A" />
          <Globe rotationSpeed={rotationSpeed} radius={globeRadius} />
        </Canvas>
      </div>
    </div>
  )
}

export default GlobeHero
