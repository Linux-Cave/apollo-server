# apollo-server

A Node.js boilerplate for Apollo Server.

### Dev

```
docker-compose -f docker-compose.yml up --build -V
docker-compose -f docker-compose.yml down
```

### Test

```
docker-compose -f docker-compose.yml -f docker-compose.ci-build.yml up --build -V
```

### Configurations

- [jest](https://github.com/facebook/jest) - `jest.config.json`
- [husky](https://github.com/typicode/husky/) - `.huskyrc.yaml`
- [prettier](https://github.com/prettier/prettier) - `.prettierrc.yaml`
