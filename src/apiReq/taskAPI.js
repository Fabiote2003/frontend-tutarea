import clienteAxios from '../config/clienteAxios';



//create task
export const createTaskAPI =async(idProyect,task,token)=>{
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    try {
          const res = await clienteAxios.post(`/tarea/${idProyect}`,task,config)
          return res.data
    } catch (error) {
        console.log("ERROR en taskAPI create");
    }
}

//exchange status

export const exchengeStatusAPI=async(id,token)=>{
    //console.log("EN LA API ", id,token);
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const res = await clienteAxios.post(`/tarea/cambioestado/${id}`,null,config)
        //console.log("exchengeStatusAPI --->", res);
        return res.data
    } catch (error) {
        console.log("ERROR en exchengeStatusAPI exchangeStatus",error);
    }
}