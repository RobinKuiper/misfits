import prisma from '../src/lib/prisma';

async function main() {
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