import { GetServerSideProps } from 'next';
import Image from 'next/image';
import React from 'react';
import ItemPage from '../../components/ItemPage';
import { Recap } from '../../interfaces/Recap';
import prisma from '../../lib/prisma';

type Props = {
  recap: Recap;
  nextId: number;
  prevId: number;
};

const Recap = ({ recap, nextId, prevId }: Props) => {
  return (
    <ItemPage nextId={nextId} prevId={prevId} urlPrefix="/recap">
      <div className="h-full">
        <div className="flex gap-10 h-full">
          <div className="w-full">
            <h1 className="text-4xl text-[#B29438] mb-5">{recap.title}</h1>
            <span
              className="space-y-5"
              dangerouslySetInnerHTML={{
                __html: recap.text,
              }}
            ></span>
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

  const recaps = await prisma.recap.findMany();

  const recap = recaps.find((recap) => Number(recap.id) === Number(params.id));

  if (!recap)
    return {
      props: {},
    };

  const currentIndex = recaps.indexOf(recap);

  const nextId =
    recaps[currentIndex + 1 <= recaps.length - 1 ? currentIndex + 1 : 0].id;

  const prevId =
    recaps[currentIndex - 1 >= 0 ? currentIndex - 1 : recaps.length - 1].id;

  return {
    props: {
      recap,
      nextId,
      prevId,
    },
  };
};

export default Recap;
