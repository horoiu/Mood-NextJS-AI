'use client'
import { Analysis } from '@prisma/client'
import { ResponsiveContainer, Line, XAxis, Tooltip, LineChart } from 'recharts'

const HistoryChart = ({ data }: { data: Analysis[] }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart width={300} height={100} data={data}>
        <Line
          dataKey="sentimentScore"
          type="monotone"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <XAxis dataKey="createdAt" />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default HistoryChart

const CustomTooltip = ({
  payload,
  label,
  active,
}: {
  payload?: any[]
  label?: string
  active?: boolean
}) => {
  const dateLabel = new Date(label || '').toLocaleString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  if (active) {
    const analysis = payload?.[0].payload

    return (
      <div className="p-8 custom-tooltip bg-white/5 shadow-md border border-black/10 rounded-lg backdrop-blur-md relative">
        <div
          className="absolute left-2 top-2 w-2 h-2 rounded-full"
          style={{ background: analysis.color }}
        ></div>
        <p className="label text-sm text-black/30">{dateLabel}</p>
        <p className="intro text-xl uppercase">{analysis.mood}</p>
      </div>
    )
  }

  return null
}
