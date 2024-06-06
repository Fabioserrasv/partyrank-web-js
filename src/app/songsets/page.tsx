import { getAllSongSetsHomePage } from "@/actions/songset.actions";
import './songsets.scss';
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { HomeSongSetTable } from "./components/home-song-set-table";

export default async function SongSets() {
  const session = await getServerSession(options);
  const user = session?.user!
  let sets = await getAllSongSetsHomePage("", user?.id);
  return (
    <div className="songSetPage">
      <HomeSongSetTable
        user={user}
        initialSets={sets}
      />
    </div>
  )
}