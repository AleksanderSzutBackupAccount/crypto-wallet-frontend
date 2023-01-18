import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";

import PinInput from "../../component/Common/PinInput";
import {authPin} from "../../api/authPin";
import {RouteEnum} from "../../routes/RouteEnum";

const PIN_LENGTH = 6;

const LogIn = () => {
    const navigate = useNavigate();

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
            console.log('sukces');
            return true;
        } catch (e) {
            console.log('błąd');
            setValidationError(e);
            setPin(new Array(PIN_LENGTH));
            return false;
        } finally {
            setIsValidating(false);
        }

    };
    const loginHandler = async () => {
        if (await validatePin()) {
            sessionStorage.setItem("logged", true);
            navigate(RouteEnum.dashboardPage);
        }
    };

        return (
        <section className="zl_login_section">
            <div className="zl_login_content container">
                <div className="zl_all_page_heading_section">
                    <div className="zl_all_page_heading">
                        <h2>Create New Wallet</h2>
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
                        </div>
                        {validationError && <div className="pin-text-error my-2">{validationError}</div>}
                    </div>
                </div>
                <div className="zl_login_btn justify-content-center d-flex flex-column ">
                    <button
                        className="mx-auto zl_login_btn_link"
                        onClick={() => loginHandler()}
                    >
                        Login
                    </button>
                </div>
            </div>
        </section>
    )
};

export default LogIn;
