import { useEffect, useState } from 'react';
import Dashboard from '../../components/Dashboard';
import { fetchUserProfile, fetchUserListings, fetchUserWins } from '../api/api';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const userProfile = await fetchUserProfile(); // Fetch user profile data
        setProfile(userProfile);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (!profile) return <div>Error loading profile</div>;

  return <Dashboard profile={profile} />;
};

export default ProfilePage;