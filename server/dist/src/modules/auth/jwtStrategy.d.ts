import { User } from 'src/entity/userEntity';
import { Repository } from 'typeorm';
export declare const jwtConstants: {
    secret: string;
};
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    validate(payload: User): Promise<false | {
        username: string;
        password: string;
    }>;
}
export {};
