'use client'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { getImageData } from '../api/search/imageData'
import { unsplashType } from '@/types/unsplashType'

// const imageSize = {
//     width: 400,
//     height: 400,
// }


export default function CityImage({ city }: { city?: string }) {

    const [image, setImage] = useState('')
    const isInitialRender = useRef(true)
    // const [count, setCount] = useState(0)
    const [imageSize, setImageSize] = useState({ width: 400, height: 400 } as { width: number, height: number } )
    // const [isLoding, setLoding] = useState(false)


    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false
            return
        }

        let cancelled = false

        const loadImage = async () => {
            const res: unsplashType = await getImageData(city || 'tokyo')
            if (cancelled || res.results.length === 0) return

            const random = Math.floor(Math.random() * res.results.length)
            const result = res.results[random]
            setImageSize({ width: result.width, height: result.height })
            setImage(result.urls.regular)
        }

        void loadImage()

        return () => {
            cancelled = true
        }
    }, [city])

    return (
        <div className='w-full h-screen rounded-md opacity-80 blur-2xl absolute -z-20 transition ease-in-out duration-1000'>
             {/* <p>{`Count: ${count}`}</p> */}
            <Image className='transition ease-in-out duration-1000' alt='picture' src={image} width={imageSize.width} height={imageSize.height}  />
        </div>
    )
}
