const router = require('express').Router();

const Empleado = require('../models/Empleado');
const { isAuthenticated } = require('../helpers/auth');

router.get('/empleados/add', isAuthenticated, (req, res) => {
  res.render('empleados/new-emp');
});

router.post('/empleados/new-emp', isAuthenticated, async (req, res) => {
  const {nombre, description, correo, direccion } = req.body;
  const errors = [];
  if(!nombre){
    errors.push({text: 'Ingrese un Nombre'});
  }
  if(!description){
    errors.push({text: 'Ingrese un numero de Telefono'});
  }
  if(errors.length > 0){
    res.render('empleados/new-emp', {
      errors,
      nombre,
      description
    });
  }else{
    const newEmp = new Empleado({ nombre, description, correo, direccion });
    await newEmp.save();
    req.flash('success_msg', 'Empleado Agregado');
    res.redirect('/empleados');
  }
});

router.get('/empleados', isAuthenticated, async (req, res) => {
const empleados = await Empleado.find().sort({date: 'desc'}).lean();
res.render('empleados/allEmp', { empleados });
});

router.get('/empleados/edit/:id', isAuthenticated, async (req, res) => {
  const empleado = await Empleado.findById(req.params.id).lean();
  req.flash('success_msg', 'Empleado actualizado correctamente');
  res.render('empleados/edit-Emp', { empleado });
});

router.put('/empleados/edit-Emp/:id', isAuthenticated, async (req, res) => {
  const { nombre, description, correo, direccion } = req.body;
  await Empleado.findByIdAndUpdate(req.params.id, { nombre, description, correo, direccion }).lean();
  req.flash('success_msg', 'Empleado actualizado correctamente');
  res.redirect('/empleados');
});

router.delete('/empleados/delete/:id', isAuthenticated, async (req, res) => {
  await Empleado.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Empleado eliminado correctamente');
  res.redirect('/empleados');
});

module.exports = router;
