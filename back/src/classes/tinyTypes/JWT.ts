import { sign, verify } from "hono/jwt";
import { Roles } from "./Roles";
import Email from "./Email";

class JWT {
    private token: string = '';

    constructor(private email: Email, private role: Roles, private expiration: number) {}

    // Getters
    public get(): string {
        return this.token;
    }
    
    // Setter
    public async set(): Promise<void> {
        this.token = await this.createToken();
    }

    // Methods
    public async createToken(): Promise<string> {
        if(this.email === undefined || this.email.validate())
            throw new Error('Invalid email.');
        if(this.role === undefined)
            throw new Error('Invalid password.');
        if(this.expiration === undefined)
            throw new Error('Please, send a valid user data. Try to login again.');
        if(Bun.env.DEV_JWT_SECRET === undefined)
            throw new Error('Login service isn\'t working right now. Please, try in a few minutes.');
        
        const tokenData = {
            sub: this.email.get(),
            role: this.role,
            exp: this.expiration,
            // Math.floor(Date.now() / 1000) * 60 * 300, // Token expires in 300 minutes (5 hours)
        };
        const token = await sign(tokenData, Bun.env.DEV_JWT_SECRET);
        
        return token;
    }

    /**
     * Validates a JSON Web Token (JWT).
     * 
     * @param {string} token - The JSON Web Token to validate.
     * @returns {boolean} True if the JWT is valid, otherwise false.
     */
    public async validateJWT(): Promise<boolean> {
        const secret = Bun.env.DEV_JWT_SECRET;
        let jwt: boolean = false;
        if(secret === undefined)
            throw new Error('Can\'t hash JWT key. Notify this urgently to the administrators.');
        if(this.token === undefined)
            this.token = await this.createToken();

        const splittedAuthorizationString = this.token.split('Bearer ');
        jwt = await verify(splittedAuthorizationString[1], secret) ? true : false;
        return jwt;
        // 👆 Check what returns verify() in all cases. Maybe this condition isn't efective.
    }
}

export default JWT;