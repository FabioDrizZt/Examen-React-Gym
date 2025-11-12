import { useAuth } from "../hook/useAuth"

export default function LoggedCard() {
  const { logout, user } = useAuth()
  const { firstName, rol } = user;
  return (
    <div id="userInfo" >
      <span id="userNameDisplay">
        Bienvenido, {firstName} - {rol}
      </span>
      <button id="logoutBtn" onClick={logout} className="btn-quilmes-secondary">Cerrar sesión</button>
    </div>)
}
