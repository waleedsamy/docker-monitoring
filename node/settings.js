module.exports = {

    host: "127.0.0.1",
    port: "4000",
    log: {
        file: "/var/log/node/node.log"
    },
    storage: {
        mongo: {
            ip: process.env.MONGO_PORT_27017_TCP_ADDR,
            port: process.env.MONGO_PORT_27017_TCP_PORT
        },
        redis: {
            ip: process.env.REDIS_PORT_6379_TCP_ADDR,
            port: process.env.REDIS_PORT_6379_TCP_PORT
        }
    }
};
