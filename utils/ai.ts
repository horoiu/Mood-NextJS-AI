import { OpenAI } from 'langchain/llms/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { z } from 'zod'
import { PromptTemplate } from 'langchain/prompts'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry'),
    subject: z.string().describe('the subject of the journal entry.'),
    summary: z.string().describe('quick summary of the entire entry'),
    negative: z
      .boolean()
      .describe(
        'is the journal entry negative? (i.e. does it contains negative emotions?).'
      ),
    color: z
      .string()
      .describe(
        'a hexidecimal color that represents the mood of the entry. Example #0101fe for blue representing happiness.'
      ),
  })
)

export const analyse = async (content: string) => {
  const input = await getPrompt(content)

  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })

  const result = await model.generate([input])

  console.log('AI result: ', result.generations[0])
}

export const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the intrusctions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  })

  const input = await prompt.format({ entry: content })

  console.log('Input: ', input)

  return input
}
