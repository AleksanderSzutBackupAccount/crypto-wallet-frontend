export const validatePIN = (pinToCheck: string, confirmPin: string, pinLength: number): Promise<string> => new Promise((resolve, reject) => {
    if(pinLength !== pinToCheck.length) {
        reject('Pin length is not valid')
        return
    }

    if(pinToCheck !== confirmPin) {
        reject('Pin is not the same')

        return;
    }
    resolve('Pin is valid')


});