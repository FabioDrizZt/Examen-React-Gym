import { useAuth } from "../hook/useAuth"

export default function Login() {
  const { login, userName, userPass, onChangeUserName, onChangeUserPass } = useAuth()
  return (
    <form onSubmit={(e) => login(e)} id="loginForm" >
      <input
        type="text"
        id="username"
        placeholder="Usuario"
        value={userName}
        onChange={onChangeUserName}
        required />
      <input
        type="password"
        id="password"
        placeholder="Contraseña"
        value={userPass}
        onChange={onChangeUserPass}
        required
      />
      <button type="submit" className="btn-quilmes">Ingresar</button>
    </form>
  )
}
