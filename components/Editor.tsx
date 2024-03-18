'use client'

import { useState } from 'react'
import { EntryProps } from '../app/(dashboard)/journal/[id]/page'

const Editor = ({ entry }: { entry: EntryProps }) => {
  const [value, setValue] = useState(entry.content)

  return (
    <div className="w-full h-full">
      <textarea
        className="w-full h-full p-8 text-xl outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export default Editor
