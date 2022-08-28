import React, { useEffect, useState } from "react";
import { Illustration } from "web3uikit";
import ipfsLink from "../helpers/ipfsLink";
import LoadingIndicator from "./LoadingIndicator";

const isLoadingImage = "/collats_logo.png";
function NFTImage({ src, className }) {
  const [loaded, setLoaded] = useState(false);
  const [link, setLink] = useState();
  const imgSrc = ipfsLink(link);
  const handleError = () => setLink(undefined);

  useEffect(() => {
    setLink(src);
  }, [src]);

  if (imgSrc) {
    if (
      imgSrc?.toLowerCase().includes(".avi") ||
      imgSrc?.toLowerCase().includes(".wmv") ||
      imgSrc?.toLowerCase().includes(".mp4") ||
      imgSrc?.toLowerCase().includes(".mov") ||
      imgSrc?.toLowerCase().includes(".webm") ||
      imgSrc?.toLowerCase().includes(".ogg") ||
      imgSrc?.toLowerCase().includes(".ogm") ||
      imgSrc?.toLowerCase().includes(".ogv")
    ) {
      return (
        <video className={className} controls autoPlay loop muted>
          <source src={imgSrc} />
        </video>
      );
    }

    if (imgSrc === isLoadingImage) {
      return <LoadingIndicator className={className} />;
    }

    return (
      <>
        {loaded ? null : <LoadingIndicator className={className} />}
        <img
          style={loaded ? {} : { display: "none" }}
          className={className}
          onError={handleError}
          src={imgSrc}
          onLoad={() => setLoaded(true)}
        />
      </>
    );
  }

  return (
    <div className={className}></div>
    // <Illustration
    //   className={className}
    //   onError={handleError}
    //   logo="comingSoon"
    // />
  );
}

export default NFTImage;
