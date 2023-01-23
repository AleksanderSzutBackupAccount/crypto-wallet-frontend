import ERC20Based from "./ERC20Based";

class LINK extends ERC20Based {
  constructor(props) {
    super({
      ...props,
      key: "LINK",
      keyCoin: "ETH",
      digits: 18,
      contractAddress: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    });
  }
}

export default LINK;
