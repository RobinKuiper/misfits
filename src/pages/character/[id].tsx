import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import ItemPage from '../../components/ItemPage';
import { Character } from '../../interfaces/Character';
import prisma from '../../lib/prisma';

type Props = {
  character: Character;
  nextId: number;
  prevId: number;
};

const Character = ({ character, nextId, prevId }: Props) => {
  return (
    <ItemPage nextId={nextId} prevId={prevId} urlPrefix="/character">
      <Head>
        <title>{character.name} - Misfits</title>
      </Head>

      <div className="h-full">
        <div className="flex flex-col sm:flex-row gap-10 h-full">
          <div className="w-full sm:w-1/2">
            <h1 className="text-4xl text-[#B29438] mb-5">{character.name}</h1>
            <span
              className="space-y-5"
              dangerouslySetInnerHTML={{
                __html: character.description,
              }}
            ></span>
          </div>

          <div className="w-full sm:w-1/2 relative sm:mx-20 h-64 sm:h-full">
            <div className="shadow-2xl h-full">
              <Image src={character.image} layout="fill" objectFit="contain" />
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

  const characters = await prisma.character.findMany();

  const character = characters.find(
    (character) => Number(character.id) === Number(params.id)
  );

  if (!character)
    return {
      props: {},
    };

  const currentIndex = characters.indexOf(character);

  const nextId =
    characters[currentIndex + 1 <= characters.length - 1 ? currentIndex + 1 : 0]
      .id;

  const prevId =
    characters[currentIndex - 1 >= 0 ? currentIndex - 1 : characters.length - 1]
      .id;

  return {
    props: {
      character,
      nextId,
      prevId,
    },
  };
};

export default Character;
