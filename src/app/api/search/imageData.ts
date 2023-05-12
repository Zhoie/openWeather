import { unsplashType } from "@/types/unsplashType";

export async function getImageData(city: string) {
    const unsplashUrl = `https://api.unsplash.com/search/photos?query=${city}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`

    const res = await fetch(unsplashUrl)

    const data: unsplashType = await res.json()
    console.log(data)
    return data
}