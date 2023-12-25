import { DiscussionEmbed } from "disqus-react";
import React from "react";

type Props = {
  urlPath: string;
};

function Discussion({ urlPath }: Props) {
  return (
    <DiscussionEmbed
      shortname="nontonmovie-online"
      config={{
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/${urlPath}`,
      }}
    />
  );
}

export default Discussion;
