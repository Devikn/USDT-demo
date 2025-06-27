const contractAddress = "0xD20Ecb072145678B5853B7563EE5dc0a6E6981d9"; // Controller mask or USDT

const usdtAbi = [
    {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        type: "function"
    },
    {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [{ name: "", type: "uint8" }],
        type: "function"
    }
];

async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const web3 = new Web3(window.ethereum);
            const accounts = await web3.eth.getAccounts();
            const userAddress = accounts[0];

            document.getElementById("wallet").innerText = Connected: ${userAddress};
            getUSDTBalance(web3, userAddress);
        } catch (err) {
            console.error("Wallet connection failed:", err);
        }
    } else {
        alert("Please install MetaMask to use this dApp.");
    }
}

async function getUSDTBalance(web3, userAddress) {
    const contract = new web3.eth.Contract(usdtAbi, contractAddress);

    try {
        const balance = await contract.methods.balanceOf(userAddress).call();
        const decimals = await contract.methods.decimals().call();
        const adjustedBalance = balance / (10 ** decimals);

        document.getElementById("balance").innerText = USDT Balance: ${adjustedBalance};
    } catch (err) {
        console.error("Error fetching balance:", err);
    }
}

document.getElementById("connect").addEventListener("click", connectWallet);
      updateBalanceDisplay();
      alert(Balance set to ${val});
    } else alert('❌ Invalid amount');
  });
});
