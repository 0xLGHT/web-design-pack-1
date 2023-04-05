const gallery = document.getElementById('gallery');

const nftList = [
  {
    contractAddress: '0x48BB19ECf3daC3E109fb65459091e90d775427e0', // Replace with the contract address of the first NFT
    tokenId: '1', // Replace with the token ID of the first NFT
  },
  {
    contractAddress: '0xA1c6f7c4cDdECaeD2F62164a36E1b32b9E5e5984', // Replace with the contract address of the second NFT
    tokenId: '18', // Replace with the token ID of the second NFT
  },
  {
    contractAddress: '0x15a458D4BA0eA92169346515f83419C3165791aA', // Replace with the contract address of the first NFT
    tokenId: '22', // Replace with the token ID of the first NFT
  },
  {
    contractAddress: '0x9B3Fe7EB186005AB67692D3c67A453930635660a', // Replace with the contract address of the first NFT
    tokenId: '22', // Replace with the token ID of the first NFT
  },
  {
    contractAddress: '0x15a458D4BA0eA92169346515f83419C3165791aA', // Replace with the contract address of the first NFT
    tokenId: '3', // Replace with the token ID of the first NFT
  },
  {
    contractAddress: '0x30A991503aC1A085FbCf068c8711848FF2e728be', // Replace with the contract address of the first NFT
    tokenId: '1', // Replace with the token ID of the first NFT
  },
  {
    contractAddress: '0xA1c6f7c4cDdECaeD2F62164a36E1b32b9E5e5984', // Replace with the contract address of the first NFT
    tokenId: '29', // Replace with the token ID of the first NFT
  },
  {
    contractAddress: '0x15a458D4BA0eA92169346515f83419C3165791aA', // Replace with the contract address of the first NFT
    tokenId: '7', // Replace with the token ID of the first NFT
  },
  {
    contractAddress: '0x09455DF82441826BFE506caa3d4cC2c9cD39e5cB', // Replace with the contract address of the first NFT
    tokenId: '1', // Replace with the token ID of the first NFT
  },
  {
    contractAddress: '0xC45d5aB749EA44a6130768a25987C3F623E45509', // Replace with the contract address of the first NFT
    tokenId: '3', // Replace with the token ID of the first NFT
  },
  {
    contractAddress: '0xA1c6f7c4cDdECaeD2F62164a36E1b32b9E5e5984', // Replace with the contract address of the first NFT
    tokenId: '25', // Replace with the token ID of the first NFT
  },
  {
    contractAddress: '0x15a458D4BA0eA92169346515f83419C3165791aA', // Replace with the contract address of the first NFT
    tokenId: '25', // Replace with the token ID of the first NFT
  },
  {
    contractAddress: '0xC45d5aB749EA44a6130768a25987C3F623E45509', // Replace with the contract address of the first NFT
    tokenId: '16', // Replace with the token ID of the first NFT
  },
  {
    contractAddress: '0x2Ce8dAA3620126A0096f4a7C21BEFF8355F96c07', // Replace with the contract address of the first NFT
    tokenId: '13', // Replace with the token ID of the first NFT
  },
  {
    contractAddress: '0xA1c6f7c4cDdECaeD2F62164a36E1b32b9E5e5984', // Replace with the contract address of the first NFT
    tokenId: '31', // Replace with the token ID of the first NFT
  },
  {
    contractAddress: '0xA1c6f7c4cDdECaeD2F62164a36E1b32b9E5e5984', // Replace with the contract address of the first NFT
    tokenId: '19', // Replace with the token ID of the first NFT
  },
  {
    contractAddress: '0xA1c6f7c4cDdECaeD2F62164a36E1b32b9E5e5984', // Replace with the contract address of the first NFT
    tokenId: '23', // Replace with the token ID of the first NFT
  },
  {
    contractAddress: '0xA1c6f7c4cDdECaeD2F62164a36E1b32b9E5e5984', // Replace with the contract address of the first NFT
    tokenId: '22', // Replace with the token ID of the first NFT
  },
  {
    contractAddress: '0xA1c6f7c4cDdECaeD2F62164a36E1b32b9E5e5984', // Replace with the contract address of the first NFT
    tokenId: '13', // Replace with the token ID of the first NFT
  },
  {
    contractAddress: '0x15a458D4BA0eA92169346515f83419C3165791aA', // Replace with the contract address of the first NFT
    tokenId: '11', // Replace with the token ID of the first NFT
  },

  // Add more NFTs by following the same structure
];

async function fetchNFT(contractAddress, tokenId) {
    const response = await fetch(`https://api.opensea.io/api/v1/asset/${contractAddress}/${tokenId}`);
    const data = await response.json();
    return data;
  }
  
  function createMediaElement(nft) {
    const mediaElement = document.createElement("img");
    mediaElement.src = nft.image_url;
    mediaElement.alt = nft.name;
    return mediaElement;
  }
  
  function createNFTElement(nft) {
    const nftElement = document.createElement("div");
    nftElement.className = "nft";
  
    const mediaElement = createMediaElement(nft);
  
    mediaElement.addEventListener("click", () => {
      if (mediaElement.tagName === "IMG" && nft.animation_url) {
        const videoElement = document.createElement("video");
        videoElement.src = nft.animation_url;
        videoElement.autoplay = true;
        videoElement.loop = true;
        videoElement.muted = true;
        videoElement.playsInline = true;
        videoElement.addEventListener("click", () => {
          videoElement.pause();
          nftElement.replaceChild(mediaElement, videoElement);
          nftElement.classList.remove("active");
        });
  
        nftElement.replaceChild(videoElement, mediaElement);
        nftElement.classList.add("active");
      }
    });
  
    nftElement.appendChild(mediaElement);
  
    const nftName = document.createElement("h3");
    nftName.textContent = nft.name;
    nftElement.appendChild(nftName);
  
    return nftElement;
  }
  
  

  function setupIntersectionObserver() {
    const videoElements = document.querySelectorAll('video');
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };
  
    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.play();
        } else {
          entry.target.pause();
        }
      });
    };
  
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    videoElements.forEach(video => observer.observe(video));
  }
  
  
  async function displayNFTs() {
    for (const nftItem of nftList) {
      const nft = await fetchNFT(nftItem.contractAddress, nftItem.tokenId);
      const nftElement = createNFTElement(nft);
      gallery.appendChild(nftElement);
    }

  setupIntersectionObserver(); // Add this line
  }
  
  displayNFTs();