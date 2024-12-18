const rabbit = require("foo-foo-mq");
const { configure } = require("./config");

async function receiveMessage() {
  try {
    // connectRabbit();
    await configure();

    await rabbit.handle("dlq", function (message) {
      try {
        // do something meaningful?
        // console.log( message.body );
        console.log(message.body);
        message.ack();
      } catch (err) {
        console.log(err);
        message.nack();
      }
    });

    await rabbit.startSubscription("config-q.5");
  } catch (err) {
    console.error("Error consuming message:", err);
  }
}

receiveMessage();
