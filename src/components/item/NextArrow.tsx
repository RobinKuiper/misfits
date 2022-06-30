import Link from 'next/link';
import React from 'react';
import { MdArrowForwardIos } from 'react-icons/md';

type Props = {
  url: string;
};

const NextArrow = ({ url }: Props) => {
  return (
    <Link href={url}>
      <div className="hidden w-1/12 text-white sm:flex justify-center items-center text-6xl cursor-pointer">
        <a>
          <MdArrowForwardIos />
        </a>
      </div>
    </Link>
  );
};

export default NextArrow;
