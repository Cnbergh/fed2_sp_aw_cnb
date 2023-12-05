import Link from 'next/link';

export const Nav = () => (
  <nav>
    <Link href="/">Home</Link>
    <Link href="/profile">Profile</Link>
    <Link href="/contact">Contact</Link>
  </nav>
);