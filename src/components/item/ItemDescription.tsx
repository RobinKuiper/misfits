import React from 'react';
import { Item } from '../../interfaces/Item';

type Props = {
  item: Item;
};

const ItemDescription = ({ item }: Props) => {
  return (
    <span
      className="unreset"
      dangerouslySetInnerHTML={{
        __html: item.description,
      }}
    ></span>
  );
};

export default ItemDescription;
