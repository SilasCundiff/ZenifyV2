import { getProviders, signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import { useSpotify } from "../hooks/useSpotify";
import { Provider } from "../interfaces";

function Login({ providers }) {
  const { data: session, status } = useSession();

  console.log("Login", session, status);

  return (
    <div className="flex flex-col items-center bg-gradient-to-b  from-black to-zinc-900  min-h-screen w-full justify-center">
      <h1 className="text-white text-3xl mb-8 text-extrabold">
        Welcome to Zenify!
      </h1>
      <img className="w-52 mb-9" src="https://links.papareact.com/9xl" alt="" />
      {status === "authenticated" && (
        <div>
          <p className="text-white text-lg mb-8 ">
            You're already logged in and ready to go!
          </p>
        </div>
      )}
      <div className="flex">
        {status === "authenticated" ? (
          <button className="text-white font-extrabold underline underline-offset-2 text-md px-4 py-3 mb-2">
            <Link href="/">Go to Zen-Player</Link>
          </button>
        ) : (
          Object.values(providers).map((provider: Provider) => (
            <div key={provider.name}>
              <button
                className="bg-[#18D860] text-black px-4 py-3 font-semibold  rounded-full w-48 mb-2 mr-3"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              >
                Login with {provider.name}
              </button>
            </div>
          ))
        )}
        <button className="text-white font-extrabold underline underline-offset-2 text-md px-4 py-3 mb-2">
          <Link href="/welcome">Learn About Zenify</Link>
        </button>
      </div>
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
