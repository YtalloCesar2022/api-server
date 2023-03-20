import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get(':userName')
    public searchForId(@Param('userName') userName: string) {
        const userFound = this.userService.searchForId(userName)
        return userFound;
    }

    @Post()
    public create(@Body() user: UserEntity): UserEntity {
        const createdUser = this.userService.create(user)
        return createdUser;
    }
}