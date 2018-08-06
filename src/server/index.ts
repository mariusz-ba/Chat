// Module dependencies
import * as path from 'path';
import app from './app';
import wds from './wds';
wds(app);

const PORT = process.env.PORT || 3000;

// Send React application
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
})

// Start server
app.listen(PORT, () => console.log('Running on localhost:', PORT));


