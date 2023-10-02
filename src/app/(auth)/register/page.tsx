import { Card } from "@/components/card";
import { FormRegister } from "./form";
import './register.scss';
import { handleCreateUserForm } from "@/handlers/user.handlers";

export default function Register() {
  return (
    <Card size="sm">
      <FormRegister 
        handleCreateUserForm={handleCreateUserForm}
      />
    </Card>
  )
}