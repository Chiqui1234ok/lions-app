import { Name } from '../tinyTypes/Name';
import Phone from '../tinyTypes/Phone';
import Email from '../tinyTypes/Email';
import Note from '../tinyTypes/Note';
import Password from '../tinyTypes/Password';
import { Roles } from '../tinyTypes/Roles';
import Person from '../Person/Person';
import Thumbnail from '../tinyTypes/Thumbnail';

abstract class Client extends Person {
    constructor(
        protected name: Name,
        protected phone: Phone,
        protected email: Email,
        protected password: Password,
        protected thumbnail: Thumbnail,
        protected userNotes: Note[],
        protected admNotes: Note[],
        protected roles: Roles
    ) {
        super(name, phone, email, thumbnail, userNotes, admNotes);
    }

    // Getters
    public getPassword = (): Password => this.password;
    public getRoles = (): Roles => this.roles;

    // Setters
    public setName(names: string[]): void {
        this.getName().set(names);
    }
    public addName(name: string): void {
        this.getName().add(name);
    }
    public setAlias(alias: string): void {
        this.getName().setAlias(alias);
    }
    public setEmail(email: string): void {
        this.getEmail().set(email);
    }
    public setPassword(password: string): void {
        this.getPassword().set(password);
    }
    public setThumbnail(thumbnailURL: string): void {
        this.getThumbnail().set(thumbnailURL);
    }
    public setUserNotes(notes: Note[]): void {
        this.getUserNotes().push(notes);
    }
    public setAdmNotes(notes: Note[]): void {
        this.getAdmNotes().set(notes);
    }
}

export default Client;