export default function LogoutButton() {
  function logout(){
    document.cookie = `Authorization=; Path=/; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    window.location.href = "/";
  }
  return (
    <button onClick={logout}>Log Out</button>
  );
}