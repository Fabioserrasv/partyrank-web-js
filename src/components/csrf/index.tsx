"use client"

import { getCsrfToken } from "next-auth/react"
import { forwardRef, useEffect, useState } from "react"

const Csrf = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ ...rest }: React.InputHTMLAttributes<HTMLInputElement>, ref) =>{
  const [csrfToken, setCsrfToken] = useState<string>('')

  useEffect(() => {
    getCsrfToken().then((token) => setCsrfToken(token || ''))
  }, [])

  return <input ref={ref} {...rest} type="hidden" value={csrfToken} />
})

Csrf.displayName = 'Csrf';

export { Csrf };