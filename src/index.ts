import figlet from "figlet";
import chalk from "chalk";
import fs from "node:fs";

let pkgJSON: Record<string, any>;
try {
  pkgJSON = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
} catch (err) {
  console.error(
    chalk.red.bold(
      "Could not find a package.json in the current directory. Please make sure you are in the root of your project.",
    ),
  );
  process.exit(1);
}
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
