import ERC20Based from "./ERC20Based";

class TUSDT extends ERC20Based {
  constructor(props) {
    super({
      ...props,
      key: "TUSDT",
      keyCoin: "ETH",
      digits: 6,
      contractAddress: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    });
  }
}

export default TUSDT;
