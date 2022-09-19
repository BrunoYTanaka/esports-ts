import * as Checkbox from '@radix-ui/react-checkbox'
import * as Dialog from '@radix-ui/react-dialog'
import * as ToogleGroup from '@radix-ui/react-toggle-group'
import { Check, GameController } from 'phosphor-react'
import { FormEvent, ReactNode, useState } from 'react'

import { useGames } from '../../hooks/useGames'
import api from '../../services/api'
import { Input } from '../Form/Input'
import { CustomSelect } from '../Form/Select'

interface CustomDialogProps {
  children: ReactNode
}

const CustomDialog = ({ children }: CustomDialogProps) => {
  const { games } = useGames()
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)

  const handleCreateAd = async (e: FormEvent) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)

    const data = Object.fromEntries(formData)

    if (!data.name) {
      return
    }

    try {
      await api.post(`/games/${data.gameId}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel,
      })
    } catch (error) {
      console.error('Erro ao criar anúncio: ', error)
    }
  }

  const handleCheckUseVoiceChannel = (checked: Checkbox.CheckedState) => {
    setUseVoiceChannel(checked === true)
  }

  return (
    <Dialog.Root>
      {children}
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
        <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
          <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
          <form className="mt-8 flex flex-col gap-4" onSubmit={handleCreateAd}>
            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="game">
                Qual o game?
              </label>
              <CustomSelect data={games} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name">Seu nome (ou nickname)</label>
              <Input
                name="name"
                id="name"
                type="text"
                placeholder="Como te chamam dentro do game?"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                <Input
                  name="yearsPlaying"
                  id="yearsPlaying"
                  type="number"
                  placeholder="Tudo bem ser ZERO"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="discord">Qual seu Discord?</label>
                <Input
                  name="discord"
                  id="discord"
                  type="text"
                  placeholder="Usuario#0000"
                />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="weekDays">Quando costuma jogar?</label>

                <ToogleGroup.Root
                  onValueChange={setWeekDays}
                  value={weekDays}
                  type="multiple"
                  className="grid grid-cols-4 gap-2"
                >
                  <ToogleGroup.Item
                    value="0"
                    title="Domingo"
                    className={`w-8 h-8 rounded font-bold ${
                      weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'
                    }`}
                  >
                    D
                  </ToogleGroup.Item>
                  <ToogleGroup.Item
                    value="1"
                    title="Segunda"
                    className={`w-8 h-8 rounded font-bold ${
                      weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'
                    }`}
                  >
                    S
                  </ToogleGroup.Item>
                  <ToogleGroup.Item
                    value="2"
                    title="Terça"
                    className={`w-8 h-8 rounded font-bold ${
                      weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'
                    }`}
                  >
                    T
                  </ToogleGroup.Item>
                  <ToogleGroup.Item
                    value="3"
                    title="Quarta"
                    className={`w-8 h-8 rounded font-bold ${
                      weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'
                    }`}
                  >
                    Q
                  </ToogleGroup.Item>
                  <ToogleGroup.Item
                    value="4"
                    title="Quinta"
                    className={`w-8 h-8 rounded font-bold ${
                      weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'
                    }`}
                  >
                    Q
                  </ToogleGroup.Item>
                  <ToogleGroup.Item
                    value="5"
                    title="Sexta"
                    className={`w-8 h-8 rounded font-bold ${
                      weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'
                    }`}
                  >
                    S
                  </ToogleGroup.Item>
                  <ToogleGroup.Item
                    value="6"
                    title="Sábado"
                    className={`w-8 h-8 rounded font-bold ${
                      weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'
                    }`}
                  >
                    S
                  </ToogleGroup.Item>
                </ToogleGroup.Root>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="hourStart">Qual horário do dia?</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input name="hourStart" id="hourStart" type="time" placeholder="De" />
                  <Input name="hourEnd" id="hourEnd" type="time" placeholder="Até" />
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-2 text-sm">
              <Checkbox.Root
                className="w-6 h-6 p-1 rounded bg-zinc-900"
                id="cb"
                checked={useVoiceChannel}
                onCheckedChange={handleCheckUseVoiceChannel}
              >
                <Checkbox.CheckboxIndicator>
                  <Check className="w-4 h-4 text-emerald-400" />
                </Checkbox.CheckboxIndicator>
              </Checkbox.Root>
              <label htmlFor="cb" className="cursor-pointer">
                Costumo me conectar ao chat de voz
              </label>
            </div>

            <footer className="mt-4 flex justify-end gap-4">
              <Dialog.Close
                type="button"
                className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-700 transition-all duration-300 hover:scale-110"
              >
                Cancelar
              </Dialog.Close>
              <button
                type="submit"
                className="flex items-center gap-3 bg-violet-500 px-5 h-12 rounded-md font-semibold hover:bg-violet-700 transition-all duration-300 hover:scale-110"
              >
                <GameController size={24} /> Encontrar duo
              </button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export { CustomDialog }
