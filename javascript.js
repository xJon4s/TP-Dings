const mqtt = require('mqtt')
const options = {
  // Clean session
  clean: true,
  connectTimeout: 4000,
  // Auth
  clientId: 'JavaSample',
  username: 'emqx_test',
  password: 'emqx_test',
}

const topic = "tfobz/5ia/poernbacher"
const topicresp = "tfobz/5ia/poernbacher/resp"

console.log("started");
const client  = mqtt.connect('tcp://mqtt.eclipseprojects.io:1883', options)
client.on('connect', function () {
  console.log('Connected')
  client.subscribe(topic, function (err) {
    if (!err) {
      client.publish(topic, 'Hello mqtt')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.subscribe(topic, function (err) {
    if (!err) {
      client.publish(topicresp, message.toString())
    }
  })
})