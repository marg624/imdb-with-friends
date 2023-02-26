import Link from 'next/link'
import arrow from '../public/assets/arrow-icon.png';

type Props = {
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

const StartGame = ({
  onClick,
}: Props) => {

  return (
    <div className="flex justify-center" >
      <h3 className="text-3xl mb-3 leading-snug">
        <button onClick={onClick}> Generate new game! </button>
      </h3>
    </div>
  )
}

export default StartGame
