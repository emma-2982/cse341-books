# Books API Week 02 Spec - Version 1

## Feature 1: Book CRUD Operations and Author References

### Goal

Update the existing Week 01 book API so book documents include a reference to an author and the API supports all CRUD operations for books. Every book route must be documented and testable in Swagger.

### Data Model

Book documents will be stored in the `books` collection.

Required book fields:

- `id`: string, required, custom id such as `b1`
- `authorId`: string, required, references the `id` field of an author document
- `title`: string, required
- `publicationDate`: string, required

Books will continue to use custom string ids instead of MongoDB `_id` values for route parameters.

### Relationship to Authors

Each book will identify its author with an `authorId` field. The value of `authorId` must match the custom `id` value of an existing author document.

When creating or updating a book, the API should reject the request with a `400` status code if the submitted `authorId` does not match an existing author.

### Routes

#### GET /books

Purpose: Return all books.

Success:

- Status code: `200`

- Response body: an array of book objects

Errors:

- `500` if an unexpected server or database error occurs

#### GET /books/:id

Purpose: Return one book by its custom id.

Success:

- Status code: `200`
- Response body: the matching book object

Errors:

- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

#### POST /books

Purpose: Create a new book.

Request body:

    {
      "id": "b4",
      "authorId": "a1",
      "title": "Example Book Title",
      "publicationDate": "2026-01-15"
    }

Success:

- Status code: `201`

- Response body: the newly created book object

Errors:

- `400` if a required field is missing
- `400` if the `id` already exists
- `400` if the `authorId` does not match an existing author
- `500` if an unexpected server or database error occurs

#### PUT /books/:id

Purpose: Update an existing book.

Request body:

    {
      "authorId": "a2",
      "title": "Updated Book Title",
      "publicationDate": "2026-02-20"
    }

Success:

- Status code: `200`
- Response body: the updated book object

Errors:

- `400` if a required field is missing
- `400` if the `authorId` does not match an existing author
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

#### DELETE /books/:id

Purpose: Delete an existing book.

Success:

- Status code: `204`
- Response body: none

Errors:

- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

### Swagger Documentation

Swagger must document every book route.

### Deployment Expectations

After implementation, the book routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every book route from the browser.

## Feature 2: Author CRUD Operations

## Spec

### Goal1

Create an `authors` collection to store author information, including author IDs, names, and birth years. The API must support all CRUD operations for authors. Every author route must be documented and testable in Swagger.

### Data Model2

Author documents will be stored in the `authors` collection.

Required author fields:

- `id`: string, required, custom id such as `a1`
- `name`: string, required, author's full name
- `birthYear`: number, required, the year the author was born

Authors will use custom string IDs instead of MongoDB `_id` values for route parameters.

### Relationship to Books

Books will reference authors through the `authorId` field in the `books` collection.

The value of a book's `authorId` must match the custom `id` of an existing author document.

An author can be associated with multiple books.

The API must prevent an author from being deleted if any books still reference that author's ID. If a client tries to delete an author who still has books, the API should return a `400` status code with a JSON error message.

### Routes2

#### GET /authors

Purpose: Return all authors.

Success:

- Status code: `200`
- Response body: an array of author objects

Errors:

- `500` if an unexpected server or database error occurs

#### GET /authors/:id

Purpose: Return one author by its custom ID.

Success:

- Status code: `200`
- Response body: the matching author object

Errors:

- `404` if no author exists with that ID
- `500` if an unexpected server or database error occurs

#### POST /authors

Purpose: Create a new author.

Request body:

    {
      "id": "a1",
      "name": "Chinua Achebe",
      "birthYear": 1930
    }

Success:

- Status code: `201`
- Response body: the newly created author object

Errors:

- `400` if a required field is missing or invalid
- `400` if the author ID already exists
- `500` if an unexpected server or database error occurs

#### PUT /authors/:id

Purpose: Update an existing author.

Request body:

    {
      "name": "Chinua Achebe",
      "birthYear": 1930
    }

Success:

- Status code: `200`
- Response body: the updated author object

Errors:

- `400` if a required field is missing or invalid
- `404` if no author exists with that ID
- `500` if an unexpected server or database error occurs

#### DELETE /authors/:id

Purpose: Delete an existing author.

Success:

- Status code: `204`
- Response body: none

Errors:

- `400` if the author still has books associated with their ID
- `404` if no author exists with that ID
- `500` if an unexpected server or database error occurs

### Swagger Documentation2

Swagger must document every author route, including request bodies, successful responses, and error responses.

### Deployment Expectations2

After implementation, the author routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every author route from the browser.

## Books API Week 02 Specification - Version 2

## General API Requirements

- The API must use the existing Express and MongoDB project.
- Books and authors must be stored in separate MongoDB collections.
- Both collections must use custom string IDs instead of MongoDB `_id` values for API route parameters.
- All endpoints must be documented and testable using Swagger.
- The API must return consistent JSON error messages.
- The API must validate client input before creating or updating documents.
- Unexpected server and database errors must be logged on the server without exposing sensitive internal details to clients.

## Feature 1: Book CRUD Operations and Author References2

### Description

- Update the existing Week 01 book API so book documents include a reference to an author.
- Add the remaining CRUD operations for books.
- Validate book request bodies before writing to MongoDB.
- Validate that each submitted `authorId` matches an existing author document.
- Add Swagger documentation for all book routes.
- Test the book routes locally and in the deployed Render application.

## Spec2

### Goal2

Update the existing Week 01 Books API to support all CRUD operations. Every book must reference an existing author through its `authorId` field. Every book route must be documented and testable in Swagger.

### Book Data Model

Book documents will be stored in the `books` collection.

Required book fields:

- `id`: string, required, unique custom ID such as `b1`
- `authorId`: string, required, references the custom `id` of an existing author
- `title`: string, required, non-empty
- `publicationDate`: string, required, valid date in `YYYY-MM-DD` format

The custom `id` must be unique. MongoDB must enforce uniqueness using a unique index on the `id` field.

### Relationship to Authors version2

Each book must identify its author through the `authorId` field.

The value of `authorId` must match the custom `id` of an existing document in the `authors` collection.

An author can be associated with multiple books.

When creating or updating a book, the API must verify that the submitted `authorId` belongs to an existing author.

If the author does not exist, the API must return `400 Bad Request` with a JSON error message.

### Book Routes

#### (Books) GET /books

Purpose: Return all books

Success:

- Status code: `200`
- Response body: an array of book opbjects

Errors:

- `500` if an unexpected server or database error occurs

If no books exist, `data` must be an empty array.

#### (BooksId) GET /books/:id

Purpose: Return one book by its custom ID.

Success:

- Status code: `200`
- Response body: the matching book object

Errors:

- `404` if no book exists with that ID
- `500` if an unexpected server or database error occurs

Example error response:

    {
      "message": "Book not found."
    }

#### (Create Books) POST /books

Purpose: Create a new book.
Request body:

    {
      "id": "b4",
      "authorId": "a1",
      "title": "Example Book Title",
      "publicationDate": "2026-01-15"
    }

Success:

- Status code: `201`
- Response body: the newly created book object

Errors:

- `400` if a required field is missing or invalid
- `400` if the authorId does not match an existing author
- `409` if the book ID already exists
- `500` if an unexpected server or database error occurs

Example duplicate ID response:

    {
      "message": "A book with this ID already exists."
    }

#### PUT /books/:id v2

Purpose: Replace the editable information of an existing book.

PUT requires all editable fields to be included in the request body. The custom book ID is provided in the URL and cannot be changed.

Request body:

    {
      "authorId": "a2",
      "title": "Updated Book Title",
      "publicationDate": "2026-02-20"
    }

Success:

- Status code: `200`
- Response body: the updated book object

Errors:

- `400` if a required field is missing or invalid
- `400` if the authorId does not match an existing author
- `404` if no book exists with that ID
- `500` if an unexpected server or database error occurs

#### DELETE /books/:id version 2

Purpose: Delete an existing book.

Success:

- Status code: `204`
- Response body: none

Errors:

- `404` if no book exists with that ID
- `500` if an unexpected server or database error occurs

### Swagger Documentation1

Swagger must document every book route, including:

- HTTP methods and endpoint paths
- Path and query parameters
- Request body schemas
- Successful response examples
- Error status codes and JSON response examples

### (Books) Deployment Expectations

After implementation, all book routes must work locally and from the deployed Render application.

The deployed Swagger page at `/api-docs` must allow someone to test every book route from the browser.

## Feature 2 (Author): Author CRUD Operations

### Description (Author)

Create an authors collection in MongoDB to store author information.

Implement CRUD operations for authors using Express routes and the MongoDB native driver.

Each author must have a unique custom string id.

Ensure books can reference authors through the authorId field in the books collection.

Prevent an author from being deleted while books still reference that author.

Add Swagger/OpenAPI documentation for all author endpoints.

Include input validation and consistent error handling.

Ensure the API works locally and on the deployed Render application.

## (Author) Spec

### (Auhtor) Goal

Create an `authors` collection to store author IDs, names, and birth years. The API must support all CRUD operations for authors and maintain the relationship between authors and books.

Every author route must be documented and testable in Swagger.

### (Author0) Data Model

Author documents will be stored in the `authors` collection.

Required author fields:

- `id`: string, required, unique custom ID such as `a1`
- `name`: string, required, author's full name
- `birthYear`: number, required, the year the author was born, Valid year that is not in the future.

Example author document:

{
  "id": "a1",
  "name": "Chinua Achebe",
  "birthYear": 1930
}

### (Author) Relationship to Books

Books will reference authors through the `authorId` field in the `books` collection.

The value of a book's `authorId` must match the custom `id` of an existing author document.

An author can be associated with multiple books.

The API must prevent an author from being deleted if any books still reference that author's ID.

If a client tries to delete an author who still has books, the API must return `409 Conflict` with a JSON error message.

### Validation Rules

- All required fields must be present.
- `id` and `name` must be strings.
- The name must not be empty or contain only whitespace.
- `birthYear` must be a valid number and must not be in the future.
- Duplicate author IDs must be rejected.
- The API must reject invalid request data before saving it to MongoDB.

### Routes for Author

#### (Author) GET /authors

Purpose: Return all authors.

Success:

- Status code: `200`
- Response body: an array  object containing all the authotrs.

Example response:

   [
  {
    "id": "a1",
    "name": "Chinua Achebe",
    "birthYear": 1930
  }
]

Errors:

- `500` if an unexpected server or database error occurs

#### (AuthorId) GET /authors/:id

Purpose: Return one author by their custom ID.

Success:

- Status code: `200`
- Response body: the matching author object

Errors:

- `404` if no author exists with that ID
- `500` if an unexpected server or database error occurs

Example error response:

    {
      "message": "Author not found."
    }

#### (Create) POST /authors

Purpose: Create a new author.

Request body:

    {
      "id": "a1",
      "name": "Chinua Achebe",
      "birthYear": 1930
    }

Success:

- Status code: `201`
- Response body: the newly created author object

Errors:

- `400` if a required field is missing or invalid
- `409` if the author ID already exists
- `500` if an unexpected server or database error occurs

Example duplicate ID response:

    {
      "message": "An author with this ID already exists."
    }

#### (Author) PUT /authors/:id

Purpose: Replace the editable information of an existing author.

PUT requires all editable fields to be included in the request body. The custom author ID is provided in the URL and cannot be changed.

Request body:

    {
      "name": "Chinua Achebe",
      "birthYear": 1930
    }

Success:

- Status code: `200`
- Response body: the updated author object

Errors:

- `400` if a required field is missing or invalid
- `404` if no author exists with that ID
- `500` if an unexpected server or database error occurs

#### (Remove) DELETE /authors/:id

Purpose: Delete an existing author.

Before deleting an author, the API must check whether any books reference that author's custom ID.

Success:

- Status code: `204`

- Response body: none

Errors:

- `409` if books are still associated with that author
- `404` if no author exists with that ID
- `500` if an unexpected server or database error occurs

Example conflict response:

    {
      "message": "Cannot delete author because books are still associated with this author."
    }

The deletion process must protect the relationship between books and authors so that books are not left referencing a deleted author.

### (Swagger) Swagger Documentation

Swagger must document every author route, including:

- HTTP methods and endpoint paths
- Path and query parameters
- Request body schemas
- Successful response examples
- Error status codes and JSON response examples

### (Test) Deployment Expectations

After implementation, all author routes must work locally and from the deployed Render application.

The deployed Swagger page at `/api-docs` must allow someone to test every author route from the browser.
