import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import React from "react";

function NotFoundPage() {
  return (
    <div className="w-[90%] m-auto text-[#fff] min-h-[100vh]">
      <Header />
      <div className="w-[85%]  m-auto py-2 mt-2 md:mt-6 text-[#fff]">
        <div className="flex w-full justify-center items-center min-h-[33vh]">
          <h1 className="text-4xl text-[#fff]">PAGE NOT FOUND</h1>
        </div>
      </div>
      <Footer />
      <div className="hidden md:flex flex-row items-center my-6">
        <div>Copyright © 2023 by Nonton Movie. All Rights Reserved.</div>
      </div>
    </div>
  );
}

export default NotFoundPage;
