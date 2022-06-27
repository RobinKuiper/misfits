import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import GridItem from '../../components/GridItem';
import { Character } from '../../interfaces/Character';
import prisma from '../../lib/prisma';
import OverviewPage from '../../components/OverviewPage';
import Pagination from '../../components/Pagination';

const perPage = 12;

type Props = {
  characters: Character[];
  currentPage: number;
  totalPages: number;
};

const Characters = (props: Props) => {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState(props.characters);

  useEffect(() => {
    setItems(() =>
      props.characters.filter((character) =>
        character.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [props.characters, query]);

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
          <div className="grid gap-5 grid-cols-2 sm:grid-cols-4">
            {items.map((character) => (
              <GridItem
                key={character.id}
                title={character.name}
                image={character.image}
                url={`/character/${character.id}`}
              />
            ))}
          </div>
        </div>

        <Pagination
          currentPage={props.currentPage}
          totalPages={props.totalPages}
          urlPrefix="/characters"
        />
      </div>
    </OverviewPage>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const characters = await prisma.character.findMany({});

  const page = Number(params?.page) || 1;

  return {
    props: {
      characters: characters.slice(perPage * page - perPage, perPage * page),
      totalCount: characters.length,
      currentPage: page,
      totalPages: characters.length / perPage,
    },
  };
};

export default Characters;

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
