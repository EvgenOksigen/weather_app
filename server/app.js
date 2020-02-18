var express = require('express');
const app = express();
const port = 3010;

app.get('/', (req, res)=>res.send('Hello World'));
// app.post()
app.get('/users', (req, res)=>res.json([
  {id:1, username:'somebody'},
  {id:2, username:'somebody_else'}
]))

app.listen(port, ()=>console.log(`Example app listening on port ${port}!`));