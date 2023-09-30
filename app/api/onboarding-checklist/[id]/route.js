import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function PUT(request, { params }) {
  const { todos, items } = await request.json();

  const client = await clientPromise;
  const db = await client.db();

  if ((await db.collection("onboarding_checklists").findOne({ _id: params.id }, { completed: true })).completed) {
    return NextResponse.json({ status: "success" });
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

  await db.collection("onboarding_checklists").updateOne({ _id: params.id }, {
    $set: {
      todos: uniqueTodos,
      items: uniqueItems
    }
  });
  
  await db.collection("onboarding_checklists").updateOne({ _id: params.id }, [
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