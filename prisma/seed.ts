import { prisma } from './index'
import { seedLayouts } from './seeds'

async function main() {
  return Promise.allSettled([...seedLayouts()])
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
