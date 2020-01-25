[![Netlify Status](https://api.netlify.com/api/v1/badges/30a3b545-948f-4fb0-80a0-d618dc180430/deploy-status)](https://app.netlify.com/sites/dkjk-sorting-visualizer/deploys)

# Sorting Visualizer

## Pre-Requisites

- [yarn package manager](https://legacy.yarnpkg.com/lang/en/docs/install/#mac-stable)
- [docker](https://www.docker.com/products/docker-desktop)

## Set Up

```
npm i
npm start
```

## Set Up Troubleshooting

- nvm version mismatch

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
nvm install
nvm use
```

## Deploy

```
npm run deploy
```

## Technologies

- React
- Redux

## Other Technologies

- Docker
- Netlify with CI/CD and Pull Request Preview
- Husky pre-commit linting

## Future Features

- [x] Move sliders and settings into side bar
- [x] Step forward and back through sorting
- Colored bars for sorted
- Hover over bar for tooltip value
- Logging to check what current sort type is
- Logging for which positions/values are swapped
- Sort Descriptions

## Contributors

- David Ko
- Jesse Kasumba
- Lydia Gamache

### Inspired by

- https://github.com/clementmihailescu/Sorting-Visualizer

### Semantic commits

- https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716
