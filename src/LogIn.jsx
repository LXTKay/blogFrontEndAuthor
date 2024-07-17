import config from "./config";

export default function LogIn(){
  async function submitLoginData(){
    try{
      const username = document.querySelector("#username").value;
      const password = document.querySelector("#password").value;

      const response = await fetch(config.APIURL + "authentication/login/", {
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

      if(!data.token){
        document.querySelector("#message").innerHTML = data.message;
        return;
      }

      document.cookie = `Authorization=Bearer ${data.token}; Path=/; SameSite=Strict`;
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      document.querySelector("#message").innerHTML = error.message;
    }
  }
  return (
    <div>
      <h2>Log In</h2>
      <form action="#">
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Username"/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password"/>
        </div>
        <button type="button" onClick={submitLoginData}>Log In</button>
      </form>
      <div id="message"></div>
    </div>
  );
};