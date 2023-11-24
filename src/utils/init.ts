import fs from "node:fs";
import figlet from "figlet";
import chalk from "chalk";

export const clearConsole = () => {
  process.stdout.write(
    process.platform === "win32" ? "\x1B[2J\x1B[0f" : "\x1B[2J\x1B[3J\x1B[H",
  );
};

const packagePath = process.argv[1].split("/dist")[0] + "/package.json";

let pkgJSON: Record<string, any>;

try {
  pkgJSON = JSON.parse(fs.readFileSync(packagePath, "utf8"));
} catch (err) {
  console.error(err);
  process.exit(1);
}

export const init = () => {
  clearConsole();

  console.log(
    chalk.green(
      figlet.textSync("Generate Project", {
        font: "Small",
        horizontalLayout: "default",
        verticalLayout: "fitted",
        width: 80,
        whitespaceBreak: true,
      }),
    ),
  );

  console.log(
    `\n${chalk.dim("Version:")} ${pkgJSON.version} by ${chalk.italic(
      pkgJSON.author.name,
    )} <${chalk.blue.underline(pkgJSON.author.email)}>`,
  );

  console.log(chalk.green.bold("\n\nLet's create a new project!"));

  console.log(
    chalk.dim(
      "\nI'll walk you through creating a specific type of project.\nBuckle up!",
    ),
  );
};
