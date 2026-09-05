from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote
import json
import xml.etree.ElementTree as ET
root=Path(__file__).resolve().parents[1]/'dist'
class Page(HTMLParser):
 def __init__(self):super().__init__();self.h1=0;self.canonical=[];self.urls=[];self.ids=set();self.schemas=[];self.schema=None
 def handle_starttag(self,t,a):
  a=dict(a)
  if t=='h1':self.h1+=1
  if a.get('id'):self.ids.add(a['id'])
  if a.get('rel')=='canonical':self.canonical.append(a['href'])
  if t in ['a','img','script','link']:
   u=a.get('href') or a.get('src')
   if u:self.urls.append(u)
  if t=='script' and a.get('type')=='application/ld+json':self.schema=''
 def handle_data(self,s):
  if self.schema is not None:self.schema+=s
 def handle_endtag(self,t):
  if t=='script' and self.schema is not None:self.schemas.append(json.loads(self.schema));self.schema=None
pages={}
for f in root.rglob('*.html'):
 u='https://bitman.ch/'+str(f.relative_to(root)).replace('index.html','');p=Page();p.feed(f.read_text());pages[u]=p
 assert p.h1==1,(u,p.h1)
 assert p.canonical==[u],(u,p.canonical)
 assert p.schemas,u
 assert '/assets/contact.js' in p.urls,u
for u,p in pages.items():
 for link in p.urls:
  from urllib.parse import urljoin
  target=urlparse(urljoin(u,link))
  if target.netloc!='bitman.ch':continue
  path=root/unquote(target.path).lstrip('/')
  if target.path.endswith('/'):path=path/'index.html'
  assert path.exists(),(u,link)
  if target.fragment:
   pageurl=target._replace(fragment='',query='').geturl()
   if pageurl in pages:assert target.fragment in pages[pageurl].ids,(u,link)
listed={u.find('{*}loc').text for u in ET.parse(root/'sitemap.xml').getroot()}
assert listed==set(pages),(listed-set(pages),set(pages)-listed)
# Every indexable page is reachable from the homepage.
seen=set();queue=['https://bitman.ch/']
while queue:
 u=queue.pop()
 if u in seen:continue
 seen.add(u)
 for link in pages[u].urls:
  target=urlparse(urljoin(u,link))._replace(query='',fragment='').geturl()
  if target in pages and target not in seen:queue.append(target)
assert seen==set(pages),set(pages)-seen
print(f'PASS: {len(pages)} pages, canonical, JSON-LD, internal links/anchors, sitemap, tracking and reachability')
