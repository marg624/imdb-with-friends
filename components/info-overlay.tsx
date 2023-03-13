import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import React, {useState} from 'react'
import howto0 from '../public/assets/howto/howto0.png';


const InfoOverlay = (props) => {

  return (
        <div className="flex justify-center bg-black bg-opacity-50" style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          width: '100%',
          height: '100%'
        }} onClick={props.toggleFunc} >

           <div className="overflow-y-scroll bg-white shadow-2xl border-separate p-8 rounded-md" style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'left',
              width: '65%',
              height: '65%'
          }}>
              <h3 className="text-3xl mb-4 leading-snug">
              How To Play
              </h3>
              Find the connection between the 2 actors. You will be given options to choose from that take you from an actor to a work of art and vice versa.
              <br/><br/>
              For example:
              <br/>
                <img src={howto0.src}  /> 
              <br/>
              Connecting Natalie Portman to Angelina Jolie by the following: 
                  <ul className="list-inside list-disc">
                    <li>Natalie Portman <em>was in</em> Black Swan</li>
                    <li>Black Swan <em>starred</em> Winnona Ryder</li>
                    <li>Winnona Ryder <em>was in</em> Girl, Interrupted</li>
                    <li>Girl, Interrupted <em>starred</em> Angelina Jolie</li>
                  </ul> 
           

          </div>
       </div>
  )
}

export default InfoOverlay
