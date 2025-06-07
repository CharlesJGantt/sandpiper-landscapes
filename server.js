const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const TurndownService = require('turndown');
const morgan = require('morgan');
require('dotenv').config();

const tinyMceApiKey = process.env.TINYMCE_API_KEY || 'no-api-key';

const app = express();
const turndownService = new TurndownService();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'static')));

    <script src="https://cdn.tiny.cloud/1/${tinyMceApiKey}/tinymce/6/tinymce.min.js" referrerpolicy="origin"></script>
app.get('/admin', (req, res) => {
  const file = req.query.file || '';
  let content = '';
  if (file && fs.existsSync(file)) {
    content = fs.readFileSync(file, 'utf8');
  }
  res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editor</title>
    <script src="https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js" referrerpolicy="origin"></script>
  </head>
  <body>
    <form method="post" action="/admin/save">
      <input type="hidden" name="file" value="${file}">
      <textarea id="editor" name="content">${content}</textarea>
      <button type="submit">Save</button>
    </form>
    <script>
      tinymce.init({ selector: '#editor' });
    </script>
  </body>
  </html>`);
});

app.post('/admin/save', (req, res) => {
  const file = req.body.file || 'content/posts/new-post.md';
  const html = req.body.content || '';
  const markdown = turndownService.turndown(html);
  fs.writeFileSync(file, markdown);
  res.redirect('/');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
