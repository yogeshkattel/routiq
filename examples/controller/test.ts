import { Request } from 'express'
import { Body, Controller, HttpEnum, Method, Query, Req } from 'routiq'
@Controller("/test")
export class Test {

    @Method({ method: HttpEnum.POST, path: "/halo" })
    test(@Body() id: any, @Query() data: any, @Req() request: Request) {
        console.log(id)
        console.log(data.test)
        console.log(request)

        return { "hello": "world" }
    }
}