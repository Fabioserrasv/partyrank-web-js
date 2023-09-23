import { ReactNode } from "react";
import './page.scss';
import { useTheme } from "../../../context/ThemeContext";
import { getServerSession } from "next-auth";
import { Nav } from "../nav";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Toaster } from 'react-hot-toast';
type PageProps = {
  children: ReactNode;
}

export async function Page({ children }: PageProps) {
  const session = await getServerSession(options);
  return (
    <div className="content">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={
          {
            success: {
              style: {
                backgroundColor: 'green'
              }
            },
            error: {
              style: {
                backgroundColor: '#ff4141'
              }
            }
          }
        }
      />
      <header>
        {(session) &&
          (
            <>
              <Nav user={session.user} />
            </>
          )
        }
      </header>
      <div className="main">
        {children}
      </div>
      <footer></footer>
    </div>
  )
}