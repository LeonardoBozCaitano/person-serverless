import { InvalidPerson } from "../exceptions/InvalidPerson";

export class Person {
    id: string;
    name: string;
    email: string;
    cpf: string;
    birthDate: Date;
    contactNumber: String;
    adress: Adress;
    status: Status;
    message: string;

    constructor(id: string, name: string, email: string, cpf: string, 
            birthDate: Date, contactNumber: string, city: string, street: string, 
            number: string, cep: string, status = Status.Processing, message = "") {
        if (!id) {
            this.id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 30);
        } else {
            this.id = id;
        }
        this.name = name;
        this.email = email;
        this.cpf = cpf;
        this.birthDate = birthDate;
        this.contactNumber = contactNumber
        this.adress = new Adress(city, street, number, cep);
        this.status = status;
        this.message = message;
        this.validate();
    }

    private validate(): void {
        const errors = [];
        
        if (this.cpf == null || this.cpf == "")
            errors.push("CPF Inválido")
        
        if (this.email == null || this.email == "")
            errors.push("Email inválido")
        
        if (errors.length > 0)
            throw new InvalidPerson(errors.toLocaleString());
            
    }

    setValidationResult(validateResultMessage: string) {
        if (validateResultMessage != ""){
            this.status = Status.Reproved;
            this.message = validateResultMessage;
        } else {
            this.status = Status.Approved;
            this.message = "Person aproved!";
        }
    }
    
}

export enum Status {
    Processing,
    Approved,
    Reproved
}

export class Adress {
    city: string;
    street: string;
    number: string;
    cep: string;
    constructor(city: string, street: string, number: string, cep: string) {
        this.city = city;
        this.street = street;
        this.number = number;
        this.cep = cep;
    }
}