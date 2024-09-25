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

    // Setters
    public set(data: string[]): void {
        this.names = data;
    }

    public add(data: string): void {
        this.names.push(data);
    }

    public setAlias(alias: string): void {
        this.alias = alias;
    }
}

enum typesOfNames {
    firstName = 0,
    secondName,
    lastName
};

export { Name, typesOfNames };