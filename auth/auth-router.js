const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');


router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12); 
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
          req.session.user = user;
        res.status(200).json({
          message: `Welcome ${user.username}!`,
        });
      } else {
        res.status(401).json({ message: 'You shall not pass!' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/logout', (req, res) => {
    if(req.session){
        req.session.destroy(err => {
            if(err) {
                res.json({ message: "Remember: You're here forever!"})
            } else {
                res.status(200).json({ message: "You're free as a bird now!"})
            }
        })
    } else {
        res.status(200).json({message: "May you wake to find you were ever but a dream."})
    }
})

module.exports = router;