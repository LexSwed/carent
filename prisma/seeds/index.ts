import { prisma } from '..'

const layouts = [
  {
    name: 'text',
  },
  {
    name: 'imageBelow',
  },
  {
    name: 'imageAbove',
  },
  {
    name: 'imageLeft',
  },
  {
    name: 'imageRight',
  },
]

export function seedLayouts() {
  return layouts.map(({ name }) => {
    return prisma.layout.upsert({
      where: {
        name,
      },
      update: {},
      create: {
        name,
      },
    })
  })
}
