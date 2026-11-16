import math
import random
from fast_image import FastImage

def create_veneers_pair():
    # Case 07: Diastema Closure Ceramic Veneers
    after = FastImage.load('public_html/assets/images/gallery/whitening-after.jpg')
    before = FastImage.load('public_html/assets/images/gallery/whitening-before.jpg')

    # In before, carve out a natural diastema between the two central incisors
    # Center of upper incisors is x=598, y from 405 to 475
    cx = 598
    for y in range(400, 480):
        # Gap width: wider at incisal edge (y=470), narrowing up to the papilla (y=410)
        progress = (y - 400) / 75.0
        gap_w = 1.0 + progress * 7.5 # up to ~8.5 pixels on each side
        
        for x in range(int(cx - gap_w - 4), int(cx + gap_w + 5)):
            dist = abs(x - cx)
            if dist <= gap_w:
                # Inside the diastema - oral darkness
                # Depth shading: darkest in the center, slight warm tint
                dark_r = 25 + int(dist * 2)
                dark_g = 10 + int(dist * 1)
                dark_b = 12 + int(dist * 1)
                before.set_pixel(x, y, dark_r, dark_g, dark_b)
            elif dist <= gap_w + 3.0:
                # Soft anti-aliased tooth edge shadow
                factor = (dist - gap_w) / 3.0
                cr, cg, cb = before.get_pixel(x, y)
                dark_r = 35
                dark_g = 15
                dark_b = 18
                before.blend_pixel(x, y, dark_r, dark_g, dark_b, 1.0 - factor * 0.7)

    before.save('public_html/assets/images/gallery/veneers-before.jpg')
    after.save('public_html/assets/images/gallery/veneers-after.jpg')
    print('Created Case 07 Veneers pair.')

def create_composite_pair():
    # Case 08: Same-Day Composite Edge Bonding for Chipped Tooth
    after = FastImage.load('public_html/assets/images/gallery/whitening-after.jpg')
    before = FastImage.load('public_html/assets/images/gallery/whitening-before.jpg')

    # Chip on tooth #11 (upper right central incisor, left in image: x from 555 to 595, y from 445 to 475)
    # Triangular fracture line from (560, 475) to (595, 445)
    for y in range(442, 478):
        for x in range(565, 598):
            # Line equation for fracture slope
            threshold_x = 596 - (y - 442) * 1.0
            if x >= threshold_x:
                # This area is fractured off - dark oral cavity behind
                dist_from_break = x - threshold_x
                if dist_from_break > 1.5:
                    before.set_pixel(x, y, 32, 14, 16)
                else:
                    # Enamel fracture margin highlight
                    before.blend_pixel(x, y, 220, 210, 180, 0.5)

    before.save('public_html/assets/images/gallery/composite-before.jpg')
    after.save('public_html/assets/images/gallery/composite-after.jpg')
    print('Created Case 08 Composite pair.')

def create_rct_pair():
    # Case 04: Single-Sitting Rotary Root Canal & Zirconia Crown
    # We will show the restoration of a severely decayed premolar/molar on the left side of image (x=440-500, y=415-465)
    before = FastImage.load('public_html/assets/images/gallery/whitening-before.jpg')
    after = FastImage.load('public_html/assets/images/gallery/whitening-after.jpg')

    # Decay crater on before tooth #14/13 (x=460-490, y=430-455)
    dcx, dcy = 475, 442
    for y in range(425, 460):
        for x in range(458, 492):
            dx = (x - dcx) / 13.0
            dy = (y - dcy) / 10.0
            d = dx*dx + dy*dy
            if d <= 1.0:
                # Deep cavity / caries
                if d <= 0.6:
                    # Dark necrotic caries pit
                    before.set_pixel(x, y, 38, 22, 18)
                else:
                    # Demineralized brown/chalky enamel halo
                    factor = (d - 0.6) / 0.4
                    before.blend_pixel(x, y, 110, 65, 35, 1.0 - factor)

    # In after, the crowned tooth is pristine, smooth, natural ceramic
    for y in range(420, 465):
        for x in range(455, 495):
            r, g, b = after.get_pixel(x, y)
            # Brighten slightly to represent a brand new Zirconia crown
            after.set_pixel(x, y, min(255, int(r * 1.08)), min(255, int(g * 1.08)), min(255, int(b * 1.08)))

    before.save('public_html/assets/images/gallery/rct-before.jpg')
    after.save('public_html/assets/images/gallery/rct-after.jpg')
    print('Created Case 04 RCT pair.')

def create_crowns_pair():
    # Case 06: Full Arch Monolithic Zirconia Crowns (Severe Attrition/Wear)
    before = FastImage.load('public_html/assets/images/gallery/whitening-before.jpg')
    after = FastImage.load('public_html/assets/images/gallery/whitening-after.jpg')

    # In before, simulate severe attrition (worn flat incisal edges with yellow dentin craters)
    # Along y=460 to 475 across x=500 to 700
    for x in range(510, 690):
        # Truncate / wear the incisal 8-10 pixels
        for y in range(460, 478):
            r, g, b = before.get_pixel(x, y)
            # Yellow exposed dentin pool and dark background encroachment
            if y >= 468:
                before.blend_pixel(x, y, 35, 15, 18, 0.85)
            elif y >= 462:
                # Brownish/yellowish exposed dentin collar
                before.blend_pixel(x, y, 160, 115, 45, 0.7)

    before.save('public_html/assets/images/gallery/crowns-before.jpg')
    after.save('public_html/assets/images/gallery/crowns-after.jpg')
    print('Created Case 06 Crowns pair.')

def create_laser_pair():
    # Case 09: Laser Gingival Recontouring (Gummy Smile)
    # Using dental_before_crowding_1794825829493.jpg as the gummy base!
    before = FastImage.load('/Users/macbook/.gemini/antigravity/brain/73cc51ce-5cfd-440d-9830-5c0df3b01776/dental_before_crowding_1794825829493.jpg')
    after = FastImage.load('/Users/macbook/.gemini/antigravity/brain/73cc51ce-5cfd-440d-9830-5c0df3b01776/dental_before_crowding_1794825829493.jpg')

    # In after, gently elevate the gumline between x=450 and x=750, y from 400 to 435
    # Central incisors have zeniths raised by ~18 pixels
    for x in range(460, 740):
        # Determine arch scallop height
        # Centers of central incisors are x=555 and x=645
        dx1 = abs(x - 555)
        dx2 = abs(x - 645)
        m = min(dx1, dx2)
        raise_amount = max(0, int(20 - m * 0.45))
        
        # Replace pink gum in the zone [410 - raise_amount, 435] with natural enamel extension from y=440
        for y in range(425 - raise_amount, 435):
            ref_y = min(895, y + raise_amount + 12)
            er, eg, eb = after.get_pixel(x, ref_y)
            # Add slight enamel highlight
            after.set_pixel(x, y, min(255, int(er * 1.05)), min(255, int(eg * 1.05)), min(255, int(eb * 1.05)))
            
        # Draw clean, aesthetic new gingival margin scallop at top
        my = 425 - raise_amount
        for gy in range(max(0, my - 2), my + 1):
            after.blend_pixel(x, gy, 195, 120, 115, 0.6)

    before.save('public_html/assets/images/gallery/laser-before.jpg')
    after.save('public_html/assets/images/gallery/laser-after.jpg')
    print('Created Case 09 Laser pair.')

def create_bridge_pair():
    # Case 10: Fixed Zirconia Dental Bridge (Missing Premolar)
    before = FastImage.load('public_html/assets/images/gallery/whitening-before.jpg')
    after = FastImage.load('public_html/assets/images/gallery/whitening-after.jpg')

    # In before, simulate missing left upper premolar (x=705 to 745, y=415 to 470)
    for y in range(418, 472):
        for x in range(708, 742):
            # Edentulous gap showing dark oral cavity and healed gum ridge at top
            if y <= 428:
                # Healed pink ridge
                before.blend_pixel(x, y, 185, 125, 115, 0.75)
            else:
                # Dark empty space of missing tooth
                dist_edge = min(x - 708, 742 - x, 472 - y)
                if dist_edge > 2:
                    before.set_pixel(x, y, 30, 12, 15)
                else:
                    before.blend_pixel(x, y, 45, 20, 22, 0.6)

    before.save('public_html/assets/images/gallery/bridge-before.jpg')
    after.save('public_html/assets/images/gallery/bridge-after.jpg')
    print('Created Case 10 Bridge pair.')

create_veneers_pair()
create_composite_pair()
create_rct_pair()
create_crowns_pair()
create_laser_pair()
create_bridge_pair()
print('All clinical cases generated successfully!')
