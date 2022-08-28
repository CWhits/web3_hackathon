const baseUrl = "https://ipfs.io/ipfs/";
const pinata = "https://gateway.pinata.cloud/ipfs/";
const moralis = "https://ipfs.moralis.io:2053/ipfs/";

function ipfsLink(link) {
  if (link) {
    if (link.startsWith(pinata)) {
      return `${baseUrl}${link.slice(pinata.length)}`;
    }
    if (link.startsWith(moralis)) {
      return `${baseUrl}${link.slice(moralis.length)}`;
    }
    if (link.startsWith("ipfs://")) {
      const case1 = "ipfs://ipfs/";
      const case2 = "ipfs://";
      if (link.slice(0, case1.length) === case1) {
        return `${baseUrl}${link.slice(case1.length)}`;
      } else if (link.slice(0, case2.length) === case2) {
        return `${baseUrl}${link.slice(case2.length)}`;
      }
    }
  }
  return link;
}

export default ipfsLink;
