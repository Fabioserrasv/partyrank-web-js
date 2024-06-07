'use client'

import { useForm } from "react-hook-form";
import { Form } from "@/components/form";
import { Csrf } from "@/components/csrf";
import { Input } from "@/components/input";
import { Button } from "@/components/button/Button";
import { signIn } from "next-auth/react";

import toast from "react-hot-toast";

type FormLoginDataProps = {
  username: string;
  password: string;
  csrfToken: string;
}

export function FormLogin() {
  const { register, handleSubmit } = useForm<FormLoginDataProps>();

  async function onSubmitLogin(data: FormLoginDataProps) {
    const signInResponse = await signIn("credentials", { ...data, redirect: false })
    
    if (signInResponse?.error) {
      toast.error("User not found")
      return;
    }
    
    window.location.href = "/songsets"
  }

  return (
    <Form onSubmit={handleSubmit(onSubmitLogin)}>
      <Csrf {...register("csrfToken")} />

      <Input
        displayName="Username"
        {...register("username")}
        type="text"
        className="nameInput"
      />

      <Input
        displayName="Password"
        {...register("password", { required: true })}
        type="password"
      />

      <Button name="Sign in" className="buttonSignin" />
    </Form>
  )
}