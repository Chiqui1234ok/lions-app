class Name {
    constructor(
        private names: string[],
        private alias: string
    ) {

    }

    // Getters
    public get(): string {
        let fullName: string = this.names[0];
        for(let i = 1;i < this.names.length;i++)
            fullName += ` ${this.names[i]}`;
        return fullName;
    }

    public findOne(query: typesOfNames) {
        return this.names[query];
    }

    public getOne(i: number) {
        if(i > this.names.length - 1)
            throw new Error('This index don\'t exists.');
        return this.names[i];
    }

    public getAlias(): string {
        return this.alias;
    }

    // Setters
    public set(data: string[]): string[] {
        this.names = data;
        return this.names;
    }

    public add(data: string): string {
        const i = this.names.length;
        this.names.push(data);
        return this.names[i];
    }

    public setAlias(alias: string): string {
        this.alias = alias;
        return this.alias;
    }
}

enum typesOfNames {
    firstName = 0,
    secondName,
    lastName
};

export { Name, typesOfNames };