import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function PUT(request, { params: { id } }) {
  const { todos, items } = await request.json();

  const client = await clientPromise;
  const db = await client.db();

  if ((await db.collection("offboarding_checklists").findOne({ _id: id }, { completed: true })).completed) {
    return NextResponse.json({ status: "alreadyCompleted" });
  }

  const uniqueTodos = [];
  const todosSet = new Set();
  for (const todo of todos) {
    if (!todosSet.has(todo.title)) {
      todosSet.add(todo.title);
      uniqueTodos.push(todo);
    }
  }

  const uniqueItems = [];
  const itemsSet = new Set();
  for (const item of items) {
    if (!itemsSet.has(item.title)) {
      itemsSet.add(item.title);
      uniqueItems.push(item);
    }
  }

  await db.collection("offboarding_checklists").updateOne({ _id: id }, {
    $set: {
      todos: uniqueTodos,
      items: uniqueItems
    }
  });
  
  await db.collection("offboarding_checklists").updateOne({ _id: id }, [
    {
      $set: {
        completed: {
          $and: [
            {
              $allElementsTrue: [
                {
                  $map: {
                    input: "$todos",
                    in: "$$this.checked"
                  }
                }
              ]
            },
            {
              $allElementsTrue: [
                {
                  $map: {
                    input: "$items",
                    in: "$$this.checked"
                  }
                }
              ]
            }
          ]
        }
      }
    }
  ]);

  // TODO: send email

  return NextResponse.json({ status: "success" });
}