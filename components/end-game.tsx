import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import React, {useState} from 'react'
import arrow from '../public/assets/arrow-icon.png';
import share from '../public/assets/share.png';
import {CopyToClipboard} from 'react-copy-to-clipboard';

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
  const [copied, setCopied] = useState(false)

  function sayCopied() {
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1000);
  };

  return (
           <div>

                <h3 className="text-3xl mb-4 leading-snug">
                Congrats!
                </h3>
                
                <table className="shadow-md border-separate p-8" >
                  <tbody>
                    <tr className="justify-between">
                      <td align="center"><div className="bg-white-300"><img src={startImageUrl} className="object-contain h-48 w-48" /><br/></div></td>
                      <td align="center"><img src={arrow.src} className="object-contain h-10 w-10" /></td>
                      <td align="center"><div className="bg-white-300"><img src={endImageUrl} className="object-contain h-48 w-48" /><br/></div></td>
                    </tr>
                  </tbody> 
                </table>


              <br/>
              <em>{endMsg}</em><br/>
              
                <span className="flex items-center justify-between px-4 py-2">
                <CopyToClipboard text={shareable} onCopy={() => sayCopied()}>
                 <img src={share.src} className="object-contain h-10 w-10 cursor-pointer " />  
                 </CopyToClipboard>  
                 <span className="justify-between px-4 py-2">
                 Share this game and see if your friends can get it in fewer connections!
                 </span>
                </span> 
              

              <br/>
          {copied && <span className="bg-black text-white text-right"> Copied! </span>} <br/>

          </div>
  )
}

export default EndGame
