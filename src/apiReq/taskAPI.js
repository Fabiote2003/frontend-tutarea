import clienteAxios from '../config/clienteAxios';


//ceate task

export const createTaskAPI =async(idProyect,task,token)=>{
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
          };
          const res = await clienteAxios.post(`/tarea/${idProyect}`,task,config)
          return res.data
    } catch (error) {
        console.log("ERROR en taskAPI create");
    }
}