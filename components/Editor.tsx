'use client'

import { useState } from 'react'
import { EntryProps } from '../app/(dashboard)/journal/[id]/page'
import { useAutosave } from 'react-autosave'
import { updateEntry } from '../utils/api'

const Editor = ({ entry }: { entry: EntryProps }) => {
  const [value, setValue] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true)
      const update = await updateEntry(entry.id, _value)
      setIsLoading(false)
    },
  })

  return (
    <div className="w-full h-full">
      {isLoading && <div>...loading</div>}

      <textarea
        className="w-full h-full p-8 text-xl outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export default Editor
