import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';
import { Item } from '../interfaces/Item';
import prisma from '../lib/prisma';

type Props = {
  featured: Item;
};

const Home = (props: Props) => {
  return (
    <Layout>
      <Head>
        <title>Misfits</title>
      </Head>

      <div className="flex w-full h-full text-white">
        <div className="w-full sm:w-1/2 space-y-5 p-20 pt-10">
          <h1 className="text-4xl">Call of the Netherdeep</h1>
          <p>
            The greed of mortals has awakened a powerful entity long thought
            destroyed. For eons, this mighty champion of the gods has been
            imprisoned in the darkest depths of Exandria. His name has been
            forgotten, as have his heroic deeds. Languishing in despair, he
            calls out for new heroes to save him.
          </p>

          <p>
            This adventure begins in the Wastes of Xhorhas and leads to the
            glimmering oasis-city of Ank’Harel on the continent of Marquet, and
            from there into a sunken realm of gloom, corruption, and sorrow
            known as the Netherdeep. Above it all, the red moon of Ruidus
            watches, twisting the fates of those who have the power to shape the
            course of history.
          </p>
        </div>

        <div className="hidden sm:block w-1/2 h-full">
          <div className="p-20 pt-10 relative h-full">
            <Image
              src={props.featured.image}
              layout="responsive"
              width="100%"
              height="100%"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const items = await prisma.piece.findMany({
    where: {
      published: true,
      image: {
        startsWith: '/',
      },
    },
  });
  const item = items[Math.floor(Math.random() * items.length)];

  return {
    props: {
      featured: item,
    },
  };
};

export default Home;
