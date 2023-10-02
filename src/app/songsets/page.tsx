import { getAllSongSets } from "@/actions/songset.actions";
import { TableWithFilter } from "./TableWithFilter";
import './songsets.scss';
import { handleGetAllSongSets } from "@/handlers/songset.handlers";
import { Suspense } from "react";
import { LoadingComponent } from "@/components/loading-component";

export default async function SongSets() {
  let sets = await getAllSongSets("");
  return (
    <div className="songSetPage">
      <TableWithFilter
        search={handleGetAllSongSets}
        initialSets={sets}
      />
    </div>
  )
}