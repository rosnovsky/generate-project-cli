import chalk from "chalk";
import prompts from "prompts";
import slugify from "slugify";
import type { Prompt } from "./types.js";

const questions: Prompt[] = [
  {
    type: "select",
    name: "type",
    message: "What are you building?",
    choices: [
      { title: "New CLI", value: "cli" },
      { title: "New Next.js Project", value: "nextjs" },
      { title: "New Rust web server", value: "rust" },
      { title: "Cancel", value: "cancel" },
    ],
  },
  {
    type: "text",
    name: "name",
    message: "What is the name of your project?",
    initial: "my awesome project",
    validate: (name: string) => name.length > 2,
  },
  {
    type: "select",
    name: "git",
    message: "Initialize git?",
    choices: [
      { title: "Yes", value: "true" },
      { title: "No", value: "false" },
    ],
  },
  {
    type: "select",
    name: "deps",
    message: "Install dependencies?",
    choices: [
      { title: "Yes", value: "true" },
      { title: "No", value: "false" },
    ],
  },
];

export const userPrompts = async () => {
  let actions = [];
  for (const question of questions) {
    const response = await prompts([question]);

    if (response.type === "cancel") {
      console.log("See you back soon!");
      process.exit(0);
    }

    actions.push(response);
  }

  const [projectType, projectName, initializeGit, installDeps] = actions;
  const projectSlug = slugify.default(projectName.name);

  console.log(
    `\n${chalk.bold("Here's what I'm going to do:")}
    - Create a new folder called "${chalk.blue(
      slugify.default(projectName.name),
    )}"
    - Create a new "${chalk.green(
      projectType.type,
    )}" project called "${chalk.blue(projectName.name)}" in this folder
    - I ${
      initializeGit.git === "true" ? chalk.green("will") : chalk.red("will not")
    } initialize git
    - I ${
      installDeps.deps === "true" ? chalk.green("will") : chalk.red("will not")
    } install dependencies
    - Add all the goodies ${chalk.dim(
      "(README.md, prettier, commitlint, etc.)",
    )}
    `,
  );

  const confirm = await prompts([
    {
      type: "select",
      name: "confirm",
      message: "Sounds good?",
      choices: [
        { title: "Yes", value: "true" },
        { title: "No", value: "false" },
      ],
    },
  ]);

  if (confirm.confirm === "false") {
    console.log("See you back soon!");
    process.exit(0);
  }

  const project = {
    projectType: projectType.type,
    projectName: projectName.name,
    projectSlug,
    initializeGit: initializeGit.git === "true",
    installDeps: installDeps.deps === "true",
  };

  return project;
};
