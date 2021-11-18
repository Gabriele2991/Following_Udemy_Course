const express = require('express');
const router = express.Router();

router.use((req, res, next) => {//EVERY ROUTE IN HERE WILL USE THIS MIDDLEWARE and if i don't add isAdmin = true i will not get into that
    if (req.query.isAdmin) {
        next();
    } else {
        res.send('Sorry,not an admin');
    }
});

router.get('/topsecret', (req, res) => {
    res.send('Top secret');
})

router.post('/deleteeverything', (req, res) => {
    res.send('Destry all evidences');
})

module.exports = router;