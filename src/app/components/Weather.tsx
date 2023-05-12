'use client'

import React, { use, useState } from 'react'
import { getWeatherData } from '../api/search/weatherData'

import { weatherType } from '@/types/weatherType'
import { FaSearch } from 'react-icons/fa';
import CityImage from './CityImage';

const styles = {
    bodyContainer: 'flex flex-col',
    searchContainer: ' flex justify-center w-full mt-4 my-2 h-12 items-center',
    searchInput: 'text-black flex-1 max-w-[50ch] h-full bg-white ml-10 text-center rounded-lg outline-none border-4 border-black',
    searchBtn: 'text-white flex items-center justify-center w-12 h-full text-2xl text-black font-semibold active:scale-90  duration-200',
    weatherGroup: 'flex flex-col w-full sm:flex-row justify-center ',
    weatherContainer: 'flex flex-col p-4 max-w-[40ch] ',
    weatherTitle: 'flex text-4xl mt-4 font-bold p-4 rounded-lg  ',
    weatherContent: 'first:mt-4 text-xl font-semibold',
    // weatherContainer: 'flex flex-col ml-10 max-w-[20ch] h-full mt-4',
    gradientColor: ' hover:text-black hover:cursor-pointer hover:bg-gradient-to-br  hover:from-zinc-400 hover:to-sky-200 transform-color duration-500',
    bgImg: '',
}

export default function Weather() {

    const [data, setData] = useState<weatherType>()
    const [search, setSearch] = useState('tokyo')
    const [name, setName] = useState('tokyo')


    const [init, setInit] = useState(true)

    const handleSearchClick = async (city: string) => {
        const res: weatherType = await getWeatherData(city || 'tokyo')
        setData(res)
        setName(city)

    }

    const handleSearchEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const res: weatherType = await getWeatherData(search || 'tokyo')
            setData(res)
        }
    }

    const handleWikiClick = () => {
        const url = `https://en.wikipedia.org/wiki/${name}`
        window.open(url, '_blank')
    }


    if (init) {
        handleSearchClick('tokyo')
        setInit(false)
    }

    return (

        <div className={styles.bodyContainer} >
            <div className={styles.searchContainer}>
                <input className={styles.searchInput} type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleSearchEnter} onFocus={() => setSearch('')} />
                <button className='text-white flex items-center justify-center w-12 h-full text-2xl font-semibold active:scale-90  duration-200' title="search" type="button" onClick={() => handleSearchClick(search)} >
                    <FaSearch />
                </button>
            </div>
            {/* temperature */}
            {/* <button className='p-4'  type='button'>Check</button> */}
            <div className={styles.weatherGroup}>
                <div className={styles.weatherContainer} >
                    <button onClick={handleWikiClick} type="button" className={`${styles.weatherTitle}${styles.gradientColor}`} >{data?.name}</button>
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

            {/* <div className='mx-10'> */}
                <CityImage city={name} />
            {/* </div> */}


        </div>
    )
}
