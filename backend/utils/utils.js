/* Utility functions */

function isUserDataValid(email, firstName, lastName, city) {
    let letterOnlyCheck = /^[a-zA-Z\s]+$/;
    let emailCheck = /^^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailCheck.test(email) && letterOnlyCheck.test(firstName) && letterOnlyCheck.test(lastName) && letterOnlyCheck.test(city)) {
        return true;
    }

    return false;
}

function processItemData(itemName, Category, price) {
    let letterOnlyCheck = /^[a-zA-Z_\s]+$/;
    let itemNameCheck = /^.*$/;
    let priceValueCheck = /^[1-9][0-9]*$/;

    if (letterOnlyCheck.test(Category) && itemNameCheck.test(itemName) && priceValueCheck.test(price)) {
        return true;
    }

    return false;
}

module.exports = { isUserDataValid, processItemData };