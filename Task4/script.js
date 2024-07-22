document.addEventListener('DOMContentLoaded', () => {
  const bookList = document.getElementById('book-list');
  const bookForm = document.getElementById('book-form');
  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');

  const apiUrl = 'http://localhost:5000/api/books';

  const fetchBooks = async () => {
    try {
      const response = await fetch(apiUrl);
      const books = await response.json();
      bookList.innerHTML = books.map(book => `
        <div class="book">
          <h2>${book.title}</h2>
          <p>by ${book.author}</p>
          <button onclick="deleteBook('${book._id}')">Delete</button>
        </div>
      `).join('');
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const addBook = async (event) => {
    event.preventDefault();
    const newBook = {
      title: titleInput.value,
      author: authorInput.value
    };

    try {
      await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook)
      });
      titleInput.value = '';
      authorInput.value = '';
      fetchBooks();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  // Attach deleteBook to the window object to make it globally accessible
  window.deleteBook = deleteBook;

  bookForm.addEventListener('submit', addBook);
  fetchBooks();
});
