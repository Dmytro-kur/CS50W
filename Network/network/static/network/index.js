document.addEventListener('DOMContentLoaded', function() {
    
    posts_filter('All');
    username();
    retrieve_post(localStorage.getItem('posts_filter'), 0, 10);

    classic('#editor')
    .then(postEditor => {
        document.querySelector('#submit-post').onclick =  () => {
            const editorData = postEditor.getData();
            compose(editorData);
            postEditor.setData('<p>Write your post here.</p>');
            return false;
        };
    });
});