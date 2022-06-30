import React from 'react';
import { Item } from '../../interfaces/Item';

type Props = {
  item: Item;
  setFeatured: React.Dispatch<React.SetStateAction<boolean>>;
};

const ItemFeaturedInput = ({ item, setFeatured }: Props) => {
  return (
    <div className="space-x-3">
      <input
        type="checkbox"
        defaultChecked={item.featured}
        name="featured"
        onChange={(e) => setFeatured(e.target.checked)}
        className="w-6 h-6 text-green-600 border-0 rounded-md focus:ring-0"
      />
      <label className="text-3xl">Featured</label>
    </div>
  );
};

export default ItemFeaturedInput;
