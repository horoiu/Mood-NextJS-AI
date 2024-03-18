import Editor from '@/components/Editor'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

type EntryPageProps = {
  params: {
    id: string
  }
}

export type EntryProps = {
  id: string
  createdAt: Date
  updatedAt: Date
  userId: string
  content: string
}

const getEntry = async (id: string) => {
  const user = await getUserByClerkId()

  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
  })

  return (entry as EntryProps) || null
}

const EntryPage = async ({ params }: EntryPageProps) => {
  const entry = await getEntry(params.id)

  return (
    <div>
      <Editor entry={entry} />
      {params.id}
    </div>
  )
}

export default EntryPage
