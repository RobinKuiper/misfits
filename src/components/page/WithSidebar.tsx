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

      <div className="flex flex-col sm:flex-row h-full relative text-white">
        <div className="sm:w-1/12 m-5 sm:mb-16 sm:border-r-2 border-gray-500 border-b-2 sm:border-b-0">
          {sidebar}
        </div>

        <div className="text-white w-full p-4 space-y-5 mb-16 scrollbar sm:overflow-y-auto">
          {children}
        </div>
      </div>
    </Layout>
  );
};

export default WithSidebar;
