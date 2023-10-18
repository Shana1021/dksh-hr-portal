import clientPromise from "@/lib/mongodb";
import TrainingRequestTrainingPage from "./TrainingRequestTrainingPage";

export default async function TrainingRequestTraining() {
  const client = await clientPromise;
  const db = await client.db();

  const vendorCodes = await db.collection("vendors")
    .find()
    .sort({ createdAt: -1 })
    .map(doc => doc._id)
    .toArray();
    
  return <TrainingRequestTrainingPage vendorCodes={vendorCodes} />
}