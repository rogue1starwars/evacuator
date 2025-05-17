import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Sign in</h1>
      <Link href="setup">Sign with Google</Link>
      <br />
      <Link href="evacuation">Login with Google</Link>
    </main>
  );
}
