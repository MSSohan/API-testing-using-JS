const loadQuote = () => {
    const blockQuote = document.getElementById('quote');
    blockQuote.innerText = "Loading..."; // Show loading text

    fetch('https://api.kanye.rest/')
        .then(res => res.json())
        .then(data => displayQuotes(data))
        .catch(error => {
            console.error('Error fetching the quote:', error);
            blockQuote.innerText = "An error occurred. Please try again.";
        });
};

const displayQuotes = (quote) => {
    const blockQuote = document.getElementById('quote');
    blockQuote.innerText = quote.quote;
    
    blockQuote.classList.add('fade-in'); // Add fade-in effect
    setTimeout(() => {
        blockQuote.classList.remove('fade-in');
    }, 2000); // Remove fade-in effect after 2 second
};

// Load a quote when the page loads
document.addEventListener("DOMContentLoaded", loadQuote);
