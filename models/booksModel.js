import sql from './db.js';

class Book {
    constructor(title, author, genre, language, published, isbn) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.language = language;
        this.published = published;
        this.isbn = isbn;
    }

    static create(newBook, result) {
        var query = 'INSERT INTO Books SET ?';
        sql.query(query, newBook, (err, res) => {
                console.log("test");
                if (err) {
                    console.log('error: ', err);
                    result(err, null);
                    return;
                }

                console.log('created book: ', { BookId: res.BookId, ...newBook });
                result(null, { BookId: res.BookId, ...newBook} );
            })
    };

    static getAll(result) {
        var query = `
        SELECT b.Title, b.Author, b.Genre, b.Language, b.Published, b.ISBN, 
            l.Name, h.NoCopies, h.Available 
        FROM Books AS b  
        INNER JOIN HasBooks AS h ON b.BookId = h.BookId 
        INNER JOIN Libraries AS l ON h.LibraryId = l.LibraryId
        `;
        sql.query(query, (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
                return;
            }

            console.log('Books: ', res);
            result(null, res);
        })
    };

    static get(id, result) {
        var query = `
        SELECT b.Title, b.Author, b.Genre, b.Language, b.Published, b.ISBN,
            l.Name, h.NoCopies, h.Available
        FROM Books AS b
        INNER JOIN HasBooks AS h ON b.BookId = h.BookId
        INNER JOIN Libraries AS l ON h.LibraryId = l.LibraryId
        WHERE b.BookId = ${id}
        `;
        sql.query(query, (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log('found book: ', res)
                result(null, res);
                return
            }

            console.log({kind: 'not_found'}, null);
            result(null, res);
        })
    }
}

export default Book;