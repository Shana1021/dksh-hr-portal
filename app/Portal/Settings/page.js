import clientPromise from "@/lib/mongodb";
import SettingsPage from "./SettingsPage";

export default async function Settings() {
  const client = await clientPromise;
  const db = await client.db();
  const settings = await db.collection("settings").findOne();
  
  return (
    <SettingsPage
      initialITTeamEmailAddress={settings.itTeamEmailAddress}
      initialAdminTeamEmailAddress={settings.adminTeamEmailAddress}
      initialHRTeamEmailAddress={settings.hrTeamEmailAddress}
    />
  );
}