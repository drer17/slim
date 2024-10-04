import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-9 w-full">
      <Link href="/account">Account</Link>
    </div>
  );
}
