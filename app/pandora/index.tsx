import { GetServerSideProps } from "next";
import React from "react";

function PanelPage() {
  return <div></div>;
}

export default PanelPage;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/pandora/movie",
      permanent: false,
    },
  };
};
