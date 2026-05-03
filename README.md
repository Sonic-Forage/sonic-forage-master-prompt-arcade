# 🍓🐍 Sonic Forage Master Prompt Arcade

> Open-source community framework + badass Unicode UI + swappable AI workflows + a retro Strawberry AGI snake game for downtime, high-score flexing, and service-outage fun.

## 🚀 What this repo gives the community

This repo is the **starter control surface** for Sonic-Forage builders:

- `docs/prompts/MASTER_PROMPT_GUIDE.md` — copy/paste master prompt for turning wild ideas into safe community repos.
- `framework/prompts/github-community-master-prompts.md` — GitHub issue/PR/repo prompts.
- `framework/payloads/*.json` — machine-readable payloads for launches, workflows, voices, ComfyUI, and arcade state.
- `framework/tags/sonic-forage-master-tags.json` — tags/labels taxonomy.
- `docs/ui/UNICODE_BADASS_UI_KIT.md` — terminal/card/deck UI components.
- `docs/workflows/VOICE_AND_PERSONA_WORKFLOWS.md` — voice/persona routing with closed gates.
- `docs/workflows/COMFYUI_ENDPOINT_SWITCHBOARD.md` — endpoint URL placeholders and workflow switch patterns.
- `docs/arcade/index.html` — playable retro Strawberry AGI Snake.

## 🎮 Play the game

Live Pages arcade:

https://sonic-forage.github.io/sonic-forage-master-prompt-arcade/arcade/

Controls:

- Arrow keys / WASD: move
- Space: pause/resume
- R: restart
- M: mute/unmute synth bleeps
- Eat strawberries, collect prompt shards, avoid outage blocks, hit high score.

## 🧬 Master loop

```text
messy idea → master prompt → payload → tags → workflow card → verifier → GitHub proof → community fork
```

## 🔐 Closed-gate defaults

Do not commit or publish:

- real endpoint URLs
- secrets/API keys/tokens
- private media
- payment links
- outreach/DM/email sends
- paid GPU jobs
- voice-to-shell or live-provider actions

Everything external starts as `closed_until_human_yes`.

## ✅ Verify

```bash
PYTHONDONTWRITEBYTECODE=1 python3 scripts/verify.py
node --check docs/arcade/game.js
```

Expected:

```text
MASTER PROMPT ARCADE VERIFY OK
required files: 18
closed gates: 9
payloads: 5
workflows: 3
```

## License

MIT. Use it, fork it, remix it. Keep the safety gates intact.
