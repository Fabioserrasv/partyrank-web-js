import { ClientPage } from './clientPage';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import './vote.scss';
import { getSongSet } from '@/actions/songset.actions';
import { handleScoreFormSubmit } from '@/handlers/score.handlers';
import { redirect } from 'next/navigation';

type VotePageProps = {
  params: {
    id: number;
  }
}

export default async function Vote({ params }: VotePageProps) {
  const session = await getServerSession(options);
  const set = await getSongSet(Number(params.id));
  if (!session) return;

  if (!set) {
    window.location.href = "/songsets"
    return
  };

  /*
    NEED TO CREATE CONTEXT TO CHECK ALLOWED USER
  */

  let allowed = false

  if (set.user?.id == session.user.id) {
    allowed = true;
  }

  if (!allowed) {
    set.usersOn?.map((relationUser) => {
      if (relationUser.user.id == session.user.id) {
        allowed = true;
      }
    })
  }

  if (!allowed) {
    redirect("/songsets")
  }

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