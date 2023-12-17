import { Profile } from "../pages/api/type";
import ProfileListings from "./ProfileListings";
import UpdateAvatar from "./UpdateAvatar";
import CreateListing from "./CreateListing";

interface ProfileItemProps {
  profile: Profile;
}

const Dashboard = ({ profile }: ProfileItemProps) => {
  const avatarUrl = Array.isArray(profile.avatar)
    ? profile.avatar[0]
    : profile.avatar;

  return (
    <main className="h-full bg-primary/30 p-4 sm:p-10 md:p-20 lg:p-5 mx-auto">
      <div className="lg:p-20 max-w-[1000px] mx-auto">
        <div className="border-2 border-white/50 flex flex-col sm:flex-row mx-auto items-center rounded-t-lg">
          <div className="max-w-xs border-b-2 sm:border-r-2 border-white/50 max-h-[300px]" >
            <img src={avatarUrl} alt={profile?.name} width={200} height={300} className="object-cover object-center min-h-[300px] min-w-[200px]"/></div>
          <div className="flex flex-col p-10">
            <h1 className="p-1">{profile.name}'s Dashboard:</h1>
            <p className="p-1">Active Balance: {profile.credits} $</p>
            <p className="p-1 text-sm pt-4 text-white/50 border-y-2">If change of image:<span className="text-xs"> use url bellow and add picture</span></p> 
            <UpdateAvatar />
          </div>
        </div>
      </div>
      <div className="container mx-auto py-4 border-y-2 my-2 border-accent">
        <h2>Create Listing:</h2>
        <CreateListing />
      </div>
      <div className="container mx-auto py-4 border-y-2 my-2 border-accent">
        <ProfileListings />
      </div>
    </main>
  );
};

export default Dashboard;
