import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import GridItem from '../../components/GridItem';
import prisma from '../../lib/prisma';
import OverviewPage from '../../components/OverviewPage';
import Pagination from '../../components/Pagination';
import { Recap } from '../../interfaces/Recap';
import Link from 'next/link';

const perPage = 12;

type Props = {
  recaps: Recap[];
  currentPage: number;
  totalPages: number;
};

const Recaps = (props: Props) => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState(props.recaps);

  useEffect(() => {
    setItems(() =>
      props.recaps.filter((recap) =>
        recap.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [props.recaps, query]);

  return (
    <OverviewPage>
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
          <ul className="text-2xl space-y-5">
            {items.map((recap) => (
              <li>
                <Link href={`/recap/${recap.id}`}>
                  <a>{recap.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Pagination
          currentPage={props.currentPage}
          totalPages={props.totalPages}
          urlPrefix="/recaps"
        />
      </div>
    </OverviewPage>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const recaps = await prisma.recap.findMany({});

  const page = Number(params?.page) || 1;

  return {
    props: {
      recaps: recaps.slice(perPage * page - perPage, perPage * page),
      totalCount: recaps.length,
      currentPage: page,
      totalPages: recaps.length / perPage,
    },
  };
};

export default Recaps;

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
