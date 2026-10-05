// BullySkate (Faiqie): Skate 3's skating (SK8-ENGINE's Rust rewrite) inside Bully: Scholarship Edition 1.200, built
// on the player's PC from their own Xbox 360 Skate 3 folder (QC.md rule 2, Pj 2026-10-05).
// License: MIT for the author's own code only; the bundled Skate rewrite has no license (permission stated to the author
// only) and the audio worker is GPL-3.0-only, so no rehosting: upstream fetch (PLATFORM-SPEC section 4,
// "Upstream fetch"). The app downloads BullySkate-Windows-v0.1.2.zip from the author's release as released.
//
// The zip holds BullySkateLauncher.exe with the whole mod embedded as a resource (BullySkate.payload): the ASI, the
// workers and Install.ps1 only exist once the launcher unpacks them into %LOCALAPPDATA%\BullySkate\builds
// (launcher/ConsoleLauncher.cs:79-112). Placing BullySkate.asi ourselves would mean repacking, which upstream fetch
// forbids. So the recipe places the release as is into {game}/BullySkate (snapshot, Restore removes it) and the player
// runs the author's launcher; the recipe never runs anything. Two upstream scripts the launcher may run are kept out by
// player steps done first (see notes): tools/EnsureDsl.ps1 (MediaFire download of Derpy's Script Loader, skipped when
// derpy_script_loader.asi >= 15.3 is already in the game folder, EnsureDsl.ps1:12) and tools/RepairAudio.ps1 (admin
// DXSETUP, run only when the XACT probe says the DirectX June 2010 runtime is missing, AudioStartup.cs:28-43).
//   node library/bullyskate/build.mjs       (outputs: library/lib.mjs)
import { asset, card, dl, emit, pinned } from '../lib.mjs';

const UP = {
  repo: 'https://github.com/Faiqie/BullySkate', tag: 'v0.1.2', commit: '6b705e968e5cb07ab8dddd6585a0547218485511',
  authors: ['Faiqie'],
  zip: { file: 'BullySkate-Windows-v0.1.2.zip', sha256: 'a7158ee985704ec9c306a4da1b9d314e718bae14b7168fa0f64bb6d76038eeb3' }, // = GitHub digest, 2026-10-05
};
const ID = 'bullyskate', VERSION = '0.1.2', NAME = 'BullySkate';
const TAGLINE = 'Skate 3\'s skating in Bully: Scholarship Edition: flick-it tricks, grinds, manuals and skitching anywhere in Bullworth, built from your own Skate 3 files.';
const DSL = 'https://www.nexusmods.com/bullyscholarshipedition/mods/43';
const DX = 'https://www.microsoft.com/en-us/download/details.aspx?id=8109';

const upUrl = `${UP.repo}/releases/download/${UP.tag}/${UP.zip.file}`;
const release = asset(UP.zip.file, await pinned(upUrl, UP.zip.sha256), { zipped: true, upstream: upUrl });
const assets = [release];

const make = (urls) => ({
  id: `sigf/${ID}`,
  version: VERSION,
  name: NAME,
  tagline: TAGLINE,
  kind: 'mashup',
  games: [
    { game: 'bully', role: 'host', label: 'Bully: Scholarship Edition', engine: 'Bully SE (RenderWare) + ASI plugin (C) + Derpy\'s Script Loader Lua + Rust physics/audio workers', apps: { steam: '12200' }, runtime: 'Bully: Scholarship Edition PC 1.200 only' },
    { game: 'skate3', role: 'guest', label: 'Skate 3 (Xbox 360)', engine: 'SK8-ENGINE Skate 3 Rust rewrite, assets converted from your own Xbox 360 files' },
  ],
  requires: [
    { id: 'derpy-script-loader', version: '15.3', page: DSL, license: 'not ours to ship; linked to the author\'s page',
      note: 'install it into the Bully folder before the first launcher run: the launcher then keeps it and downloads nothing' },
    { id: 'directx-june2010', page: DX, license: 'Microsoft redistributable, linked',
      note: 'the DirectX End-User Runtimes (June 2010) for Bully\'s XACT audio; install it first if you are unsure, so the launcher never asks for administrator rights' },
    { id: 'skate3-xbox360', note: 'your own Skate 3 for Xbox 360, extracted to a folder that keeps default.xex next to its data folder (an ISO is not read directly)' },
  ],
  install: [
    { game: 'bully', strategy: 'game-dir-snapshot', files: [
      // Upstream file as released, every entry checked against `contents`, into its own folder of the game.
      { src: release.name, dst: '{game}/BullySkate', unpack: true, contents: release.contents, ...dl(release, urls) },
    ] },
  ],
  // The author's launcher is the entry point on every run (setup the first time, then it starts Bully, through Steam
  // for a Steam copy). `exe` is not read by the app yet: the notes tell the player.
  launch: [{ game: 'bully', exe: 'BullySkate/BullySkateLauncher.exe', args: [] }],
  files: [{ name: release.name, ...dl(release, urls) }],
  source: {
    repo: UP.repo, license: 'MIT + no license (upstream download)', upstream_license: 'MIT (own code; Skate rewrite unlicensed, audio GPL-3.0-only)',
    fetch: 'upstream', tag: UP.tag, commit: UP.commit, hosted: `https://github.com/SIGFAI/${ID}`,
  },
  media: {},
  built_by: { author: UP.authors[0], authors: UP.authors, packaged_by: 'SIGF' },
  idea_by: UP.authors[0],
  built_at: '2026-10-05T00:00:00.000Z',
  ...card(UP.repo),
  notes: [
    'You need Bully: Scholarship Edition for Windows at version 1.200 (Steam, or retail with the official 1.200 update), an XInput or PlayStation controller, and your own Skate 3 for Xbox 360 extracted to a folder: default.xex with its data folder next to it. Nothing from Skate 3 or Bully is downloaded; the author\'s launcher converts your files on your PC.',
    `Before the first run, install Derpy's Script Loader 15.3 into your Bully folder from its official page (${DSL}). With it in place the launcher keeps it; without it the launcher downloads it itself from MediaFire.`,
    `Install Microsoft's DirectX End-User Runtimes (June 2010) first (${DX}) if Bully's sound has ever failed on this PC. Otherwise, when that runtime is missing, the launcher downloads it from Microsoft and asks for administrator rights.`,
    'The app installs the author\'s release into the BullySkate folder of your Bully folder. Open BullySkate\\BullySkateLauncher.exe (or Setup.cmd there to change paths): pick Bully.exe (for Steam: Manage > Browse local files), then default.xex. The first run prepares your files (a few minutes) and starts Bully; later runs just start Bully. In game: right stick click + D-pad Down toggles skating.',
    'Restore removes only the BullySkate folder. What the launcher installs into the Bully folder (BullySkate.asi, dinput8.dll if no ASI loader was there, vcruntime140.dll if missing, Microsoft.VC80.OpenMP, _derpy_script_loader\\scripts\\BullyMotion and its backups) and its data in %LOCALAPPDATA%\\BullySkate stay: run BullySkate\\Disable.cmd before Restore to turn the mod off, and delete BullySkate.asi and %LOCALAPPDATA%\\BullySkate by hand to remove it completely.',
    'Single player only. Beta, released days ago with open setup bugs (some Steam copies reported incompatible; sound runtime): report bugs to the author on the upstream issue tracker.',
  ],
});

// No app fixture: it would commit the author's zip (unlicensed parts) into our repo.
emit({ slug: ID, version: VERSION, assets, fixtureAssets: null, make });
