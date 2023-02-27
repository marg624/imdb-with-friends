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
        <table class="table-fixed" >
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
              <td align="center"><img src={startImageUrl} width="60%" max-width="300px"  /></td>
              <td align="center"><img src={arrow.src} width="80%" max-width="150px" /></td>
              <td align="center"><img src={endImageUrl} width="60%" max-width="300px"  /></td>
            </tr>
          </tbody> 
        </table>
      </h3>
    </div>
  )
}

export default Game
