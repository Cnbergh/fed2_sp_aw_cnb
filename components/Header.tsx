import Link from "next/link";
import MultiPurposeButton from "./Ui/ButtonMultiPurpose";
import { useRouter } from "next/router";
import { useAuth } from '../components/AuthContext';

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
    <header className="absolute z-30 w-full flex items-center px-16 xl:px-0 xl:h-[90px]">
      <div className="container mx-auto border-b">
        <div className="flex flex-row justify-between items-center gap-y-6 py-8">
          {/* Logo */}
          <Link href={"/"}>
            <h1>Header</h1>
          </Link>
          {/* Login/Logout Button */}
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
