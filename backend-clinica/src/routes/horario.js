const consulta = require('../database/tables/consulta');

/*
    Obter todas os horarios já marcados em uma determinada data
*/

const readHours = async(req,res)=>{
    try{
       console.log(req.body);
       const data = req.body.data;
       const codigoMedico = req.body.codigo;

       const consultas = await consulta.findAll({
        where:{
            data:data,
            codigo_medico:codigoMedico
        }
       });
       const horarios = consultas.flatMap((c)=>c.horario);
       
        res.json({data:horarios}).status(200);

    }catch(err){
        res.send(err)
    }
}

module.exports = {readHours};