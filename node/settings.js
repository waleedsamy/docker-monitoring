module.exports = {

    host: "127.0.0.1",
    port: "8080",
    log: {
        file: "/var/log/node/node.log"
    },
    storage: {
        mongo: {
            ip: process.env.MONGO_PORT_27017_TCP_ADDR || "127.0.0.1",
            port: process.env.MONGO_PORT_27017_TCP_PORT || 27017,
            database: "node"
        },
        redis: {
            ip: process.env.REDIS_PORT_6379_TCP_ADDR || "127.0.0.1",
            port: process.env.REDIS_PORT_6379_TCP_PORT || 6379
        }
    }
};
