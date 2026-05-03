# 🎛 ComfyUI Endpoint Switchboard

This repo is endpoint-ready without exposing endpoint URLs.

## Placeholder environment

```text
COMFYUI_BASE_URL=__SET_LOCALLY_DO_NOT_COMMIT_REAL_URL__
COMFYUI_WORKFLOW_ID=__OPTIONAL_LOCAL_WORKFLOW_ID__
COMFYUI_PUBLIC_UPLOAD_ENABLED=false
COMFYUI_PAID_GPU_ENABLED=false
```

## Workflow slots

1. `repo-hero-textfree` — text-free hero image for GitHub repos.
2. `arcade-social-card` — screenshot/promo card for Strawberry AGI Snake.
3. `voice-avatar-card` — square persona/avatar card.

## Dry-run payload

```json
{
  "workflow": "arcade-social-card",
  "mode": "dry_run_only",
  "base_url_env": "COMFYUI_BASE_URL",
  "inputs": {
    "prompt": "retro neon strawberry AGI snake arcade cabinet, no readable text, no logos",
    "aspect_ratio": "16:9"
  },
  "outputs": ["local_preview_image"],
  "closed_gates": ["paid_gpu", "public_upload", "private_media"]
}
```

## Rules

- Never commit the resolved endpoint URL.
- Never start paid GPU/video jobs without human approval.
- Generated images must be QA'd before being used as public proof.
