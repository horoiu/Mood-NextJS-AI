import Editor from '@/components/Editor'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

type EntryPageProps = {
  params: {
    id: string
  }
}

export type AnalysisProps = {
  mood: string
  subject: string
  summary: string
  negative: boolean
  color: string
}

export type EntryProps = {
  id: string
  createdAt: Date
  updatedAt: Date
  userId: string
  content: string
  analysis: AnalysisProps
}

export const getEntry = async (id: string) => {
  const user = await getUserByClerkId()

  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  })

  return (entry as EntryProps) || null
}

const EntryPage = async ({ params }: EntryPageProps) => {
  const entry = await getEntry(params.id)

  return (
    <div className="w-full h-full">
      <Editor entry={entry} />
    </div>
  )
}

export default EntryPage
