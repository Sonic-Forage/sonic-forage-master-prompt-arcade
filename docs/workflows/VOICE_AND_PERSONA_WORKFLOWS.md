# 🎙 Voice and Persona Workflows

Voice is a swappable workflow contract, not a hardcoded vendor.

## Profiles

- `strawberry-agi-host` — playful arcade narrator, short barks, rave command-center vibe.
- `plur-care-guide` — calm, gentle, harm-reduction/community support tone.
- `dj-drop-hype` — high-energy DJ tag/drop generator for approved public drops only.

## Environment placeholders

```text
VOICE_PROVIDER=mock
VOICE_PROFILE=strawberry-agi-host
VOICE_ENDPOINT_URL=__SET_LOCALLY_DO_NOT_COMMIT_REAL_URL__
VOICE_PUBLIC_SEND_ENABLED=false
VOICE_TO_SHELL_ENABLED=false
```

## Safe mock request

```json
{
  "voice_profile": "strawberry-agi-host",
  "line": "Prompt shard collected. Strawberry AGI is getting smarter.",
  "delivery": "local_preview_only",
  "closed_gates": ["public_send", "voice_to_shell", "paid_provider"]
}
```

## Rules

- Public voice send is closed until explicit human approval.
- Voice-to-shell is closed by default.
- No real endpoints or tokens in git.
- If a provider is down, fall back to text-only arcade/status copy.
