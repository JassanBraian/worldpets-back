const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
// Routes
const publicationRoutes = require('./routes/publicationRoutes');
<<<<<<< HEAD
const commentRoutes = require('./routes/commentRoutes');
const favouriteRoutes = require('./routes/favouriteRoutes');

=======
const userRoutes = require('./routes/userRoutes');
>>>>>>> d9aee904580db3134017aef9990c2d156103c8de
connectDB();
dotenv.config();

const app = express();

app.use(express.json({ limit: '10kb' }));

app.use('/api/v1/publication', publicationRoutes);
app.use('/api/v1/user', userRoutes);

app.use('/api/v1/comment', commentRoutes);

app.use('/api/v1/favourite', favouriteRoutes);

const port = process.env.PORT || 4500;

app.listen(port, () => {
    console.log(`Server running in port ${port}`);
});
