import { ethers } from "ethers";

function CollatsERC1155() {
  const getURIForId = async (contract, abi, provider, id) => {
    try {
      console.log("id ", id);
      const collatsERC1155 = new ethers.Contract(contract, abi, provider);
      return await collatsERC1155.uri(parseInt(id));
    } catch (error) {
      console.log("error ", error);
    }
  };
  const setURI = async (contract, abi, provider, id, uri) => {
    const signer = provider.getSigner();
    const collatsERC1155 = new ethers.Contract(contract, abi, signer);
    const tx = await collatsERC1155.setURI(parseInt(id), uri);
    await tx.wait();
  };
  const massMintSameId = async (contract, abi, provider, chunk, id) => {
    console.log("chunk ", chunk);
    const signer = provider.getSigner();
    const collatsERC1155 = new ethers.Contract(contract, abi, signer);
    const tx = await collatsERC1155.massMintSameId(chunk, id);
    await tx.wait();
  };
  return { setURI, getURIForId, massMintSameId };
}

export default CollatsERC1155;

/*
const getBackupAssets = async (contract) => {
    let formattedBackUpAssets = [];
    try {
      const abi = [
        {
          inputs: [],
          name: "getBackupAssets",
          outputs: [
            {
              components: [
                {
                  internalType: "contract IERC20Upgradeable",
                  name: "asset",
                  type: "address",
                },
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "numerator",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "denominator",
                      type: "uint256",
                    },
                  ],
                  internalType: "struct ICollats.Rate",
                  name: "exchangeRate",
                  type: "tuple",
                },
                {
                  internalType: "uint256",
                  name: "decimals",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "isAllowed",
                  type: "bool",
                },
              ],
              internalType: "struct ICollats.BackupAsset[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ];

      const provider = new ethers.providers.JsonRpcProvider(network.rpcUrls[0]);

      const collatsContract = new ethers.Contract(contract, abi, provider);

      let backupAssets = await collatsContract.getBackupAssets();

      for (let index = 0; index < backupAssets.length; index++) {
        const asset = backupAssets[index];

        let model = {
          address: asset[0],
          decimals: asset[2],
          isActive: asset[3],
          explorer: `${network.blockExplorerUrls}/token/${asset[0]}`,
        };

        formattedBackUpAssets.push(model);
      }
    } catch (error) {
      console.log(error);
    }

    return formattedBackUpAssets;
  };

*/
