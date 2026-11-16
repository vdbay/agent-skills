# Publication corrections

This archive is the 2026-11-16 applied run, prepared for publication in `vdbay/agent-skills`.

Before publishing, the maintainers made documentation-only corrections:

- Replaced local paths with placeholders in `prompt.md`, `with_skill/judge-report.md`, `browser-check.md`, and `static-check.json`; the archived package still passes the strict artifact validator, but the evidence files were not rerun.
- Added the source CSS excerpt at `with_skill/outputs/evidence/source-css-extract.txt`.
- Added a copy of the judge report at `with_skill/outputs/evidence/judge/judge-report.md` so the artifact's internal link resolves; the copy is excluded from future blind judge packets.
- Fixed archive-relative links in `with_skill/outputs/README.md` to point at `../screenshots/` and `../judge-report.md`.
- Corrected the focus-ring contrast in `browser-check.md` from 6.00:1 to 5.44:1 and the `darkCta.halo` field in `browser-matrix.json` from `none` to `5px white`; the independent 95/100 audit flagged both.
- Updated the applied browser-check wording to reflect the current 20-cell requirement (320/390/768/1024/1440); the measured cells are unchanged.
- Corrected the evidence-size estimate in `with_skill/outputs/README.md`.

No artifact, test result, or score was changed. The two corrected labels now match the measurements recorded by the independent audit. The 93/100 applied judge report and the 95/100 audit report predate these publication edits; the scores remain conservative snapshots.
