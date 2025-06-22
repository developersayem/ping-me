import {app} from "./app.ts"
import dotenv from "dotenv"
import connectDB from "./db/index.ts"

dotenv.config({
    path:"./.env"
})


const PORT = process.env.PORT || 5001

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`\n✅ Server is running on port ${PORT}`);
    });
})
.catch((error) => {
    console.error("❌ Failed to connect to the database:", error);
    process.exit(1); // Exit the process with failure
}
);