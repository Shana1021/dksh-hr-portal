import clientPromise from "@/lib/mongodb";
import styles from "./training-approval.module.css";
import Image from "next/image";
import { FiCheckCircle } from "react-icons/fi";
import { ObjectId } from "mongodb";

export default function TrainingConfirmation({ params: { id } }) {
  (async () => {
    const client = await clientPromise;
    const db = await client.db();

    await db.collection("trainings").updateOne(
      { _id: new ObjectId(id), status: "Pending" },
      {
        $set: {
          status: "Approved"
        }
      }
    );
  })();

  return (
    <div className={styles["page"]}>
      <div className={styles["logo"]}>
        <Image
          src="/dksh_logo.png"
          alt="DKSH Logo"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <FiCheckCircle color="forestgreen" size="150" />
      <h1>Thank You</h1>
      The training request has been approved. You may close this tab now.
    </div>
  );
}