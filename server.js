const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3306;
require('dotenv').config();

// MySQL connection configuration
const dbConfig ={
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    connectTimeout: 300000000 
  };

console.log(process.env.MYSQL_HOST);
console.log(process.env.MYSQL_USER);
console.log(process.env.MYSQL_PASSWORD);
console.log(process.env.MYSQL_DB);

// Connect to MySQL
const db = mysql.createConnection(dbConfig);

// Connect to MySQL
db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
    } else {
      console.log('Connected to MySQL');
    }
  });


// Define a simple route to retrieve data from MySQL
app.get('/tipo_utilizador', (req, res) => {
  // Execute a MySQL query
  db.query('SELECT * FROM tipo_utilizador', (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});


app.post('/tipo_utilizador', (req, res) => {
  const { descricao } = req.body;

  // Executando a inserção no banco de dados
  db.query('INSERT INTO tipo_utilizador (descricao) VALUES (?)', [descricao], (error, results, fields) => {
      if (error) {
          console.error('Erro ao inserir dados no banco de dados:', error);
          return res.status(500).json({ error: 'Erro ao inserir dados no banco de dados' });
      }

      // Se a inserção for bem-sucedida, envie uma resposta de sucesso
      res.status(201).json({ message: 'Dados inseridos com sucesso' });
  });
});

// 
app.put('/tipo_utilizador/:id', (req, res) => {
  try {
      const { descricao } = req.body;
      const id = req.params.id;

      // Criando a string da query SQL com placeholders para os valores
      const sqlQuery = 'UPDATE tipo_utilizador SET descricao=? WHERE id_tipo_utilizador=?';

      // Executando a query SQL
      db.query(sqlQuery, [descricao, id], (error, results) => {
          if (error) {
              console.error('Erro ao atualizar dados na tabela tipo_utilizador:', error);
              return res.status(500).json({ error: 'Erro ao atualizar dados na tabela tipo_utilizador' });
          }

          // Verificando se algum registro foi afetado pela atualização
          if (results.affectedRows === 0) {
              return res.status(404).json({ error: 'Nenhum registro encontrado para atualizar' });
          }

          // Respondendo com sucesso
          res.json({ message: 'Dados atualizados com sucesso' });
      });
  } catch (error) {
      console.error('Erro ao atualizar dados na tabela tipo_utilizador:', error);
      res.status(500).json({ error: 'Erro ao atualizar dados na tabela tipo_utilizador' });
  }
});


app.delete('/tipo_utilizador/:id', (req, res) => {
  try {
      const id = req.params.id;

      // Executando a query SQL para excluir o registro da tabela
      db.query(
          'DELETE FROM tipo_utilizador WHERE id_tipo_utilizador=?',
          [id],
          (error, results) => {
              if (error) {
                  console.error('Erro ao excluir dados na tabela tipo_utilizador:', error);
                  return res.status(500).json({ error: 'Erro ao excluir dados na tabela tipo_utilizador' });
              }

              // Verificando se algum registro foi excluído
              if (results.affectedRows === 0) {
                  return res.status(404).json({ error: 'Nenhum registro encontrado para excluir' });
              }

              // Respondendo com sucesso
              res.json({ message: 'Dados excluídos com sucesso' });
          }
      );
  } catch (error) {
      console.error('Erro ao excluir dados na tabela tipo_utilizador:', error);
      res.status(500).json({ error: 'Erro ao excluir dados na tabela tipo_utilizador' });
  }
});

// Define a simple route to retrieve data from MySQL
app.get('/utilizador', (req, res) => {
  // Execute a MySQL query
  db.query('SELECT * FROM utilizador', (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

app.post('/utilizador', (req, res) => {
  const { nome, email, senha, tipo_utilizador_id } = req.body;
 
  // Executando a inserção no banco de dados
  db.query('INSERT INTO utilizador (nome, email, senha, tipo_utilizador_id) VALUES (?, ?, ?, ?)', [nome, email, senha, tipo_utilizador_id], (error, results, fields) => {
      if (error) {
          console.error('Erro ao inserir dados no banco de dados:', error);
          return res.status(500).json({ error: 'Erro ao inserir dados no banco de dados' });
      }

      // Se a inserção for bem-sucedida, envie uma resposta de sucesso
      res.status(201).json({ message: 'Dados inseridos com sucesso' });
  });
});

app.put('/utilizador/:id', (req, res) => {
  try {
      const { nome, email, senha, tipo_utilizador_id  } = req.body;
      const id = req.params.id;

      // Criando a string da query SQL com placeholders para os valores
      const sqlQuery =  `UPDATE utilizador SET nome=?, email=?, senha=?, tipo_utilizador_id=? WHERE id_utilizador=?`;

      // Executando a query SQL
      db.query(sqlQuery, [nome, email, senha, tipo_utilizador_id, id], (error, results) => {
          if (error) {
              console.error('Erro ao atualizar dados na tabela utilizador:', error);
              return res.status(500).json({ error: 'Erro ao atualizar dados na tabela utilizador' });
          }

          // Verificando se algum registro foi afetado pela atualização
          if (results.affectedRows === 0) {
              return res.status(404).json({ error: 'Nenhum registro encontrado para atualizar' });
          }

          // Respondendo com sucesso
          res.json({ message: 'Dados atualizados com sucesso' });
      });
  } catch (error) {
      console.error('Erro ao atualizar dados na tabela utilizador:', error);
      res.status(500).json({ error: 'Erro ao atualizar dados na tabela utilizador' });
  }
});


app.delete('/utilizador/:id', (req, res) => {
  try {
      const id = req.params.id;

      // Executando a query SQL para excluir o registro da tabela
      db.query(
          'DELETE FROM utilizador WHERE id_utilizador=?',
          [id],
          (error, results) => {
              if (error) {
                  console.error('Erro ao excluir dados na tabela utilizador:', error);
                  return res.status(500).json({ error: 'Erro ao excluir dados na tabela utilizador' });
              }

              // Verificando se algum registro foi excluído
              if (results.affectedRows === 0) {
                  return res.status(404).json({ error: 'Nenhum registro encontrado para excluir' });
              }

              // Respondendo com sucesso
              res.json({ message: 'Dados excluídos com sucesso' });
          }
      );
  } catch (error) {
      console.error('Erro ao excluir dados na tabela utilizador:', error);
      res.status(500).json({ error: 'Erro ao excluir dados na tabela utilizador' });
  }
});

// Define a simple route to retrieve data from MySQL
app.get('/lista', (req, res) => {
  // Execute a MySQL query
  db.query('SELECT * FROM lista', (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

app.post('/lista', (req, res) => {
  const { nome, utilizador } = req.body;

  // Executando a inserção no banco de dados
  db.query('INSERT INTO lista (nome, utilizador) VALUES (?, ?)', [nome, utilizador], (error, results, fields) => {
      if (error) {
          console.error('Erro ao inserir dados no banco de dados:', error);
          return res.status(500).json({ error: 'Erro ao inserir dados no banco de dados' });
      }

      // Enviando a resposta de sucesso
      res.status(201).json({ message: 'Dados inseridos com sucesso' });
  });
});

app.put('/lista/:id', (req, res) => {
  try {
      const { nome } = req.body;
      const id = req.params.id;

      // Criando a string da query SQL com placeholders para os valores
      const sqlQuery =  `UPDATE lista SET nome=? WHERE id_lista=?`;

      // Executando a query SQL
      db.query(sqlQuery, [nome, id], (error, results) => {
          if (error) {
              console.error('Erro ao atualizar dados na tabela lista:', error);
              return res.status(500).json({ error: 'Erro ao atualizar dados na tabela lista' });
          }

          // Verificando se algum registro foi afetado pela atualização
          if (results.affectedRows === 0) {
              return res.status(404).json({ error: 'Nenhum registro encontrado para atualizar' });
          }

          // Respondendo com sucesso
          res.json({ message: 'Dados atualizados com sucesso' });
      });
  } catch (error) {
      console.error('Erro ao atualizar dados na tabela lista:', error);
      res.status(500).json({ error: 'Erro ao atualizar dados na tabela lista' });
  }
});


app.delete('/lista/:id', (req, res) => {
  try {
      const id = req.params.id;

      // Executando a query SQL para excluir o registro da tabela
      db.query(
          'DELETE FROM lista WHERE id_lista=?',
          [id],
          (error, results) => {
              if (error) {
                  console.error('Erro ao excluir dados na tabela lista:', error);
                  return res.status(500).json({ error: 'Erro ao excluir dados na tabela lista' });
              }

              // Verificando se algum registro foi excluído
              if (results.affectedRows === 0) {
                  return res.status(404).json({ error: 'Nenhum registro encontrado para excluir' });
              }

              // Respondendo com sucesso
              res.json({ message: 'Dados excluídos com sucesso' });
          }
      );
  } catch (error) {
      console.error('Erro ao excluir dados na tabela lista:', error);
      res.status(500).json({ error: 'Erro ao excluir dados na tabela lista' });
  }
});


// Define a simple route to retrieve data from MySQL
app.get('/lista_produto', (req, res) => {
  // Execute a MySQL query
  db.query('SELECT * FROM lista_produto', (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});


app.post('/lista_produto', (req, res) => {
  const { lista, produto, carrinho, quantidade_produto } = req.body;

  // Executando a inserção no banco de dados
  db.query('INSERT INTO lista_produto (lista, produto, carrinho, quantidade_produto) VALUES (?, ?, ?, ?)', [lista, produto, carrinho, quantidade_produto], (error, results, fields) => {
      if (error) {
          console.error('Erro ao inserir dados no banco de dados:', error);
          return res.status(500).json({ error: 'Erro ao inserir dados no banco de dados' });
      }

      // Enviando a resposta de sucesso
      res.status(201).json({ message: 'Dados inseridos com sucesso' });
  });
});


app.put('/lista_produto/:id', (req, res) => {
  try {
      const { lista, produto, carrinho, quantidade_produto } = req.body;
      const id = req.params.id;

      // Criando a string da query SQL com placeholders para os valores
      const sqlQuery =  `UPDATE lista_produto SET lista=?, produto=?, carrinho=?, quantidade_produto=? WHERE id_lista_produto=?`;

      // Executando a query SQL
      db.query(sqlQuery, [lista, produto, carrinho, quantidade_produto, id], (error, results) => {
          if (error) {
              console.error('Erro ao atualizar dados na tabela lista_produto:', error);
              return res.status(500).json({ error: 'Erro ao atualizar dados na tabela lista_produto' });
          }

          // Verificando se algum registro foi afetado pela atualização
          if (results.affectedRows === 0) {
              return res.status(404).json({ error: 'Nenhum registro encontrado para atualizar' });
          }

          // Respondendo com sucesso
          res.json({ message: 'Dados atualizados com sucesso' });
      });
  } catch (error) {
      console.error('Erro ao atualizar dados na tabela lista_produto:', error);
      res.status(500).json({ error: 'Erro ao atualizar dados na tabela lista_produto' });
  }
});


app.delete('/lista_produto/:id', (req, res) => {
  try {
      const id = req.params.id;

      // Executando a query SQL para excluir o registro da tabela
      db.query(
          'DELETE FROM lista_produto WHERE id_lista_produto=?',
          [id],
          (error, results) => {
              if (error) {
                  console.error('Erro ao excluir dados na tabela lista_produto:', error);
                  return res.status(500).json({ error: 'Erro ao excluir dados na tabela lista_produto' });
              }

              // Verificando se algum registro foi excluído
              if (results.affectedRows === 0) {
                  return res.status(404).json({ error: 'Nenhum registro encontrado para excluir' });
              }

              // Respondendo com sucesso
              res.json({ message: 'Dados excluídos com sucesso' });
          }
      );
  } catch (error) {
      console.error('Erro ao excluir dados na tabela lista_produto:', error);
      res.status(500).json({ error: 'Erro ao excluir dados na tabela lista_produto' });
  }
});

// Define a simple route to retrieve data from MySQL
app.get('/produto', (req, res) => {
  // Execute a MySQL query
  db.query('SELECT * FROM produto', (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});
  
app.post('/produto', (req, res) => {
  const { nome, categoria } = req.body;

  // Executando a inserção no banco de dados
  db.query('INSERT INTO produto (nome, categoria) VALUES (?, ?)', [nome, categoria], (error, results, fields) => {
      if (error) {
          console.error('Erro ao inserir dados no banco de dados:', error);
          return res.status(500).json({ error: 'Erro ao inserir dados no banco de dados' });
      }

      // Enviando a resposta de sucesso
      res.status(201).json({ message: 'Dados inseridos com sucesso' });
  });
});

app.put('/produto/:id', (req, res) => {
  try {
      const { nome, categoria } = req.body;
      const id = req.params.id;

      // Criando a string da query SQL com placeholders para os valores
      const sqlQuery =  `UPDATE produto SET nome=?, categoria=? WHERE id_produto=?`;

      // Executando a query SQL
      db.query(sqlQuery, [nome, categoria, id], (error, results) => {
          if (error) {
              console.error('Erro ao atualizar dados na tabela produto:', error);
              return res.status(500).json({ error: 'Erro ao atualizar dados na tabela produto' });
          }

          // Verificando se algum registro foi afetado pela atualização
          if (results.affectedRows === 0) {
              return res.status(404).json({ error: 'Nenhum registro encontrado para atualizar' });
          }

          // Respondendo com sucesso
          res.json({ message: 'Dados atualizados com sucesso' });
      });
  } catch (error) {
      console.error('Erro ao atualizar dados na tabela produto:', error);
      res.status(500).json({ error: 'Erro ao atualizar dados na tabela produto' });
  }
});


app.delete('/produto/:id', (req, res) => {
  try {
      const id = req.params.id;

      // Executando a query SQL para excluir o registro da tabela
      db.query(
          'DELETE FROM produto WHERE id_produto=?',
          [id],
          (error, results) => {
              if (error) {
                  console.error('Erro ao excluir dados na tabela produto:', error);
                  return res.status(500).json({ error: 'Erro ao excluir dados na tabela produto' });
              }

              // Verificando se algum registro foi excluído
              if (results.affectedRows === 0) {
                  return res.status(404).json({ error: 'Nenhum registro encontrado para excluir' });
              }

              // Respondendo com sucesso
              res.json({ message: 'Dados excluídos com sucesso' });
          }
      );
  } catch (error) {
      console.error('Erro ao excluir dados na tabela produto:', error);
      res.status(500).json({ error: 'Erro ao excluir dados na tabela produto' });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
