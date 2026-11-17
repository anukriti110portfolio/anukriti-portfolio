# Research Exploration section (camera case study)

```
research-exploration/
├── index.html          ← the "Research Exploration" section page (project cards)
├── camera/index.html   ← "The Missing Frame" camera case study (24 slides, self-contained)
└── README.md
```

Plain static HTML/CSS (fonts load from Google Fonts). Works on GitHub Pages as is.

## Add it to your repo and push

```bash
cd /home/samual/anukriti-portfolio
git checkout -b research-exploration
cp -r /path/to/research-exploration ./research-exploration     # adjust path to where you unzipped
git add research-exploration
git commit -m "Add Research Exploration section with camera case study"
git push -u origin research-exploration
```

Then link it from your site navigation, e.g. `<a href="research-exploration/index.html">Research Exploration</a>`.
If your portfolio uses a framework (React/Next/Vite) and not plain HTML, tell me the stack and I will convert it into a component/route.
