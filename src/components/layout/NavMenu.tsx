
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export function NavMenu() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="flex items-center gap-4">
      <Button variant="link" onClick={() => navigate("/")}>Home</Button>
      <Button variant="link" onClick={() => navigate("/services")}>Services</Button>
      <Button variant="link" onClick={() => navigate("/booking")}>Book</Button>
      
      {isAuthenticated ? (
        <>
          <Button variant="link" onClick={() => navigate("/account")}>
            {user?.name || "Account"}
          </Button>
          <Button variant="outline" onClick={() => {
            logout();
            navigate("/");
          }}>
            Logout
          </Button>
        </>
      ) : (
        <Button variant="outline" onClick={() => navigate("/auth")}>
          Login / Register
        </Button>
      )}
    </nav>
  );
}
