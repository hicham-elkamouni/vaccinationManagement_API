module.exports = {
  apps : [{
    name: "app",
    script: "build/server.js",
    instances: "6",
    max_restarts: 5,
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}