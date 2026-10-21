"""Generate source-grounded search pages and metadata from published site assets."""
from pathlib import Path
import json, re, subprocess
from html import escape
from xml.etree import ElementTree as ET
ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://politicalarcades.com'
def read(path): return (ROOT/path).read_text(encoding='utf-8')
def write(path, text):
    p=ROOT/path; p.parent.mkdir(parents=True, exist_ok=True); p.write_text(text, encoding='utf-8')
def title(html, value): return re.sub(r'<title>.*?</title>', '<title>'+escape(value)+'</title>', html, count=1)
home=title(read('index.html'), 'Political Arcades — Free Political Games, Music & Satire')
home=home.replace('AdsToAid — Play the arcade. Build your city.', 'Political Arcades — Free Political Games, Music & Satire')
home=home.replace('Free browser arcade games with no download and no sign-up. At least half of distributable profit funds community programs. Read the giving policy and milestone schedule.', 'Play free political browser games and watch original political satire music videos. No download required. Explore the arcade and our community giving project.')
home=home.replace('"name":"AdsToAid","url":"https://politicalarcades.com/","publisher"', '"name":"Political Arcades","alternateName":"AdsToAid","url":"https://politicalarcades.com/","publisher"')
write('index.html', home)
ns='http://www.sitemaps.org/schemas/sitemap/0.9'; vn='http://www.google.com/schemas/sitemap-video/1.1'
ET.register_namespace('',ns); ET.register_namespace('video',vn)
videos=ET.Element('{'+ns+'}urlset')
labels={'name-the-day':'James Talarico Country Music Video','freeze-the-rent':'Zohran Mamdani Political Music Video','answer-the-question':'Jon Ossoff Political Music Video'}
for slug,label in labels.items():
    path=f'watch/{slug}/index.html'; html=read(path)
    name=re.search(r'<h1>(.*?)</h1>',html).group(1)
    desc=re.search(r'<meta name="description" content="([^"]+)"',html).group(1)
    media=re.search(r'<source src="([^"]+)"',html).group(1)
    poster=re.search(r'<video[^>]+poster="([^"]+)"',html).group(1)
    date=subprocess.check_output(['git','log','--diff-filter=A','--format=%aI','--',media.lstrip('/')],cwd=ROOT,text=True).strip().splitlines()[-1]
    data={'@context':'https://schema.org','@type':'VideoObject','name':name+' — '+label,'description':desc,'thumbnailUrl':[BASE+poster],'uploadDate':date,'contentUrl':BASE+media,'url':f'{BASE}/watch/{slug}/','publisher':{'@type':'Organization','name':'Political Arcades','url':BASE+'/'}}
    html=title(html,name+' — '+label+' | Political Arcades')
    html=re.sub(r'<script type="application/ld\+json">.*?</script>', '<script type="application/ld+json">'+json.dumps(data,ensure_ascii=False)+'</script>',html,count=1)
    write(path,html)
    url=ET.SubElement(videos,'{'+ns+'}url'); ET.SubElement(url,'{'+ns+'}loc').text=data['url']
    v=ET.SubElement(url,'{'+vn+'}video')
    for key,val in [('thumbnail_loc',BASE+poster),('title',data['name']),('description',desc),('content_loc',BASE+media),('publication_date',date)]: ET.SubElement(v,'{'+vn+'}'+key).text=val
ET.indent(videos); write('video-sitemap.xml',ET.tostring(videos,encoding='unicode',xml_declaration=True))
robots=read('robots.txt')
if '/video-sitemap.xml' not in robots: write('robots.txt',robots.rstrip()+'\nSitemap: '+BASE+'/video-sitemap.xml\n')
clips=json.loads(read('greatest-hits/clips.json'))
names={'sayed':'Abdul El-Sayed','talarico':'James Talarico','mamdani':'Zohran Mamdani','aoc':'Alexandria Ocasio-Cortez'}
selected=[]
for hero in names:
    choices=[c for c in clips if c['hero']==hero and c['platform']=='youtube']
    if choices: selected.append(choices[0])
sitemap=ET.fromstring(read('sitemap.xml'))
links=[]
for c in selected:
    slug=re.sub('[^a-z0-9]+','-',names[c['hero']].lower()+'-'+c['title'].lower()).strip('-')
    route='/greatest-hits/'+slug+'/'
    heading=names[c['hero']]+': '+c['title']; e=escape
    body=f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{e(heading)} | Political Arcades</title><meta name="description" content="{e(c['context'],quote=True)}"><link rel="canonical" href="{BASE+route}"><link rel="stylesheet" href="/arcade.css"><link rel="stylesheet" href="/shared/publications.css"></head><body><main class="publication"><p><a href="/">Political Arcades</a> / <a href="/greatest-hits/">Greatest Hits</a></p><header class="publication-intro"><p class="kicker">{e(c['topic'])}</p><h1>{e(heading)}</h1><p class="publication-lede">{e(c['context'])}</p></header><a href="/greatest-hits/#clip={e(c['id'])}"><img src="{e(c['poster'])}" alt="Frame from {e(names[c['hero']])}'s original clip" style="width:100%;max-width:640px;height:auto"><p>Watch the original clip in our player →</p></a><div class="publication-body"><h2>Original source</h2><p>Published {e(c['published'])} by <a href="{e(c['channel'])}">{e(c['uploader'])}</a>.</p><p>Publisher's title: <a href="{e(c['source'])}">{e(c['sourceTitle'])}</a></p><h2>Why we selected it</h2><p>{e(c['editorial']['reading'])}</p><h2>What to listen for</h2><p>{e(c['editorial']['question'])}</p><p>This page provides editorial context, not a verbatim transcript. Watch the original upload for the speaker's exact words.</p><p><a href="/greatest-hits/">Explore more speeches and debate clips</a> · <a href="/watch/">Original music videos</a> · <a href="/games/">Free browser games</a></p></div></main></body></html>'''
    write(route.strip('/')+'/index.html',body)
    if not any(x.text==BASE+route for x in sitemap.iter('{'+ns+'}loc')):
        u=ET.SubElement(sitemap,'{'+ns+'}url'); ET.SubElement(u,'{'+ns+'}loc').text=BASE+route
    links.append(f'<li><a href="{route}">{e(heading)}</a></li>')
ET.indent(sitemap); write('sitemap.xml',ET.tostring(sitemap,encoding='unicode',xml_declaration=True))
hub=title(read('greatest-hits/index.html'),'Political Speeches & Debate Clips — Greatest Hits | Political Arcades')
block='<section id="source-guides"><h2>Selected clips: sources and context</h2><ul>'+''.join(links)+'</ul></section>'
hub=re.sub(r'<section id="source-guides">.*?</section>','',hub,flags=re.S)
hub=hub.replace('</main>',block+'</main>'); write('greatest-hits/index.html',hub)
print('Updated homepage, 3 video pages, video sitemap and',len(selected),'source pages.')
