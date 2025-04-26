import Link from 'next/link'

export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-xl font-bold mb-4">Welcome</h1>
      <Link href="/weather" className="text-blue-600 underline">Go to Weather Page</Link>
      <Link href="/savedLocationWeather" className="text-blue-600 underline">View Saved Locations</Link>
    </main>
  )
}

