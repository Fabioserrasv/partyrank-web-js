'use client'
import { Button } from "@/app/components/button/Button";
import { Input } from "@/app/components/input";
import { useForm } from "react-hook-form";
import { changePasswordSchema } from "./validations/profileValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";

type ChangePasswordFormProps = {
  handleUpdatePasswordForm: ({ oldPass, newPass }: ChangePasswordType, id: number) => Promise<boolean>
  id: number;
}

export type ChangePasswordSchema = {
  oldPassword: string;
  newPassword: string;
  renewPassword: string;
}

type fields = "oldPassword" | "newPassword" | "renewPassword"

export function ChangePasswordForm({ handleUpdatePasswordForm, id }: ChangePasswordFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema)
  });

  const [passInputs, setPassInputs] = useState<ChangePasswordSchema>({
    oldPassword: "",
    newPassword: "",
    renewPassword: "",
  });

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const key: fields = e.target.name as fields
    setValue(key, e.target.value)
    setPassInputs({
      ...passInputs,
      [key]: e.target.value
    })
  }

  async function onSubmitChangePasswordForm(data: ChangePasswordSchema) {
    try {
      const response = await handleUpdatePasswordForm(
        {
          newPass: data.newPassword,
          oldPass: data.oldPassword
        },
        id
      );

      if (response){
        toast.success("Password updated successfully.")
        signOut();
      }
    } catch (error) {
      toast.error("Something went wrong.")
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmitChangePasswordForm)} className="formPassword">
      <Input
        displayName="Old Password"
        placeholder="******"
        type="password"
        {...register('oldPassword')}
        value={passInputs.oldPassword}
        onChange={onInputChange}
        errorMessage={errors.oldPassword?.message}
      />
      <Input
        displayName="New Password"
        placeholder="******"
        {...register('newPassword')}
        type="password"
        value={passInputs.newPassword}
        onChange={onInputChange}
        errorMessage={errors.newPassword?.message}
      />
      <Input
        displayName="Repeat New Password"
        placeholder="******"
        type="password"
        {...register('renewPassword')}
        value={passInputs.renewPassword}
        onChange={onInputChange}
        errorMessage={errors.renewPassword?.message}
      />
      <Button
        name="Update"
        className="updatePasswordButton"
      />
    </form>
  )
}