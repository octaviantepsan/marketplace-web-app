/* Utility functions */

function queryDb() {
    const query = 'SELECT * FROM users';

    db.query(query, (err, results) => {
        if (err) {
            console.error(err.message);
        }
        console.log(results);
    });
}

function isUserDataValid(email, firstName, lastName, city) {
    let letterOnlyCheck = /^[a-zA-Z]+$/;
    let emailCheck = /^^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailCheck.test(email) && letterOnlyCheck.test(firstName) && letterOnlyCheck.test(lastName) && letterOnlyCheck.test(city)) {
        return true;
    }

    return false;
}

function deleteUser(userId) {
    const query = `DELETE FROM Users WHERE UserId = ${userId}`;
    console.log("User has been deleted.");
}

function testInsertUser(firstName, lastName, city, adress) {
    if (isUserDataValid(firstName, lastName, city, adress) === false) {
        console.error("Data was processed incorrectly");
        return;
    }

    const query = `INSERT INTO Users (LastName, FirstName, City, Address)
                   VALUES ('${lastName}', '${firstName}', '${city}', '${adress}')`;

    db.query(query, (err, results) => {
        if (err) {
            console.error(err.message);
        }
        console.log(results);
    });
}

function processItemData(itemName, Category, stock, price) {
    let letterOnlyCheck = /^[a-zA-Z]+$/;
    let itemNameCheck = /^.*\s+.*$/;
    let priceValueCheck = /^[1-9][0-9]*$/;

    if (letterOnlyCheck.test(Category) && itemNameCheck.test(itemName) && stock > 0 && priceValueCheck.test(price)) {
        return true;
    }

    return false;
}

function deleteItem(itemId) {
    const query = `DELETE FROM Items WHERE ItemId = ${itemId}`;
    console.log("Item has been deleted.");
}

function testInsertItem(itemName, Category, stock, userId) {
    if (processItemData(itemName, Category, stock) === false) {
        console.error("Data was processed incorrectly");
        return;
    }

    const query = `INSERT INTO Items (ItemName, Category, Stock, UserId)
                   VALUES ('${itemName}', '${Category}', '${stock}', ${userId})`;

    db.query(query, (err, results) => {
        if (err) {
            console.error(err.message);
        }
        console.log(results);
    });
}

module.exports = { isUserDataValid, processItemData };