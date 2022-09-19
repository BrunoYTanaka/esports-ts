import React from 'react'

interface GameCardProps {
  title: string
  bannerUrl: string
  adsCount: number
}

const GameCard = ({ title, bannerUrl, adsCount }: GameCardProps) => {
  return (
    <a
      href="#"
      className="relative rounded-lg overflow-hidden hover:scale-110 transition-all "
    >
      <img src={bannerUrl} alt={title} />
      <div className="absolute bottom-0 left-0 right-0 w-full pt-16 pb-4 px-4 bg-game-gradient">
        <strong className="font-bold text-white block">{title}</strong>
        <span className="text-zinc-300 text-sm block">{adsCount} anúncios</span>
      </div>
    </a>
  )
}
export { GameCard }
