await Promise.all([$`npm run check-pkgs`, $`eslint \"{,!(node_modules)/**/}*.{js,ts,tsx}\"`])
