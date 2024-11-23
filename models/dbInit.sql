CREATE TABLE IF NOT EXISTS Books (
    BookId INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(255) NOT NULL,
    Author VARCHAR(255) NOT NULL,
    Genre VARCHAR(255),
    Language VARCHAR(255),
    Published DATE,
    ISBN CHAR(13)
);

CREATE TABLE IF NOT EXISTS Libraries (
    LibraryId INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Users (
    UserId INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    AllowedToBorrow Boolean DEFAULT TRUE

);

CREATE TABLE IF NOT EXISTS BorrowedBooks (
    LoanId INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    BookId INT UNSIGNED,
    UserId INT UNSIGNED,
    StartDate DATE NOT NULL,
    DueDate DATE NOT NULL,
    ReturnDate DATE,
    FineAmount INT UNSIGNED DEFAULT 0,
    FOREIGN KEY (BookId) REFERENCES Books(BookId),
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
);

CREATE TABLE IF NOT EXISTS HasBooks (
    BookId INT UNSIGNED,
    LibraryId INT UNSIGNED,
    Available SMALLINT UNSIGNED NOT NULL,
    NoCopies SMALLINT UNSIGNED NOT NULL,
    FOREIGN KEY (BookId) REFERENCES Books(BookId),
    FOREIGN KEY (LibraryId) REFERENCES Libraries(LibraryId)
);

INSERT INTO Books(Title, Author, Genre, Language, Published, ISBN)
VALUES ('The fellowship of the Ring', 'J.R.R. Tolkien', 'Fantasy', 'English',
    '1991-07-04', '9780261102354'),
        ('Im Westen nichts Neues', 'Erich Maria Remarque', 'War novel',
        'German', '2014-03-08', '9780261102354');

INSERT INTO Users(FirstName, LastName)
VALUES ('John', 'Doe'),
        ('Erik', 'Larsson');

INSERT INTO Libraries(Name)
VALUES ('Högdalen'),
        ('Örby');

INSERT INTO HasBooks(LibraryId, BookId, Available, NoCopies)
VALUES 
    (1, 1, 3, 3),
    (2, 1, 1, 2),
    (1, 2, 0, 1);