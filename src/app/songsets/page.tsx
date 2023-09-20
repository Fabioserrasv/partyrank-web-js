import { getAllSongSets } from "../repositories/songset.repository";
import { Table, TableRow } from "../components/table";
import './songsets.scss';
import { TablePaginated } from "./TablePaginated";
import { Input } from "../components/input";

export default async function SongSets() {
  const sets = await getAllSongSets();

  return (
    <div className="songSetPage">
      <div className="filters">
        <Input
          displayName="Name"
          name="name"
          className="nameFilter"
          autoComplete="off"
        />
      </div>
      <TablePaginated
        sets={sets}
        itemsPerPage={10}
      />
    </div>
  )
}