import clienteAxios from '../config/clienteAxios';
//Login 
export const loginAPI =async(user)=>{
    
    try {
        const res = await clienteAxios.post("/usuario/login",user)
        return res.data
    } catch (error) {
        return error.response.data;
    }
}
//Register
export const registerAPI = async (user)=>{

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
//Perfil usuario

export const perfilAPI= async(token)=>{
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
          };
        const res = await clienteAxios.get("/usuario/giu",config)
        
        return res.data.data
    } catch (error) {
        console.log("error en userAPI perfilAPI",error);
        return error.response
    }
}

//Todos los proyectos de un usuario

export const allPoryectByUserAPI=async(id,token)=>{

    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
          };
        const {data} = await clienteAxios.get(`/usuario/proyectByUser/${id}`,config)
        return data;
    } catch (error) {
        console.log("Error", error);
        return error.response
    }
}