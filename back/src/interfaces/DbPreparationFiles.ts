import { BunFile } from "bun";

interface DbPreparationFiles {
    envFile: BunFile;
    dockerFile: BunFile;
    dockerCompose: BunFile;
}

export default DbPreparationFiles;