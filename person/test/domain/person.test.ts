import { Person, Status } from "../../src/domain/Person";

test('New complete Person', () => {
    const name = "Leonardo";
    const email = "leonardoboz@gmail.com";
    const cpf = "123.456.678-10";
    const birthDate = new Date("01-01-2020");
    const contactNumber = "9999-1515";
    const city = "Blumenau";
    const street = "vila germanica";
    const number = "7546";
    const cep = "156458-48";
    const status = Status.Processing;
    const message = "";

    const output = new Person(null, name, email, cpf, birthDate, contactNumber, city, street, number, cep);

    expect(output.id).toBeTruthy;
    expect(output.email).toBe(email);
    expect(output.cpf).toBe(cpf);
    expect(output.birthDate).toBe(birthDate);
    expect(output.contactNumber).toBe(contactNumber);
    expect(output.status).toBe(status);
    expect(output.message).toBe(message);
    expect(output.adress.city).toBe(city);
    expect(output.adress.street).toBe(street);
    expect(output.adress.number).toBe(number);
    expect(output.adress.cep).toBe(cep);
});

test('Person without CPF validation', () => {
    const name = "Leonardo";
    const email = "leonardoboz@gmail.com";
    const birthDate = new Date("01-01-2020");
    const contactNumber = "9999-1515";
    const city = "Blumenau";
    const street = "vila germanica";
    const number = "7546";
    const cep = "156458-48";

    try {
        new Person(null, name, email, null, birthDate, contactNumber, city, street, number, cep);
    } catch (err) {
        expect(err.code).toBe(403);
        expect(err.status).toBe("BAD_REQUEST");
        expect(err.message).toBe("CPF Inválido");
    }
});
