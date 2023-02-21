const express = require('express');
const router = express.Router();
const fs = require('fs');

router.post(
    '/',
    async (req, res) => {
        const path = req.body.data
        try {
            fs.stat(path, (err, stats) => {
                if(err) {
                    throw err;
                }
                return res.json(stats.mtime);
            })
        } catch (err) {
            console.error(err.message);
            return res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
