class Password {
    constructor(private password: string) {

    }

    // Helpers
    public static validLength(password: string): boolean {
        return password.length >= 8;
    }

    public static async encrypt(password: string): Promise<string> {
        return await Bun.password.hash(password);
    }

    // Getters
    public async validate(userInput: string): Promise<boolean> {
        return await Bun.password.verify(userInput, this.password);
    }

    // Setters
    public async set(newPassword: string): void {
        this.password = await Password.encrypt(newPassword);
    }
}

export default Password;