const express = require('express');
const router = express.Router();
const Appointment = require('../models/AppointmentModel')

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//CREATE
router.post('/post', async (req, res) => {
  const {name, email, place, date} = req.body;
  const appointment = new Appointment({
    name,
    email,
    place,
    date,
  });

  await appointment.save()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({message: err.message})
    })
});


//READ
router.get('/:email', async (req, res) => {
  const email = req.params.email;
  await Appointment.find({email: email})
    .then(data => {
      data.length > 0 ?
      res.status(200).json(data)
      :
      res.status(404).json({message: 'Nenhum agendamento encontrado.'})
    })
    .catch(err => {
      res.status(500).json({message: 'Aconteceu um erro, tente novamente.'})
    })
});


//UPDATE
router.put('/:id', (req, res) => {
  const id = req.params.id;

  Appointment.findByIdAndUpdate(id, req.body)
    .then(data => {
      !data ?
      res.status(404).json({message: 'A atualização falhou. Agendamento não encontrado.'})
      :
      res.status(200).json({message: 'Agendamento atualizado com sucesso.'});
    })
    .catch(err => {res.status(500).json({message: 'Erro ao atualizar agendamento.'})
    });
});


//DELETE
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Appointment.findByIdAndDelete(id)
    .then(data => {
      !data ?
      res.status(404).json({message: 'Não foi possível cancelar o agendamento. Agendamento não encontrado.'})
      :
      res.status(200).json({message: 'Agendamento cancelado'});
    })
    .catch(err => {res.status(500).json({message: 'Erro ao cancelar agendamento.'})
    });
});

module.exports = router;
