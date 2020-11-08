import { Exception } from "./Exception";

export class EntityNotFound extends Exception {    
    constructor() {
        super(404, "NOT_FOUND", "Entity not found");
    }
}