class Email {
    constructor(private email: string) {

    }

    /**
     * Validates any string checking if it's an email
     * 
     * @param {string} email
     * @returns {boolean} True if string contains '@' and '.<something>'.
    */
    public static validate(email: string): boolean {
        const   regex = /^[^@]+@[^@]+\.[^@]+$/,
                result: boolean = regex.test(email);
        return  result;
    }

    public static toUnderscore(email: string): string {
        return email.replace(/[^a-zA-Z0-9]/g, '_');
    }

    // Getters
    public getEmail(): string {
        return this.email;
    }

    // Setters
    public set(email: string) {
        const validEmail = Email.validate(email);
        if(validEmail)
            this.email = email;
        else throw new Error('This email is invalid, please, review it.');
    }
}

export default Email;