import clienteAxios from '../config/clienteAxios';

export const createProyectAPI=async(proyect,token)=>{
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
          };

          const rta = await clienteAxios.post("/proyecto",proyect,config)
          console.log("API PROYECT  rta de create", rta);
          return rta
    } catch (error) {
        console.log("error en el create API ",error);
    }
}