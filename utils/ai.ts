import { OpenAI } from 'langchain/llms/openai'

export const analyse = async (prompt: string[]) => {
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })

  const result = await model.generate(prompt)

  console.log('AI result: ', result.generations[0])
}
