import chalk from "chalk";
const sleep = (ms = 1000) => new Promise((reslove) => setTimeout(reslove, ms));
const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min) + 1);
};
const logError = (err) => {
    console.log(`${chalk.bold.red(chalk.bgWhite(err))}\n`);
};
const getAString = (size, str) => {
    return Array.from({ length: size }, () => str).join("");
};
export { sleep, logError, getAString, randomNum };
