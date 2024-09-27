class Email {
    constructor(private email: string) {

    }

    // Getters
    public get(): string {
        return this.email;
    }

    // Setters
    public set(email: string) {
        const validEmail = this.validate();
        if(validEmail)
            this.email = email;
        else throw new Error('This email is invalid, please, review it.');
    }

    // Methods
    /**
     * Validates any string checking if it's an email
     * 
     * @param {string} email
     * @returns {boolean} True if string contains '@' and '.<something>'.
    */
    public validate(): boolean {
        const   regex = /^[^@]+@[^@]+\.[^@]+$/,
                result: boolean = regex.test(this.email);
        return  result;
    }

    public static toUnderscore(email: string): string {
        return email.replace(/[^a-zA-Z0-9]/g, '_');
    }
}

export default Email;