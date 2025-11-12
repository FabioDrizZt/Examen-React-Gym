import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [userName, setUserName] = useState('');
  const [userPass, setUserPass] = useState('');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});

  function onChangeUserName(e) {
    setUserName(e.target.value);
  }
  function onChangeUserPass(e) {
    setUserPass(e.target.value);
  }

  useEffect(() => {
    fetch('/data/administradores.json')
      .then(res => res.json())
      .then(data => setUsers(data.admins))
  }, []);

  const login = (e) => {
    e.preventDefault();
    const user = users.find(u => u.username === userName && u.password === userPass);
    if (!user) {
      window.alert('❌ Usuario o contraseña incorrectos');
      return;
    }
    setUserName('');
    setUserPass('');
    setUser(user);
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userName, userPass, onChangeUserName, onChangeUserPass, user }} >
      {children}
    </AuthContext.Provider>
  )
}
