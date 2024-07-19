"use strict";

import config from "../config.js";
import getAuthCookie from "./getAuthCookie.js";

export default async function editBlogPostLoader({ params }) {
  try{
    if(!getAuthCookie()) throw new Error('Not authorized');

    const id = params.postId;
    const response = await fetch(config.APIURL + "posts/" + id, {
      mode: "cors",
      method: "GET",
    });

    if(!response.ok) throw new Error('Failed to fetch data');

    const data = await response.json();
    return data;
    
  }catch(error){
    console.log(error);
    return { message: error.name + error.message };
  }
}