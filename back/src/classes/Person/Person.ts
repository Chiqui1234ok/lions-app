import { Name } from '../tinyTypes/Name';
import Phone from '../tinyTypes/Phone';
import Email from '../tinyTypes/Email';
import Note from '../tinyTypes/Note';

abstract class Person {
    constructor(
        protected name: Name,
        protected phone: Phone,
        protected email: Email,
        protected thumbnail: string,
        protected userNotes: Note[],
        protected admNotes: Note[]
    ) {

    }

    // Getters
    public getName = (): Name => this.name;
    public getPhone = (): Phone => this.phone;
    public getEmail = (): Email => this.email;
    public getThumbnail = (): string => this.thumbnail;
    public getUserNotes = (): Note[] => this.userNotes;
    public getAdmNotes = (): Note[] => this.admNotes;
}

export default Person;