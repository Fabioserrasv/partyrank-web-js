'use client'
import Link from "next/link";
import { Button } from "../components/button/Button";
import { Input } from "../components/input"
import { TablePaginated } from "./TablePaginated"
import { useState } from 'react';

type InputFilterProps = {
  initialSets: SongSet[];
  search: (name: string) => Promise<SongSet[]>
}
export function TableWithFilter({ initialSets, search }: InputFilterProps) {
  const [sets, setSets] = useState<SongSet[]>(initialSets)

  return (
    <>
      <div className="filters">
        <Input
          onChange={async (e) => { setSets(await search(e.target.value)) }}
          displayName=""
          name="name"
          className="nameFilter"
          autoComplete="off"
          placeholder="Mawaru Penguindrum..."
        />
        <Link href={`/songsets/create/0`}>
          <Button
            name="Create"
          />
        </Link>
      </div>
      <TablePaginated
        sets={sets}
        itemsPerPage={10}
      />
    </>
  )
}