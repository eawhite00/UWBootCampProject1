//function for grabbing the search input and storing it in the searchQuery variable
function handleSubmit(event) {
    // prevent page from reloading when form is submitted
    event.preventDefault();
    // get the value of the input field
    const input = document.querySelector('.searchForm-input').value;
    // remove whitespace from the input
    const searchQuery = input.trim();
    // print `searchQuery` to the console
    console.log(searchQuery);
    // call `fetchResults` and pass it the `searchQuery`
    fetchResults(searchQuery);
  }


//function that fetches the wikipedia result from the search query using wikipedia api call
  function fetchResults(searchQuery) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=3&srsearch=${searchQuery}`;
    console.log(endpoint);
    fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const results = data.query.search;
      displayResults(results);
    })
    .catch(() => console.log('An error occured'));
}

function displayResults(results) {
    // Store a reference to `.searchResults`
    const searchResults = document.querySelector('.searchResults');
    // Remove all child elements
    searchResults.innerHTML = '';
    // Loop over results array
    results.forEach(result => {
     const url = encodeURI(`https://en.wikipedia.org/wiki/${result.title}`);
  
     searchResults.insertAdjacentHTML('beforeend',
        `<div class="resultItem">
          <h3 class="resultItem-title">
            <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
          </h3>
          <span class="resultItem-snippet">${result.snippet}</span><br>
          <a href="${url}" class="resultItem-link" target="_blank" rel="noopener">${url}</a>
        </div>`
      );
    });
}
  

//grabbing form element and storing it in a variable

const form = document.querySelector('.searchForm');

//event listener for the submit button so the search query is captured when form submits

form.addEventListener('submit', handleSubmit);