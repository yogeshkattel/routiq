import { CreateServer } from "routiq"


const server = CreateServer({
    port: 8000, controllerOptions: { autoDiscoverRoutes: true, controllerPath: "./controller" }, callbackFunc: () => {
        console.log("The server is up and runniung")
    }
})