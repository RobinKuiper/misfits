import React from 'react';

type Props = {
  html: string;
};

const HTML = ({ html }: Props) => {
  return (
    <div
      className="text-white unreset"
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
};

export default HTML;
