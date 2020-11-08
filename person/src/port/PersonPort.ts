import { Person } from "../domain/Person";


export interface PersonPort {
    save(person: Person): Promise<Person>;
    getByIdOrFail(id: string): Promise<Person>;
    getByCpf(cpf: string): Promise<Person>;
    getByEmail(email: string): Promise<Person>;
}