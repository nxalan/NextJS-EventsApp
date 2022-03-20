import { MongoClient } from "mongodb";

async function handler(req, rest) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      rest.status(422).json({ message: "Invalid email address." });
      return;
    }
    const client = await MongoClient.connect(process.env.MONGO_URL_EVENTS);
    const db = client.db();
    await db.collection("newsletter").insertOne({ email: userEmail });
    client.close();
    rest.status(201).json({ message: "Sign up!" });
  }
}

export default handler;
