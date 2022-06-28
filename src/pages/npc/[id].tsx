import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import ItemPage from '../../components/ItemPage';
import { Npc } from '../../interfaces/Npc';
import prisma from '../../lib/prisma';

type Props = {
  npc: Npc;
  nextId: number;
  prevId: number;
};

const Npc = ({ npc, nextId, prevId }: Props) => {
  return (
    <ItemPage nextId={nextId} prevId={prevId} urlPrefix="/npc">
      <Head>
        <title>{npc.name} - Misfits</title>
      </Head>

      <div className="h-full">
        <div className="flex flex-col sm:flex-row gap-10 h-full">
          <div className="w-full sm:w-1/2">
            <h1 className="text-4xl text-[#B29438] mb-5">{npc.name}</h1>
            <span
              className="space-y-5"
              dangerouslySetInnerHTML={{
                __html: npc.description,
              }}
            ></span>
          </div>

          <div className="w-full sm:w-1/2 relative sm:mx-20 h-64 sm:h-full">
            <div className="shadow-2xl h-full">
              <Image src={npc.image} layout="fill" objectFit="contain" />
            </div>
          </div>
        </div>
      </div>
    </ItemPage>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params)
    return {
      props: {},
    };

  const npcs = await prisma.npc.findMany();

  const npc = npcs.find((npc) => Number(npc.id) === Number(params.id));

  if (!npc)
    return {
      props: {},
    };

  const currentIndex = npcs.indexOf(npc);

  const nextId =
    npcs[currentIndex + 1 <= npcs.length - 1 ? currentIndex + 1 : 0].id;

  const prevId =
    npcs[currentIndex - 1 >= 0 ? currentIndex - 1 : npcs.length - 1].id;

  return {
    props: {
      npc,
      nextId,
      prevId,
    },
  };
};

export default Npc;
