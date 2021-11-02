from django.urls import path

from . import views

app_name = 'encyclopedia'

urlpatterns = [
    path("", views.index, name="index"),
    path("wiki/<str:title>", views.title, name="title"),
    path("wiki/", views.entry_title, name="entry_title"),
    path("new_page/", views.new_page, name="new_page"),
    path("edit/<str:name>", views.edit, name="edit"),
    path("wiki/ran_page/", views.ran_page, name="ran_page")

]
