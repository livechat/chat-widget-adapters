await Promise.all([$`yarn check-pkgs`, $`eslint \"{,!(node_modules)/**/}*.{js,ts,tsx}\"`])
