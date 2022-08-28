import React from "react";
import { Blockie } from "web3uikit";
import Image from "next/image";

function WalletsRow({ wallet }) {
  return (
    <tr
      //Go to explorer
      //   onClick={() => tokenSelected(token)}
      key={wallet}
      className="bg-white border-b cursor-pointer"
    >
      <th
        scope="row"
        className="flex flex-row px-6 py-4 font-medium text-gray-900 whitespace-nowrap items-center"
      >
        <Blockie seed={wallet} />
      </th>
      <td className="px-6 py-4 text-center items-center justify-center">
        {wallet}
      </td>
      <td>
        <a
          className="flex h-10 items-center justify-center"
          href={`https://etherscan.io/address/${wallet}`}
        >
          <Image src="/images/block_explorer.svg" width={20} height={20} />
        </a>
      </td>
    </tr>
  );
}

export default WalletsRow;

/*

import { ethers } from "ethers";
import Image from "next/image";
import React from "react";
import { getDecimalPlaces } from "../../helpers/formatters";
import ImageTokenLogo from "./ImageTokenLogo";

function SelectTokenRow({ token, tokenSelected }) {
  let amt = token.balance
    ? ethers.utils.formatUnits(token.balance, token.decimals)
    : 0.0;

  return (
    <tr
      onClick={() => tokenSelected(token)}
      key={token.address}
      className="bg-white border-b cursor-pointer"
    >
      <th
        scope="row"
        className="flex flex-row px-6 py-4 font-medium text-gray-900 whitespace-nowrap items-center"
      >
        <ImageTokenLogo
          alt={token.name}
          className="w-8 h-8 object-contain"
          src={token.logo}
          address={token.address}
        />

        <div className="ml-2">{token.name}</div>
      </th>
      <td className="px-6 py-4 text-center items-center justify-center">
        {getDecimalPlaces(amt.toString()) > 5
          ? parseFloat(amt).toFixed(5)
          : amt}
      </td>
      <td>
        <a
          className="flex h-10 items-center justify-center"
          href={token.explorer}
        >
          <Image
            alt={token.explorer}
            src="/images/block_explorer.svg"
            width={20}
            height={20}
          />
        </a>
      </td>
    </tr>
  );
}

export default SelectTokenRow;


*/
