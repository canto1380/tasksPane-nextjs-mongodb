import { connect, connection } from "mongoose";

const conn = {
  isConnected: false,
};

export const dbConnect = async () => {
  if (conn.isConnected) return;

  const db = await connect(process.env.MONGODB_URL);
  conn.isConnected = db.connections[0].readyState;
  // DB a la qe estoy conectado
  // console.log(db.connection.db.databaseName)
};

connection.on("connected", () => {
  console.log("MongoDB is connected");
});

connection.on("error", (err) => {
  console.log(err);
});
