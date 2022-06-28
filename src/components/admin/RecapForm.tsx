import React from 'react';
import { Recap } from '../../interfaces/Recap';

type Props = {
  recap?: Recap;
};

const RecapForm = (props: Props) => {
  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      title: { value: string };
      text: { value: string };
      id: { value: number };
    };

    const data = JSON.stringify({
      title: target.title.value,
      text: target.text.value,
      id: target.id.value,
    });

    const endpoint = '/api/recap';

    const options = {
      method: props.recap ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    if (props.recap) alert(`Recap updated: ${result.title}`);
    else alert(`New Recap created: ${result.title}`);
  };

  return (
    <form className="space-y-3" onSubmit={submit}>
      {props.recap && <input type="hidden" name="id" value={props.recap.id} />}
      <div className="flex flex-col space-y-2">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="text-black"
          defaultValue={props?.recap?.title}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label>Text</label>
        <textarea className="text-black" name="text">
          {props?.recap?.text}
        </textarea>
      </div>
      <div className="flex flex-col space-y-2">
        <button className="bg-orange-300 p-2 text-black font-bold">Save</button>
      </div>
    </form>
  );
};

export default RecapForm;
