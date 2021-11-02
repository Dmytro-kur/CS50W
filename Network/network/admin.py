from django.contrib import admin

from .models import User, Post, Following
# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    filter_horizontal = ("user_permissions",)
    list_display = ("id", "username", "last_login",
                    "first_name", "last_name", 
                    "email", "is_staff", "is_superuser",
                    "is_active", "date_joined")

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    filter_horizontal = ("liked_by",)

@admin.register(Following)
class FollowingAdmin(admin.ModelAdmin):
    filter_horizontal = ("followings",)
