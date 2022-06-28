import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { FaMapMarkedAlt } from 'react-icons/fa';
import GridItem from '../../../components/GridItem';
import Layout from '../../../components/Layout';
import Pagination from '../../../components/Pagination';
import { Item } from '../../../interfaces/Item';
import { TABLES } from '../../../utils/constants';

const perPage = 12;

type Props = {
  items: Item[];
  currentPage: number;
  totalPages: number;
  category: string;
};

const List = ({ items, currentPage, totalPages, category }: Props) => {
  const session = useSession();
  const [query, setQuery] = useState('');
  const [shownItems, setShownItems] = useState(items);

  useEffect(() => {
    setShownItems(() =>
      items.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [items, query]);

  const handleCreate = async () => {
    if (!session) return;

    const endpoint = '/api/item';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: category,
      }),
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    Router.push(`/${category}/${result.id}?edit=true`);
  };

  return (
    <Layout>
      <Head>
        <title>{category} - Misfits</title>
      </Head>

      <div className="flex flex-row h-full relative">
        {session && (
          <div className="absolute bottom-0 right-0 flex space-x-5">
            <button
              onClick={handleCreate}
              className="bg-black text-white p-3 rounded"
            >
              Create
            </button>
          </div>
        )}

        <div className="text-white w-full p-4 space-y-5">
          <div className="h-full relative">
            <div className="h-full relative">
              <div className={`mb-5 ${category === 'locations' && 'flex'}`}>
                {category === 'locations' && (
                  <div className="w-2/12 flex justify-center items-center">
                    <Link href="/map">
                      <a className="p-2 bg-white text-black rounded font-bold h-full justify-center items-center flex space-x-2 hover:bg-zinc-300">
                        <FaMapMarkedAlt />
                        <span>Live Map</span>
                      </a>
                    </Link>
                  </div>
                )}
                <div className="w-full">
                  <input
                    type="search"
                    className="w-full p-3 text-black rounded bg-white"
                    placeholder="Search..."
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
              </div>

              {category === 'notes' ? (
                <ul className="space-y-2">
                  {shownItems.map((item) => (
                    <Link href={`/notes/${item.id}`}>
                      <li
                        className="border-2 border-zinc-800 shadow rounded
                      cursor-pointer flex flex-col px-3 py-2 w-[30%]"
                        style={{
                          background: 'rgba(0,0,0,0.7)',
                        }}
                      >
                        <a>{item.name}</a>
                      </li>
                    </Link>
                  ))}
                </ul>
              ) : (
                <div className="grid gap-5 grid-cols-2 sm:grid-cols-4">
                  {shownItems.map((item) => (
                    <GridItem
                      key={item.id}
                      title={item.name}
                      image={item.image}
                      url={`/${category}/${item.id}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              urlPrefix={`/${category}`}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const ref = TABLES.find((table) => table.id === params?.category);
  const db = ref?.table;
  const items = await db?.findMany();
  const page = Number(params?.page) || 1;

  return {
    props: {
      items: items?.slice(perPage * page - perPage, perPage * page),
      totalCount: items?.length,
      currentPage: page,
      totalPages: Number(items?.length) / perPage,
      category: params?.category,
    },
  };
};

export default List;