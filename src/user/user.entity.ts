import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { IsCheckUsername } from "./validator/checkUsername";

export class UserEntity{
    
    id: number;

    @IsNotEmpty({
        message: 'Nome do usuário é obrigatório.'
    })
    @IsString()
    @IsCheckUsername({
        message:'Usuário já cadastrado'
    })
    userName: string;

    
    @IsEmail({}, {
        message: 'Email inválido!'
     })
    email: string;

    @Exclude({
        toPlainOnly: true
    })
    @IsNotEmpty({
        message: 'senha é obrigatório.'
    })
    password: string;
    
    @IsNotEmpty({
        message: 'nomeCompleto é obrigatório.'
    })
    fullName: string;

    createAt: Date;
}