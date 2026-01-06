import { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  // Allow child pages to control their own full-page layouts
  return <>{children}</>
}
