class Password {
    readonly minChars = 8;

    constructor(private password: string) {

    }

    // Helpers
    public static async encrypt(password: string): Promise<string> {
        return await Bun.password.hash(password);
    }

    // Getters
    public async validate(userInput: string): Promise<boolean> {
        return this.password.length >= this.minChars && await Bun.password.verify(userInput, this.password);
    }

    // Setters
    public async set(newPassword: string): Promise<void> {
        if(!await this.validate(newPassword))
            throw new Error(`Password must be ${this.minChars} characters or more. If you're already registered, probably you entered wrong password.`);
        this.password = await Password.encrypt(newPassword);
    }
}

export default Password;