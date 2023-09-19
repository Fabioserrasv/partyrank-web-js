import { Modal } from '../components/Modal';
import "./login.scss";
import { FormLogin } from './form';
import { redirect } from 'next/navigation';
import { getServerSession } from "next-auth/next"

export default async function Login() {
  const session = await getServerSession();
  
  if (session?.user) {
    redirect('/home')
  }

  return (
    <div className="loginPage">
      <span>Sign in to Party Rank Web</span>
      <Modal size="sm">
        <FormLogin  />
      </Modal>
    </div>
  );
}
