class BookStore {
    constructor(bookId) {
        this.bookId = bookId;
        this.count = 0;
    }
    incCount(){
        this.count++
    }
}

module.exports = BookStore;