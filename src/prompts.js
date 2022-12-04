import inquirer from "inquirer";
import { Operations } from "./tasks.js";
async function askCredentials() {
    const answers = await inquirer.prompt([
        {
            name: "user_id",
            type: "input",
            message: "Enter your Id:",
        },
        {
            name: "user_pin",
            type: "password",
            message: "Enter your 4 digits secret pin(Number):",
        },
    ]);
    if (!answers.user_id ||
        !answers.user_pin ||
        isNaN(+answers.user_pin) ||
        answers.user_pin.length !== 4) {
        throw "Please enter valid details!";
    }
    return {
        userId: answers.user_id,
        userPin: +answers.user_pin,
    };
}
async function askOperation() {
    const answers = await inquirer.prompt({
        name: "userChoice",
        type: "list",
        message: "Choose your desired task!",
        choices: Object.values(Operations).slice(0, 4),
    });
    return Operations[answers.userChoice];
}
async function askAmount(customMessage) {
    const answers = await inquirer.prompt({
        name: "num",
        type: "number",
        message: customMessage,
    });
    if (isNaN(answers.num)) {
        throw "Please enter a valid number.";
    }
    return answers.num;
}
async function askBankVendor() {
    const answers = await inquirer.prompt({
        name: "bank_name",
        type: "list",
        message: "Select the Bank Account",
        choices: ["Easypaisa", "Jashcash"],
    });
    return answers.bank_name;
}
async function confirmFromUser(customMessage) {
    const answers = await inquirer.prompt({
        name: "userChoice",
        type: "confirm",
        message: customMessage,
    });
    return answers.userChoice;
}
async function askForReceipt() {
    return await confirmFromUser("Do you want to print the transaction receipt?");
}
async function askToContinue() {
    return await confirmFromUser("Do you want to perform another transaction?");
}
export { askCredentials, askOperation, askAmount, askBankVendor, askToContinue, askForReceipt, };
