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
    //

    // Getters
    //
}

export default Note;