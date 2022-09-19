import * as Select from '@radix-ui/react-select'
import { CaretDown, CaretUp } from 'phosphor-react'

type DataValue = {
  id: string
  title: string
}

interface SelectInputProps {
  data: DataValue[]
}

const CustomSelect = ({ data }: SelectInputProps) => {
  return (
    <Select.Root name="gameId">
      <Select.Trigger
        name="game"
        aria-label="game"
        className="flex justify-between items-center bg-zinc-900 py-3 px-4 rounded text-sm [&[data-placeholder]]:text-zinc-500"
      >
        <Select.Value placeholder="Selecione o game que deseja jogar" />
        <Select.Icon>
          <CaretDown className="w-6 h-6 text-zinc-400" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="bg-zinc-900 rounded overflow-hidden">
          <Select.ScrollUpButton>
            <CaretUp className="w-6 h-6 fill-zinc-400" />
          </Select.ScrollUpButton>
          <Select.Viewport className="cursor-pointer">
            {data.map((item) => {
              return (
                <Select.Item
                  key={item.id}
                  value={item.id}
                  className="flex justify-between items-center bg-zinc-900 py-3 px-4 rounded text-sm text-white hover:bg-zinc-500 transition-colors duration-300 "
                >
                  <Select.ItemText>{item.title}</Select.ItemText>
                </Select.Item>
              )
            })}
          </Select.Viewport>
          <Select.ScrollDownButton>
            <CaretDown className="w-6 h-6 fill-zinc-400" />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

export { CustomSelect }
