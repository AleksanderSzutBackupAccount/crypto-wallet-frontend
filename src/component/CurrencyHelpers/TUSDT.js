import ERC20Based from "./ERC20Based";

class TUSDT extends ERC20Based {
  constructor(props) {
    super({
      ...props,
      key: "TUSDT",
      keyCoin: "ETH",
      chain: "rinkeby",
      digits: 6,
      contractAddress: "0xd92e713d051c37ebb2561803a3b5fbabc4962431",
    });
  }
}

export default TUSDT;
