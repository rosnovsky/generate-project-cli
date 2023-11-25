import { exec } from "child_process";
import progressEstimator from "progress-estimator";

export const logger = progressEstimator();

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
