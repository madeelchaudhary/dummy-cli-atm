import chalk from "chalk";
import { getAString } from "./utils.js";

function printRecepit(
  accountTitle: string,
  transactionType: string,
  ammount: number,
  bankVendor?: string
) {
  const receiptBorders =
    getAString(60, "*") + "\n" + getAString(60, "*") + "\n";
  const receiptFieldSeprator = getAString(36, "-") + "\n";

  const receiptTitleField =
    getAString(12, " ") +
    receiptFieldSeprator +
    getAString(17, " ") +
    "Account Holder: " +
    accountTitle +
    "\n" +
    getAString(12, " ") +
    receiptFieldSeprator;

  const receiptTransactionTypeField =
    getAString(12, " ") +
    receiptFieldSeprator +
    getAString(17, " ") +
    "Transaction Type: " +
    transactionType +
    "\n" +
    getAString(12, " ") +
    receiptFieldSeprator;

  let receiptBankNameFeild;
  if (transactionType === "Transfer") {
    receiptBankNameFeild =
      getAString(12, " ") +
      receiptFieldSeprator +
      getAString(17, " ") +
      "Bank Account: " +
      bankVendor +
      "\n" +
      getAString(12, " ") +
      receiptFieldSeprator;
  }

  const receiptAmountField =
    getAString(12, " ") +
    receiptFieldSeprator +
    getAString(17, " ") +
    "Amount " +
    transactionType +
    ": " +
    ammount +
    "\n" +
    getAString(12, " ") +
    receiptFieldSeprator;

  const receipt =
    "\n" +
    receiptBorders +
    receiptTitleField +
    receiptTransactionTypeField +
    (receiptBankNameFeild ?? "") +
    receiptAmountField +
    receiptBorders;
  console.log(`${chalk.yellow(receipt)}`);
}

export default printRecepit;
