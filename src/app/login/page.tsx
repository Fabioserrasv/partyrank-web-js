import { FormEvent } from 'react'
import { Form } from "../components/form";
import { Modal } from '../components/Modal';
import { Input } from '../components/input';
import { Button } from '../components/button/Button';
import "./login.scss";
import { Csrf } from '../components/csrf';

export default function Login() {

  async function onSubmitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const response = await fetch('/api/auth/callback/credentials', {
      method: 'POST',
      body: formData,
    })

    // Handle response if necessary
    const data = await response.json()
    console.log(data)
  }

  return (
    <div className="loginPage">
      <span>Sign in to Party Rank Web</span>
      <Modal size="sm">
        <Form onSubmit={onSubmitLogin}>
          <Csrf />
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
