import { ethers } from "ethers";
import { setbalance } from "../../slices/balanceSlice";
import { login } from "../../slices/userSlice";

export const connectwallethandler = (
  SeterrorMessage,
  SetdefaultAccount,
  SetUserBalance,
  dispatch
) => {
  if ( window.ethereum) {
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((result) => {
        accountChangedHandler(result[0], SetdefaultAccount,SetUserBalance, dispatch);
      });
  } else {
    SeterrorMessage("Install Metamask");
  }
};

export const accountChangedHandler = (
  newAccount,
  SetdefaultAccount,
  SetUserBalance,
  dispatch
) => {
  SetdefaultAccount(newAccount);

  dispatch(login([ethereum.selectedAddress]));
  getUserBalance(newAccount.toString(), SetUserBalance, dispatch);
};

export const getUserBalance = (address, SetUserBalance, dispatch) => {
  window.ethereum
    .request({ method: "eth_getBalance", params: [address, "latest"] })
    .then((balance) => {
      SetUserBalance(ethers.utils.formatEther(balance));
      dispatch(setbalance([ethers.utils.formatEther(balance)]));
    });
};