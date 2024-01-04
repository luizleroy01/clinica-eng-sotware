const enderecos = require('../database/tables/address')

const createAddress = async(req,res)=>{
    try {
        const params = req.body;

        //verifica se o endereço já foi inserido
        const searchAdress = await enderecos.findAll({
            where:{
                cep:params.cep,
            }
        })

        if(searchAdress){
            res.json({data:"O endereço já foi cadastrado"})
            return
        }
        
        const newAddress = await enderecos.create({
          cep: params.cep,
          logradouro: params.logradouro,
          bairro: params.bairro,
          cidade: params.cidade,
          estado: params.estado
        });
     
        res.json({"response":"Inserido com sucesso"}).status(200);
      } catch (error) {
        res.send(error);
      }
}

const readAdress = async (req, res) => {
    try {
        const records = await enderecos.findAll();
    
        res.json({data:records}).status(200).end();
      } catch (error) {
        res.send(error);
      }
}

module.exports = {createAddress,readAdress}
