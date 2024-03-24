import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'
import { analyse } from '../../../../utils/ai'

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { content } = await request.json()
  const user = await getUserByClerkId()

  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  })

  const analysis = await analyse(updatedEntry.content)

  if (!analysis) {
    return new NextResponse('Failed to analyze entry - 2')
  }

  await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    create: {
      entryId: updatedEntry.id,
      ...analysis,
    },
    update: {
      ...analysis,
    },
  })

  return NextResponse.json({ data: updatedEntry })
}
