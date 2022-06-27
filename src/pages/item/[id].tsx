import { GetServerSideProps } from 'next';
import Image from 'next/image';
import React from 'react';
import ItemPage from '../../components/ItemPage';
import { Item } from '../../interfaces/Item';
import prisma from '../../lib/prisma';

type Props = {
  item: Item;
  nextId: number;
  prevId: number;
};

const Item = ({ item, nextId, prevId }: Props) => {
  return (
    <ItemPage nextId={nextId} prevId={prevId} urlPrefix="/item">
      <div className="h-full">
        <div className="flex flex-col sm:flex-row gap-10 h-full">
          <div className="w-full sm:w-1/2">
            <h1 className="text-4xl text-[#B29438] mb-5">{item.name}</h1>
            <span
              className="space-y-5"
              dangerouslySetInnerHTML={{
                __html: item.description,
              }}
            ></span>
          </div>

          <div className="w-full sm:w-1/2 relative sm:mx-20 h-64 sm:h-full">
            <div className="shadow-2xl h-full">
              <Image src={item.image} layout="fill" objectFit="contain" />
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

  const items = await prisma.item.findMany();

  const item = items.find((item) => Number(item.id) === Number(params.id));

  if (!item)
    return {
      props: {},
    };

  const currentIndex = items.indexOf(item);

  const nextId =
    items[currentIndex + 1 <= items.length - 1 ? currentIndex + 1 : 0].id;

  const prevId =
    items[currentIndex - 1 >= 0 ? currentIndex - 1 : items.length - 1].id;

  return {
    props: {
      item,
      nextId,
      prevId,
    },
  };
};

export default Item;
