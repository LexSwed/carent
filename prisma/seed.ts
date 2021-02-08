import { prisma } from './index'
import { seedUser } from './seeds'

async function main() {
  return Promise.allSettled([seedUser()])
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
