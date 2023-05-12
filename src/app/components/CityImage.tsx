'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { getImageData } from '../api/search/imageData'
import { unsplashType } from '@/types/unsplashType'

// const imageSize = {
//     width: 400,
//     height: 400,
// }


export default function CityImage({ city }: { city?: string }) {

    const [image, setImage] = useState('')
    const [init, setInit] = useState(true)
    // const [count, setCount] = useState(0)
    const [imageSize, setImageSize] = useState({ width: 400, height: 400 } as { width: number, height: number } )
    // const [isLoding, setLoding] = useState(false)


    const handleImage = async (city: string) => {

        const res: unsplashType = await getImageData(city || 'tokyo')
        const length = res.results.length
        const random = Math.floor(Math.random() * length)
        const image = res.results[random].urls.regular
        const width = res.results[random].width
        const height = res.results[random].height
        setImageSize({ width, height })
        setImage(image)
        console.log(image)

    }
   
    useEffect(() => {
        if (!init) {
            handleImage(city || 'tokyo')
        } else {
            setInit(false)
        }
    }, [city])

    return (
        <div className='w-full h-screen rounded-md opacity-80 blur-2xl absolute -z-20 transition ease-in-out duration-1000'>
             {/* <p>{`Count: ${count}`}</p> */}
            <Image className='transition ease-in-out duration-1000' alt='picture' src={image} width={imageSize.width} height={imageSize.height}  />
        </div>
    )
}
