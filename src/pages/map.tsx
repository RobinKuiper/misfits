import Head from 'next/head';
import React from 'react';
import Layout from '../components/Layout';

type Props = {};

const map = (props: Props) => {
  return (
    <Layout>
      <Head>
        <title>Exandria Map - Misfits</title>
      </Head>

      <iframe
        src="https://www.redgiantmaps.com/maps/exandria"
        className="w-full h-full"
      ></iframe>
    </Layout>
  );
};

export default map;
