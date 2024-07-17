export default function LogInButton(props) {
  function goLogin(){
    window.location.href = '/login';
  }
  return (
    <button onClick={goLogin}>Log In</button>
  );
}