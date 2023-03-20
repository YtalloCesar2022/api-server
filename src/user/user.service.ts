import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserService {

    //private users = [];
    private users: Array<UserEntity> = [{
        id: 1,
        userName: 'ytallo',
        email: 'ytallo@teddy.com',
        password: '123asd456',
        fullName: 'Ytallo César',
        createAt: new Date(),
    }];


    public create(user: UserEntity): UserEntity {
        this.users.push(user);
        return user;
    }

    
    public searchForId(userName: string): UserEntity {
        return this.users.find(user => user.userName == userName);
    }
}