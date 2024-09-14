class Role {
    constructor(private role: Map<string, number> = new Map()) {
        this.role.set('profile', 1);
    }

    // Getter
    getOne(query: string): number {
        return this.role.get(query) ?? 0;
    }

    // Setter
    set(data: RoleQuery): boolean {
        if(data.key === undefined) throw new Error('Can\'t set a role without a key');
        if(data.value === undefined || isNaN(data.value)) throw new Error('Can\'t set a role without a numeric value');

        this.role.set(data.key, data.value);
        return true;
    }
}

interface RoleQuery {
    key: string,
    value: number
};