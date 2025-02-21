import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "./constant";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret!,
        });;
    }

    // TODO: types
    async validate(payload: any) {
        const user = await this.usersService.findOne(payload.sub);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordHash, ...rest } = user;
        return rest;
    }
}