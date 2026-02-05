import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full bg-violet-400 text-violet-100 py-6 mt-auto">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="logo flex items-center gap-2">
          <img src="/favicon.png" alt="PassMate Logo" className="w-6 h-6 rounded-md" />
          <div className="font-black text-xl tracking-tighter">
            Pass<span className="text-violet-900">Mate</span>
          </div>
        </div>
        <p className="text-sm font-medium opacity-80 flex items-center gap-1">
          Made with <span className="text-red-400">❤</span> by Kaushik
        </p>
      </div>
    </footer>
  );
}

export default Footer
