import Sha256 from 'crypto-js/sha256';

const storedPin = localStorage.getItem('user_pin_code');

export const authPin = (pinToCheck: string): Promise<string> => new Promise((resolve, reject) => {
    if(storedPin && storedPin === Sha256(pinToCheck).toString()) {
        resolve('Ok')
        return
    }

    reject('Invalid Pin')


});