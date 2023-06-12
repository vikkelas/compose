const { v4: uuidv4 } = require('uuid');
module.exports = class Book {
    constructor(
        title='',
        description = '',
        authors='',
        favorite='',
    ) {
        this.id = uuidv4();
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
    }
}
