const rabbit = require("foo-foo-mq");
const { configure } = require("./config");

async function sendMessage() {
  try {
    await configure();
    // publishToFanout();
    // publishToTopic();
    // publishToDirect();
    await publishToDeadLetter();
  } catch (err) {
    console.error("Error sending message:", err);
  }
}

sendMessage();

async function publishToFanout() {
  const message = "fanout exchange";
  const routingKey = "fred";
  await rabbit.publish("config-ex.1", {
    body: message,
    routingKey: routingKey,
  });
  console.log(
    `Message sent to exchange "config-ex.1" with key "${routingKey}":`,
    message
  );
}

async function publishToTopic() {
  const message = "topic exchange";
  const routingKey = "person.chef";
  await rabbit.publish("config-ex.2", {
    body: message,
    routingKey: routingKey,
  });
  console.log(
    `Message sent to exchange "config-ex.2" with key "${routingKey}":`,
    message
  );
}

async function publishToDirect() {
  const message = "direct exchange";
  const routingKey = "test2";
  await rabbit.publish("config-ex.3", {
    body: message,
    routingKey: routingKey,
  });
  console.log(
    `Message sent to exchange "config-ex.3" with key "${routingKey}":`,
    message
  );
}

async function publishToDeadLetter() {
  const message = "message with ttl 5";
  const routingKey = "person.chef";
  await rabbit.publish("config-ex.2", {
    body: message,
    routingKey: routingKey,
    expiresAfter: 5000,
  });
  console.log(
    `Message sent to exchange "config-ex.2" with key "${routingKey}":`,
    message
  );
}
