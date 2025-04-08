import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-slate-800">
      <div className="mycontainer flex justify-between items-center px-14 py-5 h-14 text-white">
        <div className="logo font-bold text-xl">
          <span className="text-green-700">&lt;</span>Pass
          <span className="text-green-700">Wiz /&gt;</span>
        </div>
        {/* <ul>
          <li className="flex gap-4">
            <a className="hover:font-bold" href="/">
              Home
            </a>
            <a className="hover:font-bold" href="/">
              About
            </a>
            <a className="hover:font-bold" href="/">
              Contact
            </a>
          </li>
        </ul> */}

        {/* create a login button similar to the github button created by harry here */}
        <button className="bg-white my-4 py-2 rounded-2xl flex overflow-hidden font-bold px-2">
          {/* <img width="24" src={loginVerified} alt="verified button for login" /> */}
          <span className="text-green-700">&lt;</span>
          <span className="font-bold text-black">Log</span>
          <span className="text-green-700">In /&gt;</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
