# BullySkate

Skate 3's skating in Bully: Scholarship Edition: flick-it tricks, grinds, manuals and skitching anywhere in Bullworth, built from your own Skate 3 files.

**BullySkate is made by [Faiqie](https://github.com/Faiqie).** All credit for the mod goes to them.

- Original project: https://github.com/Faiqie/BullySkate
- Report bugs and ask questions there: https://github.com/Faiqie/BullySkate/issues
- Upstream release packaged here: [v0.1.2](https://github.com/Faiqie/BullySkate/releases/tag/v0.1.2) (commit [`6b705e9`](https://github.com/Faiqie/BullySkate/tree/6b705e968e5cb07ab8dddd6585a0547218485511))

> **Beta.** Nobody at SIGF has played this build yet. Back up your saves.
> Bugs in the mod itself go to the author's issue tracker above; problems with the one-click install go to this repository's issues.

## What you need

- **Bully: Scholarship Edition** ([Steam](https://store.steampowered.com/app/12200/)): Bully: Scholarship Edition PC 1.200 only.
- **Skate 3 (Xbox 360)**.
- derpy-script-loader 15.3: install it into the Bully folder before the first launcher run: the launcher then keeps it and downloads nothing (https://www.nexusmods.com/bullyscholarshipedition/mods/43).
- directx-june2010: the DirectX End-User Runtimes (June 2010) for Bully's XACT audio; install it first if you are unsure, so the launcher never asks for administrator rights (https://www.microsoft.com/en-us/download/details.aspx?id=8109).
- skate3-xbox360: your own Skate 3 for Xbox 360, extracted to a folder that keeps default.xex next to its data folder (an ISO is not read directly).
- Windows and the [SIGF app](https://sigf.ai). The app installs  for you.

## Install

In the SIGF app, open **BullySkate** in the catalog, press **Install**, then **Play**. **Restore** puts your game folders back exactly as they were.
The app follows `mashup.json` in this repository: every download is pinned by sha256. `BullySkate-Windows-v0.1.2.zip` comes from the author's own release.

### Good to know

- You need Bully: Scholarship Edition for Windows at version 1.200 (Steam, or retail with the official 1.200 update), an XInput or PlayStation controller, and your own Skate 3 for Xbox 360 extracted to a folder: default.xex with its data folder next to it. Nothing from Skate 3 or Bully is downloaded; the author's launcher converts your files on your PC.
- Before the first run, install Derpy's Script Loader 15.3 into your Bully folder from its official page (https://www.nexusmods.com/bullyscholarshipedition/mods/43). With it in place the launcher keeps it; without it the launcher downloads it itself from MediaFire.
- Install Microsoft's DirectX End-User Runtimes (June 2010) first (https://www.microsoft.com/en-us/download/details.aspx?id=8109) if Bully's sound has ever failed on this PC. Otherwise, when that runtime is missing, the launcher downloads it from Microsoft and asks for administrator rights.
- The app installs the author's release into the BullySkate folder of your Bully folder. Open BullySkate\BullySkateLauncher.exe (or Setup.cmd there to change paths): pick Bully.exe (for Steam: Manage > Browse local files), then default.xex. The first run prepares your files (a few minutes) and starts Bully; later runs just start Bully. In game: right stick click + D-pad Down toggles skating.
- Restore removes only the BullySkate folder. What the launcher installs into the Bully folder (BullySkate.asi, dinput8.dll if no ASI loader was there, vcruntime140.dll if missing, Microsoft.VC80.OpenMP, _derpy_script_loader\scripts\BullyMotion and its backups) and its data in %LOCALAPPDATA%\BullySkate stay: run BullySkate\Disable.cmd before Restore to turn the mod off, and delete BullySkate.asi and %LOCALAPPDATA%\BullySkate by hand to remove it completely.
- Single player only. Beta, released days ago with open setup bugs (some Steam copies reported incompatible; sound runtime): report bugs to the author on the upstream issue tracker.

## What this repository holds

BullySkate's own code is MIT, but its release ships a Skate 3 rewrite with no license (and GPL-3.0-only audio code), so SIGF does not rehost it. This repository holds **only SIGF's own files**, never the author's:

1. This README, `sigf/` (the script that built the recipe, for reference) and `mashup.json` (the SIGF app recipe).
2. Not here: `BullySkate-Windows-v0.1.2.zip` (sha256 `a7158ee985704ec9c306a4da1b9d314e718bae14b7168fa0f64bb6d76038eeb3`). The app downloads it on the player's demand from the author's release, as released: https://github.com/Faiqie/BullySkate/releases/download/v0.1.2/BullySkate-Windows-v0.1.2.zip
3. The release `v0.1.2`, which has no assets: the recipe's only download is the author's file above.

The sha256 of every file inside the zips is in `mashup.json` (`contents`).

## Licenses

| Part | License | Where |
|---|---|---|
| BullySkate (`BullySkate-Windows-v0.1.2.zip`, the author's release file) | MIT for the author's own code; the bundled Skate rewrite has no license; audio GPL-3.0-only. Not stored here; the app downloads it from the author's release | https://github.com/Faiqie/BullySkate |

## Why this repository exists

The SIGF app (https://sigf.ai) installs mods from recipes (`mashup.json`) whose downloads are pinned release files. This repository makes BullySkate installable in one click, credited to Faiqie. If you are the author and want anything changed or taken down, open an issue here.
