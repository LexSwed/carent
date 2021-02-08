import { prisma } from '..'

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
        create: {
          classes: {
            create: {
              name: 'Magical creatures',
              studentGroup: {
                create: {
                  code: 'Gryffindor-1',
                },
              },
            },
          },
        },
      },
    },
  })
}
