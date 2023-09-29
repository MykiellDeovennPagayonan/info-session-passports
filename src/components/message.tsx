"use client"

import { useState, FC, useEffect } from "react"

interface MessageProps {
  chosenVoyager: any
  setShowMessage: React.Dispatch<React.SetStateAction<boolean>>
}

const Message: FC<MessageProps> = ({chosenVoyager, setShowMessage}) => {
  const [experience, setExperience] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (chosenVoyager) {
      if (chosenVoyager.year === 1) {
        setExperience("novice")
      }
      if (chosenVoyager.year === 2) {
        setExperience("seasoned")
      }
      if (chosenVoyager.year === 3) {
        setExperience("expert")
      }
      if (chosenVoyager.year >= 4) {
        setExperience("veteran")
      }
    }
  }, [chosenVoyager])

  const textBox = "images/text_box.png"
  const mascot = "images/mascot.png"

  return (
    <div
      className='bg-cover bg-center relative w-10/12 md:w-8/12 lg:w-7/12 m-auto aspect-[16/9] flex'
      style={{
        backgroundImage: `url(${textBox})`,
      }}
    >

      <div className="text-white text-center items-center m-auto w-10/12 h-10/12 font-semibold md:text-2xl lg:text-3xl ">
        Greetings {experience} adventurer {chosenVoyager.name} of {chosenVoyager.course}. We are elated for you to join us in exploring the UNKNOWN.
      </div>

      <div
        className='bg-cover bg-center bottom-0 absolute w-1/12 aspect-[3/6] flex'
        style={{
          backgroundImage: `url(${mascot})`,
        }}
        onClick={() => setShowMessage(false)}
      >

      </div>
    </div>
  )
}

export default Message