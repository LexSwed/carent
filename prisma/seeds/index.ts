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

export function seedUser() {
  return prisma.user.upsert({
    where: {
      email: 'lexswed@gmail.com',
    },
    update: {},
    create: {
      name: 'Al S.',
      email: 'lexswed@gmail.com',
      workspace: {
        create: {
          name: 'Homeschooling',
        },
      },
      teacher: {
        create: {},
      },
    },
  })
}
