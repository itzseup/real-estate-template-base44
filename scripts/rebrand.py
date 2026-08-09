#!/usr/bin/env python3
"""One-shot rebrand + verify script."""
import os, re, subprocess, sys

base = os.getcwd()
skip_dirs = {'node_modules', '.git', '__pycache__', 'dist'}

replacements = [
    ('White &amp; Co.', 'City Walk Real Estate LLC'),
    ('White &amp; Co', 'City Walk Real Estate LLC'),
    ('White & Co.', 'City Walk Real Estate LLC'),
    ('White & Co', 'City Walk Real Estate LLC'),
    ('White & Co Real Estate LLC', 'City Walk Real Estate LLC'),
    ('White &amp; Co Real Estate LLC', 'City Walk Real Estate LLC'),
    ('https://whiteandco.ae', 'https://citywalkrealestatellc.com'),
    ('www.linkedin.com/company/whiteandco', 'www.linkedin.com/company/citywalkrealestatellc'),
    ('www.youtube.com/@whiteandco', 'www.youtube.com/@citywalkrealestatellc'),
    ('www.tiktok.com/@whiteandco', 'www.tiktok.com/@citywalkrealestatellc'),
    ('instagram.com/whiteandco_dubai', 'instagram.com'),
    ('facebook.com/whiteandco', 'facebook.com'),
    ('white-and-co-logo', 'logo'),
    ('7th, 8th & 20th Floor, Control Tower, Motor City, Dubai, UAE', 'Office 30, City Towers A1, Al Nuamiya 3, Ajman, UAE'),
    ('7th, 8th & 20th Floor, Control Tower, Motor City', 'Office 30, City Towers A1, Al Nuamiya 3'),
    ('Motor City, Dubai', 'Ajman, UAE'),
    ('Motor City', 'Ajman'),
    ('+971 4 876 2333', '+971566036117'),
    ('+971****6117', '+971566036117'),
    ('+971****2333', '+971566036117'),
    ('tel:+971****2333', 'tel:+971566036117'),
    ('tel:+971****6117', 'tel:+971566036117'),
    ('Maison Estate', 'City Walk Real Estate LLC'),
    ('Maison', 'City Walk'),
    ('White & Co. Team', 'City Walk Real Estate LLC Team'),
    ('State of California', 'United Arab Emirates'),
    ('latitude: 25.0767', 'latitude: 25.4233'),
    ('longitude: 55.2143', 'longitude: 55.4935'),
    ('"latitude": 25.0767', '"latitude": 25.4233'),
    ('"longitude": 55.2143', '"longitude": 55.4935'),
    ('addressLocality: "Dubai"', 'addressLocality: "Ajman"'),
    ('addressRegion: "Dubai"', 'addressRegion: "Ajman"'),
    ('"addressLocality": "Dubai"', '"addressLocality": "Ajman"'),
    ('"addressRegion": "Dubai"', '"addressRegion": "Ajman"'),
    ('postalCode: "00000"', 'postalCode: ""'),
    ('"postalCode": "00000"', '"postalCode": ""'),
    ('Dubai real estate', 'UAE real estate'),
    ('Dubai Real Estate', 'Ajman Real Estate'),
    ('Explore Property in Dubai', 'Explore Property in Ajman'),
    ('Explore Communities in Dubai', 'Explore Communities in UAE'),
    ('Across Dubai communities', 'Across UAE communities'),
]

count = 0
for dirpath, dirs, files in os.walk(base):
    dirs[:] = [d for d in dirs if d not in skip_dirs]
    for fname in files:
        if not fname.endswith(('.jsx', '.js', '.html', '.md', '.json', '.jsonc', '.css')):
            continue
        fpath = os.path.join(dirpath, fname)
        try:
            with open(fpath, 'r', encoding='utf-8', errors='replace') as f:
                content = f.read()
            original = content
            for old, new in replacements:
                content = content.replace(old, new)
            if content != original:
                with open(fpath, 'w', encoding='utf-8') as f:
                    f.write(content)
                count += 1
                print('Updated: ' + os.path.relpath(fpath, base))
        except Exception as e:
            print('Error: ' + str(e))
print('Total files updated: ' + str(count))
sys.stdout.flush()
