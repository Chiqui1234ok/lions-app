class Phone {
    constructor(
        private country: string,
        private number: string
    ) {

    }

    // Getters
    public get(): string {
        return `${this.country} ${this.number}`;
    }

    // Setters
    public set(country: string, number: string): string {
        if(country === undefined || number === undefined)
            throw new Error('Number and/or his country is undefined. Please, send us both values.');
        
        this.country = country;
        this.number = number;
        return `${country} ${number}`;
    }

    // Helpers
}

export default Phone