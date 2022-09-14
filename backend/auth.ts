import { Request, Response } from 'express'
import { User, users } from './users'
import * as jwt from 'jsonwebtoken'
const apiConfig = require('./api-config')

export const handleAuthentication = (req: Request, resp: Response) => {
    const user = req.body
    if(isValid(user)){
        const dbUser = users[user.email]
        const token = jwt.sign({sub: dbUser.email, iss: 'meap-app'}, apiConfig.secret)
        resp.json({name: dbUser.name, email: dbUser.email, accessToken: token})
    }else{
        resp.status(403).json({message: 'Dados inválidos.'})
    }
}


function isValid(user: User): boolean {
    if(!user){
        return false
    }

    const dbUser = users[user.email]
    return dbUser !== undefined && dbUser.matches(user)
}