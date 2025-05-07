const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

function registrarLog(nomeAluno) {
  const idUnico = uuidv4();
  const dataHora = new Date().toISOString().replace('T', ' ').split('.')[0];
  const mensagem = `${idUnico} - ${dataHora} - ${nomeAluno}\n`;

  fs.appendFile('logs.txt', mensagem, 'utf8', (err) => {
    if (err) {
      console.error('Erro ao registrar o log:', err);
    } else {
      console.log('Log registrado com sucesso.');
    }
  });
}


const nomes2 = registrarLog('Gustavo')