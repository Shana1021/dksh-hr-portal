import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request) {
  const { _id, todos, items } = await request.json();

  const client = await clientPromise;
  const db = await client.db();

  if (todos.length > 0) {
    await db.collection("cl_offboarding_todos")
      .bulkWrite(
        todos.map(todo => ({
          updateOne: {
            filter: { _id: todo[0] },
            update: { $set: { _id: todo[0] } },
            upsert: true
          }
        }))
      );
  }
  
  if (items.length > 0) {
    await db.collection("cl_items")
      .bulkWrite(
        items.map(item => ({
          updateOne: {
            filter: { _id: item[0] },
            update: { $set: { _id: item[0] } },
            upsert: true
          }
        }))
      );
  }

  if (todos.length > 0 || items.length > 0) {
    await db.collection("offboarding_checklist").updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: Object.fromEntries(
          todos.map(([_id, checked]) => [`todos.${_id}`, checked])
            .concat(items.map(([_id, checked]) => [`items.${_id}`, checked]))
        )
      }
    );
  }

  return new NextResponse();
}