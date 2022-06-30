import Image from 'next/image';
import React from 'react';
import { Item } from '../interfaces/Item';

type Props = {
  item: Item;
};

const ItemImage = ({ item }: Props) => {
  if (
    item.image &&
    (item.image.startsWith('/') || item.image.startsWith('http'))
  )
    return (
      <div className="w-full sm:w-1/2 relative sm:mx-20 h-64 sm:h-full">
        <div className="shadow-2xl h-full relative">
          <div className="fixed w-[30%] h-[50%]">
            {item.image && (
              <Image src={item.image} layout="fill" objectFit="contain" />
            )}
          </div>
        </div>
      </div>
    );

  return <></>;
};

export default ItemImage;
