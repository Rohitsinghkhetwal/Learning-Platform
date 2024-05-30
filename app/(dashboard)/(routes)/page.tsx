import { UserButton } from "@clerk/nextjs"

export default function Home() {
  return (
    <div>
      <p>hi this is my app</p>
      <UserButton afterSignOutUrl="/"/>
    </div>
  )
 
}
