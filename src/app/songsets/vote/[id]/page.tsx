import { VoteClientPage } from './clientPage';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getSongSet } from '@/actions/songset.actions';
import { redirect } from 'next/navigation';
import { checkIsAllowed } from '@/handlers/songset.handlers';
import './vote.scss';

type VotePageProps = {
  params: {
    id: number;
  }
}

export default async function Vote({ params }: VotePageProps) {
  const session = await getServerSession(options);
  if(Number.isNaN(params.id)){
    return;
  }
  const set = await getSongSet(Number(params.id));
  if (session == null || set == null) redirect("/songsets");

  const allowed = await checkIsAllowed(params.id);

  if (!allowed) {
    redirect("/songsets?error=not_allowed");
  }

  return (
    <div className="votePage">
      <VoteClientPage
        user={session.user}
        set={set}
      />
    </div>
  )
}