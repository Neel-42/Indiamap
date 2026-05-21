# Publish to GitHub (Indiamap)

All project files are in this folder. Git could not be run from Cursor, so publish manually:

## 1. Create the repo on GitHub (if needed)

1. Go to https://github.com/new
2. Repository name: **Indiamap** (exact spelling)
3. Public → **Create repository** (do not add README or .gitignore)

## 2. Push with GitHub Desktop

1. Open **GitHub Desktop**
2. **File → Add Local Repository** → choose this folder:  
   `/Users/neelvenkatesan/Documents/GitHub/Indiamap`
3. If asked to create a repo, confirm
4. Summary: `Add colonial India farming and famine map` → **Commit to main**
5. **Publish repository** (or **Push origin**)  
   - Name: `Indiamap`  
   - Account: `Neel-42`

## 3. Enable the live map (GitHub Pages)

1. Open https://github.com/Neel-42/Indiamap → **Settings** → **Pages**
2. **Build and deployment** → Source: **GitHub Actions**
3. **Actions** tab → wait for **Deploy to GitHub Pages** to finish

Live URL: **https://neel-42.github.io/Indiamap/**

## Or push from Terminal

```bash
cd /Users/neelvenkatesan/Documents/GitHub/Indiamap
git init -b main
git add -A
git commit -m "Add colonial India farming and famine map"
git remote add origin https://github.com/Neel-42/Indiamap.git
git push -u origin main
```
