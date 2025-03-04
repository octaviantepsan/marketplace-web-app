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

function isUserDataValid(firstName, lastName, city, adress) {
    let letterOnlyCheck = /^[a-zA-Z]+$/;

    if (letterOnlyCheck.test(firstName) && letterOnlyCheck.test(lastName) && letterOnlyCheck.test(city)) {
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

function processItemData(itemName, itemType, stock = 0) {
    let letterOnlyCheck = /^[a-zA-Z]+$/;

    if ((typeof (itemName) != 'string') || (typeof (itemType) != 'string') || (typeof (stock) != 'number')) {
        return false;
    }

    if (letterOnlyCheck.test(itemType) && stock >= 0) {
        return true;
    }

    return false;
}

function deleteItem(itemId) {
    const query = `DELETE FROM Items WHERE ItemId = ${itemId}`;
    console.log("Item has been deleted.");
}

function testInsertItem(itemName, itemType, stock, userId) {
    if (processItemData(itemName, itemType, stock) === false) {
        console.error("Data was processed incorrectly");
        return;
    }

    const query = `INSERT INTO Items (ItemName, ItemType, Stock, UserId)
                   VALUES ('${itemName}', '${itemType}', '${stock}', ${userId})`;

    db.query(query, (err, results) => {
        if (err) {
            console.error(err.message);
        }
        console.log(results);
    });
}

module.exports = { isUserDataValid };