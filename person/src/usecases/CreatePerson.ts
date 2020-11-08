import { DynamoDbPersonAdapter } from "../adapter/DynamoDbPersonAdapter";
import { Person } from "../domain/Person";
import { PersonPort } from "../port/PersonPort";

export class CreatePerson {

    private adapter: PersonPort;

    constructor(adapter = new DynamoDbPersonAdapter) {
        this.adapter = adapter;
    }

    async execute(person: Person): Promise<Person> {
        return await this.adapter.save(person);
    }
}