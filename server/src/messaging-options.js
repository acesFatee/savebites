const options =  {
    host: 'wss://mr-connection-jvzbduz0dem.messaging.solace.cloud:8443',
    username: 'solace-cloud-client',
    password: 'nht03hj922fgq9a02t15o3585l',
    clientId: 'myUniqueClientId',
    keepalive: 10,
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 10000,
    will: {
        topic: 'WillMsg',
        payload: 'Connection Closed abnormally..!',
        qos: 0,
        retain: false
    },
    rejectUnauthorized: false
};

module.exports = options