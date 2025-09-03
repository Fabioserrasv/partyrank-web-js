export function convertDbServiceToModel(data: any) : SongService{
  return {
    id: data.id,
    name: data.name,
    service: data.service,
    active: data.active,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    deletedAt: data.deletedAt
  }
}