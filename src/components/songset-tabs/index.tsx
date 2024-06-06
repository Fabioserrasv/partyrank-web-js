import { ClipboardList, Music, Users } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import './songset-tabs.scss';

export type tabs = "users" | "songs" | "result" | "";

type SongSetTabsProps = {
  tab: tabs;
  setTab: Dispatch<SetStateAction<tabs>>
}

export function SongSetTabs({ tab, setTab }: SongSetTabsProps) {
  return (
    <div className="tabs-container">
      <span>Switch Tabs</span>
      <div className="tabs">
        <Music className={tab == "songs" ? "active" : ""} onClick={() => { setTab("songs"); }} />
        <Users className={tab == "users" ? "active" : ""} onClick={() => { setTab("users"); }} />
        <ClipboardList className={tab == "result" ? "active" : ""} onClick={() => { setTab("result"); }} />
      </div>
    </div>
  );
}