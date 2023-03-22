import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import React, {useState} from 'react'
import howto0 from '../public/assets/howto/howto0.png';


const HowTo = (props) => {

  return (
           <div>
              <h3 className="text-3xl mb-4 leading-snug">
              How To Play
              </h3>
              Find the connection between the 2 actors. You will be given options to choose from that take you from an actor to a work of art and vice versa.
              <br/>
              Give up? Don't recognize the actors? Click the refresh button on the top right corner to regenerate a pair of actors!

              <br/><br/>
              Example:
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
  )
}

export default HowTo
