'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { set } from 'zod'
import { askQuestion } from '../utils/api'

const Question = () => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState()

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)
    const answer = await askQuestion(value)

    console.log('Handle submit: answer: ', answer)

    setResponse(answer)
    setValue('')
    setLoading(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-x-5">
        <input
          onChange={onChange}
          disabled={loading}
          value={value}
          type="text"
          placeholder="Ask a question"
          className="border border-black/20 px-4 py-2 text-lg rounded-lg"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-400 px-4 py-2 rounded-lg text-lg"
        >
          Ask
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {response && <div>{response}</div>}
    </div>
  )
}

export default Question
