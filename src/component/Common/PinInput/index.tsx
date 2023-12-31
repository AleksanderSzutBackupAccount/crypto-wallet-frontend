import React, {useEffect, useRef} from 'react';
import {removeValuesFromArray} from './pin.utils';

interface PinInputGridProps {
    pin: Array<number | undefined>;
    onPinChanged: (pinEntry: number | undefined, index: number) => void;
    pinLength: number;
    validationMessage: string | undefined;
    validationResult: boolean | undefined;
    isValidating: boolean;
}

const PIN_MIN_VALUE = 0;
const PIN_MAX_VALUE = 9;
const BACKSPACE_KEY = 'Backspace';

const PinInput: React.FC<PinInputGridProps> = ({
                                                   pinLength,
                                                   pin,
                                                   onPinChanged,
                                                   validationMessage,
                                                   validationResult,
                                                   isValidating
                                               }) => {
    const inputRefs = useRef<HTMLInputElement[]>([]);

    const changePinFocus = (pinIndex: number) => {
        const ref = inputRefs.current[pinIndex];
        if (ref) {
            ref.focus();
        }
    };

    useEffect(() => {
        changePinFocus(0);
    }, [isValidating]);

    const onChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const previousValue = event.target.defaultValue;
        const valuesArray = event.target.value.split('');
        removeValuesFromArray(valuesArray, previousValue);
        const value = valuesArray.pop();
        if (!value) {
            return;
        }
        const pinNumber = Number(value.trim());
        if (isNaN(pinNumber) || value.length === 0) {
            return;
        }

        if (pinNumber >= PIN_MIN_VALUE && pinNumber <= PIN_MAX_VALUE) {
            onPinChanged(pinNumber, index);
            if (index < pinLength - 1) {
                changePinFocus(index + 1);
            }
        }
    };

    const onKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        const keyboardKeyCode = event.nativeEvent.code;
        if (keyboardKeyCode !== BACKSPACE_KEY) {
            return;
        }

        if (pin[index] === undefined) {
            changePinFocus(index - 1);
        } else {
            onPinChanged(undefined, index);
        }
    };

    return (
        <>
            <div>
                {Array.from({length: pinLength}, (_, index) => (
                    <label className={`pin-input ${pin[index] !== undefined ? 'pin-input--active' : ''}`}>
                        <input
                            disabled={isValidating}
                            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => onKeyDown(event, index)}
                            type="password"
                            key={index}
                            className="pin-input__input"
                            ref={(el: HTMLInputElement) => {
                                if (el) {
                                    inputRefs.current[index] = el;
                                }
                            }}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event, index)}
                            value={pin[index] || ''}
                        />
                    </label>
                ))}
            </div>
        </>
    );
};

export default PinInput;