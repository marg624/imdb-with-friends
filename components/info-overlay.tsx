import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import React, {useState} from 'react'
import howto0 from '../public/assets/howto/howto0.png';
import HowTo from './how-to';
import EndGame from './end-game';

type Props = {
  showEnd?: boolean
  endMsg?: string
  start?: string
  end?: string
  startImageUrl?: string
  endImageUrl?: string
  toggleFunc: React.MouseEventHandler<HTMLDivElement>
}

const InfoOverlay = ({
  showEnd, endMsg, start, end, startImageUrl, endImageUrl, toggleFunc
}: Props) => {

  return (
        <div className="flex justify-center bg-black bg-opacity-50" style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          width: '100%',
          height: '100%'
        }}>

           <div className="overflow-scroll bg-white shadow-2xl border-separate p-8 rounded-md" style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'left',
              width: '75%',
              height: '75%'
          }}>
            <div style={{position: 'absolute', top: 5, right: 15}} onClick={toggleFunc} > <h1 className="text-3xl mb-4 cursor-pointer text-slate-300">x</h1> </div>
            { !showEnd &&  <HowTo /> }
            { (showEnd && endMsg && start && end && startImageUrl && endImageUrl ) && <EndGame endMsg={endMsg} start={start} end={end} startImageUrl={startImageUrl} endImageUrl={endImageUrl} /> }
          </div>
       </div>
  )
}

export default InfoOverlay
