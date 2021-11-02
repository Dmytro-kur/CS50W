from django.shortcuts import render
from random import randint
from . import util
import markdown
message_type_1 = "Requested page was not found."
message_type_2 = "Encyclopedia entry already exists with the provided title."


def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries(),
        "title": 'Encyclopedy',
        "body_title": "All Pages"
    })


def title(request, title):
    edited_entry = ""
    try:
        edited_entry = request.GET['edited_entry']
    except:
        pass
    if edited_entry:
        formating_entry = markdown.markdown(edited_entry)
        util.save_entry(title, edited_entry)
        return render(request, "encyclopedia/title.html", {
            "entry": formating_entry,
            "title": title,
            })
    else:
        if title not in util.list_entries():
            return render(request, "encyclopedia/error.html", {
                "message": message_type_1,
                "title": title,
                "body_title": "Error message" 
            })
        entry = util.get_entry(title)
        formating_entry = markdown.markdown(entry)
        return render(request, "encyclopedia/title.html", {
            "entry": formating_entry,
            "title": title,
        })


def entry_title(request):
    
    if request.method == "POST":
        
        entry_post = request.POST['entry']
        
        if entry_post in util.list_entries():
            entry = util.get_entry(entry_post)
            edited_entry = markdown.markdown(entry)
            return render (request, 'encyclopedia/title.html', {
                "entry": edited_entry,
                "title": entry_post,
                })
        else:
            list_en = []
            for en in util.list_entries():
                if entry_post in en and entry_post!="":
                    list_en += [en]
            return render(request, "encyclopedia/index.html", {
                "entries": list_en,
                "title": 'Encyclopedy',
                "body_title": "All Pages"
                })

        
        
def new_page(request):
    if request.method == "POST":
        
        title = request.POST["title"]
        textarea = request.POST["textarea"]

        if title in util.list_entries():
            return render(request, "encyclopedia/error.html", {
                "message": message_type_2,
                "title": title,
                "body_title": "Error message" 

                })
        else:
            util.save_entry(title, textarea)
            entry = util.get_entry(title)
            formating_entry = markdown.markdown(entry)
            return render (request, 'encyclopedia/title.html', {
                "entry": formating_entry,
                "title": title,
                })
    return render (request, 'encyclopedia/new_page.html')



def edit(request, name):
    
    entry = util.get_entry(name)
    return render (request, 'encyclopedia/edit.html', {
        "entry": entry,
        "title": name,
        })

def ran_page(request):
    
    list_of_entries = util.list_entries()
    number = randint(0,len(list_of_entries)-1)
    name = list_of_entries[number]
    entry = util.get_entry(name)
    formating_entry = markdown.markdown(entry)
    
    return render (request, 'encyclopedia/title.html', {
        "entry": formating_entry,
        "title": name,
        })



