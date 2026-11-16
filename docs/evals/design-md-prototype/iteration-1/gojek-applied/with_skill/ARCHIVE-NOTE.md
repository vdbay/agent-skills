# Archive note

The original deliverable's `README.md` used `evidence/screenshots/` as the screenshot path. In this archive the 20 screenshots are stored at `../screenshots/` (next to `outputs/`), and the README has been updated to that archive-relative path.

Everything else in `outputs/` mirrors the final artifact root. The independent judge report is at `../judge-report.md`; a copy also exists at `outputs/evidence/judge/judge-report.md` so the artifact's internal link resolves. Exclude both copies when constructing a future blind judge packet.

The published `evidence/static-check.json` replaces the original local path with `<out-dir>`. The archived package still passes `validate-artifacts.mjs --strict`; the file was not rerun because only the recorded path was redacted.
