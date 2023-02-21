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
      <h3 className="text-3xl mb-3 leading-snug">
        <table style={{ width: 500}}  >
          <thead>
            <tr>
               <td className=" justify-between"> 
                 <Link
                  href={startUrl}
                  className="hover:underline">
                  {startName}
                  </Link>
                </td>
                <td className="flex justify-between"></td>
                <td className="justify-between">
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
              <td ><img src={startImageUrl} width="100px" /></td>
              <td > <img src={arrow.src} width="100px" /></td>
              <td ><img src={endImageUrl} width="100px" /></td>
            </tr>
          </tbody> 
        </table>
      </h3>
    </div>
  )
}

export default Game
