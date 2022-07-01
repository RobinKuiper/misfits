import React from 'react';
import { SettingSidebar, WithSidebar } from '../../components/page';

type Props = {};

const setting = (props: Props) => {
  return (
    <WithSidebar title="Campaign Setting" sidebar={<SettingSidebar />}>
      <h1 className={`text-4xl mb-5 text-[#B29438]`}>Exandria</h1>
      <p>
        Welcome to Exandria, the Material Plane created by Matthew Mercer and
        originally shaped by his crew of zany friends. While this campaign will
        necessarily diverge from Critical Role's plot in order for our party to
        tell their own story, the first several months of the campaign do align
        with CR canon, with some slight changes. Vox Machina lived their lives
        on Tal'Dorei, the Mighty Nein's adventures contributed to the war, and
        now, at a critical moment in history, five new heroes have met by chance
        in the frozen wastes of Eiselcross.
      </p>

      <p>
        Our story begins in Wildemount. The year is 835 P.D., or
        Post-Divergence. In the centuries since the gods sealed themselves away
        from the Material Plane via the Divine Gate, sentient life has risen up
        to reclaim this rocky continent. To the southwest, sheltered by the
        Cyrios Mountains, the bustling city-states of the Menagerie Coast make
        trade with the countless civilizations of nearby continents, absorbing
        traditions and currency alike into a prosperous melting pot of culture
        united by the Clovis Concord. Farther inland stretches the massive
        region known as Wynandir, dominated by the Dwendalian Empire in the west
        and by the badlands of Xhorhas in the east. Until recently, the Empire
        and Xhorhas maintained a frigid peace. Recently, however, with the theft
        and subsequent retrieval of a priceless cultural artifact, tensions
        between the two superpowers have boiled over into outright war,
        primarily concentrated around the Ashkeeper Peaks that divide them.
      </p>
      <p>
        Both territories are littered with ruins and relics of the Calamity, the
        war between the gods that decimated the Material Plane and resulted in
        the Divergence. Rather than excavate a war zone, adventurers with an eye
        for riches have turned their gazes northward, toward the Greying
        Wildlands, the dwarven and elven refuge of Uthodurn, and the frigid
        island wastes of Eiselcross just off the map. For it was over
        Eiselcross, a scattering of islands buried in centuries of snow and ice,
        that the floating city-state of Aeor was cast out of the sky.
      </p>
      <p>
        Aeor, a place of inventors, magic, and progress, was long believed to
        have been obliterated as punishment for creating weapons to destroy
        divinities, and the gods’ recent silence on the matter has only
        furthered this conviction. However, recent discoveries of Aeorian
        artifacts revealed the truth of Aeor’s resting place and spurred rumors
        of arcane secrets frozen beneath the ice of Eiselcross. Now Dwendalian,
        Uthodurnian, Xhorhasian, and mercenary expeditions search the hazardous
        terrain for materials that could change the tide of the war between the
        Dwendalian Empire and Xhorhas. As our story begins, five explorers meet
        by chance in the snowy wastes of Eiselcross, unaware of the destiny they
        are about to set in motion...
      </p>
      <p>
        For more information about Exandria and the world of Critical Role,
        visit www.critrole.com; read The Explorer's Guide to Wildemount and Call
        of the Netherdeep ; and check out the official Tal'Dorei campaign
        setting, including the Reborn edition. Neither the DM nor the party
        claim any rights to Exandria or her lore; indeed, we are grateful to the
        cast of Critical Role for being so generous with the world they have
        created. We greatly enjoy playing in it and look forward to whatever
        shenanigans come next. Much of the content here comes from EGW, Critical
        Role: Tal'Dorei Campaign Setting Reborn, and Critical Role: Call of the
        Netherdeep, so if anything presents a copyright issue please let us know
        and we will take down or re-word any articles that cause a problem.
      </p>
    </WithSidebar>
  );
};

export default setting;
