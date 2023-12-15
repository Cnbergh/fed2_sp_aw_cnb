import { Profile } from "../pages/api/type";

interface ProfileItemProps {
    profile: Profile;
  }

const Dashboard = ({ profile }:ProfileItemProps) => {
    
    return (
      <div className="dashboard">
        <h1>{profile.name}'s Dashboard</h1>
        <p>Active Balance: {profile.credits}</p>
        <div>
          <h2>Active Listings</h2>
          {/* Implement logic to display listings */}
        </div>
        <div>
          <h2>Wins</h2>
          {/* Implement logic to display wins */}
        </div>
        <div>
          <img src={profile.avatar} alt="Avatar" />
        </div>
      </div>
    );
  };
  
  export default Dashboard;