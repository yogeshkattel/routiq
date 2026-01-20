import { Request } from 'express'
import { AfterWares, Body, Controller, HttpEnum, Method, Middleware, Query, Req } from 'routiq'
@Controller("/test")
export class Test {

    @Method({ method: HttpEnum.POST, path: "/halo" })
    @Middleware((req, res, next) => {
        console.log(req.headers)
        console.log("I am hitting a middleware")
        next()
    })
    @AfterWares((req, res, err) => {
        console.log("I am hitting a afterware")
        err("SOmething is worng")
        
    })
    async test(@Body() id: any, @Query() data: any, @Req() request: Request) {
        console.log("hello")
        await new Promise<void>((resolve, reject) => setTimeout(() => {
            resolve()
        }, 1000))

        return { "hello": "world" }
    }
}