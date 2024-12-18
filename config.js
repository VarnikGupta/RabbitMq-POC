const rabbit = require("foo-foo-mq");

const settings = {
  connection: {
    user: "guest",
    pass: "guest",
    host: "localhost",
    port: 5672,
    timeout: 2000,
    vhost: "%2f",
  },
  exchanges: [
    {
      name: "config-ex.1",
      type: "fanout",
    },
    {
      name: "config-ex.2",
      type: "topic",
      alternate: "alternate-ex.2",
      persistent: true,
    },
    {
      name: "config-ex.3",
      type: "direct",
    },
    { name: "dead-letter-ex.2", type: "fanout" },
  ],
  queues: [
    { name: "config-q.1", limit: 100, queueLimit: 1000 },
    { name: "config-q.2", limit: 100, queueLimit: 1000 },
    {
      name: "config-q.3",
      limit: 100,
      queueLimit: 1000,
      deadLetter: "dead-letter-ex.2",
      deadLetterRoutingKey: "person.chef",
      deadLetterStrategy: "at-most-once",
      // overflow: "drop head",
    },
    { name: "config-q.4", limit: 100, queueLimit: 1000 },
    { name: "config-q.5", deadLetter: "dead-letter-ex.2" },
    { name: "config-q.6", deadLetter: "dead-letter-ex.2" },
  ],
  bindings: [
    { exchange: "config-ex.1", target: "config-q.1" },
    { exchange: "config-ex.1", target: "config-q.2" },
    { exchange: "config-ex.2", target: "config-q.1", keys: ["person.alice"] },
    { exchange: "config-ex.2", target: "config-q.3", keys: ["person.chef"] },
    { exchange: "config-ex.3", target: "config-q.3", keys: ["test1"] },
    { exchange: "config-ex.3", target: "config-q.4", keys: ["test2"] },
    { exchange: "dead-letter-ex.2", target: "config-q.5", keys: ["dlq"] },
    { exchange: "dead-letter-ex.2", target: "config-q.6", keys: ["dlq"] },
  ],
};

async function configure() {
  await rabbit
    .configure(settings)
    .then(() => {
      console.log("configured");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = { configure };

// const rabbit = require("foo-foo-mq");

// // const Q = require('q');

// function connectRabbit() {
//   rabbit.addConnection({
//     user: "guest",
//     pass: "guest",
//     // host: ["127.0.0.1"],
//     host: "localhost",
//     port: 5672,
//     // timeout: 2000,
//     vhost: "%2f",
//     // heartbeat: 10,
//     // clientProperties: {
//     //   service: "my-awesome-service",
//     // },
//   }).catch((err)=>{console.log(err)});

//   console.log('configured')
//   rabbit.on("connected", function () {
//     // rabbit.retry();
//     console.log("connected");
//   });

//   rabbit.on("unreachable", function () {
//     // rabbit.retry();
//   });

// }
// // connectRabbit();

// module.exports = { connectRabbit };
