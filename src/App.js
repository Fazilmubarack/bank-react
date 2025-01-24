import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [transaction, setTransaction] = useState("");
  const [amount, setAmount] = useState(0);
  const [value, setValue] = useState("");
  const [username, setUsername] = useState("");
  const [usermail, setUsermail] = useState("");
  const [userid, setUserId] = useState("");
  const [info, setInfo] = useState(null);
  const [readyForTransaction, setReadyForTransaction] = useState(false);

  const showAlert = (message) => {
    const alertBox = document.createElement("div");
    alertBox.className = "custom-alert";
    alertBox.innerText = message;
    document.body.appendChild(alertBox);
    setTimeout(() => {
      alertBox.remove();
    }, 3000);
  };

  const handleBankTransaction = (e) => {
    e.preventDefault();
    if (!transaction) {
      showAlert("Please select a transaction type.");
      return;
    }

    const enteredAmount = Number(value);
    if (isNaN(enteredAmount) || enteredAmount <= 0) {
      showAlert("Enter a valid amount.");
      return;
    }

    if (transaction === "Deposit") {
      setAmount((prevAmount) => prevAmount + enteredAmount);
      showAlert(`₹${enteredAmount} deposited successfully!`);
    } else if (transaction === "Withdraw") {
      if (amount < enteredAmount) {
        showAlert("Insufficient balance.");
      } else {
        setAmount((prevAmount) => prevAmount - enteredAmount);
        showAlert(`₹${enteredAmount} withdrawn successfully!`);
      }
    }
    setValue("");
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    if (!username.trim() || !usermail.trim() || !userid.trim()) {
      showAlert("All account details are required.");
      return;
    }

    const accountInfo = { username, usermail, userid };
    setInfo(accountInfo);
    setReadyForTransaction(true);
    showAlert(`Account created successfully for ${username}.`);
    setUsername("");
    setUsermail("");
    setUserId("");
  };

  const handleDeleteAccount = () => {
    setInfo(null);
    setReadyForTransaction(false);
    setAmount(0);
    showAlert("Account deleted successfully.");
  };

  return (
    <div className="app-container">
      <h2 className="app-title">Bank Application</h2>
      <form className="form" onSubmit={handleCreateAccount}>
        <h3>Create Account</h3>
        <label>User Name:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter User Name"
        />
        <label>User Email:</label>
        <input
          type="email"
          value={usermail}
          onChange={(e) => setUsermail(e.target.value)}
          placeholder="Enter User Email"
        />
        <label>User ID:</label>
        <input
          type="text"
          value={userid}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
        />
        <button type="submit">Create Account</button>
      </form>

      {info && (
        <div className="account-details">
          <h3>Account Details</h3>
          <ul>
            <li>
              <strong>Name:</strong> {info.username}
            </li>
            <li>
              <strong>Email:</strong> {info.usermail}
            </li>
            <li>
              <strong>ID:</strong> {info.userid}
            </li>
          </ul>
          <button onClick={handleDeleteAccount} className="delete-btn">
            Delete Account
          </button>
        </div>
      )}

      {readyForTransaction && (
        <div className="transaction-section">
          <h3>Make a Transaction</h3>
          <form onSubmit={handleBankTransaction}>
            <label>Transaction Type:</label>
            <select
              value={transaction}
              onChange={(e) => setTransaction(e.target.value)}
            >
              <option value="">-- Select --</option>
              <option value="Deposit">Deposit</option>
              <option value="Withdraw">Withdraw</option>
            </select>
            <h2>Current Balance: ₹{amount}</h2>
            <label>Amount:</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter amount"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
