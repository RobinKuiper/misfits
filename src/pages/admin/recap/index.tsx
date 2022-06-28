import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React from 'react';
import Layout from '../../../components/admin/Layout';
import { Recap } from '../../../interfaces/Recap';
import prisma from '../../../lib/prisma';

type Props = {
  recaps: Recap[];
};

const RecapList = (props: Props) => {
  return (
    <Layout>
      <ul>
        {props.recaps.map((recap) => (
          <li>
            <Link href={`/admin/recap/edit/${recap.id}`}>
              <a>{recap.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const recaps = await prisma.recap.findMany({});

  return {
    props: {
      recaps,
    },
  };
};

export default RecapList;
