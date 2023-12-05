import { getServerSession } from "next-auth";
import { getProviders, signIn, useSession } from "next-auth/react";
import Link from "next/link";
import type { NextRequest } from "next/server";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LoginButton from "../../components/LoginButton";

async function Login() {
  const session = await getServerSession(authOptions);
  console.log("session", session);

  return (
    <>
      <h1 className="text-white text-3xl mb-8 text-extrabold">
        Welcome to Zenify!
      </h1>
      <img className="w-52 mb-9" src="https://links.papareact.com/9xl" alt="" />
      {session !== null && (
        <div>
          <p className="text-white text-lg mb-8 ">
            You're already logged in and ready to go!
          </p>
        </div>
      )}
      <div className="flex">
        {session ? (
          <button className="text-white font-extrabold underline underline-offset-2 text-md px-4 py-3 mb-2">
            <Link href="/">Go to Zen-Player</Link>
          </button>
        ) : (
          <LoginButton />
        )}
        <button className="text-white font-extrabold underline underline-offset-2 text-md px-4 py-3 mb-2">
          <Link href="/welcome">Learn About Zenify</Link>
        </button>
      </div>
    </>
  );
}

export default Login;
