import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { promises as fs } from 'fs';
import Layout from '../../components/Layout';
import { Item } from '../../interfaces/Item';
import prisma from '../../lib/prisma';
import {
  AdminButtons,
  ItemDescription,
  ItemDescriptionInput,
  ItemFeaturedInput,
  ItemImage,
  ItemImageInput,
  ItemPublishedInput,
  ItemTitle,
  ItemTitleInput,
  NextArrow,
  PrevArrow,
} from '../../components/item';
import path from 'path';

type Props = {
  item: Item;
  category: string;
  nextSlug: number;
  prevSlug: number;
  edit: boolean;
};

const Item = ({ item, category, prevSlug, nextSlug, edit }: Props) => {
  const [editting, setEditting] = useState(edit);
  const session = useSession();
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [image, setImage] = useState(item.image);
  const [published, setPublished] = useState(item.published);
  const [featured, setFeatured] = useState(item.featured);

  useEffect(() => {
    setName(item.name);
    setDescription(item.description);
    setImage(item.image);
    setPublished(item.published);
  }, [item]);

  const toggleEdit = () => {
    if (session.data) setEditting(!editting);
  };

  const handleSave = async () => {
    if (!session.data) return;

    const endpoint = '/api/item';

    const body = JSON.stringify({
      id: item.id,
      name,
      description,
      image,
      published,
      featured,
    });

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    setEditting(false);
    Router.push(`/${category}/${item.slug}`);
  };

  return (
    <Layout>
      <Head>
        <title>{item.name} - Misfits</title>
      </Head>

      <div className="sm:flex flex-row h-full relative">
        <PrevArrow url={`/${category}/${nextSlug}`} />

        <div className="text-white w-full p-4 space-y-5  mb-16 scrollbar sm:overflow-y-auto">
          <div className="h-full">
            <div className="flex flex-col sm:flex-row gap-10 h-full">
              {editting ? (
                <>
                  <div className={`w-full sm:w-1/2`}>
                    <ItemTitleInput item={item} setTitle={setName} />
                    <ItemDescriptionInput
                      item={item}
                      setDescription={setDescription}
                    />
                  </div>

                  <div className="w-full sm:w-1/2 relative sm:mx-20 h-64 sm:h-full">
                    <div className="space-y-5">
                      <ItemImageInput
                        item={item}
                        setImage={setImage}
                        image={image}
                      />
                      <ItemPublishedInput
                        item={item}
                        setPublished={setPublished}
                      />
                      <ItemFeaturedInput
                        item={item}
                        setFeatured={setFeatured}
                      />

                      <button
                        className="bg-[#A29438] p-2 text-black font-bold w-full"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={`w-full ${
                      item.image ? 'sm:w-1/2' : 'sm:w-full'
                    }`}
                  >
                    <ItemTitle item={item} />
                    <ItemDescription item={item} />
                  </div>

                  <ItemImage item={item} />
                </>
              )}
            </div>
          </div>
        </div>

        <NextArrow url={`/${category}/${prevSlug}`} />

        <AdminButtons
          item={item}
          category={category}
          toggleEdit={toggleEdit}
          setPublished={setPublished}
          setFeatured={setFeatured}
          setEditting={setEditting}
        />
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
  req,
}) => {
  const session = await getSession({ req });

  const category = await prisma.category.findUnique({
    where: { slug: params?.category as string },
  });

  const where = session
    ? { categoryId: category?.id }
    : { categoryId: category?.id, published: true };

  const items = await prisma.piece.findMany({
    where,
  });

  const item = items.find((item) => item.slug === params?.slug);

  if (!item)
    return {
      props: {},
    };

  const currentIndex = items.indexOf(item);

  const i: Item = item;

  i.createdAt = new Date(item.createdAt).toISOString() as string;
  i.updatedAt = new Date(item.updatedAt).toISOString() as string;

  const nextSlug =
    items[currentIndex + 1 <= items.length - 1 ? currentIndex + 1 : 0].slug;

  const prevSlug =
    items[currentIndex - 1 >= 0 ? currentIndex - 1 : items.length - 1].slug;

  return {
    props: {
      item: i,
      category: params?.category,
      nextSlug,
      prevSlug,
      edit: query.edit === 'true',
    },
  };
};

export default Item;
