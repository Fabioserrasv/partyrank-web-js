import './createSongSet.scss';
import { ClientCreateSongPage } from "./clientPage";
import { handleGetSongSet } from "@/handlers/songset.handlers";
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

type CreateSongSetProps = {
  params: {
    id: number;
  }
}

export default async function CreateSongSet({ params }: CreateSongSetProps) {
  const set = await handleGetSongSet(params.id);
  const session = await getServerSession(options)
  const user = session?.user!

  if (params.id != 0) {
    if (!set) {
      redirect("/songsets")
    };

    let allowed = false

    if (set.user?.id == user.id) {
      allowed = true;
    }

    if (!allowed) {
      set.usersOn?.map((relationUser) => {
        if (relationUser.user.id == user.id) {
          allowed = true;
        }
      })
    }

    if (!allowed) {
      redirect("/songsets")
    }
  }

  return (
    <div className="createSongSetPage">
      <ClientCreateSongPage
        dbSet={set}
        user={user}
      />
    </div>
  )
}