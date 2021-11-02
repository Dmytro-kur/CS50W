# Reading an animated GIF file using Python Image Processing Library - Pillow
from PIL import Image
import glob
import os
import re

# A function that allow to return a sorted iconMap:
def myFunc(e):
    p = re.compile(r"""
                   
        images
        .
        (?P<number>\d+) # Find all digits and assign a name for it 'number'
        [.]
        .+
                   
        """, re.X)
        
    match = p.match(e) # perform matching
    number = match.group('number') # retrieve a number from list item
    return int(number) # sorting a list by that number

imageObject = Image.open("Like-animation.gif")

# Display individual frames from the loaded animated GIF file

directory = "images"
parent_dir = os.getcwd()
path = os.path.join(parent_dir, directory)

for frame in range(0,imageObject.n_frames):
    imageObject.seek(frame)
    img = imageObject.convert('RGB')
    
    if not os.path.isdir(path):
        os.makedirs(path)
        print("Directory '%s' created" %directory)
        
    img.save(f'images/{frame}.jpg')

# get your images using glob
iconMap = glob.glob("images/*.jpg")
iconMap.sort(key=myFunc)

# just take the even ones
# iconMap = iconMap[::2]

print(len(iconMap))

images = [Image.open(filename) for filename in iconMap]

print(f"{len(images)} images will be combined.")

image_width, image_height = images[0].size

print(f"all images assumed to be {image_width} by {image_height}.")

master_width = (image_width * len(images)) 
# seperate each image with lots of whitespace
master_height = image_height
print (f"the master image will be {master_width} by {master_height}")
print("creating image...")
master = Image.new(
    mode='RGBA',
    size=(master_width, master_height),
    color=(0,0,0,0))  # fully transparent

print("created.")

for count, image in enumerate(images):
    location = image_width*count
    print(f"adding {iconMap[count]} at {location}...")
    master.paste(image,(location,0))
    print("added.")
print("done adding icons.")

print("saving master.png...")
master.save('master.png')
print("saved!")