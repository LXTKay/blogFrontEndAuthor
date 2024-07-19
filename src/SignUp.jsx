import config from "./config";
import "./styles/LogIn.css"

export default function SignUp(){
  async function submit(){
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    try{
      const response = await fetch(config.APIURL + "authentication/register/", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });
      if(!response.ok) throw new Error('Failed to fetch data');

      const data = await response.json();
      if(data.errors) throw new Error(data.errors);

      document.querySelector("#message").innerHTML = data.message;
    }catch(error){
      document.querySelector("#message").innerHTML = error.message;
    }
  }
  return (
    <div className="logInForm">
      <h2>Sign Up</h2>
      <form action="#">
        <div className="formGroup">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Username"/>
        </div>
        <div className="formGroup">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password"/>
        </div>
        <button className="logInButton" type="button" onClick={submit}>Submit</button>
      </form>
      <div id="message"></div>
    </div>
  );
}