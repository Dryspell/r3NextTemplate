'use client'

import dynamic from 'next/dynamic'

const Blob = dynamic(() => import('src/components/canvas/Examples').then((mod) => mod.Blob), { ssr: false })
const View = dynamic(() => import('src/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex flex-col items-center justify-center w-full h-96'>
      <svg className='w-5 h-5 mr-3 -ml-1 text-black animate-spin' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const Common = dynamic(() => import('src/components/canvas/View').then((mod) => mod.Common), { ssr: false })

export default function Page() {
  return (
    <>
      <div className='flex flex-col flex-wrap items-center w-full mx-auto md:flex-row lg:w-4/5'>
        <div className='flex flex-col items-start justify-center w-full p-12 text-center md:w-2/5 md:text-left'>
          <p className='w-full uppercase'>Next + React Three Fiber</p>
          <h1 className='my-4 text-5xl font-bold leading-tight'>Next 3D Starter</h1>
          <p className='mb-8 text-2xl leading-normal'>A minimalist starter for React, React-three-fiber and Threejs.</p>
        </div>
      </div>

      <View className='absolute top-0 flex flex-col items-center justify-center w-full h-screen'>
        <Blob />
        <Common />
      </View>
    </>
  )
}
