class Note {
    constructor(
        private tags: string[],
        private body: string,
        private timestamp: Date
    ) {}

    public static validate(note: Note) {
        return true;
    }

    // Setters
    public set(tags: string[], body: string) {
        this.tags = tags;
        this.body = body;
        this.timestamp = new Date();
    }

    // Getters
    public get(): Note {
        return this;
    }
}

export default Note;