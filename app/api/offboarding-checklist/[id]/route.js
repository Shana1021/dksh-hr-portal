import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import sgMailSend from "@/lib/sendgrid";

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

  await db.collection("offboarding_checklists").updateOne(
    { _id: id },
    {
      $set: {
        todos: uniqueTodos,
        items: uniqueItems
      }
    }
  );
  
  const update = await db.collection("offboarding_checklists").findOneAndUpdate(
    { _id: id },
    [
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
    ],
    {
      projection: { completed: true },
      returnDocument: "after"
    }
  );

  if (update.value.completed) {
    const [employeeProfile, settings] = await Promise.all([
      db.collection("employee_profiles").findOne({ _id: id }),
      db.collection("settings").findOne()
    ]);

    await sgMailSend(
      settings.hrTeamEmailAddress,
      "d-806eef9a541341388924bc7fdf6d85c5",
      {
        employee: employeeProfile
      }
    );
  }

  return NextResponse.json({ status: "success" });
}