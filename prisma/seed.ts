import bcrypt from 'bcryptjs';
import prisma from '../src/lib/prisma';

const characters = [
  {
    name: 'Happy',
    description: 'Als heroic feat wil Cherissa dat ze de cult waar ze in zat had verlaten en ze de gouden tip aam de overheid te geven om ze op te pakken Waarom adventureren: sterker worden om zichzelf tegen ex cult members die misschien nog leven Doel: haar evil magic die ze heeft gekregen van de cult te gebruiken voor good Een deel van haar evilnes is gelocked in haar pendant die ze als spellcasting focus gebruikt Geen loot doel. Just get stronger',
    image: '/uploads/HappyCard.png'
  },
  {
    name: 'Helix',
    description: 'Outcast from my goblin tribe being mocked by my below average size, roaming, joined a pirate crew, witnessed a mutinay that killed the captian who was the only person who was kind to me, learn to love and respect most of the crew and helix was powerless becuase he wasnt strong enough to contest the power of tis man Started to find ways to become bigger, some giants took me in, because i could help with the cleaning of the smaller bones because of the humans they killed stronger to one day get revenge',
    image: '/uploads/helix.png'
  },
  {
    name: 'Jakar',
    description: '<p>Born with unnatural Fits of rage leading to the killing of one of my Clan mates, my clan banished me, But I was taken in by a Crew of Pirates, The Captain seemed to take a liking to me, but with my fits of rage came a Unrelenting and Chaotic magical power, one day destroying part of the ship I was thrown out once again, Finding Refuge with a crew I could trust.</p><p>First mate on the Broken Zealot, And commander of our raiding parties, I slowly started getting control of my Rage, and with it a control of the magic seemingly surging through me, I was feared by my enemies, but loved by those closest to me.</p><p>A fortune teller in town on one of our visits told me I would lose everything I had, and handed me a card resembling me in a rage atop a mountain of corpses Resembling my old crew, fearing I would lose control I left the crew behind, But on the day I was planning to leave, my Captain, The ship and the entire crew vanished, and so I set out to find them</p>',
    image: '/uploads/jakar.jpg'
  },
  {
    name: 'Tirrunn',
    description: '<p>His name was Tirrunn and back in his youth he and his family lived a good life high in the mountain.</p><p>all of a sudden, he grew tired of it and decided to do something else.<br>Tirrunn and his dagger, which he called Sharpy, which he got from his father back in the good old days, went to the village to get a job.</p><p>Once in the city he quickly found a job as a mercenary, killing for money, which was the fastest way to get it. Getting this money will get Tirrunn more easy ways to get powerful, better Stat boosts and better weapons and armor. Tirrunn didn’t care much for wands</p><p>After a lot of time, he grew to love the job more and more.</p><p>One day, an old lady came to the same city as Tirrunn was in. He saw that the town folks stole her handbag. Tirunn decided out of nowhere that he would do one good deed and killed the people from the shadows and gave the bag back to the old lady</p><p>Tirrunn wanted to grow more powerful and sneakier then all the others in the world</p><p>15 years later he got a job, he met 3/4 other people, he introduced himself as Tirrunn and his blade which is called sharpy. He already knows that he has to stay sharp with these folks, it might take a while for Tirunn to trust them.</p>',
    image: '/uploads/tirrunn.png'
  },
]

const locations = [
  {
    name: 'Exandria',
    description: 'Exandria is the name of the world on which most events of Critical Role take place. Exandria exists in a Material Plane, although it features connections to other planes of existence, such as the portals to the elemental planes guarded by the Ashari.',
    image: '/uploads/ExandriaMap.jpg'
  },
  {
    name: 'Wildemount',
    description: 'Wildemount is an Exandrian continent located to the northeast of Tal\'Dorei. The second campaign of Critical Role takes place on this continent. In the first campaign, the Briarwoods originated from Wildemount before seizing Whitestone. Taryon Darrington and his family were also residents of Wildemount, and the floating cities of Draconia had landed there.',
    image: '/uploads/Wildemount.webp'
  },
  {
    name: 'Jigow',
    description: 'Jigow is a collection of villages that grew together into a fishing port on the far northern coast of Xhorhas on the shores of the Emerald Gulch Sea and the Ifolon River..',
    image: '/uploads/JigowMap.webp'
  }
]

const npcs = [
  {
    name: 'Agathe',
    description: 'Agathe is an orc who runs the Unbroken Tusk Inn. The inn is on the back of a horizonback tortoise. Agathe is also responsible for the pie eating contest in the Festival of Merit each year.',
    image: '/uploads/agathe.webp'
  },
  {
    name: 'Elder Ushru',
    description: 'Orc. Rand the Festival of Merit in Jigow.',
    image: '/uploads/ushru.jpg'
  },
  {
    name: 'Elder Colbu Kaz',
    description: 'Goblin Priest, has healed you a couple of times. Ran the Festival of Merit in Jigow.',
    image: '/uploads/colbu.png'
  },
  {
    name: 'Ayo',
    description: 'Water Genasi. Has some trouble with Tirrunn because he threw 2 daggers in her.',
    image: '/uploads/ayo.png'
  },
  {
    name: 'Maggie',
    description: 'Big Ogre. Has a lot of strength and bright blue eyes.',
    image: '/uploads/maggie.png'
  },
  {
    name: 'Dermot',
    description: 'Goblin in heavy armor. Seems friendly, has healed Jakar after the river race.',
    image: '/uploads/dermot.png'
  },
  {
    name: 'Galsariad',
    description: 'Drow. Seems intelligent.',
    image: '/uploads/galsariad.png'
  },
  {
    name: 'Irvan',
    description: 'Human. Stole a medal during the Festival of Merit from Jakar.',
    image: '/uploads/irvan.png'
  },
  {
    name: 'Sharpwatch',
    description: 'Aarakocra. Ran the maze contest during the Festival of Merit.',
    image: '/uploads/sharpwatch.png'
  },
]

const items = [
  {
    name: 'Jewel of Three Prayers',
    description: "<p>You gain a +1 bonus to AC while wearing the jewel.</p><p>While wearing or holding the jewel, you can use an action to cause it to shed bright light in a 15-foot radius and dim light for an additional 15 feet. The light lasts until you extinguish it (no action required).</p><p>The jewel has 3 charges and regains all its expended charges daily at dawn. While holding the jewel, you can expend 1 charge from it to cast the ***[invisibility](https://www.dndbeyond.com/spells/invisibility)*** spell.</p>",
    image: '/uploads/jewel_of_three_prayers_dormant.png'
  },
]

const recaps = [
  {
    title: 'Recap: Road to Bazzoxan',
    text: '<p>Turrinn became sick during the festival and went back to the inn.</p><p>The rest over the group went towards the rice fields on the outside of the city, Jakar and Helix competed in a contest there and won it.<br />After that there was time for one more contest and you decided to try the pie eating contest again. This time Helix won a medal there.<br />Irvan stole a medal from Jakar here.</p><p>Almost the whole city gathered in the center when the sun started setting. Once there you saw that they made a podium where the elders where discussing. They announced that the Misfits and the Raven Claw\'s had the most medals.</p><p>The final contest was a race through the Emerald Grotto to find a medal that they hid there.</p><p>You went in, with the other group on your heels.<br />Swimming as fast as possible.<br />Happy casted a Darkness spell behind you guys, and Helix and Jakar split up from Happy.</p><p>Happy swam very fast to and open cavern, where she saw a shark with a medal on his neck. She grabbed the medal with a mage hand, and saw a cavern wall with some gold light shining through it.<br />She decided to see if you could pass through there, and she did, coming in a cavern with a pedestal with a Golden necklace on it. She grabbed the necklace and fell unconscious. She had a vision of Alyxian.</p><p>Jakar and Helix found her, they made it all out, and won the Festival of Merit\'s final battle.</p><p>You guys partied for the night, with the rest of town, and the next morning you woke up from the sound of Elder Colbu knocking on the door.<br />He invited you for breakfast, told you about a vision he had and gave you your rewards. 100 gold and a horizonback tortoise.</p><p>You guys went on your way to Bazaxxon (clues from the vision let you there).</p>'
  },
  {
    title: 'Note: Emerald Grotto Vision',
    text: '<p>“The light around the pedestal fades as a spectral figure in the form of a male human rises from the amulet. He is dressed in leather armor and a tattered red cape and wears a shield. His face is framed by curly brown hair and bears a melancholic expression. He pleads, "I am imprisoned. Please help me."</p><p>Suddenly, the ground vanishes beneath your feet, and you fall, tumbling through a vortex of golden light. You fall deeper, deeper, deeper, then suddenly stop. The golden light subsides, and you find yourself suspended in a pitch-black expanse. You feel water buoying you. A vermilion light appears in the distance, illuminating the melancholy warrior, who is shackled to the ground by disgusting strands of a fleshy, crimson substance.</p><p>He raises his gaze to the heavens and, sobbing, chokes out, "Moon Weaver, I beg of you. Guide those with the power to save me to the site where first I prayed to you." He looks around, and his eyes settle on you. "Oh! Thank the gods; bless the Moon Weaver. Someone has come! I am Alyxian, and I beg you to free me." He looks to you with desperate eyes. “Nooo, you are already fading,” he says panicking. “Go to the other shrines where I prayed and the gods came to me so long ago. To the Change Bringer, in the heart of the Evil Ones’ temple. And to the Arch Heart, in the… ruins of the jungle city.” Alyxian’s voice begins to fade away. “I might… able… speak again…”</p><p>You feel consciousness leaving you, as if the pressure of the water were crushing the life out of you. Alyxian\'s voice is the last thing you hear before you pass out. "Save me. Please."”</p>'
  },
  {
    title: 'Note: Vision During Demon Fight',
    text: '<p>Your vision goes dark, and for a moment you are under water with its weight pressing down, crushing the breath from your lungs, and a dim red light in the distance. Then, a moment later, you are back on the battle field, but it\'s a different one.</p><p>The sky is dim, and you are surrounded by creatures. You stab your spear through a slavering demon before spinning and slicing through the throat of an equally slavering human, one of those twisted enough to side with the Betrayers. You see one of the defenders cut down, their red blood mixing with the black ichor that you feel squish beneath your boots. You spin and dodge, cutting and stabbing, the smell of blood and rotten eggs burning your nose. Where is Perigee?</p><p>Moving further into the fray, a massive demon with tusks and dripping black feathers rakes its claws down your back. You barely feel it, noticing only for the time it takes to deliver a spear strike through its skull. You must find Perigee. She is your divinely granted, immortal companion; if a being created and blessed by the Moon Weaver herself cannot overcome the curse of Ruidus, what hope is there? She leads the defense; she\'ll be with the worst of the fighting, the largest of the demons. You charge through a clump of lesser demons, shield first, sending them to the ground, dimly aware that they are being crushed under the hooves of the bull demon goring another of your allies.</p><p>A divinely bright blast of radiant light thins the field before you, and you can see her, Perigee, with moon bright wings and a shining mace spattered in black gore. She fights fiercely, and she is strong. You know this; she has saved your life countless times while you two strive to cleanse the temple, to end the demonic presence in Wildemount. But her foe is a massive black-winged demon of fire. Its whip is coiled around her forearm, burning the flesh; you can smell it from here, can feel the heat the creature gives off. Another twist and stab. You hear Perigee chanting a prayer to the Moon Weaver, hear the clang as she deflects a fiery sword strike, smell burning feathers. The divine light grows brighter, her voice louder; you cry out her name. But the demon delivers another strike, and Abyssal and divine fire clash, combining in a massive explosion.</p><p>Your eyes clear, blinking away tears. Everyone around blast radius, friend and for alike, is char, smoldering on the ground. The demonic general is already melting into smoking, black ichor. And Perigee is softly glowing ash. Above, Catha shines, full and beautiful. Beside it, Ruidus gleams, red and hateful.</p><p>You fall to your knees. Time slows and speeds. On the battlefield around you, the enemy flees and scatters, their general defeated. Your remaining allies cheer, for they have survived another day, repelled another attempt to retake Bazzoxan. But you cannot find joy, cannot breathe for the pain in your chest. Eventually, the sun rises, and so does Alyxian, off to fight another battle.</p>'
  }
]

async function main() {
  const recaps = await prisma.recap.findMany();

  recaps.forEach(async (recap) => {
    const { id, ...data } = recap;

    const newNote = {
      name: data.title || '',
      description: data.text || '',
      image: ''
    }

    await prisma.note.create({
      data: newNote
    })
  })

  // const salt = await bcrypt.genSalt(10);

  // const email = process.env.ADMIN_EMAIL as string
  // const username = process.env.ADMIN_USERNAME as string
  // const password = await bcrypt.hash(process.env.ADMIN_PASSWORD as string, salt)

  // await prisma.user.upsert({
  //   where: { email },
  //   update: {},
  //   create: {
  //     email,
  //     username,
  //     password,
  //   },
  // });

  // await prisma.character.deleteMany({})

  // for(const character of characters){
  //   await prisma.character.create({
  //     data: character
  //   })
  // }

  // await prisma.location.deleteMany({})

  // for(const location of locations){
  //   await prisma.location.create({
  //     data: location
  //   })
  // }

  // await prisma.npc.deleteMany({})

  // for(const npc of npcs){
  //   await prisma.npc.create({
  //     data: npc
  //   })
  // }

  //   await prisma.item.deleteMany({})

  // for(const item of items){
  //   await prisma.item.create({
  //     data: item
  //   })
  // }

  // for(const recap of recaps){
  //   await prisma.recap.upsert({
  //   where: { title: recap.title },
  //   update: recap,
  //   create: recap,
  // });
  // }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })