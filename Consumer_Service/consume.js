const { Kafka } = require("kafkajs")
const knex = require('./config/knex');
const clientId = "my-app"
const brokers = ["localhost:9092"]
const topic = "TutorialTopic"

const kafka = new Kafka({
	clientId,
	brokers
})


const consumer = kafka.consumer({
	groupId: clientId,
	minBytes: 5,
	maxBytes: 1e6,
	maxWaitTimeInMs: 3000,
})

const consume = async () => {
	await consumer.connect()
	await consumer.subscribe({ topic, fromBeginning: false })
	await consumer.run({
		eachMessage: ({ message }) => {
			console.log("Consumend-->", JSON.parse(message.value.toString()))
			knex('employees').returning('employeeid').insert(JSON.parse(message.value.toString())).then(function (employeeid) {
				if (employeeid)
					console.log(`inserted ${employeeid}`);
				else
					console.log("some error")
			})
		},
	})
}

module.exports = consume
