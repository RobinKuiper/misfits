import Head from 'next/head';
import React, { ReactElement } from 'react';
import Layout from '../Layout';

type Props = {
  title: string;
  children: ReactElement | ReactElement[];
  sidebar: ReactElement | ReactElement[];
};

const WithSidebar = ({ title, children, sidebar }: Props) => {
  return (
    <Layout>
      <Head>
        <title>{title} - Misfits</title>
      </Head>

      <div className="sm:flex flex-row h-full relative text-white">
        <div className="w-1/12 m-5 mb-16 border-r-2">{sidebar}</div>

        <div className="text-white w-full p-4 space-y-5 mb-16 scrollbar sm:overflow-y-auto">
          {children}
        </div>
      </div>
    </Layout>
  );
};

export default WithSidebar;
