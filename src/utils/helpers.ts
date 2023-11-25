import { exec } from "child_process";
import fs from "node:fs";
import progressEstimator from "progress-estimator";

/**
 * Progress indicator for long-running commands.
 */
export const logger = progressEstimator();

/**
 * Executes a command in the terminal and returns a promise.
 * @returns {Promise} - The promise of the command
 * @param {string} command - The command to execute
 * @param {string} cwd - The current working directory
 */
export function executeCommand(command: string, cwd: string): Promise<any> {
  return new Promise((resolve, reject) => {
    exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr });
      } else {
        resolve(stdout);
      }
    });
  });
}

/**
 * Creates a directory at the given path
 * @param {string} projectPath - The path of the project
 */
export const mkdir = (projectPath: string) => {
  try {
    fs.mkdirSync(projectPath);
  } catch (err) {
    console.error("Failed to create project directory", err);
    process.exit(1);
  }
};

/**
 * Copies files from the template directory to the project directory.
 * @param {string} templateDir - The path of the template directory
 * @param {string} projectPath - The path of the project directory
 */
export const copyFilesFromTemplate = (
  templateDir: string,
  projectPath: string,
) => {
  try {
    fs.readdirSync(templateDir).forEach((file) => {
      if (!fs.lstatSync(`${templateDir}/${file}`).isDirectory()) {
        fs.copyFileSync(`${templateDir}/${file}`, `${projectPath}/${file}`);
      }
    });
  } catch (err) {
    console.error("Failed to copy template files", err);
    process.exit(1);
  }
};

/**
 * Copies directories from the template directory to the project directory.
 * @param {string} templateDir - The path of the template directory
 * @param {string} projectPath - The path of the project directory
 */
export const copyDirsFromTemplate = (
  templateDir: string,
  projectPath: string,
) => {
  fs.readdirSync(templateDir).forEach((file) => {
    if (fs.lstatSync(`${templateDir}/${file}`).isDirectory()) {
      fs.mkdirSync(`${projectPath}/${file}`);
    }
  });
};

export const createEmptyFile = (projectPath: string, fileName: string) => {
  fs.writeFileSync(`${projectPath}/${fileName}`, "");
};
