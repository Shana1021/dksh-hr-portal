import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { GridFSBucket } from "mongodb";
import { Readable } from "stream";

export async function POST(request, { params: { id } }) {
  const formData = await request.formData();

  const client = await clientPromise;
  const db = await client.db();
  
  if (await db.collection("accepted_resignations").countDocuments({ _id: id }, { limit: 1 }) === 0) {
    return NextResponse.json({ status: "idDoesNotExist" });
  }

  const bucket = new GridFSBucket(db, { bucketName: "signed_acknowledgement_of_resignations" });

  const file = (await bucket.find({ filename: id }).toArray())[0];
  if (file) {
    await bucket.delete(file._id);
  }

  Readable.from(Buffer.from(await formData.get("aor").arrayBuffer()))
    .pipe(bucket.openUploadStream(id));

  if (await db.collection("offboarding_checklists").countDocuments({ _id: id }, { limit: 1 }) > 0) {
    await db.collection("offboarding_checklists").updateOne(
      { _id: id },
      {
        $set: {
          endDate: formData.get("endDate")
        }
      }
    );
  } else {
    await Promise.all([
      db.collection("onboarding_checklists").updateOne(
        { _id: id },
        {
          $set: {
            completed: true
          }
        }
      ),
      (async () => {
        const onboardingChecklist = await db.collection("onboarding_checklists")
        .aggregate([
          { $match: { _id: id } },
          { $limit: 1 },
          {
            $project: {
              items: {
                $filter: {
                  input: "$items",
                  cond: "$$this.checked"
                }
              }
            }
          }
        ])
        .next();
  
      await db.collection("offboarding_checklists").updateOne(
        { _id: id },
        {
          $set: {
            todos: [
              {
                title: "Exit Interview",
                checked: false
              },
              {
                title: "Questionnaire",
                checked: false
              }
            ],
            items: onboardingChecklist.items.map(item => ({ ...item, checked: false })),
            endDate: formData.get("endDate")
          },
          $currentDate: { createdAt: true }
        },
        { upsert: true }
      );
      })()
    ]);
  }

  return NextResponse.json({ status: "success" });
}