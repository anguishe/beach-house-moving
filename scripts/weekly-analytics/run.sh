#!/usr/bin/env bash
# Weekly BHM analytics pull. Cron: see `crontab -l`. Needs both Chromes open with the Claude extension.
set -u
cd /home/angsec/Projects/beach-house-moving || exit 1
export PATH="$HOME/.local/bin:$HOME/.npm-global/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
LOG=docs/analytics/weekly/run.log
echo "=== $(date '+%F %T') start" >> "$LOG"
claude -p --chrome \
  --allowedTools "mcp__claude-in-chrome" "Read" "Write" "Edit" "Glob" "Grep" \
    "Bash(curl:*)" "Bash(date:*)" "Bash(ls:*)" "Bash(set -a*)" "Bash(grep:*)" "Bash(cat:*)" \
  "$(cat scripts/weekly-analytics/PROMPT.md)" >> "$LOG" 2>&1
echo "=== $(date '+%F %T') exit $?" >> "$LOG"
