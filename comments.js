// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const commentsPath = path.join(__dirname, 'comments.json');
const comments = require('./comments.json');

app.use(bodyParser.json());

// Get all comments
app.get('/api/comments', (req, res) => {
    res.json(comments);
});

// Post a new comment
app.post('/api/comments', (req, res) => {
    comments.push(req.body);
    fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
        if (err) {
            res.status(500).json({error: err});
        } else {
            res.status(201).json(req.body);
        }
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
```

## 3.3. Create web server with Express (using middleware)

### 3.3.1. Middleware

- Middleware: a function that has access to the request object (req), the response object (res), and the next function in the application’s request-response cycle.
- Middleware can:
  - Execute any code.
  - Make changes to the request and the response objects.
  - End the request-response cycle.
  - Call the next middleware function in the stack.

### 3.3.2. Create web server with Express

```javascript
// Path: app.js
// Create web server with Express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const commentsPath = path.join(__dirname, 'comments.json');
const comments = require('./comments.json');

app.use(bodyParser.json());

// Middleware
app.use((req, res, next) => {
    console.log('Middleware');
    next();
});

// Get all comments
app.get('/api/comments', (req, res) => {
    res.json(comments);
});

// Post a new comment
app.post('/api/comments', (req, res) => {
    comments.push(req.body);
    fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
        if (err) {
            res.status(500).json({error: err});
        } else {
            res