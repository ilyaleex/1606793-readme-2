import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.post.upsert({
    where: {id: 1},
    update: {},
    create: {
      type: 'video',
      date: new Date,
      isPublished: true,
      likes: [
        '3afa868f-e0d7-450d-bef5-101667e6b836',
        '3afa868f-e0d7-450d-bef5-101667e6b835',
        '3afa868f-e0d7-450d-bef5-101667e6b834'
      ],
      likesCount: 3,
      comments: {
        create: [
          {
            text: 'Comment text 1',
            userId: '3afa868f-e0d7-450d-bef5-101667e6b835'
          },
          {
            text: 'Comment text 2',
            userId: '3afa868f-e0d7-450d-bef5-101667e6b834'
          }
        ]
      },
      tags: ['qwe', 'asd', 'zxc'],
      isRepost: false,
      authorId: '3afa868f-e0d7-450d-bef5-101667e6b831',
      originalAuthorId: '3afa868f-e0d7-450d-bef5-101667e6b831',
      originalId: 1,
      content: {
        title: 'Chill Music Lab',
        url: 'https://www.youtube.com/watch?v=Q7t4JOt-KH4'
      }
    }
  });

  console.info('🤘️ Database was filled')
}

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })
  