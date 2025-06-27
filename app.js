const contractAddress = "0xD20Ecb072145678B5853B7563EE5dc0a6E6981d9"; // Flash USDT Contract

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
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" }
    ],
    name: "transfer",
    outputs: [{ name: "success", type: "bool" }],
    type: "function"
  }
];

let web3;
let userAddress;

async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      web3 = new Web3(window.ethereum);

      const accounts = await web3.eth.getAccounts();
      userAddress = accounts[0];

      document.getElementById("wallet").innerText = Wallet: ${userAddress};
      await getBalance();
    } catch (err) {
      console.error("MetaMask connection error:", err);
    }
  } else {
    alert("MetaMask not found. Please install it.");
  }
}

async function getBalance() {
  const contract = new web3.eth.Contract(usdtAbi, contractAddress);

  try {
    const rawBalance = await contract.methods.balanceOf(userAddress).call();
    const decimals = await contract.methods.decimals().call();
    const balance = rawBalance / (10 ** decimals);

    document.getElementById("balance").innerText = USDT Balance: ${balance};
  } catch (err) {
    console.error("Failed to fetch balance:", err);
  }
}

async function sendUSDT() {
  const recipient = document.getElementById("recipient").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);

  if (!web3 || !userAddress) {
    alert("Connect your wallet first.");
    return;
  }

  if (!web3.utils.isAddress(recipient)) {
    alert("Invalid recipient address.");
    return;
  }

  if (isNaN(amount) || amount <= 0) {
    alert("Enter a valid amount.");
    return;
  }

  const contract = new web3.eth.Contract(usdtAbi, contractAddress);
  try {
    const decimals = await contract.methods.decimals().call();
    const value = web3.utils.toBN(amount * (10 ** decimals));

    document.getElementById("txStatus").innerText = "Sending transaction...";

    const tx = await contract.methods.transfer(recipient, value.toString()).send({ from: userAddress });

    document.getElementById("txStatus").innerText = Transaction sent! Hash: ${tx.transactionHash};
    await getBalance(); // Refresh balance
  } catch (err) {
    console.error("Transfer error:", err);
    document.getElementById("txStatus").innerText = "Transaction failed.";
  }
}

document.getElementById("connect").addEventListener("click", connectWallet);
document.getElementById("send").addEventListener("click", sendUSDT);
      updateBalanceDisplay();
      alert(Balance set to ${val});
    } else alert('❌ Invalid amount');
  });
});
