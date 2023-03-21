import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { IsCheckUsernameonstraint } from "./validator/checkUsername";

@Module({
    controllers: [UserController],
    providers: [
        UserService,
        IsCheckUsernameonstraint,
    ],
})
export class UserModule{

}