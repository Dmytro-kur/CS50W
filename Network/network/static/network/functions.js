
function classic(replace) {
    return ClassicEditor
                .create(document.querySelector(replace), {
                    toolbar: {
                        items: ['heading', '|', 'bold', 'italic', 'link',
                                'bulletedList', 'numberedList', '|', 'outdent', 
                                'indent', 'alignment', '|', 'insertImage', 'blockQuote', 
                                'insertTable', 'undo', 'redo', '|', 'fontBackgroundColor', 
                                'fontColor', 'fontSize', 'fontFamily', 'highlight',
                                'horizontalLine', '|', 'strikethrough', 'subscript',
                                'superscript', 'underline', '|', 'specialCharacters', 
                                'code', 'codeBlock'
                                ],
                    },
                    simpleUpload : {
                        uploadUrl: '/post_picture',
                        headers: {
                            'X-CSRF-TOKEN': 'CSRF-Token',
                            Authorization: 'Bearer <JSON Web Token>'
                        }
                    },
                    table: {
                        contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells',
                        'tableProperties', 'tableCellProperties'
                        ]
                    },

                    image: {
                        toolbar: [
                            'imageStyle:full',
                            'imageStyle:side',
                            '|',
                            'imageTextAlternative',
                            'linkImage'
                        ],
                        
                        styles: [
                            'full',
                            'side'
                        ]
                    }
                })
                .then(newEditor => {
                    emoji(newEditor);
                    return newEditor;
                })
                .catch(error => {
                    console.error(error);
                })
}

function emoji(editor) {
    editor.plugins.get('SpecialCharacters').addItems('Emoji', [
        {title: 'Grinning Face', character: '😀'},
        {title: 'Grinning Face with Big Eyes', character: '😃'},
        {title: 'Grinning Face with Smiling Eyes', character: '😄'},
        {title: 'Beaming Face with Smiling Eyes', character: '😁'},
        {title: 'Grinning Squinting Face', character: '😆'},
        {title: 'Grinning Face with Sweat', character: '😅'},
        {title: 'Rolling on the Floor Laughing', character: '🤣'},
        {title: 'Face with Tears of Joy', character: '😂'},
        {title: 'Slightly Smiling Face', character: '🙂'},
        {title: 'Upside-Down Face', character: '🙃'},
        {title: 'Winking Face', character: '😉'},
        {title: 'Smiling Face with Smiling Eyes', character: '😊'},
        {title: 'Smiling Face with Halo', character: '😇'},
        {title: 'Smiling Face with Hearts', character: '🥰'},
        {title: 'Smiling Face with Heart-Eyes', character: '😍'},
        {title: 'Star-Struck', character: '🤩'},
        {title: 'Face Blowing a Kiss', character: '😘'},
        {title: 'Kissing Face', character: '😗'},
        {title: 'Kissing Face with Closed Eyes', character: '😚'},
        {title: 'Kissing Face with Smiling Eyes', character: '😙'},
        {title: 'Face Savoring Food', character: '😋'},
        {title: 'Face with Tongue', character: '😛'},
        {title: 'Winking Face with Tongue', character: '😜'},
        {title: 'Zany Face', character: '🤪'},
        {title: 'Squinting Face with Tongue', character: '😝'},
        {title: 'Money-Mouth Face', character: '🤑'},
        {title: 'Hugging Face', character: '🤗'},
        {title: 'Face with Hand Over Mouth', character: '🤭'},
        {title: 'Shushing Face', character: '🤫'},
        {title: 'Thinking Face', character: '🤔'},
        {title: 'Zipper-Mouth Face', character: '🤐'},
        {title: 'Face with Raised Eyebrow', character: '🤨'},
        {title: 'Neutral Face', character: '😐'},
        {title: 'Expressionless Face', character: '😑'},
        {title: 'Face Without Mouth', character: '😶'},
        {title: 'Smirking Face', character: '😏'},
        {title: 'Unamused Face', character: '😒'},
        {title: 'Face with Rolling Eyes', character: '🙄'},
        {title: 'Grimacing Face', character: '😬'},
        {title: 'Lying Face', character: '🤥'},
        {title: 'Relieved Face', character: '😌'},
        {title: 'Pensive Face', character: '😔'},
        {title: 'Sleepy Face', character: '😪'},
        {title: 'Drooling Face', character: '🤤'},
        {title: 'Sleeping Face', character: '😴'},
        {title: 'Face with Medical Mask', character: '😷'},
        {title: 'Face with Thermometer', character: '🤒'},
        {title: 'Face with Head-Bandage', character: '🤕'},
        {title: 'Nauseated Face', character: '🤢'},
        {title: 'Face Vomiting', character: '🤮'},
        {title: 'Sneezing Face', character: '🤧'},
        {title: 'Hot Face', character: '🥵'},
        {title: 'Cold Face', character: '🥶'},
        {title: 'Woozy Face', character: '🥴'},
        {title: 'Dizzy Face', character: '😵'},
        {title: 'Exploding Head', character: '🤯'},
        {title: 'Cowboy Hat Face', character: '🤠'},
        {title: 'Partying Face', character: '🥳'},
        {title: 'Smiling Face with Sunglasses', character: '😎'},
        {title: 'Nerd Face', character: '🤓'},
        {title: 'Face with Monocle', character: '🧐'},
        {title: 'Confused Face', character: '😕'},
        {title: 'Worried Face', character: '😟'},
        {title: 'Slightly Frowning Face', character: '🙁'},
        {title: 'Frowning Face', character: '☹️'},
        {title: 'Face with Open Mouth', character: '😮'},
        {title: 'Hushed Face', character: '😯'},
        {title: 'Astonished Face', character: '😲'},
        {title: 'Flushed Face', character: '😳'},
        {title: 'Pleading Face', character: '🥺'},
        {title: 'Frowning Face with Open Mouth', character: '😦'},
        {title: 'Anguished Face', character: '😧'},
        {title: 'Fearful Face', character: '😨'},
        {title: 'Anxious Face with Sweat', character: '😰'},
        {title: 'Sad but Relieved Face', character: '😥'},
        {title: 'Crying Face', character: '😢'},
        {title: 'Loudly Crying Face', character: '😭'},
        {title: 'Face Screaming in Fear', character: '😱'},
        {title: 'Confounded Face', character: '😖'},
        {title: 'Persevering Face', character: '😣'},
        {title: 'Disappointed Face', character: '😞'},
        {title: 'Downcast Face with Sweat', character: '😓'},
        {title: 'Weary Face', character: '😩'},
        {title: 'Tired Face', character: '😫'},
        {title: 'Face with Steam From Nose', character: '😤'},
        {title: 'Pouting Face', character: '😡'},
        {title: 'Angry Face', character: '😠'},
        {title: 'Face with Symbols on Mouth', character: '🤬'},
        {title: 'Smiling Face with Horns', character: '😈'},
        {title: 'Angry Face with Horns', character: '👿'},
        {title: 'Skull', character: '💀'},
        {title: 'Skull and Crossbones', character: '☠️'},
        {title: 'Pile of Poo', character: '💩'},
        {title: 'Clown Face', character: '🤡'},
        {title: 'Ogre', character: '👹'},
        {title: 'Goblin', character: '👺'},
        {title: 'Ghost', character: '👻'},
        {title: 'Alien', character: '👽'},
        {title: 'Alien Monster', character: '👾'},
        {title: 'Robot', character: '🤖'},
        {title: 'Grinning Cat', character: '😺'},
        {title: 'Grinning Cat with Smiling Eyes', character: '😸'},
        {title: 'Cat with Tears of Joy', character: '😹'},
        {title: 'Smiling Cat with Heart-Eyes', character: '😻'},
        {title: 'Cat with Wry Smile', character: '😼'},
        {title: 'Kissing Cat', character: '😽'},
        {title: 'Weary Cat', character: '🙀'},
        {title: 'Crying Cat', character: '😿'},
        {title: 'Pouting Cat', character: '😾'},
        {title: 'Kiss Mark', character: '💋'},
        {title: 'Waving Hand', character: '👋'},
        {title: 'Raised Back of Hand', character: '🤚'},
        {title: 'Hand with Fingers Splayed', character: '🖐️'},
        {title: 'Raised Hand', character: '✋'},
        {title: 'Vulcan Salute', character: '🖖'},
        {title: 'OK Hand', character: '👌'},
        {title: 'Victory Hand', character: '✌️'},
        {title: 'Crossed Fingers', character: '🤞'},
        {title: 'Love-You Gesture', character: '🤟'},
        {title: 'Sign of the Horns', character: '🤘'},
        {title: 'Call Me Hand', character: '🤙'},
        {title: 'Backhand Index Pointing Left', character: '👈'},
        {title: 'Backhand Index Pointing Right', character: '👉'},
        {title: 'Backhand Index Pointing Up', character: '👆'},
        {title: 'Middle Finger', character: '🖕'},
        {title: 'Backhand Index Pointing Down', character: '👇'},
        {title: 'Index Pointing Up', character: '☝️'},
        {title: 'Thumbs Up', character: '👍'},
        {title: 'Thumbs Down', character: '👎'},
        {title: 'Raised Fist', character: '✊'},
        {title: 'Oncoming Fist', character: '👊'},
        {title: 'Left-Facing Fist', character: '🤛'},
        {title: 'Right-Facing Fist', character: '🤜'},
        {title: 'Clapping Hands', character: '👏'},
        {title: 'Raising Hands', character: '🙌'},
        {title: 'Open Hands', character: '👐'},
        {title: 'Palms Up Together', character: '🤲'},
        {title: 'Handshake', character: '🤝'},
        {title: 'Folded Hands', character: '🙏'},
        {title: 'Writing Hand', character: '✍️'},
        {title: 'Nail Polish', character: '💅'},
        {title: 'Selfie', character: '🤳'},
        {title: 'Flexed Biceps', character: '💪'},
        {title: 'Leg', character: '🦵'},
        {title: 'Foot', character: '🦶'},
        {title: 'Ear', character: '👂'},
        {title: 'Nose', character: '👃'},
        {title: 'Brain', character: '🧠'},
        {title: 'Tooth', character: '🦷'},
        {title: 'Bone', character: '🦴'},
        {title: 'Eyes', character: '👀'},
        {title: 'Eye', character: '👁️'},
        {title: 'Tongue', character: '👅'},
        {title: 'Mouth', character: '👄'},
    ] );
}
 
function compose(editorData) {
    if (editorData !== '') {
        fetch('/compose', {
            method: 'POST',
            body: JSON.stringify({
                content: editorData,
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert('Please, Log In');
                document.location.href="/login";
            }
        })
        .then(() => {
            const posts = parseInt(document.querySelector(".active")
            .querySelector('a').innerHTML)*10 - 10;
            retrieve_post(localStorage.getItem('posts_filter'), posts, posts + 10);
        })
        .catch(error => {
            console.error(error);
        });
    }
}

function username() {
    fetch('/username')
    .then(response => response.json())
    .then(user => {
        localStorage.setItem('username', user.username);
    });
}

function posts_filter(posts_filter) {
    localStorage.setItem('posts_filter', posts_filter);
}

function likes_count(post_id) {
    return fetch(`/like/${post_id}`)
    .then(response => response.json())
    .then(like_obj => {
        return like_obj
    })
    .catch(error => {
        console.log('Error: ', error);
    });
}

function retrieve_post(posts_filter, start, end) {
    
    document.querySelector('#body-content').innerHTML = '';

    fetch(`/posts/${posts_filter}?start=${start}&end=${end}`)
    .then(response => response.json())
    .then(posts => {
        if (posts.message) {
            const message = document.createElement('div');
            message.className = 'Message';
            message.id = `error_message`;
            message.innerHTML = posts.message;
            document.querySelector('#body-content').append(message);
        } else {
            posts.forEach(post => {

                if (post.post_count !== 0) {
                    if(!post.post_count) {

                        const Post = document.createElement('div');
                        Post.className = 'Post';
                        Post.id = `Post_${post.id}`;
                        document.querySelector('#body-content').append(Post);
        
                        const Break = document.createElement('br');
                        
                        const dateti = document.createElement('div');
                        dateti.className = 'datetime';
                        dateti.id = `datetime_${post.id}`;
                        dateti.innerHTML = post.datetime;

                        const username = document.createElement('a');
                        username.className = 'username';
                        username.id = `username_${post.id}`;
                        if (post.user_photo_url) {
                            username.innerHTML = `<img class="user_photo" src="${post.user_photo_url}" alt="image"></img> ${post.user[1]}`;
                        } else {
                            username.innerHTML = `<img class="user_photo" src="/media/avatardefault.png" alt="image"></img> ${post.user[1]}`;
                        }
                        username.href = `/profile/${post.user[1]}`; 
        
                        const element = document.createElement('div');
                        element.className = 'post';
                        element.id = `post_${post.id}`;
                        element.dataset.username = post.user[1];

                        const first_parent = document.createElement('div');
                        first_parent.className = 'ck-blurred ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-read-only'
                        first_parent.setAttribute('lang', 'en');
                        first_parent.setAttribute('dir', 'ltr');
                        first_parent.setAttribute('role', 'textbox');
                        first_parent.setAttribute('aria-label', 'Rich Text Editor, main');
                        first_parent.setAttribute('contenteditable', 'false');
                        first_parent.innerHTML = post.content;
        
                        const save_btn = document.createElement('button');
                        save_btn.className = 'btn btn-outline-secondary btn-sm';
                        save_btn.id = `save_btn_${post.id}`;
                        save_btn.innerHTML = 'Save';
                        save_btn.dataset.username = post.user[1];
        
                        const edit_btn = document.createElement('button');
                        edit_btn.className = 'btn btn-outline-secondary btn-sm';
                        edit_btn.id = `edit_btn_${post.id}`;
                        edit_btn.innerHTML = 'Edit';
                        edit_btn.dataset.username = post.user[1];
        
                        const like = document.createElement('p');
                        like.className = 'like_paragraph';
                        
                        const heart = document.createElement('span');
                        heart.className = 'like';
                        heart.id = `like_${post.id}`;
                        heart.dataset.posted_by = post.user[1];
                        
                        like.append(heart)

                        const like_count = document.createElement('span');
                        like_count.className = 'like_count';
                        like_count.id = `like_count_${post.id}`;
                        like.append(like_count)
                        like_count.dataset.posted_by = post.user[1];
        
                        const delete_btn = document.createElement('button');
                        delete_btn.className = 'btn btn-outline-secondary btn-sm';
                        delete_btn.id = `delete_btn_${post.id}`;
                        delete_btn.innerHTML = 'Delete';
                        delete_btn.dataset.username = post.user[1];
        
                        likes_count(post.id)
                        .then(like_obj => {

                            if (like_obj.count > 0) {
                                like_count.innerHTML = like_obj.count;
                            } else {
                                like_count.innerHTML = '';
                            }

                            if (like_obj.already_liked) {
                                heart.setAttribute('style', 'background-position: -14300px -40px;')
                                heart.style.animation = 'heart 3s steps(64) forwards';
                            } else {
                                heart.setAttribute('style', 'background-position: -4060px -40px;')
                            }

                        })
                        

                        if (localStorage.getItem('username')) {

                            heart.onclick = () => {
                                
                                fetch(`/like/${post.id}`, {
                                    method: 'PUT'
                                })
                                .then(() => {
                                    likes_count(post.id)
                                    .then(like_obj => {

                                        // console.log('count: ', `${like_obj.count}`, '\n',
                                        // 'already liked: ', `${like_obj.already_liked}`)

                                        if (like_obj.count > 0) {
                                            like_count.innerHTML = like_obj.count;
                                        } else {
                                            like_count.innerHTML = '';
                                        }

                                        if (like_obj.already_liked) {
                                            heart.setAttribute('style', 'background-position: -14300px -40px;')
                                            heart.style.animation = 'heart 3s steps(64) forwards';
                                        } else {
                                            heart.setAttribute('style', 'background-position: -4060px -40px;')
                                        }
            
                                    })
                                });

                            }
                        }

                        document.querySelector(`#Post_${post.id}`).append(Break);
                        document.querySelector(`#Post_${post.id}`).append(dateti);
                        document.querySelector(`#Post_${post.id}`).append(username);
                        document.querySelector(`#Post_${post.id}`).append(element);
                        document.querySelector(`#Post_${post.id}`).append(first_parent);
                        document.querySelector(`#Post_${post.id}`).append(like);
        
                        if (element.dataset.username === localStorage.getItem('username')) {
        
                            document.querySelector(`#Post_${post.id}`).append(save_btn);
                            document.querySelector(`#Post_${post.id}`).append(edit_btn);
                            document.querySelector(`#Post_${post.id}`).append(delete_btn);
                            document.querySelector(`#Post_${post.id}`).append(Break);
            
                        };
                        delete_btn.onclick = () => {
                                   
                            fetch(`/delete_post/${post.id}`, {
                                method: 'DELETE'
                            })
                            .catch(error => {
                                console.error(error);
                            });
                            Post.style.animationPlayState = "running";
                            setTimeout(function() { 
                                Post.remove(); 
                            }, 500);
                            

                        }
                        edit_btn.onclick = () => {

                            if (Post.querySelector('.ck-editor')) {
                                Post.querySelector('.ck-editor').remove()
                            }
                            
                            classic(`#post_${post.id}`)
                            .then(POST => {

                                first_parent.style.display = "none";
                                POST.setData(post.content);

                                save_btn.onclick = () => {
                                    if (Post.querySelector('.ck-editor')) {
                                        fetch(`/edit_post/${post.id}`, {
                                            method: 'PUT',
                                            body: JSON.stringify({
                                                content: POST.getData()
                                            })
                                        })
                                        .then((response) => response.json())
                                        .then(edited_content => {
                                            first_parent.innerHTML = edited_content.result
                                            first_parent.style.display = "block";
                                            post.content = edited_content.result
                                            if (Post.querySelector('.ck-editor')) {
                                                Post.querySelector('.ck-editor').remove();
                                            }
                                        })
                                        .catch(error => {
                                            console.error(error);
                                        });
                                    }
                                }

                            })
                        }        
                    }
                }
            });
        }
    })
}
