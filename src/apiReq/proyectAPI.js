import clienteAxios from '../config/clienteAxios';

//crear proyecto
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
//listar un proyecto
export const listOneProyectAPI=async(id,token)=>{
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
          };

          const rta = await clienteAxios.get(`/proyecto/${id}`,config)
          console.log("API PROYECT  rta de listOneProyectAPI", rta);
          return rta.data
    } catch (error) {
        console.log("error en el listOneProyectAPI API ",error.message);
    }
}
