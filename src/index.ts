// import figlet from "figlet";
// import chalk from "chalk";
// import { cli } from "./utils/commands.js";
import { init } from "./utils/init.js";
import prompts from "prompts";

function main() {
  init();
  // const options = cli.opts();

  prompts([
    {
      type: "select",
      name: "type",
      message: "What are you building?",
      choices: [
        { title: "New CLI", value: "cli" },
        { title: "New Next.js Project", value: "next" },
        { title: "New Rust web server", value: "rust" },
      ],
    },
  ]).then((res: any) => {
    prompts([
      {
        type: "text",
        name: "name",
        message: "What is the name of your project?",
      },
    ]).then((res2: any) => {
      prompts([
        {
          type: "select",
          name: "type",
          message: "Initialize git?",
          choices: [
            { title: "Yes", value: "git" },
            { title: "No", value: "noGit" },
          ],
        },
      ]).then((res3: any) => {
        console.log(
          `Building "${res.type}"-type project called "${res2.name}"`,
        );
      });
    });
  });
}

main();
