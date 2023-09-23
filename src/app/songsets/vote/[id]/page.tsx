import { getSongSet } from '@/repositories/songset.repository';
import { ClientPage } from './clientPage';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import './vote.scss';
import { handleFormSubmit } from '@/repositories/score.repository';
import { Suspense } from 'react';

type VotePageProps = {
  params: {
    id: number;
  }
}

export default async function Vote({ params }: VotePageProps) {
  const session = await getServerSession(options);
  const set = await getSongSet(Number(params.id));
  if (!session) return;
  if (set == false) return;
  
  return (
    <div className="votePage">
      <ClientPage
        user={session.user}
        set={set}
        handleVoteForm={handleFormSubmit}
      />
    </div>
  )
}