import Link from "next/link";
import { getServerSession } from "next-auth";
import type { AuthOptions } from "next-auth";
import LoginButton from "../../components/LoginButton";
import { authOptions } from "../../lib/authOptions";

async function Login() {
  const session = await getServerSession<AuthOptions>(authOptions);

  return (
    <>
      <h1 className="text-white text-3xl mb-8 text-extrabold">
        Welcome to Zenify!
      </h1>
      {session !== null && (
        <div>
          <p className="text-white text-lg mb-8 ">
            You&apos;re already logged in and ready to go!
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
