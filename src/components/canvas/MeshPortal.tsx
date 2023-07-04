'use client'

import {
  CameraControls,
  Environment,
  MeshPortalMaterial,
  OrbitControls,
  RoundedBox,
  Text,
  useCursor,
  useTexture,
} from '@react-three/drei'
import * as THREE from 'three'
import { Yeti } from 'src/components/models/Yeti'
import { Ninja } from 'src/components/models/Ninja'
import { Tribal } from 'src/components/models/Tribal'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { easing } from 'maath'

const MonsterStage = ({
  children,
  texture,
  monsterName,
  textColor = 'black',
  activeMonster,
  setActiveMonster,
  hoveredMonster,
  setHoveredMonster,
  ...props
}: {
  children: ReactNode
  texture: string
  monsterName: string
  textColor?: string
  activeMonster: string | null
  setActiveMonster: React.Dispatch<React.SetStateAction<string | null>>
  hoveredMonster: string | null
  setHoveredMonster: React.Dispatch<React.SetStateAction<string | null>>
}) => {
  const textureMap = useTexture(texture)
  const portalMaterial = useRef()

  useFrame((_state, delta) => {
    easing.damp(portalMaterial.current, 'blend', activeMonster === monsterName ? 1 : 0, 0.1, delta)
  })

  return (
    <group {...props}>
      <Text font='fonts/Caprasimo-Regular.ttf' fontSize={0.3} position={[0, -1.4, 0.051]} anchorY={'bottom'}>
        {monsterName}
        <meshBasicMaterial color={textColor} toneMapped={false} />
      </Text>
      <RoundedBox
        name={monsterName}
        args={[2, 3, 0.1]}
        onDoubleClick={() => {
          // console.log(`clicked ${monsterName}, active: ${activeMonster}`)
          setActiveMonster(activeMonster === monsterName ? null : monsterName)
        }}
        onPointerEnter={() => {
          setHoveredMonster(monsterName)
        }}
        onPointerLeave={() => {
          setHoveredMonster(null)
        }}
      >
        <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
          <ambientLight intensity={1} />
          <Environment preset='sunset' />
          {children}
          <mesh>
            <meshStandardMaterial map={textureMap} side={THREE.BackSide} />
            <sphereGeometry args={[5, 64, 64]} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  )
}

const MONSTER_DEFAULTS = { scale: 0.6, positionY: -1, rotationY: 0 }

export const PortalScene = ({ route = '/', ...props }) => {
  const [activeMonster, setActiveMonster] = useState<string | null>(null)
  const [hoveredMonster, setHoveredMonster] = useState<string | null>(null)

  useCursor(Boolean(hoveredMonster))

  const cameraControlsRef = useRef()
  const scene = useThree((state) => state.scene)

  useEffect(() => {
    if (activeMonster) {
      const targetPosition = new THREE.Vector3()
      scene.getObjectByName(activeMonster)?.getWorldPosition(targetPosition)
      cameraControlsRef?.current && // @ts-expect-error
        cameraControlsRef?.current?.setLookAt(0, 0, 10 / 2, targetPosition.x, targetPosition.y, targetPosition.z, true)
    } else {
      cameraControlsRef?.current && //@ts-expect-error
        cameraControlsRef?.current?.setLookAt(0, 0, 10, 0, 0, 0, true)
    }
  }, [activeMonster])

  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset='sunset' />
      <CameraControls ref={cameraControlsRef} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 6} />
      {/* <OrbitControls /> */}
      <MonsterStage
        texture={'textures/anime_undersea_water_trench_rocky.jpg'}
        monsterName='Yeti'
        activeMonster={activeMonster}
        setActiveMonster={setActiveMonster}
        hoveredMonster={hoveredMonster}
        setHoveredMonster={setHoveredMonster}
      >
        <Yeti
          scale={MONSTER_DEFAULTS.scale}
          position-y={MONSTER_DEFAULTS.positionY}
          hovered={hoveredMonster === 'Yeti'}
        />
      </MonsterStage>
      <MonsterStage
        texture={'textures/anime_forested_jungle_spirited_away_space_planet.jpg'}
        position-x={-2.5}
        rotation-y={Math.PI / 8}
        monsterName='Ninja'
        activeMonster={activeMonster}
        setActiveMonster={setActiveMonster}
        hoveredMonster={hoveredMonster}
        setHoveredMonster={setHoveredMonster}
      >
        <Ninja
          scale={MONSTER_DEFAULTS.scale}
          position-y={MONSTER_DEFAULTS.positionY}
          hovered={hoveredMonster === 'Ninja'}
        />
      </MonsterStage>
      <MonsterStage
        texture={'textures/digital_painting_lava_world.jpg'}
        position-x={2.5}
        rotation-y={-Math.PI / 8}
        monsterName='Tribal'
        activeMonster={activeMonster}
        setActiveMonster={setActiveMonster}
        hoveredMonster={hoveredMonster}
        setHoveredMonster={setHoveredMonster}
      >
        <Tribal
          scale={MONSTER_DEFAULTS.scale}
          position-y={MONSTER_DEFAULTS.positionY}
          hovered={hoveredMonster === 'Tribal'}
        />
      </MonsterStage>
    </>
  )
}
