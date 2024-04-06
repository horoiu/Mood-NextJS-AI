import { OpenAI } from 'langchain/llms/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { z } from 'zod'
import { PromptTemplate } from 'langchain/prompts'
import { EntryProps } from '../app/(dashboard)/journal/[id]/page'
import { Document } from 'langchain/document'
import { loadQARefineChain } from 'langchain/chains'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    sentimentScore: z
      .number()
      .describe(
        'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'
      ),
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
        'a hexidecimal color that represents the mood of the entry. Example #0101fe for blue representing happiness. Need to avoid the blackish colors as the font color is black.'
      ),
  })
)

export const analyse = async (content: string) => {
  const input = await getPrompt(content)

  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })

  const result = await model.invoke(input)

  try {
    return parser.parse(result)
  } catch (error) {
    console.log(error)
  }
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

  return input
}

export const qa = async (
  question: string,
  entries: Pick<EntryProps, 'content' | 'id' | 'createdAt'>[]
) => {
  const docs = entries.map((entry) => {
    return new Document({
      pageContent: entry.content,
      metadata: {
        id: entry.id,
        created: entry.createdAt,
      },
    })
  })

  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  const chain = loadQARefineChain(model)
  const embeddings = new OpenAIEmbeddings()
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings)
  const relevantDocs = await store.similaritySearch(question)

  const res = await chain.invoke({
    input_documents: relevantDocs,
    question,
  })

  return res.output_text
}
