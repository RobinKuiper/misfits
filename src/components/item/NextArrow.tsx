import Link from 'next/link';
import React from 'react';
import { MdArrowForwardIos } from 'react-icons/md';

type Props = {
  url?: string;
  onClick?: () => void;
};

const NextArrow = ({ url, onClick }: Props) => {
  if (onClick)
    return (
      <div className="hidden w-1/12 text-white sm:flex justify-center items-center text-6xl cursor-pointer">
        <button onClick={onClick}>
          <MdArrowForwardIos />
        </button>
      </div>
    );

  if (url)
    return (
      <Link href={url}>
        <div className="hidden w-1/12 text-white sm:flex justify-center items-center text-6xl cursor-pointer">
          <a>
            <MdArrowForwardIos />
          </a>
        </div>
      </Link>
    );

  return <></>;
};

export default NextArrow;
