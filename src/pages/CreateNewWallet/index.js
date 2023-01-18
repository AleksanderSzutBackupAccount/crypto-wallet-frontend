import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";

import {RouteEnum} from "../../routes/RouteEnum";
import {loginPageAction} from "../../store/slice/authSlice";
import PinInput from "../../component/Common/PinInput";
import {validatePIN} from "../../api/validatePin";

const PIN_LENGTH = 6;

const CreateNewWallet = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const mnemonics = localStorage.getItem('mnemonics');

    const [pin, setPin] = useState(
        new Array(PIN_LENGTH)
    );

    const [confirmPin, setConfirmPin] = useState(
        new Array(PIN_LENGTH)
    );

    const [validationError, setValidationError] = useState(undefined);

    const [isValidating, setIsValidating] = useState(false);

    const onPinChanged = (pinEntry, index) => {
        const newPin = [...pin];
        newPin[index] = pinEntry;
        setPin(newPin);
    };
    const onConfirmPinChanged = (pinEntry, index) => {
        const newPin = [...confirmPin];
        newPin[index] = pinEntry;
        setConfirmPin(newPin);
    };


    const validatePin = async () => {
        setIsValidating(true);

        try {
            await validatePIN(pin.join(''), confirmPin.join(''), PIN_LENGTH);
            return true;
        } catch (e) {
            setValidationError(e);
            return false;
        } finally {
            setIsValidating(false);
        }

    };

    const createWalletHandler = async () => {

        if (await validatePin()) {
            dispatch(
                loginPageAction({
                    params: {
                        mnemonics: mnemonics,
                        pin: pin.join('')
                    },
                    cb: (err, response) => {
                        if (err) {
                            console.log("err", err);
                        }
                        if (response) {
                            navigate(RouteEnum.secureBackupPage);
                        }
                    },
                })
            );
        }
    };

    return (
        <section className="zl_login_section">
            <div className="zl_login_content container">
                <div className="zl_all_page_heading_section">
                    <div className="zl_all_page_heading">
                        <h2>{mnemonics ? 'Import Wallet' : 'Create New Wallet'}</h2>
                    </div>
                </div>
                <div className="zl_login_heading_text">
                    <h3 className="zl_login_heading">Create PIN</h3>
                    <p className="zl_login_peregraph">
                        Set Pin of your Chainex Wallet
                    </p>
                </div>
                <div className="center-auth">
                    <div>
                        <div className="zl_login_row row justify-content-center">
                            <div className="input-pin-group">
                                <h4 className="input-pin-group__heading">New PIN (6 chrs)</h4>
                                <PinInput
                                    isValidating={isValidating}
                                    validationResult={true}
                                    onPinChanged={onPinChanged}
                                    pin={pin}
                                    pinLength={PIN_LENGTH}
                                />
                            </div>
                            <div className="input-pin-group">
                                <h4 className="input-pin-group__heading">Confirm PIN</h4>
                                <PinInput
                                    isValidating={isValidating}
                                    validationResult={true}
                                    onPinChanged={onConfirmPinChanged}
                                    pin={confirmPin}
                                    pinLength={PIN_LENGTH}
                                />
                            </div>
                        </div>
                        {validationError && <div className="pin-text-error my-2">{validationError}</div>}
                    </div>
                </div>
                <div className="zl_login_btn justify-content-center d-flex flex-column ">
                    <button
                        className="mx-auto zl_login_btn_link"
                        onClick={() => createWalletHandler()}
                    >
                        {mnemonics ? 'Confirm' : 'Create Wallet'}
                    </button>
                    {mnemonics ? ''
                        : (
                            <Link to={RouteEnum.restorePage} className="mx-auto my-4 zl_link_button cent">
                                I already have wallet
                            </Link>
                        )
                    }
                </div>
            </div>
        </section>
    );
};

export default CreateNewWallet;