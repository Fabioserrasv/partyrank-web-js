'use client'
import Input  from "@/components/input"
import { TablePaginated } from "./TablePaginated"
import { useState } from 'react';
import { Search } from "lucide-react";
import { Button } from "@/components/button/Button";
import { handleGetAllSongSets } from "@/handlers/songset.handlers";

type TableWithFilterProps = {
  initialSets: SongSet[];
  user: User;
}

export function TableWithFilter({ initialSets, user }: TableWithFilterProps) {
  const [sets, setSets] = useState<SongSet[]>(initialSets)
  const [filterQuery, setFilterQuery] = useState<string>('')

  async function onSubmitFilter() {
    const filteredSets = await handleGetAllSongSets(filterQuery);
    setSets(filteredSets)
  }

  return (
    <>
      <div className="filters">
        <form action={onSubmitFilter}>
          <Input
            displayName=""
            name="name"
            className="nameFilter"
            autoComplete="off"
            placeholder="Mawaru Penguindrum..."
            value={filterQuery}
            onChange={(e) => { setFilterQuery(e.target.value) }}
          />
          <Button>
            <Search />
          </Button>
        </form>
        {/* <Link href={`/songsets/create/0`}>
        </Link> */}
      </div>
      <TablePaginated
        sets={sets}
        itemsPerPage={5}
        user={user}
      />
    </>
  )
}