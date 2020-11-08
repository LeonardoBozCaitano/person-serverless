import { DynamoDbPersonAdapter } from "../../src/adapter/DynamoDbPersonAdapter";
import { Person } from "../../src/domain/Person";
import { GetPersonById } from "../../src/usecases/GetPersonById";
import { mock, instance, when, verify } from 'ts-mockito';

test('Use case sucess', async () => {
    const dynamoDbPersonAdapterMock = mock(DynamoDbPersonAdapter);
    const useCase = new GetPersonById(instance(dynamoDbPersonAdapterMock));
    const inputId = "123";

    const expectedOutput = new Person("id1", "Leonardo", "teste@gmail.com", "123", new Date("01-01-2020"), "123", "123", "123", "123", "123", 0, "aa");

    when(dynamoDbPersonAdapterMock.getByIdOrFail(inputId)).thenResolve(expectedOutput);

    const output = await useCase.execute(inputId);

    expect(output).toBe(expectedOutput);
    verify(dynamoDbPersonAdapterMock.getByIdOrFail(inputId)).called()
});

test('Use case should throw exception', async () => {
    const dynamoDbPersonAdapterMock = mock(DynamoDbPersonAdapter);
    const useCase = new GetPersonById(instance(dynamoDbPersonAdapterMock));
    const inputId = "123";

    when(dynamoDbPersonAdapterMock.getByIdOrFail(inputId)).thenResolve(null);

    try {
        expect(await useCase.execute(inputId)).rejects.toThrow();
    } catch (err) {
        expect(err.message).toBe("Entity not found");
    }

    verify(dynamoDbPersonAdapterMock.getByIdOrFail(inputId)).called();
});


