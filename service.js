const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');

const multiparty = require('connect-multiparty');
const MultipartyMiddleware = multiparty({ uploadDir: './images' });   

const morgan = require('morgan');

const path = require('path');

const fs = require('fs');
var cookieParser = require('cookie-parser')

const BlogModel = require('./models/Blog')
const PORT = process.env.PORT || 8000;

const app = express();

// cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
})
app.use(cors());
app.use(cookieParser())

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.use(express.static(__dirname + '/uploads'))

app.post('/upload', MultipartyMiddleware, (req, res) => {
  var TempFile = req.files.upload;
  var TempPathFile = TempFile.path;

  console.log(TempFile);

  const targetPathUrl = path.join(__dirname, "./uploads/" + TempFile.name)

  if (path.extname(TempFile.originalFilename).toLowerCase() === ".png" || ".jpg") {
    fs.rename(TempPathFile, targetPathUrl, err => {
      res.status(200).json({
        uploaded: true,
        url: `http://localhost:8000/${TempFile.originalFilename}`
      })

      if (err) return console.log(err)
    })
  }
  console.log(req.files.upload);
})

app.post('/addBlog', async (req, res) => {
  console.log(req.body)

  BlogModel.create({
    blogId:req.body.blogId,
    userId:req.body.userId,
    content:req.body.content
  })
  .then(data => res.json("Tao thanh cong"))
})

app.get('/listBlogPost', (req, res) => {
  BlogModel.find({
    userId: "1"
  })
  .then(data => res.json(data))
  .catch(err => res.json("ko tìm thấy data"))
})

app.listen(PORT, console.log(`Server started at: ${PORT}`));