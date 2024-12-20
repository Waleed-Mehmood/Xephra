import React from 'react'
import Navbar from '../components/Navbar'
import Herosection from '../components/Herosection'
import GamesCards from '../components/GamesCards'
import Tournaments from '../components/Tournaments'
import Prices from '../components/Prices'

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
