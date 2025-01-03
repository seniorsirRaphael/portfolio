// JavaScript for smooth scrolling when clicking "Back to Main Page" button
document.querySelectorAll('.mainpagebutton').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    window.location.href = 'mainweb.html'; // Navigate to the main page
  });
});
