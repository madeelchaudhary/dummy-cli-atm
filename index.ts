#! /usr/bin/env node

import chalkAnimation from "chalk-animation";

import { sleep, logError, getAString, randomNum } from "./src/utils.js";
import { askCredentials, askOperation, askToContinue } from "./src/prompts.js";
import {
  logBalance,
  depositCash,
  withdrawCash,
  Operations,
  transferCash,
} from "./src/tasks.js";

let userCredentials: { userId: string; userPin: number };
let accountBalance = randomNum(100, 1000);

async function welcome() {
  const beautifyStr = getAString(45, "*");
  const rainbowTitle = chalkAnimation.rainbow(
    `\n${beautifyStr}
        Hi, thanks for exploring.!
    You can perform some basic operations\n${beautifyStr}\n`
  );

  rainbowTitle.start();
  await sleep();
  rainbowTitle.stop();
}

async function operateAccount() {
  do {
    try {
      const currentTask = await askOperation();
      let updatedBalance;
      switch (currentTask.toString()) {
        case Operations.DEPOSIT.toString():
          updatedBalance = await depositCash(accountBalance);
          accountBalance = updatedBalance;
          break;
        case Operations.WITHDRAW.toString():
          updatedBalance = await withdrawCash(
            accountBalance,
            userCredentials.userId
          );
          accountBalance = updatedBalance;
          break;
        case Operations.TRANSFER.toString():
          updatedBalance = await transferCash(
            accountBalance,
            userCredentials.userId
          );
          accountBalance = updatedBalance;
          break;
        case Operations.CHECK_BALANCE.toString():
          logBalance(accountBalance);
          break;
        default:
          logError("Doesn't exist the Operation");
          break;
      }
    } catch (error) {
      logError(error);
    }
  } while (await askToContinue());

  const karaokeTitle = chalkAnimation.karaoke("Hope you enjoed it!");
  karaokeTitle.start();
  await sleep();
  karaokeTitle.stop();
  process.exit(0);
}

async function setUserCredentials() {
  try {
    userCredentials = await askCredentials();
  } catch (error) {
    logError(error);
  }
}

await welcome();
await setUserCredentials();
operateAccount();
