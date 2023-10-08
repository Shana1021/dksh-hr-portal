import clientPromise from "@/lib/mongodb";
import OffboardingResignationRequestsPage from "./OffboardingResignationRequestPage";

export default async function OffboardingResignationRequests() {
  const client = await clientPromise;
  const db = await client.db();

  

  return <OffboardingResignationRequestsPage />;
}