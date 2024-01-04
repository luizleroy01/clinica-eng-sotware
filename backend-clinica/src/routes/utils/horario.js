const agenda = require('../../database/tables/agenda');

const readHours = async(req,res)=>{
    try{
        const data = req.params.data
        const schedules = await agenda.findAll();
        const horarios = schedules.flatMap((s)=>s.horario);

        res.json({horarios:horarios}).status(200);

    }catch(err){
        res.send(err)
    }
}

module.exports = readHours