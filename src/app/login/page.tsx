
import { FormEvent } from 'react'
import { Form } from "../components/form";
import { Modal } from '../components/Modal';
import { Input } from '../components/input';
import { Button } from '../components/button/Button';
import "./login.scss";

export default function Login() {

  // async function onSubmitLogin(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault()
  
  //   const formData = new FormData(event.currentTarget)
  //   const response = await fetch('/api/auth/signin/credentials', {
  //     method: 'POST',
  //     body: formData,
  //   })
  
  //   // Handle response if necessary
  //   const data = await response.json()
  //   // ...
  // }

  return (
    <div className="loginPage">
      <span>Sign in to Party Rank Web</span>
      <Modal size="sm">
        <Form>
          <Input
            displayName="Username"
            name="username"
            type="text"
            className="nameInput"
          />

          <Input
            displayName="Password"
            name="password"
            type="password"
          />

          <Button name="Sign in" className="buttonSignin" />
        </Form>

      </Modal>
    </div>
  );
}
