import { Card } from "@/components/card";
import { FormRegister } from "./form";
import './register.scss';
import { handleCreateUserForm } from "@/handlers/user.handlers";
import Link from "next/link";

export default function Register() {
  return (
    <Card size="sm">
      <FormRegister />
      <div className='authLinks'>
        <Link href={'/login'} className='linkCreate'>
          Already have an account? Sign in
        </Link>
        {/* <Link href={'/register'} className='linkCreate'>
          Forgot password?
        </Link> */}
      </div>
    </Card>
  )
}