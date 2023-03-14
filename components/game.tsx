import Link from 'next/link'
import arrow from '../public/assets/arrow-icon.png';
import redo from '../public/assets/redo.png';

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

  return (
    <div className="flex justify-center " > 
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
        <img src={redo.src} className="object-contain h-8 w-8 cursor-pointer"  style={{position: 'relative', top: 10, right: 40}} onClick={refresh} /> 

    </div>
  )
}

export default Game
