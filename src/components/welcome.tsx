"use client"

import { FC } from 'react'

interface WelcomeProps {
  code: number | undefined
  setCode: React.Dispatch<React.SetStateAction<number | undefined>>
  setShowMessage: React.Dispatch<React.SetStateAction<boolean>>
  voyagers: any
  setChosenVoyager: React.Dispatch<React.SetStateAction<any>>
}

const Welcome: FC<WelcomeProps> = ({ code, setCode, setShowMessage, voyagers, setChosenVoyager }) => {

  const welcome = "images/Welcome.png"

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCode(event.target.value)
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    for (let i = 0; i < voyagers.length; i++) {
      console.log(voyagers[i].id)
      console.log(code)
      if (voyagers[i].id === Number(code)) {
        console.log("wow!")
        setChosenVoyager(voyagers[i])
        setShowMessage(true)
      }
    }
  }

  return (
    <div className='flex relative w-10/12 md:w-8/12 lg:w-7/12 m-auto aspect-[16/9]'>
      <div className='flex flex-col w-full h-auto my-auto'>
        <div
          className='bg-cover bg-center w-full aspect-[32/9] flex'
          style={{
            backgroundImage: `url(${welcome})`,
          }}
        ></div>
        <form onSubmit={handleSubmit} className='w-full flex'>
          <input
            className='w-2/3 aspect-[40/4] mx-auto mt-4 text-center placeholder-blue-500 font-semibold md:text-1xl lg:text-2xl border-2 lg:border-4 border-black border-solid'
            type="text"
            placeholder='INPUT VOYAGER ID'
            value={code}
            onChange={handleInputChange}
          ></input>
          <button type="submit" style={{ display: 'none' }}></button>
        </form>
      </div>
    </div>
  )
}

export default Welcome