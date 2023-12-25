"use client"
import React, { useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function PanelAuthPage() {
  const router = useRouter();
  const username = useRef("");
  const password = useRef("");

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    if (key === "username") {
      username.current = e.target.value;
    } else {
      password.current = e.target.value;
    }
  };

  const onLogin = async () => {
    await signIn("credentials", {
      // callbackUrl: process.env.NEXTAUTH_URL,
      redirect: false,
      password: password.current,
      username: username.current,
    }).then((res) => {
      if (res?.ok) {
        router.replace("/pandora/movie");
      } else {
        alert("username / password salah");
      }
    });
  };

  return (
    <div className="flex flex-1 justify-center items-center">
      <div className="flex flex-col justify-center items-center p-4 rounded-md bg-[#fff]">
        <h1 className="text-3xl mb-4">AUTH</h1>
        <label htmlFor="username">Username</label>
        <input
          className="outline-none mb-4 border-solid border-secondary border-[1px] rounded px-2"
          type="text"
          name="username"
          autoComplete="off"
          onChange={(e) => inputHandler(e, "username")}
        />
        <label htmlFor="password">Password</label>
        <input
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              onLogin();
            }
          }}
          className="outline-none mb-4 border-solid border-secondary border-[1px] rounded px-2"
          type="password"
          name="password"
          autoComplete="off"
          onChange={(e) => inputHandler(e, "password")}
        />
        <button
          className="bg-secondary rounded py-2 px-6 text-sm"
          onClick={onLogin}
        >
          LOGIN
        </button>
      </div>
    </div>
  );
}

export default PanelAuthPage;
