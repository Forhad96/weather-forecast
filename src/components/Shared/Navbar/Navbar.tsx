import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex bg-black/10 mx-auto items-center justify-between px-2 py-2">
     <Image width="50" height="50" alt='logo' src='/logo.png'/>
      <ul className="flex items-center justify-between gap-4 text-slate-900 dark:text-gray-100 lg:gap-6"></ul>
    </nav>
  );
}
