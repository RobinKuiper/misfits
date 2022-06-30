import { useSession } from 'next-auth/react';
import Router from 'next/router';
import React from 'react';
import { Item } from '../../interfaces/Item';

type Props = {
  item: Item;
  category: string;
  toggleEdit: () => void;
  setPublished: React.Dispatch<React.SetStateAction<boolean>>;
  setFeatured: React.Dispatch<React.SetStateAction<boolean>>;
  setEditting: React.Dispatch<React.SetStateAction<boolean>>;
};

const AdminButtons = ({
  item,
  category,
  toggleEdit,
  setPublished,
  setFeatured,
  setEditting,
}: Props) => {
  const session = useSession();

  const togglePublish = async () => {
    handleSave({ published: !item.published });
    setPublished(!item.published);
  };

  const toggleFeatured = async () => {
    handleSave({ featured: !item.featured });
    setFeatured(!item.featured);
  };

  const handleSave = async (data: object) => {
    if (!session.data) return;

    const endpoint = '/api/item';

    const body = JSON.stringify({
      id: item.id,
      ...data,
    });

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    setEditting(false);
    Router.push(`/${category}/${item.slug}`);
  };

  const handleDelete = async () => {
    if (!session.data) return;

    const endpoint = '/api/item';

    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: item.id,
      }),
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    setEditting(false);
    Router.push(`/${category}`);
  };

  if (session.data)
    return (
      <div className="absolute bottom-0 right-0 flex space-x-5">
        <button
          onClick={toggleFeatured}
          className="bg-black text-white p-3 rounded"
        >
          {item.featured ? 'Unset Featured' : 'Set Featured'}
        </button>

        <button
          onClick={togglePublish}
          className="bg-black text-white p-3 rounded"
        >
          {item.published ? 'Unpublish' : 'Publish'}
        </button>

        <button
          onClick={toggleEdit}
          className="bg-black text-white p-3 rounded"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="bg-black text-white p-3 rounded"
        >
          Delete
        </button>
      </div>
    );

  return <></>;
};

export default AdminButtons;
