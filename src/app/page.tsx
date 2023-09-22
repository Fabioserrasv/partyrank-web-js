import { redirect } from "next/navigation"


export default async function Home() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const responseObject = await response.json()

  redirect('/login');

  return (
    <div>
      {/* <p>You should'nt be here.</p> */}
      <pre>{JSON.stringify(responseObject, null, 2)}</pre>
    </div>
  )
}
