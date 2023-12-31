import React, { useEffect, useState } from "react";
import HeadingModule from "../../component/Layout/Header";
import { Link } from "react-router-dom";
import { Tab, Nav } from "react-bootstrap";
import WalletDetails from "../../component/Layout/WalletDetails/index.js";
import { RouteEnum } from "../../routes/RouteEnum";
import { useDispatch, useSelector } from "react-redux";
import { CurrencyList } from "../../component/Common/Currency/CurrencyList";
import {
  getTransactions,
  getErc20Transactions,
} from "../../store/slice/transactionSlice";

const Wallets = () => {
  const dispatch = useDispatch();
  const cryptoCoins = JSON.parse(localStorage.getItem("checkCrypto"));

  const coin = cryptoCoins?.map((item, i) => item.currency);
  const [key, setKey] = useState(coin[0]);

  const transactions = useSelector((state) => state.transactions.transactions);

  // console.log("allTransactions", transactions);

  let valueCoin = cryptoCoins.filter((obj) => obj.currency === key)[0];
  console.log("valueCoin", valueCoin);

  const [walletTransaction, setWalletTransaction] = useState([]);

  useEffect(() => {
    if (valueCoin?.is_erc20) {
      // window[valueCoin?.name + "Transactions"] =
      setWalletTransaction(transactions[valueCoin?.contract_address]);
    } else {
      // window[valueCoin?.name + "Transactions"] =
      setWalletTransaction(transactions[valueCoin?.coingecko_coin_name]);
    }
    // setWalletTransaction(window[valueCoin?.name + "Transactions"]);
  }, [transactions, valueCoin.tatum_coin_name]);

  // const userAddress =
  //   localStorage.getItem("user_crypto_currency_data") &&
  //   JSON.parse(localStorage.getItem("user_crypto_currency_data"))["ETH"]
  //     ?.address;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (key !== "tab1") {
      let value = cryptoCoins.filter((obj) => obj.currency === key)[0];
      // console.log("value", value);
      let currencyAddress = JSON.parse(
        localStorage.getItem("user_crypto_currency_data")
      )[value.currency]?.address;

      dispatch(
        value?.is_erc20
          ? getErc20Transactions({
              address: currencyAddress,
              chain: value.moralis_api_chain,
              contract_address: value?.contract_address,
            })
          : getTransactions({
              coin_type: value.coin_type,
              coin: value.coingecko_coin_name,
              chain: value.moralis_api_chain,
              address: currencyAddress,
            })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return (
    <>
      <section className="zl_wallets_page">
        <HeadingModule name={"Wallets"} />
        <Tab.Container
          id="left-tabs-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <div className="zl_add_currency_content">
            <h3 className="zl_bottom_content_heading">crypto currencies</h3>
            <Nav className="zl_add_currency_row row">
              <div className="zl_currency_column_sub_row">
                <CurrencyList nav={true} numStart={0} />
              </div>
              <div className="zl_add_currency_column zl_add_currency_btn_col col">
                <Link
                  to={RouteEnum.addCurrencyPage}
                  className="zl_add_currency_btn_content"
                >
                  Add Currency
                </Link>
              </div>
            </Nav>
          </div>
          <Tab.Content>
            {cryptoCoins?.map((item, i) => (
              <Tab.Pane eventKey={item.currency} key={i}>
                <WalletDetails
                  keyCoin={key}
                  {...item}
                  transactions={
                    walletTransaction?.length > 0 && walletTransaction
                  }
                />
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Tab.Container>
      </section>
    </>
  );
};

export default Wallets;
