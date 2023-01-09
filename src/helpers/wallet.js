import {
    generateWallet,
    Currency,
    generateAddressFromXPub,
    generatePrivateKeyFromMnemonic,
} from "@tatumio/tatum";

export const generateWalletForCrypto = async (mnemonics_data, Cur, cb) => {
    var pub_key;
    var privateKey;

    try {
        const wallet = await generateWallet(Currency[Cur], false, mnemonics_data);
        pub_key = wallet.xpub;

        privateKey = await generatePrivateKeyFromMnemonic(
            Currency[Cur],
            false,
            wallet.mnemonic,
            0
        );
        const address = await generateAddressFromXPub(
            Currency[Cur],
            false,
            pub_key,
            0
        );
        return {address, pub_key, privateKey};
    } catch (error) {
        console.log("error with created wallet", error);
    }
};
