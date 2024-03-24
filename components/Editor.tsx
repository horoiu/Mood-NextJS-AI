'use client'

import { useState } from 'react'
import { EntryProps } from '../app/(dashboard)/journal/[id]/page'
import { useAutosave } from 'react-autosave'
import { updateEntry } from '../utils/api'
import { set } from 'zod'

const Editor = ({ entry }: { entry: EntryProps }) => {
  const [value, setValue] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState(entry.analysis)

  const { mood, subject, summary, negative, color } = analysis

  const analysisData = [
    { name: 'Summary', val: summary },
    { name: 'Subject', val: subject },
    { name: 'Mood', val: mood },
    { name: 'Negative', val: negative ? 'True' : 'False' },
  ]

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true)

      const data = await updateEntry(entry.id, _value)

      setAnalysis(data.analysis)
      setIsLoading(false)
    },
  })

  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
        {isLoading && <div>...loading</div>}

        <textarea
          className="w-full h-full p-8 text-xl outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div className="border-l border-black/10">
        <div className="px-6 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-2xl">Analysis</h2>
        </div>

        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10"
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.val}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Editor
