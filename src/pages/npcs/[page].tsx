import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import GridItem from '../../components/GridItem';
import prisma from '../../lib/prisma';
import OverviewPage from '../../components/OverviewPage';
import Pagination from '../../components/Pagination';
import { Npc } from '../../interfaces/Npc';
import Head from 'next/head';

const perPage = 12;

type Props = {
  npcs: Npc[];
  currentPage: number;
  totalPages: number;
};

const Npcs = (props: Props) => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState(props.npcs);

  useEffect(() => {
    setItems(() =>
      props.npcs.filter((npc) =>
        npc.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [props.npcs, query]);

  return (
    <OverviewPage>
      <Head>
        <title>Npc's - Misfits</title>
      </Head>

      <div className="h-full relative">
        <div className="h-full relative">
          <div className="mb-5">
            <input
              type="search"
              className="w-full p-3 text-black rounded bg-white"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="grid gap-5 grid-cols-2 sm:grid-cols-4">
            {items.map((npc) => (
              <GridItem
                key={npc.id}
                title={npc.name}
                image={npc.image}
                url={`/npc/${npc.id}`}
              />
            ))}
          </div>
        </div>

        <Pagination
          currentPage={props.currentPage}
          totalPages={props.totalPages}
          urlPrefix="/npcs"
        />
      </div>
    </OverviewPage>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const npcs = await prisma.npc.findMany({});

  const page = Number(params?.page) || 1;

  return {
    props: {
      npcs: npcs.slice(perPage * page - perPage, perPage * page),
      totalCount: npcs.length,
      currentPage: page,
      totalPages: npcs.length / perPage,
    },
  };
};

export default Npcs;

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
