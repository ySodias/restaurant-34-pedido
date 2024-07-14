import { Channel, connect, Connection } from 'amqplib';

import { IQueueAdapter } from '@/interfaces/repositories/IQueueAdapter';

export class RabbitMQService implements IQueueAdapter {
    private connection!: Connection;
    private channel!: Channel;
    private readonly rabbitMQUrl: string = process.env.RABBITMQ_URL as string;

    constructor() {
        (async () => {
            this.connection = await connect(this.rabbitMQUrl);
            this.channel = await this.connection.createChannel();
        })();
    }

    async publish(queue: string, message: any): Promise<void> {
        if (!this.channel) throw new Error('Channel not initialized');
        await this.channel.assertQueue(queue, { durable: true });
        this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    }

    async consume(queue: string, callback: (message: any) => Promise<void>): Promise<void> {
        if (!this.channel) throw new Error('Channel not initialized');
        await this.channel.assertQueue(queue, { durable: true });
        this.channel.consume(queue, async (msg) => {
            if (msg) {
                await callback(JSON.parse(msg.content.toString()));
                this.channel!.ack(msg);
            }
        });
    }
}

export const rabbitMQService = new RabbitMQService();