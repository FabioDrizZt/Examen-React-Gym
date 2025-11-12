import Login from "./Login";
import LoggedCard from "./LoggedCard";
import { useAuth } from "../hook/useAuth";

export default function Header() {
  const { isLoggedIn } = useAuth();
  return (
    <header>
      <div className="brand-container">
        <h1 className="logo-title">🍺💪 BIRRA Y BÍCEPS</h1>
        <p className="slogan">Porque la vida es equilibrio.</p>
      </div>
      <div className="login-container">
        {!isLoggedIn ?
          <Login />
          :
          <LoggedCard />
        }
      </div>
    </header>
  )
}