import  {Controller, Method} from 'routiq'
@Controller("/test")
export class Test {

    @Method("/test")
    test() {
        return {"hello": "world"}
    }
}