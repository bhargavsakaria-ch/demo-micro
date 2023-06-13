import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class RmqService {
  constructor(private readonly configService: ConfigService) {}

  getOptions(queue: string, noAck = false): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [
          /* `amqp://${this.configService.get<string>(
            'RABBITMQ_USER',
          )}:${this.configService.get<string>(
            'RABBIT_MQ_PASSWORD',
          )}@${this.configService.get<string>('RABBIT_MQ_HOST')}` */
          this.configService.get<string>('RABBIT_MQ_URI'),
        ],
        queue: this.configService.get<string>(`RABBIT_MQ_${queue}_QUEUE`),
        queueOptions: {
          durable: false,
        },
        noAck,
        persistent: true,
        prefetchCount: 1,
      },
    };
  }

  acknowledgeMessage(context: RmqContext) {
    context.getChannelRef().ack(context.getMessage());
  }
}
