import './createSongSet.scss';
import { ClientCreateSongPage } from "./clientPage";
import { checkIsAllowed, handleGetSongSet } from "@/handlers/songset.handlers";
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
  const user = session?.user
  if (session == null || user == undefined) redirect("/songsets");

  /*
    If not a creation of a new song set, check if it is allowed to join.
  */
  if (params.id != 0) {
    const allowed = await checkIsAllowed(params.id);

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