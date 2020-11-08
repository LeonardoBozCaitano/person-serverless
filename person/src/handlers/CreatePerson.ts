import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { Person } from '../domain/Person';
import { CreatePerson } from '../usecases/CreatePerson';

export const createPerson: APIGatewayProxyHandler = async function(event, _context) {
    const input = JSON.parse(event.body);
    const person = new Person(
        null, 
        input.name, 
        input.email, 
        input.cpf, 
        new Date(input.date), 
        input.contactNumber, 
        input.city, 
        input.street, 
        input.number, 
        input.cep);

    const useCase = new CreatePerson();
    return {
        'statusCode': 200,
        'body': JSON.stringify(await useCase.execute(person))
    }
}