import prisma from '../src/lib/prisma';
import { slugify } from '../src/utils/urlHelpers';

async function main() {

  // await prisma.period.deleteMany()
  // await prisma.event.deleteMany()

  // const periods = [
  //   {
  //     label: 'The Founding',
  //     slug: slugify('The Founding'),
  //     position: 1,
  //     length: 10,
  //     color: 'rgba(241,255,104,1)',
  //   },
  //   {
  //     length: 1,
  //      position: 2,
  //     color: 'transparent'
  //   },
  //   {
  //     label: 'Age of Arcanum',
  //     slug: slugify('Age of Arcanum'),
  //      position: 3,
  //     length: 32,
  //     color: 'rgba(120,255,104,1)'
  //   },
  //   {
  //     length: 1,
  //     color: 'transparent'
  //   },
  //   {
  //     label: 'The Calamity',
  //     slug: slugify('The Calamity'),
  //      position: 4,
  //     length: 10,
  //     color: 'rgba(255,104,104,1)'
  //   },
  //   {
  //     length: 1,
  //      position: 5,
  //     color: 'transparent'
  //   },
  //   {
  //     label: 'Current Era',
  //     slug: slugify('Current Era'),
  //      position: 6,
  //     length: 35,
  //     color: 'rgba(104,153,255,1)'
  //   },
  // ]

  // periods.forEach(async (period) => {
  //   await prisma.period.create({
  //     data: period
  //   })
  // })

  const founding = await prisma.period.findUnique({ where: { slug: 'the-founding'}})
  console.log('founding: ', founding);

  if(founding)
  await prisma.event.create({
    data: {
        position: 1,
        text: 'The Luxon was born at the creation point of the universe. Other lights formed around this Light, but those lights settled as stars; the Luxon resisted that urge to burn and instead traveled, seeking self-knowledge. The Luxon traveled without much comprehension, knowing only that they were light in the darkness, and occasionally passed other things of light.',
        periodId: founding.id
      },
      
  })

  return;
  
  const npcs = await prisma.piece.findMany({
    where: {
      category: {
        label: 'npcs'
      }
    }
  })

  npcs.forEach(async (npc) => {
    const { id, ...rest } = npc;

    await prisma.piece.create({
      data: {
        ...rest
      }
    })
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })