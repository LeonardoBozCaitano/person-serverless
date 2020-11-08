export class Exception {
    constructor(code: number, status: string, message: string) {
        throw {
            code,
            status,
            message
        };
    }
};