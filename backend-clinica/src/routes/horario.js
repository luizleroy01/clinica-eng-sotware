const consulta = require('../database/tables/consulta');

/*
    Obter todas os horarios já marcados em uma determinada data
*/

const readHours = async(req,res)=>{
    try{
        /*
        const data = req.params.data ? req.params.data : null;
        const schedules = await consulta.findAll({
            where:{
                data:data,
            }
        });
        const horarios = schedules.flatMap((s)=>s.horario);
        */
       
        res.json({data:req.body}).status(200);

    }catch(err){
        res.send(err)
    }
}

module.exports = {readHours};