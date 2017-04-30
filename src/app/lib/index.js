/**
 * @return {boolean}
 */
export function OnlyNumber(value) {
    let newRege = new RegExp(`^[0-9]+$`);
    return newRege.test(value);
}