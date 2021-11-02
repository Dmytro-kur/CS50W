document.addEventListener('DOMContentLoaded', () => {
    
    posts_filter(window.location.pathname.slice(9));
    retrieve_post(localStorage.getItem('posts_filter'), 0, 10);

    if (document.querySelector('#load_photo')) {
        document.querySelector('#load_photo').onclick = ()=> {
            let input = document.querySelector('#photo_input')
            fetch(`${window.location.pathname}`, {
                method: 'POST',
                body: input.files[0],
            })
            .then(response => response.json())
            .then(error => {
                console.log(error)
            })
            .then(() => {
                fetch('/img_url')
                .then(response => response.json())
                .then(result => {
                    url = result.image_url
                    document.querySelector("#profile_image").src = url;
                })
            })
            .catch(error => {
                console.log(error);
            })
        }    
    }

    if (document.querySelector('#follow_unfollow')) {
        document.querySelector('#follow_unfollow').onclick = ()=> {
            let follow_button = document.querySelector('#follow_unfollow')
            if (follow_button.innerHTML === 'Follow') {
                follow_button.innerHTML = 'Unfollow';
            } else if (follow_button.innerHTML === 'Unfollow') {
                follow_button.innerHTML = 'Follow';
            }
            fetch('/following', {
                method: 'PUT',
                body: JSON.stringify({
                    username: window.location.pathname.slice(9)
                })
            })
            .then(response => response.json())
            .then(result => {
                console.log(result)
            })
            .catch(error => {
                console.error(error);
            });
        }    
    }

    document.querySelector('#follower_button').addEventListener('click', () => {

        document.querySelector('.layer2').style.display = 'block';
        document.querySelector('.layer1').setAttribute('style', 
        'z-index: 0; pointer-events: none; opacity: 0.4;')

        document.querySelector('#following_list').style.display = 'none';
        document.querySelector('#follower_list').style.display = 'block';
        
    })

    document.querySelector('#following_button').addEventListener('click', () => {

        document.querySelector('.layer2').style.display = 'block';
        document.querySelector('.layer1').setAttribute('style', 
        'z-index: 0; pointer-events: none; opacity: 0.4;')

        document.querySelector('#follower_list').style.display = 'none';
        document.querySelector('#following_list').style.display = 'block';
        
    })

    document.querySelector('#cross').addEventListener('click', () => {

        document.querySelector('.layer2').style.display = 'none';
        document.querySelector('.layer1').setAttribute('style', 
        'z-index: 0; pointer-events: auto; opacity: 1;')

    })
})