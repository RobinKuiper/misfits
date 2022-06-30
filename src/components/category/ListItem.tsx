import Link from 'next/link';
import React from 'react';
import { Item } from '../../interfaces/Item';

type Props = {
  item: Item;
  category: string;
};

const ListItem = ({ item, category }: Props) => {
  return (
    <Link href={`/${category}/${item.slug}`}>
      <li
        className="border-2 border-zinc-800 shadow rounded
                      cursor-pointer flex flex-col px-3 py-2 w-[30%]"
        style={{
          background: item.published ? 'rgba(0,0,0,0.7)' : '#f1f1f1',
          color: item.published ? 'white' : 'black',
        }}
      >
        <a>{item.name}</a>
      </li>
    </Link>
  );
};

export default ListItem;
