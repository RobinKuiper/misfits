import React from 'react';

type Props = {};

const ItemForm = (props: Props) => {
  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string };
      image: { value: string };
      type: { value: string };
      description: { value: string };
    };

    const data = JSON.stringify({
      name: target.name.value,
      image: target.image.value,
      type: target.type.value,
      description: target.description.value,
    });

    const endpoint = '/api/item';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    alert(`New Item created: ${result.name}`);
  };

  return (
    <form className="space-y-3" onSubmit={submit}>
      <div className="flex flex-col space-y-2">
        <label>Name</label>
        <input type="text" name="name" className="text-black" />
      </div>
      <div className="flex flex-col space-y-2">
        <label>Image</label>
        <input type="text" name="image" className="text-black" />
      </div>
      <div className="flex flex-col space-y-2">
        <label>Type</label>
        <select className="text-black" name="type">
          <option value="character">Character</option>
          <option value="item">Item</option>
          <option value="npc">Npc</option>
          <option value="location">Location</option>
        </select>
      </div>
      <div className="flex flex-col space-y-2">
        <label>Description</label>
        <textarea className="text-black" name="description" />
      </div>
      <div className="flex flex-col space-y-2">
        <button className="bg-orange-300 p-2 text-black font-bold">Save</button>
      </div>
    </form>
  );
};

export default ItemForm;
