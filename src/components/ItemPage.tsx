import Link from 'next/link';
import React, { ReactElement } from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import Layout from './Layout';

type Props = {
  children: ReactElement;
  nextId: number;
  prevId: number;
  urlPrefix: string;
};

const ItemPage = (props: Props) => {
  return (
    <Layout>
      <div className="sm:flex flex-row h-full">
        <Link href={`${props.urlPrefix}/${props.nextId}`}>
          <div className="hidden sm:flex w-1/12 text-white justify-center items-center text-6xl cursor-pointer">
            <a>
              <MdArrowBackIos />
            </a>
          </div>
        </Link>

        <div className="text-white w-full p-4 space-y-5">{props.children}</div>

        <Link href={`${props.urlPrefix}/${props.prevId}`}>
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

export default ItemPage;
