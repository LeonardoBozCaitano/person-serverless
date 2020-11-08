# Person Serverless API.
Projeto para salvar e processar dados referentes a pessoa.

### Classes
- person
- - id: UUID
- - name: String
- - email: String
- - cpf: String
- - birthDate: Date
- - contactNumber: String
- - Address: 
- - - city: String
- - - street: String
- - - cep: String
- - - number: String
- - status: Enum Status
- - message: String

- Status
- - processing - Aguardando processamento
- - approved - Cadastro aprovado
- - refused - Cadastro recusado

### Eventos
- POST /person
    - input: JSON da pessoa a ser salva.
    - output: Entidade da pessoa salva
    
- GET /person: id
    - input: Id da pessoa
    - output: Entidade da pessoa salva

- DynamoDbStream /person/process
    - input: registro novo de pessoa na base

### Validações para a aprovação da pessoa
- Não pode haver uma pessoa cadastrada na base com o mesmo cpf.
- Não pode haver uma pessoa cadastrada na base com o mesmo numero de contato.
- Não pode haver uma pessoa cadastrada na base com o mesmo email.
