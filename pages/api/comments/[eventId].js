import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-util";

async function handler(req, res) {
  // get access to the value entered in the path
  const eventId = req.query.eventId;

  // connect to the database

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed" });
    return;
  }

  // check if it post request
  if (req.method === "POST") {
    // extract the entered data
    const { email, name, text } = req.body;

    // add server side validation
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      client.close();
      return;
    }

    const newComment = {
      eventId,
      email,
      name,
      text,
    };

    let result;

    try {
      // access the database and store the new comment
      result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;

      res.status(201).json({ message: "Added comment", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed" });
    }
  }

  if (req.method === "GET") {
    // fetch the documents sorted in decending order so that the latest comment is
    // the first comment in the array

    try {
      const documents = await getAllDocuments(client, "comments", { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ comments: "Getting comments failed" });
    }

    client.close();
  }
}

export default handler;
