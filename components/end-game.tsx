import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import React, {useState} from 'react'
import arrow from '../public/assets/arrow-icon.png';

type Props = {
  endMsg: string
  start: string
  end: string
  startImageUrl: string
  endImageUrl: string
}

const EndGame = ({
  endMsg, start, end, startImageUrl, endImageUrl
}: Props) => {

  let shareable = 'https://imdb-with-friends.vercel.app/?' + 'start=' + start + "&end=" + end

  return (
           <div>
              <h3 className="text-3xl mb-4 leading-snug text-center">
              Congrats!
              </h3>
              
              <table className="table-fixed shadow-md border-separate p-8" >
                <tbody>
                  <tr className="justify-between">
                    <td align="center"><div className="bg-white-300"><img src={startImageUrl} className="object-contain h-48 w-48" /><br/></div></td>
                    <td align="center"><div className="bg-white-300"><img src={arrow.src} className="object-contain h-24 w-24" /></div></td>
                    <td align="center"><div className="bg-white-300"><img src={endImageUrl} className="object-contain h-48 w-48" /><br/></div></td>
                  </tr>
                  <tr> <td/>
                    <td className="text-center"><em>{endMsg}</em><br/></td>
                    <td/>
                  </tr>
                </tbody> 
              </table>
              <br/>
              
              Use <a href={shareable}><strong>this</strong></a> link to share this game and see if your friends can get it in fewer connections!

          </div>
  )
}

export default EndGame
