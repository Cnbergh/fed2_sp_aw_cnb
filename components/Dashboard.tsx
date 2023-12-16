"use-client";
import { Profile } from "../pages/api/type";
import ProfileListings from "./ProfileListings";

interface ProfileItemProps {
  profile: Profile;
}

const Dashboard = ({ profile }: ProfileItemProps) => {
  const avatarUrl = Array.isArray(profile.avatar)
    ? profile.avatar[0]
    : profile.avatar;

  return (
    <main className="h-full bg-primary/30 p-20">
      <div className="p-20">
        <div className="border-2 flex flex-row mx-auto items-center">
            <img src={avatarUrl} alt={profile?.name} width={200} height={300} />
          <div>
          </div>
          <div className="flex flex-col p-10">
            <h1>{profile.name}'s Dashboard</h1>
            <p>Active Balance: {profile.credits} $</p>
          </div>
        </div>
      </div>
      <div>
        <h2>Active Listings</h2>
        <ProfileListings/>
      </div>
      <div>
        <h2>Wins</h2>
        {/* Implement logic to display wins */}
      </div>
    </main>
  );
};

export default Dashboard;
