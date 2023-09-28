import { ClientPage } from './clientPage';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import './vote.scss';
import { Suspense } from 'react';
import { getSongSet } from '@/actions/songset.actions';
import { handleScoreFormSubmit } from '@/handlers/score.handlers';

type VotePageProps = {
  params: {
    id: number;
  }
}

export default async function Vote({ params }: VotePageProps) {
  const session = await getServerSession(options);
  const set = await getSongSet(Number(params.id));
  if (!session) return;
  
  return (
    <div className="votePage">
      <ClientPage
        user={session.user}
        set={set}
        handleVoteForm={handleScoreFormSubmit}
      />
    </div>
  )
}