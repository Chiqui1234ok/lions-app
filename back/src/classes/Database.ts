import { BaseUser } from "../interfaces/BaseUser";
import DbPreparationEditedFiles from "../interfaces/DbPreparationEditedFiles";
import DbPreparationFiles from "../interfaces/DbPreparationFiles";

class Database {
    private updateTextFile(text: string, search: string[], replace: string[]): string {
        
        return result;
    }

    public async registerDatabase(user: BaseUser) {
        // If the user exists
        if(user && user._id) {
            /**
             *  Get example files for: .env, Dockerfile and docker-compose
             */
            let templateFiles: DbPreparationFiles = {
                envFile: Bun.file(`${Bun.env.DEV_PREPARATION_FOLDER}.env`),
                dockerFile: Bun.file(`${Bun.env.DEV_PREPARATION_FOLDER}Dockerfile`),
                dockerCompose: Bun.file(`${Bun.env.DEV_PREPARATION_FOLDER}docker-compose.yml`)
            },
            // Get keys of DbPreparationFiles so I can iterate it
            templateKeys: string[] = Object.keys(templateFiles) as Array<keyof DbPreparationFiles>,
            editedFiles: DbPreparationEditedFiles = {envFile: '', dockerFile: '', dockerCompose: ''},
            i = 0;
            
            // Check if all files exists
            while(i < templateKeys.length) {
                const key = templateKeys[i] as keyof DbPreparationFiles;
                if(!templateFiles[key].exists() || await templateFiles[key].text() === '')
                    throw new Error(`${key} doesn't exist or is un-readeable.`);
                i++;
            }
            
            /**
             * I'll search for string in template files and replace them for real values
             * dockerServiceName serves as docker hostname for MongoDB
             * Note: I'm using user's email as root user and db password
             */
            const dockerServiceName = `${user.email}_mongodb_lions_app`;
            const search = {
                envFile: [
                    `DEV_MONGODB_ROOT_USER=`,
                    `DEV_MONGODB_ROOT_PASSWORD=`,
                    `DEV_MONGODB_DATABASE_NAME=`,
                    `DEV_MONGODB_URL=`
                ],
                dockerFile: [],
                dockerCompose: []
            },
            replace = {
                envFile: [
                    `DEV_MONGODB_ROOT_USER=${user.email}`,
                    `DEV_MONGODB_ROOT_PASSWORD=${Bun.env.DEV_MONGODB_ROOT_PASSWORD}`,
                    `DEV_MONGODB_DATABASE_NAME=${user.email}`,
                    `DEV_MONGODB_URL=mongodb://\${DEV_MONGODB_ROOT_USER}:\${DEV_MONGODB_ROOT_PASSWORD}@${dockerServiceName}:27017/${user.email}?authSource=admin`
                ],
                dockerFile: [],
                dockerCompose: []
            };
            while(i < templateKeys.length) {
                const key = templateKeys[i] as keyof DbPreparationFiles;
                editedFiles[key] = this.updateTextFile(await templateFiles.envFile.text(), search[key], replace[key]);
                i++;
            }

            
                    
        }
    }
}

export default Database;