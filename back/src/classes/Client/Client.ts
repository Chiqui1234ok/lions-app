import { Name } from '../tinyTypes/Name';
import Phone from '../tinyTypes/Phone';
import Email from '../tinyTypes/Email';
import Note from '../tinyTypes/Note';
import Password from '../tinyTypes/Password';
import { Role } from '../tinyTypes/Role';
import Person from '../Person/Person';

abstract class Client extends Person {
    constructor(
        protected name: Name,
        protected phone: Phone,
        protected email: Email,
        protected password: Password,
        protected thumbnail: string,
        protected userNotes: Note[],
        protected admNotes: Note[],
        protected roles: Role[]
    ) {
        super(name, phone, email, thumbnail, userNotes, admNotes);
    }
}

export default Client;