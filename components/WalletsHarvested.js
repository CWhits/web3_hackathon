import React from "react";
import WalletsRow from "./WalletsRow";

function WalletsHarvested({ handleWalletsHarvestedModal, wallets }) {
  return (
    <React.Fragment>
      <div
        onClick={handleWalletsHarvestedModal}
        className="flex justify-center items-center fixed z-50 inset-0 outline-none focus:outline-none p-6"
      >
        {/*content*/}

        <div className="flex flex-col justify-center items-center  rounded-lg shadow-lg m-10 bg-white focus:outline-none mx-5 w-full sm:w-[600px] max-h-[80vh] pb-3">
          <div className="text-start text-xl w-full p-5 border-b ">
            Wallets Harvested
          </div>

          <div className="flex w-full overflow-auto  sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center">
                    Wallet
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Explorer
                  </th>
                </tr>
              </thead>
              <tbody>
                {wallets.length > 0 &&
                  wallets.map((wallet) => {
                    return <WalletsRow wallet={wallet} key={wallet} />;
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
    </React.Fragment>
  );
}

export default WalletsHarvested;
