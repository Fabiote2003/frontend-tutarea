import clienteAxios from '../config/clienteAxios';
//Login 
export const loginAPI =async(user)=>{
    
    try {
        const res = await clienteAxios.post("/usuario/login",user)
        return res.data
    } catch (error) {
        console.log("API userAPI LOGIN -----> 🤐🤐🤐🤐");
        return error.response.data;
    }
}
//Register
export const registerAPI = async (user)=>{

    console.log("Voy A viajar al back 😉😉😉😉😉",user);
    try {
        
        const res = await clienteAxios.post("/usuario/register",user)
      
        console.log("BACK res",res);
        if (res.status != 200) {
            return res.response.message
        }
        return res.data
    } catch (error) {
        console.log("BACK catch error",error);
        return error.response
    }
}
