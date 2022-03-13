module.exports = {
  apps : [{
    name: "app",
    script: "build/server.js",
    instances: "1",
    max_restarts: 5,
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}