import dotenv from "dotenv";
import connectDatabase from "./config/db.js";
import { app } from "./app.js";
dotenv.config({
    path: "./.env"
})

app.get('/', (req, res) => {
  res.send('Hello World');
});

connectDatabase()
.then(() => {
    app.listen(process.env.PORT || 4000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err)
})
