'use client'

import React, { useState } from 'react'
import { getWeatherData } from '../api/search/weatherData'

import { weatherType } from '@/types/weatherType'
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const styles = {
    bodyContainer: 'flex flex-col',
    searchContainer: ' flex justify-center w-full mt-4 my-2 h-12 items-center',
    searchInput: 'text-black flex-1 max-w-[50ch] h-full bg-white ml-10 text-center rounded-lg outline-none border-4 border-black',
    searchBtn: 'text-white flex items-center justify-center w-12 h-full text-2xl text-black font-semibold active:scale-90  duration-200',
    // bgImg: 'max-w-[30ch] mx-auto justify-center items-center rounded-lg shadow-md',
    weatherGroup: 'flex flex-col sm:flex-row item-center  justify-center ',
    weatherContainer: 'flex flex-col mx-10 max-w-[40ch]',
    weatherTitle: 'flex text-4xl text-center mt-4 font-bold border-4 p-4 rounded-lg border-black ',
    weatherContent: 'first:mt-4 text-xl font-semibold',
    // weatherContainer: 'flex flex-col ml-10 max-w-[20ch] h-full mt-4',
    gradientColor: ' hover:text-black hover:cursor-pointer hover:bg-gradient-to-br  hover:from-zinc-400 hover:to-sky-200 transform-color duration-500',

}

export default function Weather() {

    const [data, setData] = useState<weatherType>()
    const [search, setSearch] = useState('tokyo')

    const [init, setInit] = useState(true)

    const handleSearchClick = async (city: string) => {
        const res: weatherType = await getWeatherData(city || 'tokyo')

        // const cod = res.cod.toString()

        // // if (cod === '200') {
        setData(res)
        // // }else{
        // //     toast.error('City not found')
        // // } 
        
    }

    if (init) {
        handleSearchClick('tokyo')
        setInit(false)
    }

    return (

        <div className={styles.bodyContainer} >
            <div className={styles.searchContainer}>
                <input className={styles.searchInput} type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                <button className='text-white flex items-center justify-center w-12 h-full text-2xl font-semibold active:scale-90  duration-200' title="search" type="button" onClick={() => handleSearchClick(search)} >
                    <FaSearch />
                </button>
            </div>
            {/* temperature */}
            {/* <button className='p-4'  type='button'>Check</button> */}
            <div className={styles.weatherGroup}>
                <div className={styles.weatherContainer} >
                    <button type="button" className={`${styles.weatherTitle}${styles.gradientColor}`} >{data?.name}</button>
                    <p className={styles.weatherContent}>Temprature: {data?.main.temp}°C</p>
                    <p className={styles.weatherContent}>Feels like: {data?.main.feels_like}°C</p>
                    <p className={styles.weatherContent}>Max: {data?.main.temp_max}°C</p>
                    <p className={styles.weatherContent}>Min: {data?.main.temp_min}°C</p>
                    <p className={styles.weatherContent}>Humidity: {data?.main.humidity}%</p>
                </div>
                {/* weather */}
                <div className={styles.weatherContainer}>
                    <h1 className={styles.weatherTitle}>Weather</h1>
                    <p className={styles.weatherContent}>{data?.weather[0].main}</p>
                    <p className={styles.weatherContent}>{data?.weather[0].description}</p>
                </div>
                {/* wind */}
                <div className={styles.weatherContainer}>
                    <h1 className={styles.weatherTitle}>Wind</h1>
                    <p className={styles.weatherContent}>Speed: {data?.wind.speed}m/s</p>
                    <p className={styles.weatherContent}>Deg: {data?.wind.deg}°</p>
                    <p className={styles.weatherContent}>gust: {data?.wind.gust}meter/sec</p>
                </div>
            </div>

        </div>
    )
}
