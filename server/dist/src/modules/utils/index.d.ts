export declare function resBody(status: string, msg: string, data: any): {
    code: any;
    msg: string;
    data: any;
};
export declare function makeSalt(): string;
export declare function encryptPassword(password: string, salt: string): string;
