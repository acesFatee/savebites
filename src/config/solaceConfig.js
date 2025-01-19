
const options = {
  userName: process.env.SOLACE_USERNAME || "solace-cloud-client",
  password: process.env.SOLACE_PASSWORD || 'nht03hj922fgq9a02t15o3585l',
  invocationContext: {
    host: process.env.SOLACE_HOST || "mr-connection-jvzbduz0dem.messaging.solace.cloud",
    port: 8443,
    clientId: "",
  },
  timeout: 3,
  keepAliveInterval: 60,
  cleanSession: true,
  useSSL: true,
  reconnect: true,
};

export default options
