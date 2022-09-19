import { GamesProvider } from './hooks/useGames'
import { Home } from './pages/Home'

function App() {
  return (
    <GamesProvider>
      <Home />
    </GamesProvider>
  )
}

export default App
