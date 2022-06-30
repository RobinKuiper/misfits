import Link from 'next/link';
import React from 'react';
import { MdArrowBackIos } from 'react-icons/md';

type Props = {
  url: string;
};

const PrevArrow = ({ url }: Props) => {
  return (
    <Link href={url}>
      <div className="hidden sm:flex w-1/12 text-white justify-center items-center text-6xl cursor-pointer">
        <a>
          <MdArrowBackIos />
        </a>
      </div>
    </Link>
  );
};

export default PrevArrow;
