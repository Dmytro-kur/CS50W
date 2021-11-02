document.addEventListener('DOMContentLoaded', () => {
    
    posts_filter('following');
    retrieve_post(localStorage.getItem('posts_filter'), 0, 10);

})