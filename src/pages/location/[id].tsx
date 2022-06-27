import { GetServerSideProps } from 'next';
import Image from 'next/image';
import React from 'react';
import ItemPage from '../../components/ItemPage';
import { Location } from '../../interfaces/Location';
import prisma from '../../lib/prisma';

type Props = {
  location: Location;
  nextId: number;
  prevId: number;
};

const Location = ({ location, nextId, prevId }: Props) => {
  return (
    <ItemPage nextId={nextId} prevId={prevId} urlPrefix="/location">
      <div className="h-full">
        <div className="flex flex-col sm:flex-row gap-10 h-full">
          <div className="w-full sm:w-1/2">
            <h1 className="text-4xl text-[#B29438] mb-5">{location.name}</h1>
            <span
              className="space-y-5"
              dangerouslySetInnerHTML={{
                __html: location.description,
              }}
            ></span>
          </div>

          <div className="w-full sm:w-1/2 relative sm:mx-20 h-64 sm:h-full">
            <div className="shadow-2xl h-full">
              <Image src={location.image} layout="fill" objectFit="contain" />
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

  const locations = await prisma.location.findMany();

  const location = locations.find(
    (location) => Number(location.id) === Number(params.id)
  );

  if (!location)
    return {
      props: {},
    };

  const currentIndex = locations.indexOf(location);

  const nextId =
    locations[currentIndex + 1 <= locations.length - 1 ? currentIndex + 1 : 0]
      .id;

  const prevId =
    locations[currentIndex - 1 >= 0 ? currentIndex - 1 : locations.length - 1]
      .id;

  return {
    props: {
      location,
      nextId,
      prevId,
    },
  };
};

export default Location;
