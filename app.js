const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const stageRoute = require('./routes/stage_route');
const fileUpload_route = require('./routes/fileUpload_route');
const { sequelize } = require('./models'); 

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use('/api/stages', stageRoute);
app.use('/api/files', fileUpload_route);

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false })
    .then(() => {
        console.log('Database connected successfully');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An internal error occurred.' });
});

module.exports = app;
