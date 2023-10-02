'use client'

import { useForm } from "react-hook-form";
import { Form } from "@/components/form";
import { Input } from "@/components/input";
import { Button } from "@/components/button/Button";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validations/authValidations";
import { handleCreateUserForm } from "@/handlers/user.handlers";

type FormRegisterProps = {
}

type UserRegister = UserPostData & {
  repassword: string
}

export function FormRegister({  }: FormRegisterProps) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<UserRegister>({
    resolver: zodResolver(registerSchema)
  });

  async function onSubmitRegister(data: UserRegister) {
    try {
      const newUser = await handleCreateUserForm(data)

      if (newUser) {
        toast.success("User created successfully")
        window.location.href = "/login"
        return;
      }

      toast.error("Something went wrong")
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  return (
    <Form className="formRegister" onSubmit={handleSubmit(onSubmitRegister)}>

      <Input
        displayName="Username"
        type="text"
        className="nameInput"
        errorMessage={errors.username?.message}
        placeholder="xxNarutoxx..."
        {...register("username")}
      />

      <div className="inputPass">
        <Input
          displayName="Password"
          type="password"
          placeholder="***********"
          errorMessage={errors.password?.message}
          {...register("password", { required: true })}
        />

        <Input
          displayName="Repeat Password"
          type="password"
          placeholder="***********"
          errorMessage={errors.repassword?.message}
          {...register("repassword", { required: true })}
        />

      </div>

      <Button name="Sign up" className="buttonSignup" />
    </Form>
  )
}