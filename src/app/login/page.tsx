import { FormEvent } from 'react'
import { Form } from "../components/form";
import { Modal } from '../components/Modal';
import { Input } from '../components/input';
import { Button } from '../components/button/Button';
import "./login.scss";
import { Csrf } from '../components/csrf';
import { FormLogin } from './form';
import { getCsrfToken } from 'next-auth/react';

export default async function Login() {
  return (
    <div className="loginPage">
      <span>Sign in to Party Rank Web</span>
      <Modal size="sm">
        <FormLogin  />
      </Modal>
    </div>
  );
}
