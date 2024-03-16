import { UserButton } from '@clerk/nextjs'
import { ReactNode } from 'react'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-screen h-screen relative">
      <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-black/10">
        Mood
      </aside>

      <div className="ml-[200px]">
        <header className="relative h-[60px] border-b border-black/10">
          <div className="h-full w-full px-6 flex items-center justify-end">
            <UserButton />
          </div>
        </header>

        <div>{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout
