export default function LogInButton(props) {
  function goSignUp(){
    window.location.href = '/signUp';
  }
  return (
    <button onClick={goSignUp}>Sign Up</button>
  );
}