/**
 * @return {boolean}
 */
export function OnlyNumber(value) {
    let newRege = new RegExp(`^[0-9]+$`);
    return newRege.test(value);
}

/*export function onlyMoney(value)
{
    let newRege = new RegExp(`^[0-9]+(/\.[0-9]{2})?$`);
    return re.test(value);
}*/