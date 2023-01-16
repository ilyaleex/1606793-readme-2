import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.post.upsert({
    where: { id: 1 },
    update: {},
    create: {
              type: 'LINK',
              tags: {
                create: [
                  {title: 'link-post'},
                  {title: 'link'}
                ]
              },
              likes: ['43', '58'],
              isDraft: false,
              isRepost: false,
              userID: '24',
              authorID: '24',
              originID: 1,
              link: {
                create: {
                  url: 'www.test.com',
                  desc: 'test link'
                },
              },
    },
  });
  await prisma.post.upsert({
    where: { id: 2 },
    update: {},
    create: {
              type: 'LINK',
              tags: {
                connectOrCreate: [
                  { where: { title: 'link-post' }, create: { title: 'link-post' }},
                  { where: { title: 'link' }, create: { title: 'link' }},
                  { where: { title: 'another-tag' }, create: { title: 'another-tag' }},
              ]},
              likes: ['65', '22'],
              isDraft: false,
              isRepost: true,
              userID: '35',
              authorID: '24',
              originID: 1,
              link: {
                create: {
                  url: 'www.test.com',
                  desc: 'test link'
                },
              },
              comments: {
                create: [
                  {
                    text: "test comment text",
                    userID: '54'
                  },
                  {
                    text: 'another test comment text',
                    userID: '88'
                  }
                ]
              }
    },
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
