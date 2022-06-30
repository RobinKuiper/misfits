import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { BsGrid3X3, BsList, BsSortDownAlt, BsSortUpAlt } from 'react-icons/bs';
import GridItem from '../../components/GridItem';
import Layout from '../../components/Layout';
import Pagination from '../../components/Pagination';
import { Item } from '../../interfaces/Item';
import prisma from '../../lib/prisma';

const perPage = 12;

type Props = {
  items: Item[];
  category: string;
  categoryId: number;
};

const List = ({ items, category, categoryId }: Props) => {
  const session = useSession();
  const [query, setQuery] = useState('');
  const [shownItems, setShownItems] = useState(items);
  const [totalPages, setTotalPages] = useState(Number(items?.length) / perPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('asc');
  const [preview, setPreview] = useState('grid');

  useEffect(() => {
    if (category === 'notes') setPreview('list');
    else setPreview('grid');
  }, [category]);

  useEffect(() => {
    const fItems = items.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    const sorted = fItems.sort((a, b) => {
      const value1 = sortOrder === 'asc' ? -1 : 1;
      const value2 = sortOrder === 'asc' ? 1 : -1;

      switch (sortBy) {
        case 'name':
          return a.name.toLowerCase() < b.name.toLowerCase() ? value1 : value2;
          break;

        case 'createdAt':
          return new Date(a.createdAt) < new Date(b.createdAt)
            ? value1
            : value2;
          break;

        case 'updatedAt':
          return new Date(a.updatedAt) < new Date(b.updatedAt)
            ? value1
            : value2;
          break;

        default:
          return 0;
      }
    });

    const sItems = sorted.slice(
      perPage * currentPage - perPage,
      perPage * currentPage
    );

    setShownItems(sItems);

    setTotalPages(fItems.length / perPage);
  }, [query, currentPage, items, sortOrder, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, items]);

  const handleCreate = async () => {
    if (!session.data) return;

    const endpoint = '/api/item';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        categoryId,
      }),
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    Router.push(`/${category}/${result.slug}?edit=true`);
  };

  const changeSort = (by: string) => {
    if (sortBy === by) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(by);
    }
  };

  return (
    <Layout>
      <Head>
        <title>{category.toUpperCase()} - Misfits</title>
      </Head>

      <div className="flex flex-row h-full relative">
        {session.data && (
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
              <div className={`mb-5 flex gap-5`}>
                {category === 'locations' && (
                  <div className="flex justify-center items-center">
                    <Link href="/map">
                      <a className="p-2 bg-white text-black rounded font-bold h-full justify-center items-center flex space-x-2 hover:bg-zinc-300">
                        <FaMapMarkedAlt />
                        <span>Map</span>
                      </a>
                    </Link>
                  </div>
                )}
                <div className="w-full">
                  <input
                    type="search"
                    className="w-full p-3 rounded shadow-2xl shadow-[#3C3C3C] text-white"
                    style={{
                      background: 'rgba(0,0,0,0.5)',
                    }}
                    placeholder="Search..."
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>

                <div className="flex justify-center items-center shadow-2xl shadow-[#3C3C3C]">
                  <button
                    className="rounded-l p-2 text-white font-bold h-full justify-center items-center flex space-x-2 hover:bg-zinc-300"
                    style={{
                      background: 'rgba(0,0,0,0.5)',
                    }}
                    onClick={() =>
                      setPreview((prev) => (prev === 'list' ? 'grid' : 'list'))
                    }
                  >
                    {preview === 'list' ? <BsGrid3X3 /> : <BsList />}
                  </button>

                  <select
                    className="text-white h-full"
                    style={{
                      background: 'rgba(0,0,0,0.5)',
                    }}
                    defaultValue={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="name">Name</option>
                    <option value="updatedAt">Updated</option>
                    <option value="createdAt">Created</option>
                  </select>

                  <button
                    className="rounded-r p-2 text-white font-bold h-full justify-center items-center flex space-x-2 hover:bg-zinc-300"
                    style={{
                      background: 'rgba(0,0,0,0.5)',
                    }}
                    onClick={() =>
                      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
                    }
                  >
                    {sortOrder === 'asc' ? <BsSortDownAlt /> : <BsSortUpAlt />}
                  </button>
                </div>
              </div>

              {preview === 'list' ? (
                <ul className="space-y-2">
                  {shownItems.map((item) => (
                    <Link href={`/notes/${item.slug}`}>
                      <li
                        className="border-2 border-zinc-800 shadow rounded
                      cursor-pointer flex flex-col px-3 py-2 w-[30%]"
                        style={{
                          background: item.published
                            ? 'rgba(0,0,0,0.7)'
                            : '#f1f1f1',
                          color: item.published ? 'white' : 'black',
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
                      item={item}
                      url={`/${category}/${item.slug}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
  query,
}) => {
  const session = await getSession({ req });

  const category = await prisma.category.findUnique({
    where: { slug: params?.category as string },
  });

  const where = session
    ? { categoryId: category?.id, name: { contains: query?.s as string } }
    : {
        categoryId: category?.id,
        published: true,
        name: { contains: query?.s as string },
      };

  const items: Item[] = await prisma.piece.findMany({
    where,
  });

  const itemsWithDates = items.map((item) => {
    item.createdAt = new Date(item.createdAt).toISOString() as string;
    item.updatedAt = new Date(item.updatedAt).toISOString() as string;

    return item;
  });

  return {
    props: {
      items: itemsWithDates,
      category: params?.category,
      categoryId: category?.id,
    },
  };
};

export default List;
