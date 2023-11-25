import { ProjectInfo } from "./types.js";
import fs from "node:fs";
import {
  copyFilesFromTemplate,
  copyDirsFromTemplate,
  executeCommand,
  logger,
  mkdir,
  createEmptyFile,
} from "./helpers.js";

export async function generateProject(projectInfo: ProjectInfo) {
  const { projectSlug, initializeGit, installDeps, projectType } = projectInfo;

  const templateDir = process.argv[1].split("/dist")[0] + "/template";

  const projectPath = `${process.cwd()}/${projectSlug}`;

  const createGenericProject = async () => {
    mkdir(projectPath);
    copyFilesFromTemplate(templateDir, projectPath);
    copyDirsFromTemplate(templateDir, projectPath);
    mkdir(`${projectPath}/.github/workflows`);

    copyFilesFromTemplate(
      `${templateDir}/.github/workflows`,
      `${projectPath}/.github/workflows`,
    );

    createEmptyFile(`${projectPath}/src`, ".keep");

    const pkgJSON = JSON.parse(
      fs.readFileSync(`${projectPath}/package.json`, "utf8"),
    );

    pkgJSON.name = projectSlug;

    fs.writeFileSync(
      `${projectPath}/package.json`,
      JSON.stringify(pkgJSON, null, 2),
    );

    if (initializeGit) {
      executeCommand("git init", projectPath);
    }

    // install dependencies
    if (installDeps) {
      executeCommand("pnpm install --no-cache", projectPath);
    }
  };

  if (projectType === "generic") {
    await logger(createGenericProject(), "Creating generic project");
  }
}
