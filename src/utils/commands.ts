import { program } from "commander";

export const cli = program
  .version("0.0.1")
  .option("-i, --init", "Initialize a new project")
  .option("-g, --generate <type>", "Generate a new file")
  .option("-d, --destroy <type>", "Destroy a file")
  .parse(process.argv);
