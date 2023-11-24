import { generateProject } from "./utils/generate.js";
import { init } from "./utils/init.js";
import { userPrompts } from "./utils/prompts.js";

async function main() {
  init();

  const projectInfo = await userPrompts();

  generateProject(projectInfo);
}

main();
