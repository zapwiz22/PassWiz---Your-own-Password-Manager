import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-white py-2 w-full mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="logo font-bold text-xl mb-2 md:mb-0">
            <span className="text-green-700">&lt;</span>
            <span className="text-white">Pass</span>
            <span className="text-green-700">Wiz /&gt;</span>
          </div>

          <div className="text-sm md:text-base text-center md:text-right">
            <p className="flex items-center justify-center md:justify-end">
              Created with
              <span className="text-green-400 mx-1 text-xl">&hearts;</span>
              by ZapWiz
            </p>
            <p className="text-slate-400 mt-1">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
