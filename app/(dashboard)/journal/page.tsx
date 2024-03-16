import { getUserByClerkId } from '../../../utils/auth'
import { prisma } from '../../../utils/db'

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

  return entries
}

const JournalPage = async () => {
  const entries = await getEntries()
  console.log('Entries: ', entries)

  return (
    <div>
      <h1>Journal</h1>
    </div>
  )
}

export default JournalPage
