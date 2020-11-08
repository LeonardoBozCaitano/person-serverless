import { Exception } from "./Exception";

export class InvalidPerson extends Exception {

    constructor(message: string) {
        super(403, "BAD_REQUEST", message);
    }
}