import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Dashboard from '../../components/Dashboard';
import { fetchUserProfile } from '../api/api';
import { useAuth } from '../../components/AuthContext';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    async function loadProfile() {
      try {
        const userProfile = await fetchUserProfile();
        setProfile(userProfile);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, [isLoggedIn, router]);

  if (isLoading) return <div>Loading...</div>;
  if (!profile) return <div>Error loading profile</div>;

  return <Dashboard profile={profile} />;
};

export default ProfilePage;
