import { getAllSongSets } from "../../repositories/songset.repository";
import { TablePaginated } from "./TablePaginated";
import { TableWithFilter } from "./TableWithFilter";
import './songsets.scss';

export default async function SongSets() {
  let sets = await getAllSongSets("");
  return (
    <div className="songSetPage">
      <TableWithFilter
        search={getAllSongSets}
        initialSets={sets}
      />
    </div>
  )
}