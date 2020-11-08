import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { GetPersonById } from '../usecases/GetPersonById';

export const getPersonById: APIGatewayProxyHandler = async function(event, _context) {
    console.log("iniciando lambda");
    const personId = event.pathParameters['id'];
    
    const useCase = new GetPersonById();
    return {
        'statusCode': 200,
        'body': JSON.stringify(await useCase.execute(personId))
    }
}