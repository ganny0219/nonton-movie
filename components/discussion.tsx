"use client";
import { DiscussionEmbed } from "disqus-react";
import { usePathname } from "next/navigation";
import React from "react";

function Discussion() {
  const urlPath = usePathname();
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
