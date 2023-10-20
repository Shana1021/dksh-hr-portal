import clientPromise from "@/lib/mongodb";
import SettingsPage from "./SettingsPage";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function Settings() {
  const session = await getServerSession(authOptions);

  const client = await clientPromise;
  const db = await client.db();

  const profile = await db.collection("hr_profiles").findOne({ _id: session.user._id });
  const settings = await db.collection("settings").findOne();
  
  return (
    <SettingsPage
      profile={profile}
      initialITTeamEmailAddress={settings.itTeamEmailAddress}
      initialAdminTeamEmailAddress={settings.adminTeamEmailAddress}
      initialHRTeamEmailAddress={settings.hrTeamEmailAddress}
    />
  );
}