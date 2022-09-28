import mongoose from "mongoose";

const mongooseConfig = (url: string) => {
  mongoose.connect(url);
  mongoose.connection.on("error", (error) => console.log(`Error on db connection: ${error}`));
  mongoose.connection.once("connected", () => console.log("Connected to db"));
}

export default mongooseConfig;
