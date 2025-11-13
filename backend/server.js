const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const odbc = require('odbc');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Replace with your DSN or full connection string
const connectionString = "DSN=BillingDSN;UID=sa;PWD=1234";

// Utility function to get connection
async function getConnection() {
  return await odbc.connect(connectionString);
}

// ------------------- CRUD APIs -------------------

// Get all groups
app.get('/api/group', async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query('SELECT * FROM Groups'); // your table name
    await connection.close();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new group
app.post('/api/group', async (req, res) => {
  const { GroupName, TGroupName } = req.body;
  try {
    const connection = await getConnection();
    const query = `INSERT INTO Groups (GroupName, TGroupName) VALUES (?, ?)`;
    await connection.query(query, [GroupName, TGroupName]);
    await connection.close();
    res.send('Group inserted successfully!');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a group
app.put('/api/group/:id', async (req, res) => {
  const id = req.params.id;
  const { GroupName, TGroupName } = req.body;
  try {
    const connection = await getConnection();
    const query = `UPDATE Groups SET GroupName=?, TGroupName=? WHERE GroupID=?`;
    await connection.query(query, [GroupName, TGroupName, id]);
    await connection.close();
    res.send('Group updated successfully!');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a group
app.delete('/api/group/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const connection = await getConnection();
    const query = `DELETE FROM Groups WHERE GroupID=?`;
    await connection.query(query, [id]);
    await connection.close();
    res.send('Group deleted successfully!');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});

