import { getAllMySongSetsPage } from "@/actions/songset.actions";
import './songsets.scss';
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { HomeSongSetTable } from "./components/home-song-set-table";

// export const dynamic = 'force-dynamic';

export default async function SongSets() {
  const session = await getServerSession(options);
  const user = session?.user!
  let resultSongSets = await getAllMySongSetsPage({
    name: "", creatorName: "",
    offset: 0,
    limit: 8

  }, user?.id);

  let sets = resultSongSets.sets;
  let count = resultSongSets.count;

  return (
    <div className="songSetPage">
      <HomeSongSetTable
        user={user}
        initialSets={sets}
        initialTotalSets={count}
        pageType="private"
      />
    </div>
  )
}