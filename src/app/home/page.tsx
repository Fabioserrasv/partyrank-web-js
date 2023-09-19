import { SignOut } from '../components/signout';
import './home.scss';

export default async function Home() {
  const response = await fetch('http://localhost:3000/api/auth/csrf')
  const responseObject = await response.json()

  return (
    <div>
      <p>{JSON.stringify(responseObject)}</p>
    </div>
  )
}
