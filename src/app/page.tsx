"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Welcome from '@/components/welcome'
import Message from '@/components/message'
import { db } from "@/firebase-config"
import { collection, getDocs } from 'firebase/firestore'

export default function Home() {
  const [voyagers, setVoyagers] = useState<any>([])
  const [chosenVoyager, setChosenVoyager] = useState<any>(undefined)
  const [code, setCode] = useState<number | undefined>(undefined)
  const [showMessage, setShowMessage] = useState<boolean>(false)
  const usersCollectionRef = collection(db, "voyagers")

  const backgroundImage = "images/Background.png"

  useEffect(() => {
    
    async function getVoyagers() {
      const data = await getDocs(usersCollectionRef)
      setVoyagers(data.docs.map((doc) => ({ ...doc.data()})))
    }

    getVoyagers()
  }, [])

  console.log(voyagers)

  return (
    <div
      className="bg-cover bg-center h-screen w-screen flex"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {showMessage ? <Message chosenVoyager={chosenVoyager} setShowMessage={setShowMessage}/> : <Welcome setChosenVoyager={setChosenVoyager} voyagers={voyagers} code={code} setCode={setCode} setShowMessage={setShowMessage}/>}
    </div>
  )
}
