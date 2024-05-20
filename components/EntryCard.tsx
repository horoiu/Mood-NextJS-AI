import { Analysis, User } from '@prisma/client'
import { getEntry } from '../app/(dashboard)/journal/[id]/page'
import { getUserByClerkId } from '../utils/auth'

type EntryCardProps = {
  id: string
  createdAt: Date
  updatedAt: Date
  userId: string
  content: string
  analysis?: Analysis
}

const EntryCard = async ({ entry }: { entry: EntryCardProps }) => {
  const user = await getUserByClerkId()
  const date = new Date(entry.createdAt).toDateString()

  const entryData = await getEntry(entry.id)

  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5">{date}</div>
      <div className="px-4 py-5">{entryData.analysis.summary}</div>
      <div
        className="px-4 py-4"
        style={{ backgroundColor: entryData.analysis.color }}
      >
        {entryData.analysis.mood}
      </div>
    </div>
  )
}

export default EntryCard
