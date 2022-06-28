import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import GridItem from '../../components/GridItem';
import prisma from '../../lib/prisma';
import OverviewPage from '../../components/OverviewPage';
import Pagination from '../../components/Pagination';
import { Item } from '../../interfaces/Item';
import Head from 'next/head';

const perPage = 12;

type Props = {
  items: Item[];
  currentPage: number;
  totalPages: number;
};

const Items = (props: Props) => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState(props.items);

  useEffect(() => {
    setItems(() =>
      props.items.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [props.items, query]);

  return (
    <OverviewPage>
      <Head>
        <title>Items - Misfits</title>
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
            {items.map((item) => (
              <GridItem
                key={item.id}
                title={item.name}
                image={item.image}
                url={`/item/${item.id}`}
              />
            ))}
          </div>
        </div>

        <Pagination
          currentPage={props.currentPage}
          totalPages={props.totalPages}
          urlPrefix="/items"
        />
      </div>
    </OverviewPage>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const items = await prisma.item.findMany({});

  const page = Number(params?.page) || 1;

  return {
    props: {
      items: items.slice(perPage * page - perPage, perPage * page),
      totalCount: items.length,
      currentPage: page,
      totalPages: items.length / perPage,
    },
  };
};

export default Items;

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
