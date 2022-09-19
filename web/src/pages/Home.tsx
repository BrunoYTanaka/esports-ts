import logo from '../assets/logo-nlw-esports.png'
import { CreateAdBanner } from '../components/CreateAdBanner'
import { CustomDialog } from '../components/Dialog'
import { GameCard } from '../components/GameCard'
import { useGames } from '../hooks/useGames'

function Home() {
  const { games } = useGames()

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center m-20 p-4">
      <img src={logo} alt="Logo Esports NLW" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="bg-nlw-gradient bg-clip-text text-transparent">duo</span>{' '}
        está aqui
      </h1>
      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => (
          <GameCard
            key={game.id}
            title={game.title}
            bannerUrl={game.bannerUrl}
            adsCount={game._count.ads}
          />
        ))}
      </div>
      <CustomDialog>
        <CreateAdBanner />
      </CustomDialog>
    </div>
  )
}

export { Home }
