import express from 'express';
import cors from 'cors';
// bodyParser allows us to take in the incoming POST request body
import bookRoutes from './routes/bookRoutes.js';

const app = express();
const PORT = 5000;

var corsOptions = {
    origin: "http://localhost:5001"
}

app.use(cors(corsOptions));

// Enables parsing JSON-formatted request bodies
app.use(express.json());
// Enables parsing URL-encoded request bodies, often used for form submissions.
app.use(express.urlencoded({extended: true}));

app.use('/books', bookRoutes);

// path, callback function (req can contain request query string, parameters,
// body, HTTP headers. res contains info wants to send).
app.get('/', (req, res) => res.send('HELLO FROM HOMEPAGE'));

// app.get('/', (req, res));

app.listen(PORT, () => console.log('Server running on port http://localhost:' 
    + PORT));
