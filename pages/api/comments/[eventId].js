import { MongoClient } from "mongodb";

async function handler(req, res) {
  const eventId = req.query.eventId;
  const client = await MongoClient.connect(process.env.MONGO_URL_EVENTS);
  
  if (req.method === "POST") {
    console.log('rodei post');
    const { email, name, text } = req.body;
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }
    const newComment = {
      email,
      name,
      text,
      eventId
    };
    console.log(newComment);
    const db = client.db();
    const result = await db.collection('comments').insertOne(newComment);
    console.log(result);
    newComment.id = result.insertedId;
    res.status(201).json({ message: "Added comment. ", comment: newComment });
  }

  if (req.method === "GET") {
    const db = client.db();
    const documents = await db.collection('comments').find({ eventId: eventId}).sort({_id: -1}).toArray();
    res.status(200).json({ comments: documents });
  }
  client.close();
}

export default handler;
