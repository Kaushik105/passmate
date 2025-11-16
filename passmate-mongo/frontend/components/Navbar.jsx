import React from 'react'

const Navbar = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col gap-4 sm:gap-0 sm:justify-between sm:flex-row justify-center p-5 w-4/5 max-w-[1700px]">
        <div className="logo font-bold text-center text-2xl">PassMate</div>
        <nav>
          <ul className="flex gap-8 sm:justify-around justify-center font-medium text-lg">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navbar
