import os
from PIL import Image, ImageDraw, ImageFont
import textwrap
from colors import themes
from boroughs import boroughs

dir = os.path.dirname(__file__)

W, H = (640, 400)

font_path = os.path.join(dir, "assets", "Graphik-Bold.ttf")
font_color = "#ffffff"
font_size = 40

text_margin = 20
text_wrap = 32
line_height = 8

image_prefix = "og_image"

def generate_image(images_dir, id, text, theme, zip_code):
    im = Image.new("RGBA", (W, H), themes[theme])
    draw = ImageDraw.Draw(im)
    draw.fontmode = "0"
    margin = offset = text_margin
    font = ImageFont.truetype(font_path, font_size)

    for line in textwrap.wrap(text, width=text_wrap):
        # Draw response text
        text_width, text_height = draw.textsize(line, font=font)
        draw.text((margin, offset), line, font=font, fill=font_color)
        offset += font.getsize(line)[1] + line_height
        # Draw response text underline
        lx, ly = margin, offset - (line_height / 2)
        draw.line((lx, ly, lx + text_width, ly), fill=font_color, width=int(line_height / 2))

    # Draw borough text
    if zip_code:
        borough = find_borough(zip_code)
        draw.text((margin, H - text_height - text_margin),
                borough, font=font, fill=font_color)

    image_name = image_prefix + "_" + id + ".png"

    im.save(os.path.join(dir, images_dir, image_name), "PNG")

    return image_name

def find_borough(zip_code):
    selected_borough = ""
    for borough in boroughs:
        if int(zip_code) in boroughs[borough]:
            selected_borough = borough
    return selected_borough
