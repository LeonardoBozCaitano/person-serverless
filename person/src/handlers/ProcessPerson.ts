import { Handler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { Person } from '../domain/Person';
import { ProcessPerson } from '../usecases/ProcessPerson';

export const processPerson: Handler = async function(event, _context, callback) {
    console.log("Iniciando processamento...");
    const useCase = new ProcessPerson();

    if (!event) {
        return callback(null, `Failed processing records. event is null.`);
    }
    if (!event.Records) {
        return callback(null, `Failed processing records. No records present.`);
    }

    if (event.eventName != 'INSERT') {
        return callback(null, `Just need to process the new records.`);
    }

    console.log("evento Ok!");
    event.Records.forEach(async (record) => {
        console.log("RECORD: ----- ");
        console.log(record);
        const newImage: DynamoDB.AttributeMap = record.dynamodb.NewImage;
        const person = new Person(
            record.dynamodb.Keys["id"]["S"],
            newImage["name"]["S"],
            newImage["email"]["S"],
            newImage["cpf"]["S"],
            newImage["birthDate"]["D"],
            newImage["contactNumber"]["S"],
            newImage["adress"]["M"]["city"]["S"],
            newImage["adress"]["M"]["street"]["S"],
            newImage["adress"]["M"]["number"]["S"],
            newImage["adress"]["M"]["cep"]["S"]
        );
        console.log("Executando PROCESSAMENTO DA PERSON:");
        console.log(person);
        await useCase.execute(person);
    });
    
    return {
        statusCode: 200,
        message: 'Successfully processed ${event.Records.length} records'
    }
}

