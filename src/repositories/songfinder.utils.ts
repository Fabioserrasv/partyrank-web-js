export function convertType(type: string): SongType {
  if (type.includes("Opening")) return "OPENING" as SongType;
  if (type.includes("Ending")) return "ENDING" as SongType;
  if (type.includes("Insert")) return "INSERT_SONG" as SongType;
  return "OPENING" as SongType;
}
