'use client'

import { Environment, MeshPortalMaterial, OrbitControls, RoundedBox, Text, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { Yeti } from 'src/components/models/Yeti'
import { Ninja } from 'src/components/models/Ninja'
import { Tribal } from 'src/components/models/Tribal'
import { ReactNode } from 'react'

const MonsterStage = ({
  children,
  texture,
  text,
  textColor = 'black',
  ...props
}: {
  children: ReactNode
  texture: string
  text: string
  textColor?: string
}) => {
  const textureMap = useTexture(texture)

  return (
    <group {...props}>
      <Text font='fonts/Caprasimo-Regular.ttf' fontSize={0.3} position={[0, -1.4, 0.051]} anchorY={'bottom'}>
        {text}
        <meshBasicMaterial color={textColor} toneMapped={false} />
      </Text>
      <RoundedBox args={[2, 3, 0.1]}>
        <MeshPortalMaterial side={THREE.DoubleSide}>
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

export const PortalScene = ({ route = '/', ...props }) => {
  const monsterDefaults = { scale: 0.6, positionY: -1, rotationY: 0 }

  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset='sunset' />
      <OrbitControls />
      <MonsterStage texture={'textures/anime_undersea_water_trench_rocky.jpg'} text='Yeti'>
        <Yeti scale={monsterDefaults.scale} position-y={monsterDefaults.positionY} />
      </MonsterStage>
      <MonsterStage
        texture={'textures/anime_forested_jungle_spirited_away_space_planet.jpg'}
        position-x={-2.5}
        rotation-y={Math.PI / 8}
        text='Ninja'
      >
        <Ninja scale={monsterDefaults.scale} position-y={monsterDefaults.positionY} />
      </MonsterStage>
      <MonsterStage
        texture={'textures/digital_painting_lava_world.jpg'}
        position-x={2.5}
        rotation-y={-Math.PI / 8}
        text='Tribal'
      >
        <Tribal scale={monsterDefaults.scale} position-y={monsterDefaults.positionY} />
      </MonsterStage>
    </>
  )
}
