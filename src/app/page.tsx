
import Head from "next/head"
import { toast } from "react-hot-toast"
import Weather from "./components/Weather";

const styles = {
  // searchContainer: ' flex justify-center w-full mt-4 my-2 h-12 items-center',
  bodyContainer: 'flex flex-col w-full ',
}


export default function Home() {

  return (
    <div>
      <Head>
        <meta name="description" content="A simple project for weather." />
        <title>Weather</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.bodyContainer} >

        <Weather />
      </div>

    </div>
  )
}
