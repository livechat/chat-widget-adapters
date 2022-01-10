await Promise.all([$`manypkg check`, $`eslint \"{,!(node_modules)/**/}*.{js,ts,tsx}\"`])
