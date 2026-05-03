#!/usr/bin/env python3
from pathlib import Path
import json, re
root=Path(__file__).resolve().parents[1]
required=['README.md','LICENSE','.env.example','docs/index.html','docs/arcade/index.html','docs/arcade/style.css','docs/arcade/game.js','docs/prompts/MASTER_PROMPT_GUIDE.md','docs/ui/UNICODE_BADASS_UI_KIT.md','docs/workflows/VOICE_AND_PERSONA_WORKFLOWS.md','docs/workflows/COMFYUI_ENDPOINT_SWITCHBOARD.md','docs/community/COMMUNITY_BUILD_GUIDE.md','framework/prompts/github-community-master-prompts.md','framework/tags/sonic-forage-master-tags.json','framework/workflows/workflow-registry.json','framework/manifest.json','.github/ISSUE_TEMPLATE/framework_improvement.yml','.github/PULL_REQUEST_TEMPLATE.md']
missing=[p for p in required if not (root/p).exists()]
if missing: raise SystemExit('missing required files: '+', '.join(missing))
manifest=json.loads((root/'framework/manifest.json').read_text())
if manifest.get('default_state')!='closed_until_human_yes': raise SystemExit('default_state must be closed')
if len(manifest.get('closed_gates',[]))<9: raise SystemExit('closed gates too low')
payloads=list((root/'framework/payloads').glob('*.json'))
if len(payloads)<5: raise SystemExit('payload count too low')
for p in payloads: json.loads(p.read_text())
tags=json.loads((root/'framework/tags/sonic-forage-master-tags.json').read_text())
for needed in ['master-prompt','prompt-pack','payload','unicode-ui','comfyui-ready','voice-ready','closed-gate','strawberry-agi']:
    if needed not in tags.get('labels',[]) and needed not in tags.get('topics',[]): raise SystemExit('missing tag '+needed)
reg=json.loads((root/'framework/workflows/workflow-registry.json').read_text())
if len(reg.get('workflows',[]))<3: raise SystemExit('workflow count too low')
text='\n'.join(p.read_text(errors='ignore') for p in [root/x for x in required] if p.suffix in ['.md','.example','.html','.js','.json'])
secret_markers = ['s'+'k-', 'g'+'hp_', 'BEGIN '+'PRIVATE KEY']
for bad in secret_markers:
    if bad in text: raise SystemExit('secret-like token marker found')
# Catch committed real-ish endpoint values outside placeholders/docs examples.
if re.search(r'https?://[^\s"\']*(modal\.run|ngrok|trycloudflare|localhost:\d+)[^\s"\']*', text, re.I):
    raise SystemExit('real endpoint-like URL found')
print('MASTER PROMPT ARCADE VERIFY OK')
print('required files:', len(required))
print('closed gates:', len(manifest['closed_gates']))
print('payloads:', len(payloads))
print('workflows:', len(reg['workflows']))
