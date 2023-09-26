import data from '../CH3-idzhar/assets/data.json' assert {type: 'json'};
import { v4 as uuidv4 } from 'uuid';
import express from 'express';
const app = express();
const PORT = 8000;
let cars = data;
app.use(express.json())


app.get('/', (req, res) => {
    res.status(200).json({message:"ping succesfully"})
})

// menampilkan list mobil
app.get('/cars', (req, res) => {
    res.status(200).json(cars)
})
// menampilkan list mobil berdasarkan id
app.get('/cars/:id', (req, res) => {
    const id = req.params.id;
    const car = cars.find((i) => i.id === id);
    
    res.status(200).json(car)
})

//delete
app.delete('/cars/:id', (req, res) => {
    const id = req.params.id;
    const list = cars.filter((i) => i.id != id);
    cars = list;
    res.json({ status: 'successful deleted' });
})

// tambah data
app.post('/cars', (req, res) => {
    const body = req.body;
    console.log(body);
    const { model, image, rentPerDay, capacity, description, availableAt } = req.body
    const newData = { id: uuidv4(), model, image, rentPerDay, capacity, description, availableAt };
    
    cars.push(newData);

    res.status(201).json(newData);
    

})
// update
app.put('/cars/:id', (req, res) => {

    const id = req.params.id
    const currentData = cars.find((i) => i.id === id)
    const payload = req.body;
    const updatedData = { ...currentData, ...payload }
    
    const exisitingId = cars.findIndex((i) => i.id === id)
    
    cars[exisitingId] = updatedData;
    res.status(200).json(updatedData);
})
app.listen(PORT,()=>console.log('listening on http://local'))   