import React from 'react';

interface Props {
  title: string;
  type?: 'article';
  url: string;
  description: string;
  updatedDate?: Date;
}

export default function OpenGraphs({
  title,
  type,
  url,
  description,
  updatedDate,
}: Props) {
  return (
    <>
      <meta property="og:title" content={title} />
      {type !== undefined ? <meta property="og:type" content={type} /> : null}
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Sojin Park" />
      <meta property="og:locale" content="ko" />
      <meta property="og:description" content={description} />
      {updatedDate !== undefined ? (
        <meta property="og:updated_time" content={updatedDate.toString()} />
      ) : null}

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content="@chaevit" />
    </>
  );
}
