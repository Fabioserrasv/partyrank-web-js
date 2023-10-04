import { ClipboardList, Music, Users } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export type tabs = "users" | "songs" | "result";

type SongSetTabsProps = {
  tab: tabs;
  setTab: Dispatch<SetStateAction<tabs>>
}

export function SongSetTabs({ tab, setTab }: SongSetTabsProps) {
  return (<div className="tabs">
    <ClipboardList className={tab == "result" ? "active" : ""} onClick={() => { setTab("result"); }} />
    <Users className={tab == "users" ? "active" : ""} onClick={() => { setTab("users"); }} />
    <Music className={tab == "songs" ? "active" : ""} onClick={() => { setTab("songs"); }} />
  </div>);
}