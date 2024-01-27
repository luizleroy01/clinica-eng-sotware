const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./src/database/db')
const pessoa = require('./src/database/tables/pessoa')
const funcionario = require('./src/database/tables/funcionario');
const paciente = require('./src/database/tables/paciente');

const prontuario = require('./src/database/tables/prontuario');
const medico = require('./src/database/tables/medico')
const consulta = require('./src/database/tables/consulta')

const { Sequelize } = require('sequelize')

//importação dos acessos às rotas
const routeAddress = require('./src/routes/encerecos')
const routeHorario = require('./src/routes/horario')
const app = express();

const port = 5000

app.use(bodyParser.json());

app.use(cors({
    origin:"*"
}))

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/syncDatabase', async (req, res) => {
    const database = require('./src/database/db');
    try {
      await database.sync();

  
      res.send(`Database successfully sync'ed`);
    } catch (error) {
      res.send(error);
    }
  });
  
app.use('/',router)


router.route('/endereco')
      .post(routeAddress.createAddress)
      .get(routeAddress.readAdress)


router.route('/horario')
      .post(routeHorario.readHours)

  
  app.post('/consulta',async(req,res)=>{
    try {
        const params = req.body;
        console.log(req.body);

        //realizar validação de dados, não pode haver uma consulta no mesmo horário com o 
        //mesmo médico
        
        const newSchedule = await consulta.create({
          data: params.data,
          horario:params.horario,
          nome:params.nome,
          telefone:params.telefone,
          email:params.email,
          codigo_medico:params.codigo_medico
        })
     
        res.json({"response":"Inserido com sucesso"}).status(200);
      } catch (error) {
        res.send(error);
      }
  });

  app.get('/consulta',async(req,res)=>{
    try{
      const consultas = await consulta.findAll();
      res.json({consultas: consultas}).status(200).end();
    }catch(err){
      res.send(err);
    }
  })

  app.delete('/consulta',async(req,res)=>{
    try{
      const consulta = await consulta.delete();
      res.json({consultas: consulta}).status(200).end();
    }catch(err){
      res.send(err);
    }
  })


  app.post('/funcionario', async(req,res)=>{
    try {
        const params = req.body;
        console.log(req.body);
        
        const newPerson = await pessoa.create({
            nome: params.nome,
            telefone: params.telefone,
            email: params.email,
            cep: params.cep,
            logradouro: params.logradouro,
            bairro: params.bairro,
            cidade: params.cidade,
            estado: params.estado
        })
        const newEmployee = await funcionario.create({
            codigo_pessoa: newPerson.codigo,
            data_contrato: params.data_contrato,
            salario: params.salario,
            senha: params.senha
        })

        const newAddress = await enderecos.create({
            cep: params.cep,
            logradouro: params.logradouro,
            bairro: params.bairro,
            cidade: params.cidade,
            estado: params.estado
          });
          
          if(params.tipo === "medico"){
           const newDoctor = await medico.create({
                especialidade: params.especialidade,
                crm: params.crm,
                codigo_funcionario: newEmployee.codigo
            })

            return res.json({"pessoa":JSON.stringify(newPerson),
            "funcionario":JSON.stringify(newEmployee),
            "endereco":JSON.stringify(newAddress),
            "medico":JSON.stringify(newDoctor)}).status(200);
          }
        /*
        res.json({"pessoa":JSON.stringify(newPerson),
        "funcionario":JSON.stringify(newEmployee),
        "endereco":JSON.stringify(newAddress)}).status(200);
       */

        res.json({"response":"Inserido com sucesso"}).status(200);
      } catch (error) {
        res.send(error);
      }
  })
  
  app.get('/funcionario',async(req,res)=>{
    try {
        const recEmployee = await funcionario.findAll();
        const recPeople = await pessoa.findAll();
        let records = [];
        
        recPeople.forEach((person)=>{
          recEmployee.forEach((employee)=>{
            if(employee.codigo_pessoa === person.codigo){
              let record = {"person":person,"employee":employee};
              records.push(record);
            }
          })
        })
        
        res.json({data:records}).status(200).end();
      } catch (error) {
        res.send(error);
      }
  })

  app.post('/paciente',async(req,res)=>{
    try {
        const params = req.body;
        console.log(req.body);
        
        const newPerson = await pessoa.create({
            nome: params.nome,
            telefone: params.telefone,
            email: params.email,
            cep: params.cep,
            logradouro: params.logradouro,
            bairro: params.bairro,
            cidade: params.cidade,
            estado: params.estado
        })
        const newPatient = await paciente.create({
            peso: params.peso,
            altura: params.altura,
            tipo_sanguineo: params.tipo_sanguineo,
            codigo_pessoa: newPerson.codigo
        })

        const newAddress = await enderecos.create({
            cep: params.cep,
            logradouro: params.logradouro,
            bairro: params.bairro,
            cidade: params.cidade,
            estado: params.estado
          });

        res.json({"pessoa":JSON.stringify(newPerson),
        "paciente":JSON.stringify(newPatient),
        "endereco":JSON.stringify(newAddress)}).status(200);
        //res.json({"response":"Inserido com sucesso"}).status(200);
      } catch (error) {
        res.send(error);
      }
  })

  app.get('/paciente',async(req,res)=>{
    try {
        const records = await paciente.findAll();
    
        res.json({data:records}).status(200).end();
      } catch (error) {
        res.send(error);
      }
  })

  

  
  app.get('/pessoa',async(req,res)=>{
    try{
      const people = await pessoa.findAll();
      res.json({data:JSON.stringify(people)}).status(200).end;
    }catch(error){
      res.send(error)
    }
  })
  app.get('/codigo-medico/:idPessoa',async(re,res)=>{
     
  })



//retorna as pessoas que são médicas
  app.get('/medicos/:especialidade',async(req,res)=>{
    try{
      const especialidade = req.params.especialidade;

      const doctors = await medico.findAll({
        where:{
          especialidade:especialidade
        }
      });


      let codeEmployees = doctors.flatMap((doctor)=>doctor.codigo_funcionario);
      const employees = await funcionario.findAll({
        where:{
          codigo:Sequelize.literal(`codigo IN (${codeEmployees.join(',')})`)
        }
      });

      let codePeople = employees.flatMap((person)=>person.codigo_pessoa);
      const people = await pessoa.findAll({
        where:{
          codigo:Sequelize.literal(`codigo IN (${codePeople.join(',')})`)
        }
      });

      res.json({data:people}).status(200);
    }catch(err){
      res.send(err);
    }
  })

//retorna as especialidades ofertadas pela clínica
app.get('/especialidade',async(req,res)=>{
  try{
    const doctors = await medico.findAll();
    const records = doctors.flatMap((doctor)=>doctor.especialidade);
    res.json({data:records}).status(200);

  }catch(err){
    res.send(err);
  }
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})