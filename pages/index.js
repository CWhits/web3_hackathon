import { useState } from "react";
import { useChain, useMoralis } from "react-moralis";
import { ethers } from "ethers";
import collatsERC1155Abi from "../artifacts/contracts/CollatsERC1155.sol/CollatsERC1155.json";
import CollatsERC1155 from "../helpers/CollatsERC1155";
import BasicERC721 from "../helpers/BasicERC721.json";
import StatusModal from "../components/StatusModal";
import WalletsHarvested from "../components/WalletsHarvested";
import ipfsLink from "../helpers/ipfsLink";
import Header from "../components/Header";
import AddressToHarvest from "../components/AddressToHarvest";
import PrepareNFT from "../components/PrepareNFT";
import NFTDetails from "../components/NFTDetails";

//Metadata
//https://ipfs.io/ipfs/QmXp4gJZVfohjF4eau1Jg19XJ2FoauzsQioifcK7MahNta/collats/metadata/00000000000000000000000000000000000000000000000000000000000000000.json
//Image
// https://ipfs.io/ipfs/QmbDTXfUAt7py1w3jKTuCL2zP7gkaNK3SWQjHyTFmYmgoE/collats/images/00000000000000000000000000000000000000000000000000000000000000000.png

/*
    This this to be called for each address to know how many nfts it has. 
    balanceOf(address account, uint256 id) 
*/

//Bored Apes
//0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D Bored Apes
const collatsERC1155Address = "0xCd7c00Ac6dc51e8dCc773971Ac9221cC582F3b1b";
const metadataUri =
  "https://ipfs.io/ipfs/QmXp4gJZVfohjF4eau1Jg19XJ2FoauzsQioifcK7MahNta/collats/metadata/00000000000000000000000000000000000000000000000000000000000000000.json";
const isLoadingImage = "/collats_logo.png";

export default function Home() {
  const { Moralis, isAuthenticated, account } = useMoralis();
  const { chainId } = useChain();
  const { setURI, getURIForId, massMintSameId } = CollatsERC1155();

  //The address of the contracts that will be scanned
  const [projectToHarvest, setProjectToHarvest] = useState();
  //Wallets that have purchased NFTs from any of the projectToHarvest
  const [rawWalletsHarvested, setRawWalletsHarvested] = useState([]);
  const [walletsHarvested, setWalletsHarvested] = useState([]);
  const [collatsNftAddress, setCollatsNftAddress] = useState(
    collatsERC1155Address
  );
  //The Id of the NFT that I want to send
  const [nftId, setNftId] = useState();
  const [nftUri, setNftUri] = useState();
  const [meta, setMetadata] = useState();
  const [statusText, setStatusText] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showWalletsHarvestedModal, setShowWalletsHarvestedModal] =
    useState(false);

  //NFT Info
  const [imgSrc, setImgSrc] = useState(isLoadingImage);
  const [name, setName] = useState();
  const [description, setDescription] = useState();

  async function loadNFTData(tokenUri) {
    //Get Metadata
    try {
      console.log("loadNFTData tokenUri", tokenUri);
      const res = await fetch(ipfsLink(tokenUri));
      const metadata = await res.json();
      console.log("metadata ", metadata);
      if (metadata) {
        //Display Metadata
        setName(metadata.name);
        setDescription(metadata.description);
        setImgSrc(metadata.image);
        setMetadata(metadata);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //Just to make sure that the uri exists for the id
  async function getUri() {
    const web3Provider = await Moralis.enableWeb3();
    if (!web3Provider) return;
    setStatusText("Getting URI");
    setIsLoading(true);

    const tokenUri = await getURIForId(
      collatsNftAddress,
      collatsERC1155Abi.abi,
      web3Provider,
      nftId
    );

    console.log("tokenUri ", tokenUri);
    loadNFTData(tokenUri);
    setIsLoading(false);
  }

  async function setUri() {
    const web3Provider = await Moralis.enableWeb3();
    if (!web3Provider) return;
    setStatusText("Setting URI");
    setIsLoading(true);
    //Set the uri
    await setURI(
      collatsNftAddress,
      collatsERC1155Abi.abi,
      web3Provider,
      nftId,
      nftUri
    );

    setIsLoading(false);
  }

  async function massMint() {
    const web3Provider = await Moralis.enableWeb3();
    if (!web3Provider) return;
    const chunkSize = 100;
    for (let i = 0; i < walletsHarvested.length; i += chunkSize) {
      const chunk = walletsHarvested.slice(i, i + chunkSize);
      await massMintSameId(
        collatsNftAddress,
        collatsERC1155Abi.abi,
        web3Provider,
        chunk,
        nftId
      );
    }
  }

  async function balanceOf() {
    console.log("balanceOf");
  }

  const handleWalletsHarvestedModal = async () => {
    setShowWalletsHarvestedModal(!showWalletsHarvestedModal);
  };

  function removeDuplicates(array) {
    return Array.from(new Set(array));
  }
  async function getContract(address, abi) {
    const web3Provider = await Moralis.enableWeb3();
    if (!web3Provider) return;
    return new ethers.Contract(address, abi, web3Provider);
  }
  async function harvest() {
    setStatusText("Harvesting");
    setIsLoading(true);
    console.log("projectToHarvest ", projectToHarvest);
    const addresses = [];
    const contract = await getContract(projectToHarvest, BasicERC721);
    console.log("contract ", contract);
    const transfers = await contract.queryFilter("Transfer", -20000, "latest");
    transfers.forEach((transfer) => {
      console.log(
        "transfer.args.from ",
        transfer.args.from === "0x3b968d2d299b895a5fcf3bba7a64ad0f566e6f88"
      );
      if (transfer.args.from !== "0x3b968d2d299b895a5fcf3bba7a64ad0f566e6f88") {
        addresses.push(transfer.args.from);
      }
      if (transfer.args.to !== "0x3b968d2d299b895a5fcf3bba7a64ad0f566e6f88") {
        addresses.push(transfer.args.to);
      }
    });
    console.log("addresses.length ", addresses.length);

    setRawWalletsHarvested(addresses);

    const cleaned = removeDuplicates(addresses);
    console.log("cleaned.length ", cleaned.length);

    setWalletsHarvested(cleaned);
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col gap-5 content-center items-center justify-center w-full">
      <Header />
      <AddressToHarvest
        setProjectToHarvest={setProjectToHarvest}
        harvest={harvest}
        rawWalletsHarvested={rawWalletsHarvested}
        handleWalletsHarvestedModal={handleWalletsHarvestedModal}
        walletsHarvested={walletsHarvested}
      />

      <PrepareNFT
        setCollatsNftAddress={setCollatsNftAddress}
        setNftUri={setNftUri}
        setNftId={setNftId}
        setUri={setUri}
      />

      <NFTDetails
        imgSrc={imgSrc}
        name={name}
        description={description}
        getUri={getUri}
        metadata={meta}
        massMint={massMint}
        handleRecipientsModal={handleWalletsHarvestedModal}
      />

      {isLoading && <StatusModal status={statusText} />}

      {showWalletsHarvestedModal && (
        <WalletsHarvested
          handleWalletsHarvestedModal={handleWalletsHarvestedModal}
          wallets={walletsHarvested}
        />
      )}
    </div>
  );
}
