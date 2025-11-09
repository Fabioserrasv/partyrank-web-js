import { getAllUsers } from "@/actions/user.actions";
import './user.scss';
import { UsersTable } from './components/UsersTable';

export const dynamic = 'force-dynamic';

export default async function Users() {
  const resultUsers = await getAllUsers({});
  const users = resultUsers.users;

  return (
    <div className="users-page">
      <h3>Ranking</h3>
      <UsersTable users={users} />
    </div>
  )
}