'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { set } from 'zod'

const Question = () => {
  const [value, setValue] = useState('')

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // do things here
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-x-5">
        <input
          onChange={onChange}
          value={value}
          type="text"
          placeholder="Ask a question"
          className="border border-black/20 px-4 py-2 text-lg rounded-lg"
        />
        <button
          type="submit"
          className="bg-blue-400 px-4 py-2 rounded-lg text-lg"
        >
          Ask
        </button>
      </form>
    </div>
  )
}

export default Question
