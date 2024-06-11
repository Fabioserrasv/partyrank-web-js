import { getAllUsers } from "@/actions/user.actions";
import { Table, TableRow } from "@/components/table";
import { getUserImageUrlPathFromUsername } from "@/lib/utils";
import './user.scss';

export default async function Users() {
  const users = await getAllUsers();
  return (<div className="users-page">
    <h3>Ranking</h3>
    <Table>
      {
        users.map((u) => {
          return (<TableRow key={u.id}>
            <img src={getUserImageUrlPathFromUsername(u.username)} alt="" />
            <span>{u.username}</span>
          </TableRow>)
        })
      }
    </Table>
  </div>)
}