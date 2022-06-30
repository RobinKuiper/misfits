import Link from 'next/link';
import React, { ReactElement } from 'react';
import { BsGrid3X3, BsList, BsSortDownAlt, BsSortUpAlt } from 'react-icons/bs';

type Props = {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  setPreview: React.Dispatch<React.SetStateAction<string>>;
  preview: string;
  sortBy: string;
  sortOrder: string;
  additionalButtons?: ReactElement | ReactElement[] | boolean;
};

const PageControls = ({
  setQuery,
  setSortBy,
  setSortOrder,
  setPreview,
  preview,
  sortBy,
  sortOrder,
  additionalButtons,
}: Props) => {
  return (
    <div className={`mb-5 flex gap-5`}>
      {additionalButtons && (
        <div className="flex justify-center items-center">
          {additionalButtons}
        </div>
      )}

      <div className="w-full">
        <input
          type="search"
          className="w-full p-3 rounded shadow-2xl shadow-[#3C3C3C] text-white"
          style={{
            background: 'rgba(0,0,0,0.5)',
          }}
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="flex justify-center items-center shadow-2xl shadow-[#3C3C3C]">
        <button
          className="rounded-l p-2 text-white font-bold h-full justify-center items-center flex space-x-2 hover:bg-zinc-300"
          style={{
            background: 'rgba(0,0,0,0.5)',
          }}
          onClick={() =>
            setPreview((prev) => (prev === 'list' ? 'grid' : 'list'))
          }
        >
          {preview === 'list' ? <BsGrid3X3 /> : <BsList />}
        </button>

        <select
          className="text-white h-full"
          style={{
            background: 'rgba(0,0,0,0.5)',
          }}
          defaultValue={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="updatedAt">Updated</option>
          <option value="createdAt">Created</option>
        </select>

        <button
          className="rounded-r p-2 text-white font-bold h-full justify-center items-center flex space-x-2 hover:bg-zinc-300"
          style={{
            background: 'rgba(0,0,0,0.5)',
          }}
          onClick={() =>
            setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
          }
        >
          {sortOrder === 'asc' ? <BsSortDownAlt /> : <BsSortUpAlt />}
        </button>
      </div>
    </div>
  );
};

export default PageControls;
