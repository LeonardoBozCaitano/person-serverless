import { Person } from "../domain/Person";
import { PersonPort } from "../port/PersonPort";
import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { EntityNotFound } from "../exceptions/EntityNotFound";
export class DynamoDbPersonAdapter implements PersonPort {

    private dynamoDb: DocumentClient;

    constructor(dynamoDb = new DocumentClient({region: 'sa-east-1'})) {
        this.dynamoDb = dynamoDb;
    }

    async save(person: Person): Promise<Person> {
        const params: DynamoDB.DocumentClient.PutItemInput = { 
            TableName: 'person',
            Item: person
        };

        const response: DocumentClient.PutItemOutput = await this.dynamoDb.put(params).promise();
        return this.responseItemToPerson(response.Attributes);
    }

    async getByIdOrFail(id: string): Promise<Person> {
        const params: DynamoDB.DocumentClient.GetItemInput = { 
            TableName: 'person',
            Key: { id }
        };

        const response: DocumentClient.GetItemOutput = await this.dynamoDb.get(params).promise();
        
        if (!response || !response.Item) {
            throw null; 
        } else {
            return this.responseItemToPerson(response.Item);
        }
    }

    private responseItemToPerson(responseItem): Person {
        return new Person(
            responseItem.id,
            responseItem.name, 
            responseItem.email, 
            responseItem.cpf, 
            responseItem.birthDate, 
            responseItem.contactNumber, 
            responseItem.city, 
            responseItem.street, 
            responseItem.number, 
            responseItem.cep, 
            responseItem.status, 
            responseItem.message
            );
    }

    async getByCpf(cpf: string): Promise<Person> {
        const params: DynamoDB.DocumentClient.GetItemInput = { 
            TableName: 'person',
            Key: { 
                'cpf': {
                    "S": cpf
                }
             }
        };

        const response: DocumentClient.GetItemOutput = await this.dynamoDb.get(params).promise();
        
        if (!response || !response.Item) {
            throw new EntityNotFound();
        }

        return this.responseItemToPerson(response.Item);
    }

    async getByEmail(email: string): Promise<Person> {
        const params: DynamoDB.DocumentClient.GetItemInput = { 
            TableName: 'person',
            Key: { 
                'email': {
                    "S": email
                }
             }
        };

        const response: DocumentClient.GetItemOutput = await this.dynamoDb.get(params).promise();
        
        if (!response || !response.Item) {
            return null;
        } else {
            return this.responseItemToPerson(response.Item);
        }        
    }
}