const router = require('express').Router();
const helmet = require('helmet');
const Users = require('./users-model.js');
const cors = require('cors');
const bcrypt = require('bcryptjs');





router.use(helmet());
router.use(cors());

router.get('/', (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

// router.post('/register', (req, res) =>{
//     let user = req.body;

//     const hash = bcrypt.hashSync(user.password, 12);

//     user.password = hash;

//     Users.add(user)
//     .then(saved => {
//         res.status(201).json(saved);
//     })
//     .catch(error => {
//         res.status(500).json(error);
//     })
// })

module.exports = router;
