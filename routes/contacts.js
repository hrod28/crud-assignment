'use strict';

const express = require('express');
const knex = require('../knex');
const router = express.Router();

router.get('/contacts', (req, res, next)=>{
  knex('contacts')
  .orderBy('first_name', 'asc')
  .then((rows)=>{
    var contacts = (rows[0]);
    res.send(contacts);
  })
  .catch((err)=>{
    next(err);
  });

});

router.post('/contacts', (req, res, next)=>{
  knex('contacts')
  .insert({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  }, '*')
    .then((rows)=>{
      var contacts = (rows[0]);
      res.send(contacts);
    })
    .catch((err)=>{
      next(err);
    });
});

router.patch('/contacts/:id', (req, res, next)=>{
  knex('contacts')
  .where('id', req.params.id)
  .first()
  .then((row)=>{
    var contact = (row);
    if(!contact){
      return next();
    }
    return knex('contacts')
    .update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    }, '*')
    .where('id', req.params.id);

    })
    .then((rows)=>{
      var contacts = (rows[0]);
      res.send(contacts);
    })
    .catch((err)=>{
      next(err);
    });
  });

  router.delete('/contacts/:id', (req, res, next)=>{
    knex('contacts')
    .where('id', req.params.id)
    .first('first_name', 'last_name')
    .then((row)=>{
      knex('contacts')
      .where('id', req.params.id)
      .del()
      .then((rowsAffected)=>{
        if(rowsAffected === 0) {
          next('no contact to delete');
        }
        else {
          res.send(row);
        }
      });
      })
      .catch((err)=>{
        next(err);
      });
    });

module.exports = router;








  )
