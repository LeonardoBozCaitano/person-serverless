import { DynamoDbPersonAdapter } from "../adapter/DynamoDbPersonAdapter";
import { Person } from "../domain/Person";
import { EntityNotFound } from "../exceptions/EntityNotFound";
import { PersonPort } from "../port/PersonPort";

export class GetPersonById {

    private adapter: PersonPort;

    constructor(adapter = new DynamoDbPersonAdapter) {
        this.adapter = adapter;
    }

    async execute(personId: string): Promise<Person> {
        const person: Person = await this.adapter.getByIdOrFail(personId);
        if (!person) {
            throw new EntityNotFound;
        }
        return person;
    }
}