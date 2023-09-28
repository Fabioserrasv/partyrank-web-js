'use client'
import { Button } from "@/app/components/button/Button";
import { Input } from "@/app/components/input";

export function ChangePasswordForm() {
  return (
    <form className="formPassword">
      <Input 
        displayName="Old Password"
        name="oldPassword"
        placeholder="******"
        type="password"
        />
      <Input 
        displayName="New Password"
        name="newPassword"
        placeholder="******"
        type="password"
        />
      <Input 
        displayName="Repeat New Password"
        name="renewPassword"
        placeholder="******"
        type="password"
      />
      <Button 
        name="Update"
        className="updatePasswordButton"
      />
    </form>
  )
}