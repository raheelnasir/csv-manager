const express = require('express');
const router = express.Router();

router.post('/upload-csv', (req, res) => {
    const csvData = req.body.data;
    if (csvData && csvData.length > 0) {
        const firstRow = csvData[0];
        console.log(firstRow);
        res.json(firstRow);
    } else {
        res.status(400).json({ error: 'Invalid CSV data' });
    }
});

module.exports = router;