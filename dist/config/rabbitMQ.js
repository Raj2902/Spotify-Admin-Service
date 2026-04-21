import amqplib from "amqplib";
let channel = null;
async function init() {
    const conn = await amqplib.connect(`${process.env.RABBITMQ_URL}`);
    channel = await conn.createChannel();
    if (channel) {
        console.log("RabbitMQ channel created successfully");
    }
    await channel.assertExchange("song.events", "direct", {
        durable: true,
    });
}
init();
export const getChannel = () => channel;
//# sourceMappingURL=rabbitMQ.js.map