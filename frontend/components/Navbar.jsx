import React from 'react'

const Navbar = () => {
  return (
    <nav className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-violet-100">
      <div className="flex justify-between items-center mx-auto w-4/5 max-w-[1200px]">
        <div className="logo flex items-center gap-2">
          <img src="/logo.png" alt="PassMate Logo" className="size-24 rounded-lg" />

        </div>
        <ul className="hidden sm:flex gap-8 font-semibold text-violet-700">
          <li className="cursor-pointer hover:text-violet-900 transition-colors">Home</li>
          <li className="cursor-pointer hover:text-violet-900 transition-colors">About</li>
          <li className="cursor-pointer hover:text-violet-900 transition-colors">Contact</li>
        </ul>
        <div className="sm:hidden">
          <lord-icon
            src="https://cdn.lordicon.com/jtbeebda.json"
            trigger="hover"
            colors="primary:#7c3aed"
            style={{ width: "32px", height: "32px" }}
          ></lord-icon>
        </div>
      </div>
    </nav>
  );
}

export default Navbar
