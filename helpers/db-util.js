import { MongoClient } from "mongodb";

export async function connectDatabase() {
  // connect to the database
  const client = await MongoClient.connect(
    "mongodb+srv://db@cluster0.eloaj.mongodb.net/events?retryWrites=true&w=majority"
  );
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  // store the collection of email addresses in the database
  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();

  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
}
