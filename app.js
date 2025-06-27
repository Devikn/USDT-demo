document.addEventListener("DOMContentLoaded", () => {
  const connectBtn = document.getElementById('connectBtn');
  const status = document.getElementById('status');
  const walletUI = document.getElementById('walletUI');
  const balance = document.getElementById('balance');
  const sendBtn = document.getElementById('sendBtn');
  const receiveBtn = document.getElementById('receiveBtn');
  const customAmount = document.getElementById('customAmount');
  const setBtn = document.getElementById('setBtn');

  let fakeBalance = 0.00;

  function updateBalanceDisplay() {
    balance.textContent = USDT Balance: ${fakeBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })};
  }

  if (typeof window.ethereum !== 'undefined') {
    status.textContent = '✅ MetaMask detected — click connect';
  } else {
    status.textContent = '❌ Install MetaMask';
    connectBtn.disabled = true;
  }

  connectBtn.addEventListener('click', async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      status.textContent = Connected: ${accounts[0].slice(0,6)}...${accounts[0].slice(-4)};
      walletUI.classList.remove("hidden");
      fakeBalance = 9999999.00;
      updateBalanceDisplay();
    } catch {
      status.textContent = '❌ Connection failed';
    }
  });

  sendBtn.addEventListener('click', () => {
    if (fakeBalance >= 100) {
      fakeBalance -= 100;
      updateBalanceDisplay();
      alert('✅ Fake 100 USDT sent!');
    } else alert('❌ Insufficient balance');
  });

  receiveBtn.addEventListener('click', () => {
    fakeBalance += 500;
    updateBalanceDisplay();
    alert('✅ Fake 500 USDT received!');
  });

  setBtn.addEventListener('click', () => {
    const val = parseFloat(customAmount.value);
    if (!isNaN(val) && val >= 0) {
      fakeBalance = val;
      updateBalanceDisplay();
      alert(Balance set to ${val});
    } else alert('❌ Invalid amount');
  });
});
