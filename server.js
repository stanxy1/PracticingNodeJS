let express = require('express')
let formidable = require('formidable')
let app = express()
app.get('/', (req, res)=>{
  res.sendFile('index.html', {root:__dirname})
  console.log("Received connection from "+ req.hostname)
})
app.post('/', (req, res)=>{
  let form = new formidable.IncomingForm()
  form.parse(req)
  form.on('fileBegin', (name, file)=>{
    file.filepath = __dirname + '/uploads/' + file.originalFilename
  })
  form.on('file', (name, file)=>{
    console.log("File was saved successfully to " + file.filepath)
  })
  res.sendFile('index.html', {root:__dirname})
  delete form

})
app.listen(8080, ()=>{
  console.log("Listening on port :8080")
})