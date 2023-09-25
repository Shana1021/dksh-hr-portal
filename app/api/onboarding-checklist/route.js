import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function PUT(request) {
  const { _id, todos, items } = await request.json();

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

  const client = await clientPromise;
  const db = await client.db();

  db.collection("onboarding_checklists").updateOne({ _id }, {
    $set: {
      todos: uniqueTodos,
      items: uniqueItems
    }
  });

  return NextResponse.json({ status: "success" });
}