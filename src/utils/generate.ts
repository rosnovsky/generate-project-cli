import chalk from "chalk";
import { ProjectInfo } from "./types.js";
import fs from "node:fs";

export async function generateProject(projectInfo: ProjectInfo) {
  const { projectSlug, initializeGit, installDeps } = projectInfo;

  const templateDir = process.argv[1].split("/dist")[0] + "/template";

  const projectPath = `${process.cwd()}/${projectSlug}`;

  try {
    fs.mkdirSync(projectPath);
  } catch (err) {
    console.error("Failed to create project directory", err);
    process.exit(1);
  }

  // Copy template files to project directory, ignore directories
  fs.readdirSync(templateDir).forEach((file) => {
    if (!fs.lstatSync(`${templateDir}/${file}`).isDirectory()) {
      fs.copyFileSync(`${templateDir}/${file}`, `${projectPath}/${file}`);
    }
  });

  // create directories that exist in template
  fs.readdirSync(templateDir).forEach((file) => {
    if (fs.lstatSync(`${templateDir}/${file}`).isDirectory()) {
      fs.mkdirSync(`${projectPath}/${file}`);
    }
  });

  //create .keep file inside of src directory
  fs.writeFileSync(`${projectPath}/src/.keep`, "");

  // create a folder `workflows` inside of .github
  fs.mkdirSync(`${projectPath}/.github/workflows`);

  // copy yaml file to workflows directory
  fs.copyFileSync(
    `${templateDir}/.github/workflows/action.yml`,
    `${projectPath}/.github/workflows/action.yml`,
  );

  // update package.json
  const pkgJSON = JSON.parse(
    fs.readFileSync(`${projectPath}/package.json`, "utf8"),
  );

  pkgJSON.name = projectSlug;

  fs.writeFileSync(
    `${projectPath}/package.json`,
    JSON.stringify(pkgJSON, null, 2),
  );

  // run git init
  const { execSync } = await import("child_process");
  if (initializeGit) {
    execSync("git init", { cwd: projectPath });
  }

  // install dependencies
  if (installDeps) {
    execSync("pnpm install", { cwd: projectPath });
  }

  console.log(`\n${chalk.green.bold("Done!")}\n`);
}
