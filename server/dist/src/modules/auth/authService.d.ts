import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from 'src/entity/userEntity';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<{
        code: number;
        user: User;
    }>;
    certificate(user: any): Promise<{
        code: any;
        msg: string;
        data: any;
    }>;
}
