import { Name } from '../tinyTypes/Name';
import Phone from '../tinyTypes/Phone';
import Email from '../tinyTypes/Email';
import Note from '../tinyTypes/Note';
import Thumbnail from '../tinyTypes/Thumbnail';

abstract class Person {
    constructor(
        protected name: Name,
        protected phone: Phone,
        protected email: Email,
        protected thumbnail: Thumbnail,
        protected userNotes: Note[],
        protected admNotes: Note[]
    ) {

    }

    // Getters
    public getName = (): Name => this.name;
    public getPhone = (): Phone => this.phone;
    public getEmail = (): Email => this.email;
    public getThumbnail = (): Thumbnail => this.thumbnail;
    public getUserNotes = (): Note[] => this.userNotes;
    public getAdmNotes = (): Note[] => this.admNotes;

    // Setters
    public setName(names: string | string[]): void {
        if(Array.isArray(names))
            this.getName().set(names);
        else
            this.getName().add(names);
    }
    public setAlias(alias: string): void {
        this.getName().setAlias(alias);
    }
    public setEmail(email: string): void {
        this.getEmail().set(email);
    }
    public setThumbnail(thumbnailURL: string): void {
        this.getThumbnail().set(thumbnailURL);
    }
}

export default Person;