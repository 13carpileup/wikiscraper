const express = require('express');
const path = require('path');
const mainRoutes = require('./src/routes/mainRoutes');
const autocompleteRoutes = require('./src/routes/autocompleteRoutes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use('/', mainRoutes);
app.use('/autocomplete', autocompleteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
