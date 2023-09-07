import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  const formData = await request.formData();

  const client = await clientPromise;
  const db = await client.db();
  await db.collection("employee_profiles").insertOne({
    firstName: formData.get("firstName"),
    middleName: formData.get("middleName"),
    lastName: formData.get("lastName"),
    employeeId: formData.get("employeeId"),
    gender: formData.get("gender"),
    dob: formData.get("dob"),
    email: formData.get("email"),
    position: formData.get("position"),
    department: formData.get("department"),
    addressLine1: formData.get("addressLine1"),
    addressLine2: formData.get("addressLine2"),
    city: formData.get("city"),
    state: formData.get("state"),
    postalCode: formData.get("postalCode"),
    phone: formData.get("phone"),
    bcStatus: formData.get("bcStatus"),
    emailStatus: formData.get("emailStatus")
  });

  return new NextResponse();
}