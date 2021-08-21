
const { Kafka } = require("kafkajs")
const clientId = "my-app"
const brokers = ["localhost:9092"]
const topic = "TutorialTopic"

//Initializing kafka and producer
const kafka = new Kafka({ clientId, brokers })
const producer = kafka.producer({})

const produce = async (data) => {
	await producer.connect();
	try {
		await producer.send({
			topic,
			acks: 1,
			messages: [
				{ value: JSON.stringify(data) },
			],
		})
	} catch (err) {
		console.error("could not write message " + err);
	}
}

module.exports = produce;
