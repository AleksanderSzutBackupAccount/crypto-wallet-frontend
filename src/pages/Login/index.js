import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";

import PinInput from "../../component/Common/PinInput";
import {authPin} from "../../api/authPin";
import {RouteEnum} from "../../routes/RouteEnum";
import { useDispatch } from "react-redux";
import { deleteWallet } from "../../store/slice/authSlice";

const PIN_LENGTH = 6;

const LogIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [pin, setPin] = useState(
        new Array(PIN_LENGTH)
    );

    const [validationError, setValidationError] = useState(undefined);

    const [isValidating, setIsValidating] = useState(false);

    const onPinChanged = (pinEntry, index) => {
        const newPin = [...pin];
        newPin[index] = pinEntry;
        setPin(newPin);
    };


    const validatePin = async () => {
        setIsValidating(true);

        try {
            await authPin(pin.join(''));
            sessionStorage.setItem("logged", true);
            navigate(RouteEnum.dashboardPage);
        } catch (e) {
            console.log('błąd');
            setValidationError(e);
            setPin(new Array(PIN_LENGTH));
        } finally {
            setIsValidating(false);
        }

    };

    useEffect(async () => {
        const checkPin = async () => {
            if (!pin.includes(undefined)) {
                await validatePin();
            }
        };

        await checkPin();
    }, [pin, validatePin]);

    const deleteWalletHandler = () => {
        dispatch(deleteWallet());
    }

    return (
        <section className="zl_login_section">
            <div className="zl_login_content container">
                <div className="zl_all_page_heading_section justify-content-center">
                    <div className="zl_all_page_heading text-center">
                        <h2>Login to Wallet</h2>
                    </div>
                </div>
                <div className="zl_login_heading_text">
                    <h3 className="zl_login_heading">WRITE PIN</h3>
                    <p className="zl_login_peregraph">
                        Login to Chainex Wallet with your PIN
                    </p>
                </div>
                <div className="center-auth">
                    <div>
                        <div className="zl_login_row row justify-content-center">
                            <div className="input-pin-group">
                                <PinInput
                                    isValidating={isValidating}
                                    validationResult={true}
                                    onPinChanged={onPinChanged}
                                    pin={pin}
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
                    >
                        Login
                    </button>

                    <Link to={RouteEnum.restorePage} className="mx-auto my-4 zl_link_button cent" onClick={() => deleteWalletHandler()}>
                        Delete current wallet(Use it to restore Wallet)
                    </Link>
                </div>
            </div>
        </section>
    )
};

export default LogIn;
