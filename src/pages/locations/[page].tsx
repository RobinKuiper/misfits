import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import GridItem from '../../components/GridItem';
import prisma from '../../lib/prisma';
import OverviewPage from '../../components/OverviewPage';
import Pagination from '../../components/Pagination';
import { Location } from '../../interfaces/Location';
import Link from 'next/link';
import { FaMapMarkedAlt } from 'react-icons/fa';

const perPage = 12;

type Props = {
  locations: Location[];
  currentPage: number;
  totalPages: number;
};

const Locations = (props: Props) => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState(props.locations);

  useEffect(() => {
    setItems(() =>
      props.locations.filter((location) =>
        location.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [props.locations, query]);

  return (
    <OverviewPage>
      <div className="h-full relative">
        <div className="h-full relative">
          <div className="mb-5 flex">
            <div className="w-1/12 flex justify-center items-center">
              <Link href="/map">
                <a className="p-2 bg-white text-black rounded font-bold h-full justify-center items-center flex space-x-2 hover:bg-zinc-300">
                  <FaMapMarkedAlt />
                  <span>Live Map</span>
                </a>
              </Link>
            </div>
            <div className="w-full">
              <input
                type="search"
                className="w-full p-3 text-black rounded bg-white"
                placeholder="Search..."
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-5 grid-cols-2 sm:grid-cols-4">
            {items.map((location) => (
              <GridItem
                key={location.id}
                title={location.name}
                image={location.image}
                url={`/location/${location.id}`}
              />
            ))}
          </div>
        </div>

        <Pagination
          currentPage={props.currentPage}
          totalPages={props.totalPages}
          urlPrefix="/locations"
        />
      </div>
    </OverviewPage>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const locations = await prisma.location.findMany({});

  const page = Number(params?.page) || 1;

  return {
    props: {
      locations: locations.slice(perPage * page - perPage, perPage * page),
      totalCount: locations.length,
      currentPage: page,
      totalPages: locations.length / perPage,
    },
  };
};

export default Locations;

// export async function getStaticPaths() {
//   const characterCount = await prisma.character.count({});
//   const pages = characterCount / perPage;
//   const paths = [];

//   for (let i = 0; i < pages; i++) {
//     paths.push({ params: { page: (i + 1).toString() } });
//   }

//   return {
//     paths,
//     fallback: true, // false or 'blocking'
//   };
// }
