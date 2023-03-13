import Link from 'next/link'
import arrow from '../public/assets/arrow-icon.png';

type Props = {
  startName: string
  startUrl: string
  startImageUrl: string
  endName: string
  endUrl: string
  endImageUrl: string
}

const Game = ({
  startName,
  startUrl,
  startImageUrl,
  endName,
  endUrl,
  endImageUrl,
}: Props) => {
  return (
    <div className="flex justify-center" >
      <h3 className="text-2xl mb-2 leading-snug">
        <table className="table-fixed shadow-md border-separate p-8" >
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

    </div>
  )
}

export default Game
