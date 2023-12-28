const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const enderecos = require('./src/database/tables/address')
const pessoa = require('./src/database/tables/pessoa')
const funcionario = require('./src/database/tables/funcionario');
const paciente = require('./src/database/tables/paciente');
const agenda = require('./src/database/tables/agenda');
const prontuario = require('./src/database/tables/prontuario');
const medico = require('./src/database/tables/medico')
const { Sequelize } = require('sequelize')
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
  

app.get('/', (req, res) => {
    res.json({"resposta":"está funcionado a rota principal"})
})

app.post('/endereco', async (req, res) => {
    try {
      const params = req.body;
      console.log(req.body);
      
  
      const properties = ['cep', 'logradouro', 'bairro', 'cidade','estado'];
  
      const check = properties.every((property) => {
        return property in params;
      });
  
      if (!check) {
        const propStr = properties.join(', ');
        res.send(`All parameters needed to create a programmer must be sent: ${propStr}`);
        return;
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
  });

  app.get('/endereco', async (req, res) => {
    
    try {
      const records = await enderecos.findAll();
  
      res.json({data:records}).status(200).end();
    } catch (error) {
      res.send(error);
    }
  });

  app.post('/consulta',async(req,res)=>{
    try {
        const params = req.body;
        console.log(req.body);
        
    
        const properties = ['cep', 'logradouro', 'bairro', 'cidade','estado'];
    
        const check = properties.every((property) => {
          return property in params;
        });
    
        if (!check) {
          const propStr = properties.join(', ');
          res.send(`All parameters needed to create a programmer must be sent: ${propStr}`);
          return;
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
  });


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

  app.post('/agenda',async(req,res)=>{
    try {
        const params = req.body;
        console.log(req.body);
        
        const newSchedule = agenda.create({
            data: params.data,
            hora: params.hora,
            nome: params.nome,
            telefone: params.telefone,
            email: params.email,
            codigo_medico: params.codigo_medico
        })

        const newPerson = await pessoa.create({
            nome: params.nome,
            telefone: params.telefone,
            email: params.email,
        })


        res.json({"pessoa":JSON.stringify(newPerson),
        "paciente":JSON.stringify(newPatient)}).status(200);
        //res.json({"response":"Inserido com sucesso"}).status(200);
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

  app.get('/medicos/:especialidade',async(req,res)=>{
    try{
      const especialidade = req.params.especialidade;
      console.log(especialidade);

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