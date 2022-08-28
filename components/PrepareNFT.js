import React from "react";

function PrepareNFT({ setCollatsNftAddress, setNftUri, setNftId, setUri }) {
  return (
    <section className=" h-screen  justify-center flex w-full">
      <div className="max-w-screen-xl flex flex-col">
        <div className="mt-32 mb-4 text-center text-5xl font-semibold">
          Prepare Promo NFT
        </div>
        <div className=" flex flex-col gap-4">
          <input
            className="text-lg block w-full px-4 py-2 text-gray-700 bg-white font-normal bg-clip-padding border border-gray-500 rounded transition ease-in-out m-0 focus:text-gray-700 focus:outline-none"
            placeholder="NFT Address"
            onChange={(e) => setCollatsNftAddress(e.target.value)}
          ></input>
          <input
            placeholder="METADATA URI"
            className="text-lg block w-full px-4 py-2 text-gray-700 bg-white font-normal bg-clip-padding border border-gray-500 rounded transition ease-in-out m-0 focus:text-gray-700 focus:outline-none"
            onChange={(e) => setNftUri(e.target.value)}
          ></input>
          <input
            placeholder="NFT ID"
            className="text-lg block w-full px-4 py-2 text-gray-700 bg-white font-normal bg-clip-padding border border-gray-500 rounded transition ease-in-out m-0 focus:text-gray-700 focus:outline-none"
            onChange={(e) => setNftId(e.target.value)}
          ></input>
        </div>
        <button className="text-lg" onClick={setUri}>
          Prepare
        </button>
      </div>
    </section>
  );
}

export default PrepareNFT;
