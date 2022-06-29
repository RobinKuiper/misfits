import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import Layout from '../../components/Layout';
import { Item } from '../../interfaces/Item';
import { TABLES } from '../../utils/constants';
import Tiptap from '../../components/Tiptap';

type Props = {
  item: Item;
  category: string;
  nextId: number;
  prevId: number;
  edit: boolean;
};

const Item = ({ item, category, prevId, nextId, edit }: Props) => {
  const [editting, setEditting] = useState(edit);
  const session = useSession();
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [image, setImage] = useState(item.image);
  const [published, setPublished] = useState(item.published);

  useEffect(() => {
    setName(item.name);
    setDescription(item.description);
    setImage(item.image);
    setPublished(item.published);
  }, [item]);

  const toggleEdit = () => {
    if (session.data) setEditting(!editting);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;

      case 'description':
        setDescription(e.target.value);
        console.log(description);
        break;

      case 'image':
        setImage(e.target.value);
        break;

      case 'published':
        setPublished(e.target.checked);
        break;
    }
  };

  const handleDelete = async () => {
    if (!session.data) return;

    const endpoint = '/api/item';

    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: item.id,
        type: category,
      }),
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    setEditting(false);
    Router.push(`/list/${category}/1`);
  };

  const togglePublish = async () => {
    if (!session.data) return;

    const endpoint = '/api/item';

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: item.id,
        name,
        description,
        image,
        published: !published,
        type: category,
      }),
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    setPublished(!published);
  };

  const handleSave = async () => {
    if (!session.data) return;

    const endpoint = '/api/item';

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: item.id,
        name,
        description,
        image,
        published,
        type: category,
      }),
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    setEditting(false);
    Router.push(`/${category}/${item.id}`);
  };

  return (
    <Layout>
      <Head>
        <title>{item.name} - Misfits</title>
      </Head>

      <div className="sm:flex flex-row h-full relative">
        {session.data && (
          <div className="absolute bottom-0 right-0 flex space-x-5">
            <button
              onClick={togglePublish}
              className="bg-black text-white p-3 rounded"
            >
              {published ? 'Unpublish' : 'Publish'}
            </button>

            <button
              onClick={toggleEdit}
              className="bg-black text-white p-3 rounded"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="bg-black text-white p-3 rounded"
            >
              Delete
            </button>
          </div>
        )}

        <Link href={`/${category}/${nextId}`}>
          <div className="hidden sm:flex w-1/12 text-white justify-center items-center text-6xl cursor-pointer">
            <a>
              <MdArrowBackIos />
            </a>
          </div>
        </Link>

        <div className="text-white w-full p-4 space-y-5  mb-16 scrollbar sm:overflow-y-auto">
          <div className="h-full">
            <div className="flex flex-col sm:flex-row gap-10 h-full">
              <div
                className={`w-full ${item.image ? 'sm:w-1/2' : 'sm:w-full'}`}
              >
                {editting ? (
                  <input
                    type="text"
                    defaultValue={item.name}
                    name="name"
                    // className="text-black p-3 w-full mb-5"
                    className={`text-4xl mb-5 bg-transparent ${
                      published ? 'text-[#B29438]' : 'text-red-600'
                    }`}
                    onChange={handleChange}
                  />
                ) : (
                  <h1
                    className={`text-4xl mb-5 ${
                      published ? 'text-[#B29438]' : 'text-red-600'
                    }`}
                  >
                    {item.name}
                  </h1>
                )}
                {editting ? (
                  <div className="w-full">
                    <Tiptap
                      content={item.description}
                      setText={setDescription}
                    />
                  </div>
                ) : (
                  <span
                    className="unreset"
                    dangerouslySetInnerHTML={{
                      __html: item.description,
                    }}
                  ></span>
                )}
              </div>

              {((item.image &&
                (item.image.startsWith('/') ||
                  item.image.startsWith('http'))) ||
                editting) && (
                <div className="w-full sm:w-1/2 relative sm:mx-20 h-64 sm:h-full">
                  {editting ? (
                    <div className="space-y-5">
                      <input
                        type="text"
                        defaultValue={item.image}
                        className="text-black p-3 w-full"
                        name="image"
                        onChange={handleChange}
                      />
                      <div className="space-x-3">
                        <input
                          type="checkbox"
                          defaultChecked={item.published}
                          name="published"
                          onChange={handleChange}
                          className="w-6 h-6 text-green-600 border-0 rounded-md focus:ring-0"
                        />
                        <label className="text-3xl">Published</label>
                      </div>
                      <button
                        className="bg-orange-300 p-2 text-black font-bold w-full"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="shadow-2xl h-full relative">
                      <div className="fixed w-[30%] h-[50%]">
                        {item.image && (
                          <Image
                            src={item.image}
                            layout="fill"
                            objectFit="contain"
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <Link href={`/${category}/${prevId}`}>
          <div className="hidden w-1/12 text-white sm:flex justify-center items-center text-6xl cursor-pointer">
            <a>
              <MdArrowForwardIos />
            </a>
          </div>
        </Link>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
}) => {
  const ref = TABLES.find((table) => table.id === params?.category);

  if (!ref) return { props: {} };

  const db = ref.table;

  if (!db) return { props: {} };

  const items = await db.findMany();

  const item = items.find((item) => Number(item.id) === Number(params?.id));

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
      category: params?.category,
      nextId,
      prevId,
      edit: query.edit === 'true',
    },
  };
};

export default Item;
