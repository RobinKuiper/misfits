import React from 'react';
import { Item } from '../../interfaces/Item';

type Props = {
  item: Item;
};

const ItemTitle = ({ item }: Props) => {
  return (
    <h1
      className={`text-4xl mb-5 ${
        item.published ? 'text-[#B29438]' : 'text-red-600'
      }`}
    >
      {item.name}
    </h1>
  );
};

export default ItemTitle;
