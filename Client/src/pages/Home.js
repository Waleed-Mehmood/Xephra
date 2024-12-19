import React from 'react'
import Navbar from '../components/Navbar'
import Herosection from '../components/Herosection'
import GamesCards from '../components/GamesCards'
import Tournaments from '../components/Tournaments'

export default function Home() {
  return (<>
    <Navbar />
    <Herosection />
    <GamesCards />
    {/* <Tournaments /> */}
    </>
  )
}
