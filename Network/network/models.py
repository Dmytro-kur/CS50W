from django.contrib.auth.models import AbstractUser
from django.db import models
import os

class User(AbstractUser):

    photo = models.ImageField(blank=True)
    last_modified = models.DateTimeField(auto_now=True)

    def serialize(self):
        last_modified = self.last_modified.strftime("%d/%m/%Y %H:%M:%S")
        return {
            "photo": self.photo,
            "changed": last_modified,
        }

class Post(models.Model):

    datetime = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_posts")
    content = models.CharField(max_length=1000000)
    liked_by = models.ManyToManyField("User", related_name="likes", blank=True)

    def __str__(self):
        datetime = self.datetime.strftime("%d/%m/%Y %H:%M:%S")
        return f"posted by {self.user.username} / {datetime}"

    def serialize(self):
        datetime = self.datetime.strftime("%d/%m/%Y %H:%M:%S")
        if self.user.photo:
            return {
                "id": self.id,
                "user": [self.user.email, self.user.username],
                "user_photo_url": self.user.photo.url,
                "content": self.content,
                "datetime": datetime,
            }
        else:
            return {
                "id": self.id,
                "user": [self.user.email, self.user.username],
                "user_photo_url": "",
                "content": self.content,
                "datetime": datetime,
            }

class Following(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    followings = models.ManyToManyField("User", related_name="followers", blank=True)

    def __str__(self):
        return f"{self.user}'s follows"
