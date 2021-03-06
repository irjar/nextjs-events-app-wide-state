import { connectDatabase, insertDocument } from "../../helpers/db-util";

async function handler(req, res) {
  // extract the user email address from the incoming request
  if (req.method === "POST") {
    const userEmail = req.body.email;

    // basic validation of the email address on the server side
    if (!userEmail) {
      res.status(422).json({ message: "No email address." });
      return;
    }
    if (!userEmail.includes("@")) {
      res.status(422).json({ message: "Imvalid email address." });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed" });
      return;
    }

    try {
      await insertDocument(client, "newsletter", { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed" });
      return;
    }

    res.status(201).json({ message: "Signed up" });
  }
}

export default handler;
