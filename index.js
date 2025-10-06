	
const serverless = require('serverless-http');
const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.get('/items', async (req, res) => {
    res.send('List of items');
    const items = JSON.parse(fs.readFileSync(path.join(__dirname, 'items.json')));
    res.json(items);
});

app.get('/items/:id', function (req, res) {
  const items = JSON.parse(fs.readFileSync(path.join(__dirname, 'items.json')));
  const item = items.find(i => i.id === req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

app.post('/items', async (req, res) => {
    const newItem = req.body;
    const items = JSON.parse(fs.readFileSync(path.join(__dirname, 'items.json')));
    items.push(newItem);
    fs.writeFileSync(path.join(__dirname, 'items.json'), JSON.stringify(items));
    res.status(201).json(newItem);
});

app.put('/items/:id', async (req, res) => {
    const updatedItem = req.body;
    const items = JSON.parse(fs.readFileSync(path.join(__dirname, 'items.json')));
    const index = items.findIndex(i => i.id === req.params.id);
    if (index !== -1) {
        items[index] = { ...items[index], ...updatedItem };
        fs.writeFileSync(path.join(__dirname, 'items.json'), JSON.stringify(items));
        res.json(items[index]);
    } else {
        res.status(404).json({ error: "Item not found" });
    }
});

app.delete('/items/:id', async (req, res) => {
  const items = JSON.parse(fs.readFileSync(path.join(__dirname, 'items.json')));
  const index = items.findIndex(i => i.id === req.params.id);
  if (index !== -1) {
      items.splice(index, 1);
      fs.writeFileSync(path.join(__dirname, 'items.json'), JSON.stringify(items));
      res.status(204).send();
  } else {
      res.status(404).json({ error: "Item not found" });
  }
});
 
module.exports.handler = serverless(app);