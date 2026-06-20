#!/usr/bin/env python3
"""Create GitHub repo and push."""
import subprocess, json, urllib.request, re

# Read token from git-credentials
with open('/home/alexagent/.git-credentials') as f:
    line = f.read().strip()
m = re.search(r'ghp_[a-zA-Z0-9]+', line)
if not m:
    print("NO TOKEN")
    exit(1)
token = m.group()

# Create repo
req = urllib.request.Request(
    'https://api.github.com/user/repos',
    data=json.dumps({
        "name": "gas-inpex-new-site",
        "description": "Django + DRF + Next.js — корпоративный сайт Gas Inpex",
        "private": False,
        "auto_init": False
    }).encode(),
    headers={
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json",
    },
    method='POST'
)
resp = json.loads(urllib.request.urlopen(req).read())
if 'clone_url' in resp:
    print(f"OK: {resp['html_url']}")
    print(f"CLONE: {resp['clone_url']}")
    
    # Push
    subprocess.run(["git", "remote", "add", "origin", resp['clone_url']], cwd='/home/alexagent/projects/gas-inpex/new-site')
    r = subprocess.run(["git", "push", "-u", "origin", "master"], cwd='/home/alexagent/projects/gas-inpex/new-site', capture_output=True, text=True)
    print(f"PUSH: {r.returncode}")
    if r.returncode == 0:
        print("✅ PUSHED")
else:
    print(f"ERR: {resp.get('message', str(resp))}")