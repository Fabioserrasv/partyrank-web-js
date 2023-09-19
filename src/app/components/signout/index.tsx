'use client'

import { signOut } from "next-auth/react";
import { LogOut } from 'lucide-react';

export function SignOut(){
  return <LogOut onClick={() => {signOut()}} className="icon" />
}