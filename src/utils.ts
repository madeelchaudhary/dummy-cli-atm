import chalk from "chalk";

const sleep = (ms: number = 1000) =>
  new Promise((reslove) => setTimeout(reslove, ms));

const randomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + 1);
};

const logError = (err: any) => {
  console.log(`${chalk.bold.red(chalk.bgWhite(err))}\n`);
};

const getAString = (size: number, str: string) => {
  return Array.from({ length: size }, () => str).join("");
};

export { sleep, logError, getAString, randomNum };
