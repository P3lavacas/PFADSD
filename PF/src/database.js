const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/PFN', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndmodify: false,
  useUnifiedTopology: true
})
.then(db => console.log('DB conectada'))
.catch(err => console.error(err));
/*'mongodb://localhost/PFN'*/ //correr base de datos en localhost

//'mongodb+srv://Pelavacas:<durasno123A>@inmuebles-rmrcl.mongodb.net/<PFN>?retryWrites=true&w=majority' 'corre bd en prod'
