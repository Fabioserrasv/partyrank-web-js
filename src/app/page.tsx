'use client';
import { useRouter } from "next/navigation"

export default async function Home() {
  const { push } = useRouter();
  push('/login');

  return (
    <div>
      
    </div>
  )
}
