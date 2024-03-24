import Editor from '@/components/Editor'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

type EntryPageProps = {
  params: {
    id: string
  }
}

type AnalysisProps = {
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

const getEntry = async (id: string) => {
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

  const { mood, subject, summary, negative, color } = entry.analysis

  const analysisData = [
    { name: 'Subject', val: subject },
    { name: 'Summary', val: summary },
    { name: 'Mood', val: mood },
    { name: 'Negative', val: negative ? 'True' : 'False' },
    { name: 'Color', val: color },
  ]

  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>

      <div className="border-l border-black/10">
        <div className="px-6 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-2xl">Analysis</h2>
        </div>

        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10"
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.val}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default EntryPage
