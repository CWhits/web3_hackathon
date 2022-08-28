import React from "react";
import { ConnectButton } from "web3uikit";

function Header() {
  return (
    <section className="text-white bg-gray-900 h-[80vh] lg:h-screen items-center justify-center flex w-full">
      <div className="max-w-screen-xl px-4 mx-auto mb-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-5xl h-14 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
            NFT Promo Thing
          </div>

          <p className="max-w-xl mx-auto mt-4 sm:leading-relaxed text-xl">
            NFTs promoting NFTs
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <ConnectButton signingMessage="collats.com" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header;
