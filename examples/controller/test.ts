import  {Controller, HttpEnum, Method} from 'routiq'
@Controller("/test")
export class Test {

    @Method({method: HttpEnum.POST, path: "/halo"})
    test() {
        return {"hello": "world"}
    }
}