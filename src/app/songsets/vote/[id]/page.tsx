import { VoteClientPage } from './clientPage';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getSongSet } from '@/actions/songset.actions';
import { redirect } from 'next/navigation';
import { checkIsAllowed } from '@/handlers/songset.handlers';
import './vote.scss';

type VotePageProps = {
  params: Promise<{
    id: number;
  }>
}

export default async function Vote({ params }: VotePageProps) {
  const { id } = await params;
  const session = await getServerSession(options);
  if(Number.isNaN(id)){
    return;
  }
  const set = await getSongSet(Number(id));
  if (session == null || set == null) redirect("/songsets");

  const allowed = await checkIsAllowed(id);

  if (!allowed) {
    redirect("/songsets?error=not_allowed");
  }

  if(set.songs.length == 0) {
    if(set.user?.id == session.user.id) {
      redirect("/songsets/create/" + id);
    }
    redirect("/songsets?error=no_songs_in_set");
  }

  return (
    <div className="pageserv">
      <VoteClientPage
        user={session.user}
        set={set}
      />
    </div>
  )
}