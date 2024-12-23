import React from 'react'
import Navbar from '../components/HomePageComponents/Navbar'
import Herosection from '../components/HomePageComponents/Herosection'
import GamesCards from '../components/HomePageComponents/GamesCards'
import Tournaments from '../components/HomePageComponents/Tournaments'
import Prices from '../components/HomePageComponents/Prices'

export default function Home() {
  return (<>
    <Navbar />
    <Herosection />
    <GamesCards />
    <Tournaments />
    <Prices />
    </>
  )
}
