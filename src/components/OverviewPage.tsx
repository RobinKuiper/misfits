import Link from 'next/link';
import React, { ReactElement } from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import Layout from './Layout';

type Props = {
  children: ReactElement[] | ReactElement;
};

const OverviewPage = (props: Props) => {
  return (
    <Layout>
      <div className="flex flex-row h-full">
        <div className="text-white w-full p-4 space-y-5">{props.children}</div>
      </div>
    </Layout>
  );
};

export default OverviewPage;
