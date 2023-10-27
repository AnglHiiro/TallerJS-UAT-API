const express = require('express')
const uuid = require('uuid');
const router = express.Router()
router.use(express.json());
const fs = require('fs');

router.post(`/user/create`, async (req, res) => {
    try {
        const id = uuid.v4()
        const data = JSON.parse(fs.readFileSync('notes.json', 'utf8'));
        data.push({ id: id, notes: [] })
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync('notes.json', jsonData, 'utf8');

        res.status(200).json({
            status: 200,
            message: "El usuario ha sido creado con exito",
            body: [{id: id}]
        })
    } catch (err) {
        res.status(500).json({status: 500, error: err.message });
    }
})

router.get(`/notes/:id`, async (req, res) => {
    try {
        if (req.params.id) {
            const data = JSON.parse(fs.readFileSync('notes.json', 'utf8'));
            const userNotes = data.find(item => item.uuid == req.params.uuid);
            res.status(200).json({
                status: 200,
                message: "Los resultados se han obtenido exitosamente",
                body: [{notes: userNotes.notes}]
            })
        } else {
            res.status(500).json({ message: "No envio el ID" });
        }
    } catch (err) {
        res.status(500).json({status: 500, error: err.message });
    }
})


router.post(`/notes/create`, async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            res.status(401).json({
                status: 401,
                message: 'Todos los campos son requeridos'
            });
        } else {

            const id = uuid.v4()
            const data = JSON.parse(fs.readFileSync('notes.json', 'utf8'));
            const userNotes = data.find(item => item.id == req.body.uuid);
            req.body.note['uuid'] = id
            userNotes.notes.push(req.body.note)
            const jsonData = JSON.stringify(data, null, 2);
            fs.writeFileSync('notes.json', jsonData, 'utf8');

            res.status(200).json({
                status: 200,
                message: "La nota ha sido creada con exito",
                body: [{uuid: id}]
            })

        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.post(`/notes/edit`, async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            res.status(401).json({
                status: 401,
                message: 'Todos los campos son requeridos'
            });
        } else {

            const data = JSON.parse(fs.readFileSync('notes.json', 'utf8'));
            const userNotes = data.find(item => item.id == req.body.uuid);
            const updatedNotes = userNotes.notes.filter(note => note.uuid != req.body.note.uuid)
            updatedNotes.push(req.body.note)
            userNotes.notes = updatedNotes
            const jsonData = JSON.stringify(data, null, 2);
            fs.writeFileSync('notes.json', jsonData, 'utf8');

            res.status(200).json({
                status: 200,
                message: "La nota ha sido actualizada con exito",
            })

        }
    } catch (err) {
        res.status(500).json({status: 500, error: err.message });
    }
})


router.post(`/notes/delete`, async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            res.status(401).json({
                status: 401,
                message: 'Todos los campos son requeridos'
            });
        } else {
            
            const data = JSON.parse(fs.readFileSync('notes.json', 'utf8'));
            const userNotes = data.find(item => item.id == req.body.uuid);
            const updatedNotes = userNotes.notes.filter(note => note.uuid != req.body.note.uuid)
            userNotes.notes = updatedNotes
            const jsonData = JSON.stringify(data, null, 2);
            fs.writeFileSync('notes.json', jsonData, 'utf8');

            res.status(200).json({
                status: 200,
                message: "La nota ha sido eliminada con exito"
            })

        }
    } catch (err) {
        res.status(500).json({status: 500, error: err.message });
    }
})

module.exports = router