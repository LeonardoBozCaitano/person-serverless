import { DynamoDbPersonAdapter } from "../adapter/DynamoDbPersonAdapter";
import { Person, Status } from "../domain/Person";
import { PersonPort } from "../port/PersonPort";

export class ProcessPerson {

    private adapter: PersonPort;

    constructor(adapter = new DynamoDbPersonAdapter) {
        this.adapter = adapter;
    }

    async execute(person: Person): Promise<Person> {
        const validateMessage = await this.validatePerson(person);
        person.setValidationResult(validateMessage);
        
        return await this.adapter.save(person);
    }

    private async validatePerson(person: Person): Promise<string> {
        const validatePersonByCpf = await this.adapter.getByCpf(person.cpf);
        const validatePersonByEmail = await this.adapter.getByEmail(person.cpf);

        const validateMessage = "";
        if (validatePersonByCpf)
            validateMessage.concat("CPF Já existente; ");
            
        if (validatePersonByEmail)
            validateMessage.concat("Email Já existente; ");
        
        return validateMessage;
    }
}