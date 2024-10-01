const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000; // You can change the port if necessary

// Middleware to parse JSON request body
app.use(express.json());

// Serve the PDF based on reference ID
app.post('/get-pdf', (req, res) => {
    const { referenceId } = req.body;
    const pdfDirectory = 'C:/PDF';
    const filePath = path.join(pdfDirectory, `${referenceId}.pdf`);
  
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json({ error: 'PDF not found' });
      }
  
      const pdfUrl = `http://192.168.42.36:3000/pdfs/${referenceId}.pdf`;
      res.json({ pdfUrl });
    });
  });
  
// Serve the PDFs as static files
app.use('/pdfs', express.static('C:/PDF'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
