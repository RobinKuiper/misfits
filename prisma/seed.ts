import prisma from '../src/lib/prisma';
import { slugify } from '../src/utils/urlHelpers';

async function main() {

  await prisma.period.deleteMany()
  await prisma.event.deleteMany()

  const periods = [
    {
      label: 'The Founding',
      slug: slugify('The Founding'),
      position: 1,
      length: 10,
      color: 'rgba(241,255,104,1)',
    },
    {
      length: 1,
       position: 2,
      color: 'transparent'
    },
    {
      label: 'Age of Arcanum',
      slug: slugify('Age of Arcanum'),
       position: 3,
      length: 32,
      color: 'rgba(120,255,104,1)'
    },
    {
      length: 1,
      position: 4,
      color: 'transparent'
    },
    {
      label: 'The Calamity',
      slug: slugify('The Calamity'),
       position: 5,
      length: 10,
      color: 'rgba(255,104,104,1)'
    },
    {
      length: 1,
       position: 6,
      color: 'transparent'
    },
    {
      label: 'Current Era',
      slug: slugify('Current Era'),
       position: 7,
      length: 35,
      color: 'rgba(104,153,255,1)'
    },
  ]

  periods.forEach(async (period) => {
    await prisma.period.create({
      data: period
    })
  })

  return;

//   const founding = await prisma.period.findUnique({ where: { slug: 'the-founding'}})
//   console.log('founding: ', founding);

//   if(founding){
//   const foundingEvents = [
//     {
//       position: 1,
//       text: '<p><strong>Kryn creation myth.</strong> The Luxon, having noticed a particular lonely planet, began to embrace the world and gave their light to the planet, cracking the surface and giving it fiery life. The elemental chaos gave birth to titans called Primordials, and they erupted and fought each other and the Luxon.</p> <p>Finding no consciousness in the elemental chaos and seeing the Primordials\' souls being lost to the darkness beyond as they killed each other, the Luxon broke into scattered Luxon beacons that would enact a cycle of rebirth for those who were bound to their light, in hopes that those beings would gradually learn and mature, and one day something would find and reassemble the Luxon, at which point the Luxon would ask them, "What am I, and what is my purpose?"</p>',
//       periodId: founding.id,
//       published: true
//     },
//     {
//       position: 6,
//       text: '<p>A primordial titan seed was planted in the area that would later become the Rifenmist Jungle.</p>',
//       periodId: founding.id,
//       published: false
//     },
//     {
//       position: 11,
//       text: '<p>The gods came to the chaotic world and created the elves, then the dwarves, then the humans, then other races. The gods lent power to the mortals to tame the world: the first divine magics.</p>',
//       periodId: founding.id,
//       published: true
//     },
//     {
//       position: 16,
//       text: '<p>A dark, alien power seeped into reality and threatened all life on the world. The gods banded together to banish it, and it crystallized into the moon of Ruidus.</p>',
//       periodId: founding.id,
//       published: false
//     },
//     {
//       position: 21,
//       text: '<p>The gods created the Dragons Metallic to further protect the gentler races.</p>',
//       periodId: founding.id,
//       published: true
//     },
//     {
//       position: 26,
//       text: '<p>The Primordials rose to attack the mortal races. The Creators split between the Prime Deities, who wanted to stay and subdue the Primordials for their creations\' sake, and the Betrayer Gods, who wished to join with the Primordials and allow chaos to reclaim the world. Demons from the Abyss, drawn by the violence, spilled forth to feast on the carrion. Celestials from a distant realm also emerged to bring order. The Prime Deities sought the celestials\' aid.</p> \
//       <ul> \
//       <li>In the Age of Arcanum, it was believed that the Primordials had risen up to correct an imbalance caused by the gods granting mortals divine magic. Asmodeus told Zerxus Ilerez the Prime Deities had granted that magic in spite of the gods\' promises to the Primordials.</li> \
//       <li>By one account, Asmodeus (who claimed to be celestial himself) turned celestials into the first devils; under that fallen angel, they turned to tyranny, and forged new hells. By another account, the Betrayer Gods imposed order on some demons and turned them into devils.</li> \
//       </ul>',
//       periodId: founding.id,
//       published: true
//     },
//     {
//       position: 31,
//       text: '<p>The Prime Deities took up arms, and also gave the mortals knowledge of arcane magic so they could defend themselves without the aid of divine power. The traitorous mortals were driven back, the Betrayer Gods were banished to their own prison-like planes, and the Primordials were destroyed and scattered to their own planes.</p> \
//       <ul> \
//       <li>Tharizdun was imprisoned beneath Gatshadow Mountain.</li> \
//       <li>A Primordial earth titan, in its final battle, was slammed into the ground violently enough to create the Zenwick Mountains.</li> \
//       <li>Pelor and Melora defeated two of the greatest Primordials, Ka\'Mort the Empress of Earth and Rau\'shan the Emperor of Fire, and sealed them beneath Mount Ygora</li> \
//       </ul>',
//       periodId: founding.id,
//       published: true
//     },
//     {
//       position: 36,
//       text: '<p>After the Prime Deities\' victory, Vasselheim, the Dawn City, was founded.</p>',
//       periodId: founding.id,
//       published: true
//     },
//     {
//       position: 41,
//       text: '<p>After the founding of Vasselheim, the races ventured forth to discover new lands. The world was named Exandria.</p>',
//       periodId: founding.id,
//       published: true
//     },
//   ]

//   foundingEvents.map(async (event, i) => {
//     const total = foundingEvents.length;
//     event.position = Math.floor(100 / total * i);

//     await prisma.event.create({
//     data: event,
//   })
//   })
// }

//   const arcanum = await prisma.period.findUnique({ where: { slug: 'age-of-arcanum'}})
//   console.log('arcanum: ', arcanum);

//   if(arcanum){
//   const arcanumEvents = [
//     {
//       position: 1,
//       text: '<p>The Age of Arcanum began.</p><ul><li>A civilization was known to exist in Marquet, with a religious sanctuary called the Vault of Shumas in the Aggrad Mountains.</li></ul>',
//       periodId: arcanum.id,
//       published: true
//     },
//     {
//       position: 6,
//       text: '<p>Yug\'Voril was established.</p>',
//       periodId: arcanum.id,
//       published: true
//     },
//     {
//       position: 11,
//       text: '<p>An ancient black dragon-turned-dracolich, Guuthal the Ever-Fed, terrorized the world.</p>',
//       periodId: arcanum.id,
//       published: true
//     },
//     {
//       position: 16,
//       text: '<ul><li>The dwarven Thomara clan dug into a fallen earth titan to exploit a precious metal vein cluster and built a vault city there. The society eventually collapsed into madness and cannibalism.</li><li>The Vues\'dal volcano erupted for the last time, and the mountain collapsed, creating the Vues\'dal Basin, which was eventually filled in by the Feshun River and became the Vues\'dal Waters.</li></ul>',
//       periodId: arcanum.id,
//       published: true
//     },
//     {
//       position: 21,
//       text: '<p>The greatest sages of the Age of Arcanum managed to experiment with reversing the flow of time without being killed.</p>',
//       periodId: arcanum.id,
//       published: true
//     },
//     {
//       position: 26,
//       text: '<p>The increasingly decadent and cruel society of the drow began to primarily worship Lolth, the Spider Queen.</p>',
//       periodId: arcanum.id,
//       published: true
//     },
//     {
//       position: 31,
//       text: '<p>After making the Pact of Crown and Throne with the Gau Drashari druids, and using the rich brumestone veins throughout Mount Ygora, Imyr Por\'co lifted the peak of the mountain, turning it into the flying city of Avalir.</p>',
//       periodId: arcanum.id,
//       published: true
//     },
//     {
//       position: 36,
//       text: '<p>The archmage Vecna\'s contributions to arcane theory enabled many of the artifacts that would stoke the flames of the Calamity. He began hoarding secrets, killing those who knew them, and achieved lichdom. He amassed a force of followers and undead, disappeared with them into the Shadowfell to conquer Thar Amphala, and there built Entropis.</p>',
//       periodId: arcanum.id,
//       published: true
//     },
//     {
//       position: 41,
//       text: '<p>From Entropis, Vecna used the celestial solstice, a merging of ley energies, to open portals for his forces to attack his enemies at a whim and retreat to Thar Amphala before retaliating forces could muster. Vecna defeated one old rival, Kas, who accepted an offer of eternal life through vampirism in exchange for becoming Vecna\'s chief lieutenant. Vecna forged a sentient relic blade for Kas, who used it to terrorize Vecna\'s enemies for months, thereby becoming Kas the Bloody-Handed. Vecna, who had managed to reconstruct the Raven Queen\'s rites of ascension, then attempted the Ritual of Seeding to ascend to godhood. He was interrupted when the Beacon of Arms, a holy army of Pelor led by his champion Yos Varda, used a reverse-engineered celestial solstice to attack Thar Amphala. Yos Varda, Vecna, and Kas all perished, and Vecna\'s forces were defeated and scattered, but only a few members of the Beacon of Arms returned victorious. Vecna had left instructions for his most devoted followers to carry on the work of raising him to godhood in spite of his death; they founded the Remnants.</p>',
//       periodId: arcanum.id,
//       published: true
//     },
//     {
//       position: 41,
//       text: '<p>The original Cerberus Assembly was formed.</p>',
//       periodId: arcanum.id,
//       published: true
//     },
//     {
//       position: 41,
//       text: '<p>Minotaurs were created as living weapons and guardians.</p>',
//       periodId: arcanum.id,
//       published: true
//     },
//     {
//       position: 41,
//       text: '<p>A cabal of Issylran warlocks consorted with dark entities, resulting in the first tieflings.</p>',
//       periodId: arcanum.id,
//       published: true
//     },
//     {
//       position: 41,
//       text: '<p>Tieflings fleeing religious zealots sailed from Issylra to Gwessar.</p>',
//       periodId: arcanum.id,
//       published: true
//     },
//     {
//       position: 41,
//       text: '<p>Some rock gnomes also migrated from Issylra to Gwessar.</p>',
//       periodId: arcanum.id,
//       published: true
//     },
//     {
//       position: 41,
//       text: '<p>A handful of brumestone-powered flying cities, including Aeor, Avalir, and Zemniaz, traveled across Exandria.</p>',
//       periodId: arcanum.id,
//       published: true
//     },
//     {
//       position: 41,
//       text: '<p>In the jungles of eastern Marquet was a city of elven architecture later called Cael Morrow.</p>',
//       periodId: arcanum.id,
//       published: true
//     },
//     {
//       position: 41,
//       text: '<p>Seers of a serpentfolk empire foresaw the Calamity; to survive its dangers, the empire created a magical stasis field under their capital city of Vos\'sykriss (now Visa Isle) where its strongest people waited to one day emerge and rebuild their empire.</p>',
//       periodId: arcanum.id,
//       published: true
//     },
//     {
//       position: 41,
//       text: '<p>The Court of Ullusa, a society of elves in Gwessar, fell, but with several survivors.</p>',
//       periodId: arcanum.id,
//       published: true
//     },
//     {
//       position: 41,
//       text: '<p>A competing religious force (apparently followers of Zehir) slaughtered the people in the Vault of Shumas and locked it off.</p>',
//       periodId: arcanum.id,
//       published: true
//     },
//     {
//       position: 41,
//       text: '<p>Inspired by the Raven Queen\'s ascension, archmage Vespin Chloras unsealed the Betrayer Gods from their prisons. They turned on Vespin and made him their first thrall.</p>',
//       periodId: arcanum.id,
//       published: true
//     },
//     {
//       position: 41,
//       text: '<p>The Betrayer Gods quickly created Ghor Dranas.</p><ul><li>Torog\'s followers used the caves beneath Ghor Dranas as torture dungeons.</li></ul>',
//       periodId: arcanum.id,
//       published: true
//     },
//     {
//       position: 41,
//       text: '<p>Lady Elmenore opened portals to the Feywild for the fey of the Seelie Court to escape from Exandria.</p>',
//       periodId: arcanum.id,
//       published: true
//     },
//     {
//       position: 41,
//       text: '<p>The continent of Domunas was destroyed, creating a plume of ash that covered Exandria for a century.</p>',
//       periodId: arcanum.id,
//       published: true
//     },
//     {
//       position: 41,
//       text: '<p>Torog tortured the Betrayer Gods\' enemies at the Bastille of Torment under the Dunrock Mountains.</p>',
//       periodId: arcanum.id,
//       published: true
//     },
//     {
//       position: 41,
//       text: '<p>The Betrayer Gods and their forces made a surprise attack on Vasselheim, but the city repulsed them with backup from the Prime Deities. The siege lasted for 20 days and nights, reducing much of the city to rubble.</p>',
//       periodId: arcanum.id,
//       published: true
//     },
//   ]

//   arcanumEvents.map(async (event, i) => {
//     const total = arcanumEvents.length;
//     event.position = Math.floor(100 / total * i);

//     await prisma.event.create({
//     data: event,
//   })
//   })
// }

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