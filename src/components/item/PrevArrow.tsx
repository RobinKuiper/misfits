import Link from 'next/link';
import React from 'react';
import { MdArrowBackIos } from 'react-icons/md';

type Props = {
  url?: string;
  onClick?: () => void;
};

const PrevArrow = ({ url, onClick }: Props) => {
  if (onClick)
    return (
      <div className="hidden sm:flex w-1/12 text-white justify-center items-center text-6xl cursor-pointer">
        <button onClick={onClick}>
          <MdArrowBackIos />
        </button>
      </div>
    );

  if (url)
    return (
      <Link href={url}>
        <div className="hidden sm:flex w-1/12 text-white justify-center items-center text-6xl cursor-pointer">
          <a>
            <MdArrowBackIos />
          </a>
        </div>
      </Link>
    );

  return <></>;
};

export default PrevArrow;
