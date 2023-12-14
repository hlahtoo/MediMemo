import { MongoClient } from "mongodb";
import "dotenv/config";
import bcrypt from "bcrypt";

function MyMongoDB() {
  const myDB = {};

  const uri = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );

  async function connect() {
    try {
      const client = new MongoClient(uri);
      await client.connect(); // Try to connect to MongoDB
      console.log("Successfully connected to MongoDB"); // Log on successful connection
      const db = client.db("users");
      return { client, db };
    } catch (e) {
      console.error("Failed to connect to MongoDB", e); // Log any errors during connection
      throw e; // Re-throw the error to handle it in the calling function
    }
  }

  myDB.insertNewUser = async (newUser) => {
    const { client, db } = await connect();
    try {
      console.log("connected to MongoDB");
      const hashedPassword = await bcrypt.hash(newUser.password, 10);
      const result = await db.collection("doctoraccounts").insertOne({
        email: newUser.email,
        password: hashedPassword,
      }); //inserts a single document into the collection
      console.log(
        `New Profile created with the following id: ${result.insertedId}`
      );
      return true;
    } catch (error) {
      console.error("Sign up error:", error.message);
      return false;
    } finally {
      await client.close();
    }
  };

  myDB.authenticateUsers = async (account) => {
    const { client, db } = await connect();
    try {
      console.log("connected to MongoDB");
      if (!account.email || !account.password) {
        throw new Error("Both email and password fields are required");
      }
      console.log(account);
      const verifiedUser = await db.collection("doctoraccounts").findOne({
        email: account.email,
      });
      console.log(verifiedUser);
      if (
        verifiedUser &&
        (await bcrypt.compare(account.password, verifiedUser.password))
      ) {
        console.log("Authentication Successful");
        return true;
      } else {
        console.log("Authentication Failed");
        return false;
      }
    } catch (err) {
      console.log(err.message);
      return false;
    } finally {
      await client.close();
    }
  };

  return myDB;
}

// since this is an instance of the function MyMongoDB
const myDBInstance = MyMongoDB();

export default myDBInstance;

// Didn't implement passport.js for user authentication
