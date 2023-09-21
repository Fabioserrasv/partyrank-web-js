import { Input } from '@/app/components/input';
import './vote.scss';
import { Button } from '@/app/components/button/Button';

type VotePageProps = {
  params: {
    id: number | string;
  }
}

export default function Vote({ params }: VotePageProps) {

  return (
    <div className="votePage">
      <div className="video">
        <iframe src="https://drive.google.com/file/d/1GEEdx9JHWudLnLC9Dn8Ev0usdtkO5WiS/preview"></iframe>
      </div>

      <div className="left">
        <span>Artista - Nome da musica</span>
        <div className='inputsvote'>
          <Input
            displayName='Score'
            name='score'
          />
          <Input
            displayName='Time suggested'
            name='time'
          />
          <Button
            name='Send'

          />
        </div>
      </div>

      <div className="aside">
        <div className='list'>

        </div>
      </div>
    </div>
  )
}