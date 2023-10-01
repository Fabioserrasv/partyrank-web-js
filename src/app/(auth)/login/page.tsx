import { Card } from '../../components/card';
import { FormLogin } from './form';
import { redirect } from 'next/navigation';
import { getServerSession } from "next-auth/next"
import { RedirectType } from 'next/dist/client/components/redirect';
import Link from 'next/link';

export default async function Login() {
  const session = await getServerSession();

  if (session?.user) {
    redirect('/songsets', "push" as RedirectType)
  }

  return (
    <Card size="sm">
      <FormLogin />
      <div className='authLinks'>
        <Link href={'/register'} className='linkCreate'>
          Create your account
        </Link>
        <Link href={'/register'} className='linkCreate'>
          Forgot password?
        </Link>
      </div>
    </Card>
  );
}
