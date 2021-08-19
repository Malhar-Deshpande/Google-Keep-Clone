import app from "./app";
import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("In server.ts");
  console.log(`user server started at ${PORT}`);
});
