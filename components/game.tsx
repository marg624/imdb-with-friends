import Link from 'next/link'
import arrow from '../public/assets/arrow-icon.png';
import redo from '../public/assets/redo.png';
import empty from '../public/assets/redo-empty.png';
import share from '../public/assets/share.png';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import React, {useState} from 'react';

type Props = {
  startName: string
  startUrl: string
  startImageUrl: string
  endName: string
  endUrl: string
  endImageUrl: string
  onClick: Function
}

const Game = ({
  startName,
  startUrl,
  startImageUrl,
  endName,
  endUrl,
  endImageUrl,
  onClick
}: Props) => {

  function refresh() {
    onClick()
  }

  const [copied, setCopied] = useState(false)

  function getId(url) {
    let str = url.split("/")
    for (const x of str) { 
      if(x.startsWith("nm") || x.startsWith("tt")) {
        return x
      }
    }
    return null
  }

  let shareable = 'https://imdb-with-friends.vercel.app/?' + 'start=' + getId(startUrl) + "&end=" + getId(endUrl) 

  function sayCopied() {
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1000);
  };

  return (
    <div className="flex justify-center " > 
    <span className="flex justify-left " style={{position: 'relative', top: 10, left: 60}}>
          <CopyToClipboard text={shareable} onCopy={() => sayCopied()}>
            <img src={share.src} className="object-contain h-6 w-6 cursor-pointer " />  
          </CopyToClipboard>  
          {!copied && <span className="bg-white text-black text-left h-6 w-6 "></span>} 
          {copied && <span className="bg-white text-black text-left h-6 w-6"> Copied! </span>} 
     </span>
      <h3 className="text-2xl mb-2 leading-snug">
        <table className="table-fixed shadow-md border-separate p-10" >
          <thead>
            <tr>
               <td className="text-center justify-between"> 
                 <Link
                  href={startUrl}
                  className="hover:underline">
                  {startName}
                  </Link>
                </td>
                <td className="justify-between"> </td>
                <td className="text-center justify-between">
                  <Link
                    href={endUrl}
                    className="hover:underline">
                    {endName}
                  </Link>
                </td>
            </tr>
          </thead>
          <tbody>
            <tr className="justify-between">
              <td align="center"><div className="bg-white-300"><img src={startImageUrl} className="object-contain h-48 w-48" /><br/></div></td>
              <td align="center"><img src={arrow.src} className="object-contain h-40 w-40" /></td>
              <td align="center"><div className="bg-white-300"><img src={endImageUrl}  className="object-contain h-48 w-48" /><br/></div></td>
            </tr>
          </tbody> 
        </table>
      </h3>
        <span className="flex-nowrap" style={{position: 'relative', top: 10, right: 40}}>
          <img src={redo.src} className="h-6 w-6 cursor-pointer"  onClick={refresh} /> 
        </span>
        
    </div>
  )
}

export default Game
