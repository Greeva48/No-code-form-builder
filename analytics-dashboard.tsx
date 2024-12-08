import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
]

export function AnalyticsDashboard() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Submissions</h3>
          </div>
          <div className="p-6 pt-0 flex items-center">
            <div className="text-2xl font-bold">2,350</div>
            <div className="ml-2 text-xs text-green-500">+12.3%</div>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Conversion Rate</h3>
          </div>
          <div className="p-6 pt-0 flex items-center">
            <div className="text-2xl font-bold">54.2%</div>
            <div className="ml-2 text-xs text-red-500">-2.1%</div>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Average Time to Complete</h3>
          </div>
          <div className="p-6 pt-0 flex items-center">
            <div className="text-2xl font-bold">2m 34s</div>
            <div className="ml-2 text-xs text-green-500">-14s</div>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Active Forms</h3>
          </div>
          <div className="p-6 pt-0 flex items-center">
            <div className="text-2xl font-bold">12</div>
            <div className="ml-2 text-xs text-green-500">+2</div>
          </div>
        </div>
      </div>
      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="tracking-tight text-sm font-medium">Submissions Overview</h3>
        </div>
        <div className="p-6 pt-0">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

