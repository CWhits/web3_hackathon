import React from "react";
import Card from "./Card";

function AddressToHarvest({
  setProjectToHarvest,
  harvest,
  rawWalletsHarvested,
  handleWalletsHarvestedModal,
  walletsHarvested,
}) {
  return (
    <section className=" h-screen  justify-center flex w-full">
      <div className="max-w-screen-xl flex flex-col">
        <div className="mt-32 text-center text-5xl font-semibold">
          NFT Contract to Harvest
        </div>
        <div className="w-10/12 mt-32  mx-auto text-center items-center justify-center flex flex-row">
          <input
            placeholder="Addresses To Harvest"
            className="text-lg block w-full px-4 py-2 text-gray-700 bg-white font-normal bg-clip-padding border border-gray-500 rounded transition ease-in-out m-0 focus:text-gray-700 focus:outline-none"
            onChange={(e) => setProjectToHarvest(e.target.value)}
          ></input>
          <button
            className="text-lg ml-4 bg-transparent hover:bg-gray-500 text-gray-700 hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
            onClick={harvest}
          >
            Harvest
          </button>
        </div>
        <div className=" text-center text-gray-400 text-lg">
          Ex. 0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D Bored Apes
        </div>
        <div className="flex flex-row justify-center gap-10 mt-16">
          <button>
            <Card
              content="Raw Wallets Harvested"
              title={rawWalletsHarvested.length}
            />
          </button>
          <button onClick={handleWalletsHarvestedModal}>
            <Card content="Wallets Harvested" title={walletsHarvested.length} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default AddressToHarvest;
