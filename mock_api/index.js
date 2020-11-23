const fs = require('fs');
const db = JSON.parse(fs.readFileSync('./mock_api/db.json').toString());
const app = require('express')();
const morgan = require('morgan');
const cors = require('cors');

app.use(morgan('dev'));
app.use(cors());

app.get('/api', (req, res) => {
  const { q = "", limit = 10 } = req.query;
  const results = db.filter(el =>
    el.first_name.toLowerCase().indexOf(q.toLowerCase()) > 0 || el.last_name.toLowerCase().indexOf(q.toLowerCase()) > 0
  );
  results.sort((a, b) => Math.max(a.first_name.toLowerCase().indexOf(q.toLowerCase()), b.first_name.toLowerCase().indexOf(q.toLowerCase())));
  res.json(results.slice(0, limit));
});

app.listen(8080, () => console.log('Server listening at http://localhost:8080'));