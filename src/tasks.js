import chalk from "chalk";
import { askAmount, askBankVendor, askForReceipt } from "./prompts.js";
import printRecepit from "./receipts.js";
import { logError } from "./utils.js";
function logBalance(balance) {
    console.log(`${chalk.hex("#5f27cd")(`Your current balance is: $${balance}`)}`);
}
async function withdrawCash(balance, accountTitle) {
    if (balance <= 0) {
        throw "Your account balance is zero. First deposit cash.";
    }
    try {
        const amountToWithdraw = await askAmount("Enter amount to withdraw:");
        if (amountToWithdraw > balance) {
            throw `You can only withdraw $${balance}!`;
        }
        const remainingBalance = balance - amountToWithdraw;
        const userWantReceipt = await askForReceipt();
        if (userWantReceipt) {
            printRecepit(accountTitle, "Withdraw", amountToWithdraw);
        }
        return remainingBalance;
    }
    catch (error) {
        logError(error);
        return await withdrawCash(balance, accountTitle);
    }
}
async function depositCash(balance) {
    try {
        const amountToDeposit = await askAmount("Enter amount to deposit:");
        if (amountToDeposit > 1000000) {
            throw `You can't deposit more than 1 million`;
        }
        const newBalance = balance + amountToDeposit;
        return newBalance;
    }
    catch (error) {
        logError(error);
        return await depositCash(balance);
    }
}
async function transferCash(balance, accountTitle) {
    if (balance <= 0) {
        throw "Your account balance is zero. First deposit cash.";
    }
    const bankVendor = await askBankVendor();
    try {
        const amounttoTransfer = await askAmount("Enter amount to transfer");
        if (amounttoTransfer > balance) {
            throw `You can only transfer $${balance}!`;
        }
        const userWantReceipt = await askForReceipt();
        if (userWantReceipt) {
            printRecepit(accountTitle, "Transfer", amounttoTransfer, bankVendor);
        }
        const remainingBalance = balance - amounttoTransfer;
        return remainingBalance;
    }
    catch (error) {
        logError(error);
        return await transferCash(balance, accountTitle);
    }
}
var Operations;
(function (Operations) {
    Operations[Operations["DEPOSIT"] = 0] = "DEPOSIT";
    Operations[Operations["WITHDRAW"] = 1] = "WITHDRAW";
    Operations[Operations["TRANSFER"] = 2] = "TRANSFER";
    Operations[Operations["CHECK_BALANCE"] = 3] = "CHECK_BALANCE";
})(Operations || (Operations = {}));
export { logBalance, depositCash, withdrawCash, transferCash, Operations };
