import type { NextPage } from 'next';
import React from 'react';

type Props = {
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

const Upload = ({ setImage }: Props) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    setIsLoading(true);

    /* Add files to FormData */
    const formData = new FormData();
    Object.values(e.target.files).forEach((file) => {
      formData.append('file', file);
    });

    /* Send request to our api route */
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const body = (await response.json()) as {
      status: 'ok' | 'fail';
      message: string;
      filePaths: string[];
    };

    if (body.status === 'ok') {
      e.target.value = '';
      setImage(body.filePaths[0]);
    } else {
      // Do some stuff on error
    }

    setIsLoading(false);
  };

  return (
    <form>
      <div>
        <input type="file" name="myfile" multiple onChange={handleChange} />
      </div>
    </form>
  );
};

export default Upload;
