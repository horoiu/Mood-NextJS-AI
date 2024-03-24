import EntryCard from '@/components/EntryCard'
import NewEntryCard from '@/components/NewEntryCard'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import Link from 'next/link'
import { analyse } from '../../../utils/ai'

const getEntries = async () => {
  const user = await getUserByClerkId()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  await analyse(
    // "I'm going to give you a journal entry, I want you to analyse for a few things. I need the mood, a summary, what the subject is, and a color representing the mood, while negative should be boolean value. You need to respond back with formatted JSON like so: { mood: '', subject: '', color: '', negative: ''}. Entry: Today was a really great day. I finnaly was able to grab that pair of shoes I've been dying to get."
    'Today was a eh, ok day I guess. I found a new coffe shop that was cool, but then I got a flat tire. :)'
  )

  return entries
}

const JournalPage = async () => {
  const entries = await getEntries()

  return (
    <div className="p-10 bg-zinc-400/10 h-full">
      <h2 className="text-3xl mb-8">Journal</h2>

      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />

        {entries.map((entry) => (
          <Link key={entry.id} href={`/journal/${entry.id}`}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default JournalPage
