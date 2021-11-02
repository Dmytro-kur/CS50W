from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("profile/<str:profile_name>", views.profile, name="profile"),
    path("error", views.error, name="error"),
    
    # API Routes
    path("post_picture", views.post_picture, name="post_picture"),
    path("following", views.following, name="following"),
    path("posts/<str:posts_filter>", views.posts, name="posts"),
    path("compose", views.compose, name="compose"),
    path('username', views.username, name="username"),
    path('edit_post/<int:post_id>', views.edit_post, name='edit_post'),
    path('like/<int:post_id>', views.like, name='like'),
    path('delete_post/<int:post_id>', views.delete_post, name='delete_post'),
    path('img_url', views.img_url, name='img_url')
]
