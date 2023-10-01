import { Card } from "@/app/components/card";
import Link from "next/link";
import { FormRegister } from "./form";
import './register.scss';

export default function Register() {
  return (
    <Card size="sm">
      <FormRegister />
    </Card>
  )
}