import prompts from "prompts";
import { PromptType } from "prompts";

export type Prompt = prompts.PromptObject<string> & {
  type: PromptType;
  name: string;
  message: string;
  initial?: string;
  validate?: (value: string) => boolean | string;
  choices?: prompts.Choice[];
};

export type ProjectInfo = {
  projectType: string;
  projectName: string;
  projectSlug: string;
  initializeGit: boolean;
  installDeps: boolean;
};
