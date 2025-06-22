import {app} from "./app.ts"
import dotenv from "dotenv"

dotenv.config({
    path:"./.env"
})


const PORT = process.env.PORT || 5001

    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`)
    })