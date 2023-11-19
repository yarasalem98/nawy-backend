import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Mock database
let apartments = [
  { id: 1, title: 'Apartment 1', description: 'This is apartment 1.' },
  { id: 2, title: 'Apartment 2', description: 'This is apartment 2.' },
  { id: 3, title: 'Apartment 3', description: 'This is apartment 3.' }
];

// API endpoint for listing apartments
app.get('/apartments', (req: Request, res: Response) => {
  res.json(apartments);
});

// API endpoint for getting apartment details
app.get('/apartments/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const apartment = apartments.find(apartment => apartment.id === id);
  if (apartment) {
    res.json(apartment);
  } else {
    res.status(404).json({ error: 'Apartment not found.' });
  }
});

// API for adding apartments
app.post('/apartments', (req: Request, res: Response) => {
  const { title, description } = req.body;
  const id = apartments.length + 1;
  const newApartment = { id, title, description };
  apartments.push(newApartment);
  res.status(201).json(newApartment);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});