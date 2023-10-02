import { getAllSongSets, getAllSongSetsHomePage } from "@/actions/songset.actions";
import { TableWithFilter } from "./TableWithFilter";
import './songsets.scss';
import { handleGetAllSongSets, handleJoinPublicSongSet } from "@/handlers/songset.handlers";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export default async function SongSets() {
  let sets = await getAllSongSetsHomePage("");
  const session = await getServerSession(options);
  const user = session?.user!
  return (
    <div className="songSetPage">
      <TableWithFilter
        user={user}
        initialSets={sets}
      />
    </div>
  )
}