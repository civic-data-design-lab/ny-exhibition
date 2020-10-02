import os
from PIL import Image, ImageDraw, ImageFont
import textwrap
from colors import themes
from boroughs import boroughs

dir = os.path.dirname(__file__)

W, H = (1200, 630)

font_path = os.path.join(dir, "assets", "Graphik-Bold.ttf")
font_color = "#ffffff"
font_size = 64

text_margin = 40
text_wrap = 32
line_height = 20

text_limit = 120
image_prefix = "og_image"

def draw_text(text, zip_code, wrap_limit, text_margin, max_width, max_height, draw):
    margin = offset = text_margin
    font = ImageFont.truetype(font_path, font_size)
    lines = textwrap.wrap(text, width=wrap_limit)

    for line in lines:
        text_width, text_height = draw.textsize(line, font=font)

        if text_width > (max_width - (margin * 2)):
            wrap_limit = wrap_limit - 1
            draw_text(text, zip_code, wrap_limit,
                      margin, max_width, max_height, draw)
            break
        else:
            draw.text((margin, offset), line, font=font, fill=font_color)
            offset += font.getsize(line)[1] + line_height

            # Draw response text underline
            lx, ly = margin, offset - (line_height / 2)
            draw.line((lx, ly, lx + text_width, ly),
                      fill=font_color, width=8)

    # Draw borough text
    if zip_code:
        borough = find_borough(zip_code)
        draw.text((margin, max_height - text_height - text_margin),
                borough, font=font, fill=font_color)

def generate_image(images_dir, id, text, theme, zip_code):
    im = Image.new("RGBA", (W, H), themes[theme])
    draw = ImageDraw.Draw(im)
    draw.fontmode = "0"

    # Truncate text to a limit
    text = (text[:text_limit] + '...') if len(text) > text_limit else text

    # Draw text
    draw_text(text, zip_code, text_wrap, text_margin, W, H, draw)

    # Save image
    image_name = image_prefix + "_" + id + ".png"
    im.save(os.path.join(dir, images_dir, image_name), "PNG")

    return image_name

def find_borough(zip_code):
    selected_borough = ""
    for borough in boroughs:
        if int(zip_code) in boroughs[borough]:
            selected_borough = borough
    return selected_borough
