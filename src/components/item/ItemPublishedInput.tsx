import React from 'react';
import { Item } from '../interfaces/Item';

type Props = {
  item: Item;
  setPublished: React.Dispatch<React.SetStateAction<boolean>>;
};

const ItemPublishedInput = ({ item, setPublished }: Props) => {
  return (
    <div className="space-x-3">
      <input
        type="checkbox"
        defaultChecked={item.published}
        name="published"
        onChange={(e) => setPublished(e.target.checked)}
        className="w-6 h-6 text-green-600 border-0 rounded-md focus:ring-0"
      />
      <label className="text-3xl">Published</label>
    </div>
  );
};

export default ItemPublishedInput;
