import figlet from "figlet";
import chalk from "chalk";
import fs from "node:fs";

const pkgJSON = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

console.log(
  chalk.green(
    figlet.textSync("Create Project CLI", {
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
