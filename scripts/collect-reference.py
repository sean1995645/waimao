import urllib.request,urllib.error,re,json,time,os
from urllib.parse import urlparse,urljoin
os.makedirs('reference/html',exist_ok=True)
base='https://smartthermostatmanufacturer.com'
urls=json.load(open('reference/urls.json'))
urls += [urljoin(base,u) for u in re.findall('href="([^"]+)"',open('reference/home-response.html').read()) if u.startswith('/') and not u.startswith('/dist/')]
paths=list(dict.fromkeys(urlparse(u).path or '/' for u in urls if not re.search(r'\.(jpg|png|css|js|svg|ico|pdf)$',urlparse(u).path)))
result=[]
for i,path in enumerate(paths):
 url=base+path;file=f'reference/html/{i:03d}.html'
 try:
  with urllib.request.urlopen(url,timeout=15) as r: status=r.status;body=r.read().decode('utf-8','replace')
 except urllib.error.HTTPError as e:status=e.code;body=e.read().decode('utf-8','replace')
 except Exception as e: result.append({'url':url,'error':str(e),'browserVerified':False});continue
 open(file,'w').write(body)
 title=re.search(r'<title>(.*?)</title>',body,re.S)
 result.append({'url':url,'status':status,'title':title.group(1) if title else '', 'source':file,'browserVerified':False,'template':'unverified'})
 json.dump(result,open('docs/page-inventory.json','w'),indent=2,ensure_ascii=False)
 time.sleep(.4)
print('Collected',len(result),'URLs')
