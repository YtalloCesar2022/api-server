import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post } from "@nestjs/common";
import { NestResponse } from "../core/http/nest-response";
import { NestResponseBuilder } from "../core/http/nest-response-builder";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get(':userName')
    public searchForId(@Param('userName') userName: string) {
        const userFound = this.userService.searchForId(userName)

        if (!userFound) {
            throw new NotFoundException({
                statusCode: HttpStatus.NOT_FOUND,
                message: 'Usuário não encontrado'
            });
        }

        return userFound;
    }

    @Post()
    public create(@Body() user: UserEntity): NestResponse {
        const createdUser = this.userService.create(user)
        return new NestResponseBuilder()
            .status(HttpStatus.CREATED)
            .headers({
                'Location': `/users/${createdUser.userName}`
            })
            .body(createdUser)
            .build();


    }
}