import { Music, Upload, Users } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type SongSetTabsProps = {
  setJsonModalOpen: Dispatch<SetStateAction<boolean>>;
  tab: tabs;
  setTab: Dispatch<SetStateAction<tabs>>
}

type tabs = "users" | "songs"

export function SongSetTabs({ setJsonModalOpen, tab, setTab }: SongSetTabsProps) {
  return (<div className="tabs">
    <Upload className="generateIcon" onClick={() => {
      setJsonModalOpen(true);
    }} />
    <Users className={tab == "users" ? "active" : ""} onClick={() => {
      setTab("users");
    }} />
    <Music className={tab == "songs" ? "active" : ""} onClick={() => {
      setTab("songs");
    }} />
  </div>);
}