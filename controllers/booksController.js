import Book from '../models/booksModel.js';

export default {

    create: (req, res) => {
        if (!req.body) {
            res.status(400).send({
                message: 'Content cannot be empty'
            });
        }
    
        const book = new Book(
            req.body.title,
            req.body.author,
            req.body.genre,
            req.body.language,
            req.body.published,
            req.body.isbn
        );
    
        Book.create(book, (err, data) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message || 'Some error occurred while creating the book.'
                });
            }
            else {
                res.send(data);
            }
        });
    },

    getAll: (req, res) => {

        Book.getAll((err, data) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message || 'Some error occured while retrieving the books.'
                })
            }
            else {
                res.send(data);
            }   
        }); 
    },

    get: (req, res) => {
        
        Book.get(req.params.id, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                  res.status(404).send({
                    message: `Book not found with search id ${req.params.id}.`
                  });
                } else {
                  res.status(500).send({
                    message: "Error retrieving book with id " + req.params.id
                  });
                }
              } else res.send(data);

        })
    } 
}
