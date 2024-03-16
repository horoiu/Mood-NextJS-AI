import { Analysis, User } from '@prisma/client'

type EntryCardProps = {
  id: string
  createdAt: Date
  updatedAt: Date
  userId: string
  content: string
  analysis?: Analysis
}

const EntryCard = ({ entry }: { entry: EntryCardProps }) => {
  const date = new Date(entry.createdAt).toDateString()

  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5">{date}</div>
      <div className="px-4 py-5">summary</div>
      <div className="px-4 py-4">mood</div>
    </div>
  )
}

export default EntryCard
