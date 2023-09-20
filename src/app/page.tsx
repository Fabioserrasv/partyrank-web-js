import { redirect } from "next/navigation"


export default async function Home() {
  const response = await fetch('http://localhost:3000/api/auth/csrf')
  const responseObject = await response.json()

  redirect('/login');

  return (
    <div>
      <p>You should'nt be here.</p>
    </div>
  )
}
