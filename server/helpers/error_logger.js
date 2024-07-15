import fs from "fs";
import path from "path";

const getCurrentMonthYear = () => {
  const now = new Date();
  return `${now.getFullYear()}_${(now.getMonth() + 1).toString().padStart(2, "0")}`;
};

export default function logError(error) {
  try {
    const logDirectory = path.resolve(process.cwd(), "./logs");

    if (!fs.existsSync(logDirectory)) fs.mkdirSync(logDirectory, { recursive: true });

    const currentMonthYear = getCurrentMonthYear();
    const logFileName = `error_log_${currentMonthYear}.txt`;
    const logFilePath = path.resolve(logDirectory, logFileName);
    const logMessage = `[${new Date().toISOString()}] ${error.stack}\n`;

    if (!fs.existsSync(logFilePath)) fs.writeFileSync(logFilePath, "");

    fs.appendFileSync(logFilePath, logMessage);
  } catch (error) {
    console.error("Error creating logs directory or writing to log file:", error);
  }
}
