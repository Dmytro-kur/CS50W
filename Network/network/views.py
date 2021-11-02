import json
import PIL.Image as Image
import io
import os
import datetime
import re

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import *

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def username(request):

    if request.method == "GET":
        if request.user:
            return JsonResponse({"username": request.user.username}, status=201)
        else:
            return JsonResponse({"username": ''}, status=201)

def index(request):
    return render(request, "network/index.html")

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
            Following(user=User.objects.get(username=username)).save()
            
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

@csrf_exempt
def profile(request, profile_name):
    today = datetime.date.today()
    base_dir = BASE_DIR.replace("\\","/")

    if request.method == "GET":

        try:
            user = User.objects.get(username=profile_name)
            user_follows = Following.objects.get(user=user)
            request_user = User.objects.get(username=request.user)
            request_user_follows = Following.objects.get(user=request_user)
            
            try:
                request_user_follows.followings.get(username=profile_name)
                return render(request, "network/profile.html", {
                    "user_obj": user,
                    "is_owner": profile_name == request.user.username,
                    "follow_unfollow": 'Unfollow',
                    "followers": user.followers.all(),
                    "followers_count": user.followers.all().count,
                    "following": user_follows.followings.all(),
                    "following_count": user_follows.followings.all().count(),
                })
            except User.DoesNotExist:
                return render(request, "network/profile.html", {
                    "user_obj": user,
                    "is_owner": profile_name == request.user.username,
                    "follow_unfollow": 'Follow',
                    "followers": user.followers.all(),
                    "followers_count": user.followers.all().count,
                    "following": user_follows.followings.all(),
                    "following_count": user_follows.followings.all().count(),

                })

        except User.DoesNotExist:
            return render(request, "network/error.html", {
                "error": "User doesn't exist or you aren't logged in!"
            })

    if request.method == "POST":
        if request.body:

            user = User.objects.filter(username=request.user).get()
            # print("request.body: ", request.body)
            # print("io.BytesIO: ", io.BytesIO(request.body))
            img = Image.open(io.BytesIO(request.body))
            # print(img.format)
            img = img.convert("RGB")

            tuple_size = img.size
            img_ratio = tuple_size[0]/tuple_size[1]
            if img_ratio <= 1:
                img = img.resize((int(198*img_ratio), 198))
            elif img_ratio > 1:
                img = img.resize((174, int(174/img_ratio)))

            if user.photo:
                try:
                    os.remove(base_dir + "/media/" + str(user.photo))
                except FileNotFoundError: 
                    pass

            directory = f"users/{today.year}/{today.month}/{today.day}"
            PATH = base_dir + "/media/" + directory
            file_ext = f"/{request.user}.jpeg"

            if not os.path.isdir(PATH):
                os.makedirs(PATH)

            img.save(PATH + file_ext)
            
            
            user.photo = directory + file_ext
            user.save()

            return JsonResponse({"message": "Photo posted successfully."}, status=201)
        else: 
            return JsonResponse({"error": "Please, choose photo"}, status=400)

@csrf_exempt
@login_required
def following(request):

    if request.method == "GET":
        return render(request, "network/following.html")

    if request.method == "PUT":

        data = json.loads(request.body)

        # Get username
        username = data.get("username", "")

        user = User.objects.filter(username=request.user).get()
        U = User.objects.filter(username=username).get()
        F = Following.objects.get(user=user)
        try:
            F.followings.filter(username=U.username).get()
            F.followings.remove(U)
            return JsonResponse({"message": "User successfully removed."}, status=201)
        
        except User.DoesNotExist:
            F.followings.add(U)
            return JsonResponse({"message": "User successfully added."}, status=201)


@login_required
def img_url(request):

    if request.method == "GET":
        user = User.objects.filter(username=request.user).get()

        return JsonResponse({
            "image_url": user.photo.url
            }, status=201)

    else: 
        return JsonResponse({"error": "GET request required."}, status=400)

def posts(request, posts_filter):

    if posts_filter == "following":

        user = User.objects.filter(username=request.user).get()
        F = Following.objects.get(user=user)

        result_list = Post.objects.none()
        for person in F.followings.all():
            result_list = person.user_posts.all() | result_list

        # Get start and end points
        start = int(request.GET.get("start"))
        end = int(request.GET.get("end"))

        posts = result_list.order_by("-datetime")[start:end]

        # Artificially delay speed of response
        #time.sleep(1)

        # Return list of posts
        return JsonResponse([post.serialize() for post in posts] + 
        [{"post_count": result_list.count()}], safe=False)

    if posts_filter != "All" and posts_filter != "following":
        
        try:
            user = User.objects.get(username=posts_filter)
            P = Post.objects.filter(user=user)
            # Get start and end points
            start = int(request.GET.get("start"))
            end = int(request.GET.get("end"))

            # Generate list of posts
            posts = P.order_by("-datetime")[start:end]

            # Artificially delay speed of response
            # time.sleep(0.3)

            # Return list of posts
            return JsonResponse([post.serialize() for post in posts] + 
            [{"post_count": P.count()}], safe=False)

        except User.DoesNotExist:
            return JsonResponse({"message": "This user doesn't exist"}, status=400)


    if posts_filter == "All":

        # Get start and end points
        start = int(request.GET.get("start"))
        end = int(request.GET.get("end"))

        # Generate list of posts
        posts = Post.objects.order_by("-datetime")[start:end]

        # Artificially delay speed of response
        # time.sleep(0.3)

        # Return list of posts
        return JsonResponse([post.serialize() for post in posts] + 
        [{"post_count": Post.objects.all().count()}], safe=False)


@csrf_exempt
@login_required
def compose(request):

    # Composing a new post must be via POST
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    # Load post data
    data = json.loads(request.body)

    # Get post contents
    content = data.get("content", "")
    
    # Create post in SQL
    Post(
        user=request.user, 
        content=content).save()

    return JsonResponse({"message": "Content posted successfully."}, status=201)

@csrf_exempt
@login_required
def edit_post(request, post_id):

    
    # Query for requested post
    try:
        post = Post.objects.get(pk=post_id, user=request.user)
    except Post.DoesNotExist:
        return JsonResponse({"error": "Post not found."}, status=404)

    # Update post
    if request.method == "PUT":
        data = json.loads(request.body)
        content = data.get("content", "")
        post.content = content
        post.save()
        return JsonResponse({"result": post.content})
        
    else:
        return JsonResponse({"error": "PUT or GET request required."}, status=400)

@csrf_exempt
def like(request, post_id):

    try:
        post = Post.objects.get(pk=post_id)
    except Post.DoesNotExist:
        return JsonResponse({'status': 'false', 'message': 'Posts not found.'}, status=404)

    if request.method == "PUT":
        user = User.objects.get(username=request.user)

        try:
            post.liked_by.all().filter(username=request.user).get()
            post.liked_by.remove(user)
            return HttpResponse(status=204)

        except User.DoesNotExist:
            post.liked_by.add(user)
            return HttpResponse(status=204)
    
    elif request.method == "GET":
        post = Post.objects.get(pk=post_id)
        count = post.liked_by.all().count()
        return JsonResponse({
            "count": count,
            "already_liked": post.liked_by.filter(username=request.user).exists(),
            }, safe=False)

    # Email must be via GET or PUT
    else:
        return JsonResponse({"error": "GET or PUT request required."}, status=400)

@csrf_exempt
@login_required
def delete_post(request, post_id):

    try:
        post = Post.objects.get(pk=post_id, user=request.user)
    except Post.DoesNotExist:
        return JsonResponse({"error": "Post not found."}, status=404)

    if request.method == "DELETE":
        post.delete()
        
        return HttpResponse(status=200)

    # Email must be via DELETE
    else:
        return JsonResponse({"error": "DELETE request required."}, status=400)

@csrf_exempt
def post_picture(request):

    if request.method == "POST":

        # print('\n', "First 200 symbols: ", request.body[:200], '\n')
        # print("Last 100 symbols: ", request.body[-100:], '\n')

        filename_compiler = re.compile(r"""

        b'------WebKitFormBoundary
        (?P<token>\w{16,16})
        (.*?)
        Content-Disposition:[ ]
        form-data;[ ]name="upload";[ ]filename="
        (?P<filename>.+?)"
        (.*?)
        Content-Type:[ ](?P<filetype>\w+?)/(?P<file_ext>\w+)

        """
        , re.X)

        token, filename, filetype, file_ext = [], [], [], []

        match = filename_compiler.match(str(request.body))

        # print(' match:', match.group(),
        # '\n', 'position:', match.span(),
        # '\n')
        # print(match.group('token'))
        # print(match.group('filename'))
        # print(match.group('filetype'))
        # print(match.group('file_ext'))

        position = match.span()[1]
        token = match.group('token')
        filename = match.group('filename')
        filetype = match.group('filetype')
        file_ext = match.group('file_ext')

        b = request.body[position-2:-46]
        img = Image.open(io.BytesIO(b))

        today = datetime.date.today()
        base_dir = BASE_DIR.replace("\\","/")

        directory = f"posts/{today.year}/{today.month}/{today.day}"
        PATH = base_dir + "/media/" + directory
        file_ext = f"/{filename}"

        if not os.path.isdir(PATH):
            os.makedirs(PATH)

        img.save(PATH + file_ext)

        return JsonResponse({
            "url": f"/media/{directory}/{file_ext}"
            }, status=201)
        # return JsonResponse({"error": {
        #     "message": "The image upload failed because the image was too big (max 1.5MB)."
        #     }
        # }, status=400)

def error(request):
    return render(request, "network/error.html", {
        "error": "This is an error page."
    })