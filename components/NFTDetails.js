import React from "react";
import NFTImage from "./NFTImage";

// className=" aspect-auto h-[90vh] w-[90vh] object-cover object-center rounded shadow-lg"
function NFTDetails({
  imgSrc,
  name,
  description,
  getUri,
  metadata,
  massMint,
  handleRecipientsModal,
}) {
  return (
    <section className="text-gray-600 body-font h-screen justify-center flex w-full">
      {!metadata ? (
        <button onClick={getUri}>Get NFT</button>
      ) : (
        <div className="container px-5 py-4 ">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <NFTImage
              className="lg:w-1/2 w-full aspect-auto object-cover object-center rounded shadow-lg"
              src={imgSrc}
            ></NFTImage>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-gray-900 text-4xl title-font font-medium mb-1">
                {name}
              </h1>
              <p className="leading-relaxed mb-10 text-lg">{description}</p>
              <div className="flex flex-row gap-2">
                <button
                  className="text-lg bg-transparent hover:bg-gray-500 text-gray-700 hover:text-white py-2 border border-gray-500 hover:border-transparent rounded w-32"
                  onClick={massMint}
                >
                  Send
                </button>
                <button
                  className="text-lg bg-transparent hover:bg-gray-500 text-gray-700 hover:text-white py-2 border border-gray-500 hover:border-transparent rounded w-32"
                  onClick={handleRecipientsModal}
                >
                  Wallets
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default NFTDetails;
