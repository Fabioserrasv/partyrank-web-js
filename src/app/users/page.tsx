import { getAllUsers } from "@/actions/user.actions";
import { Table, TableRow } from "@/components/table";
import { getUserImageUrlPathFromUsername } from "@/lib/utils";
import './user.scss';
import Image from "next/image";

export default async function Users() {
  const users = await getAllUsers();
  return (<div className="users-page">
    <h3>Ranking</h3>
    <Table>
      {
        users.map((u) => {
          return (<TableRow key={u.id}>
            <Image width={0} height={0} src={getUserImageUrlPathFromUsername(u.username)} alt="" />
            <span>{u.username}</span>
          </TableRow>)
        })
      }
    </Table>
  </div>)
}