import Link from "next/link";
import MultiPurposeButton from "./Ui/ButtonMultiPurpose";
import { useRouter } from "next/router";
import { useAuth } from '../components/AuthContext';
// next image
import Image from 'next/image';

const Header = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleNavigateToLogin = () => {
    router.push('/login');
  };
  
  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="bg-primary/30 z-20 w-full flex items-center px-2 sm:px-10 xl:px-0 xl:h-[90px]">
      <div className="container mx-auto">
        <div className="flex flex-row justify-between items-center gap-y-6 py-4">
          {/* Logo */}
          <Link href={"/"}
            ><Image
            src={'/Logo1.png'}
            width={900}
            height={400}
            alt='BiddingRooms logo'
            priority={true}
            className="absolute left-3 top-25 sm:left-10 sm:top-6 z-30 rotate-12 sm:rotate-2 w-[300px] sm:w-[400px] md:w-[450px] lg:w-[700px] xl:w-[900px]"
            />
          </Link>
          {/* Login/Logout Button */}
          <span className="w-full border-b-2 border-stone-200/30"/>
          <MultiPurposeButton
            isBidButton={false}
            onNavigateToLogin={handleNavigateToLogin}
            onLogout={handleLogout}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
