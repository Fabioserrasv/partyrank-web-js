import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
async function main() {
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      animeList: 'www.example.com',
      password: '$2a$12$m9qC.1F4eKwmDiDcbSTlP.tkKTiRv4lKEGmnT/cKjPV8zr0OAhAKm',
      admin: true,
      createdAt: new Date()
    },
  })

  console.log({ admin })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })