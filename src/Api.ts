import axios from "axios"
import { Results } from "./types"

export const GetData = async()=>{

    const results = await axios.get("https://api.themoviedb.org/3/discover/movie?api_key=aab288962f5e9e3a51176a7468307516")

    //console.log("get data dabn gelen",results.data)
    return results.data.results

}

export const GetDetail = async(id:number)=>{

    //console.log("gelen id",id)
    const results = await axios.get(`https://api.themoviedb.org/3/movie/${id}?&append_to_response=videos&api_key=aab288962f5e9e3a51176a7468307516`)

    console.log("get detail",results.data)
    return results.data

}