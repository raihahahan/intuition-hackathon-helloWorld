import pika

queueToProduceTo="inputResultQueueNew"
queueToReceiveFrom="userId"

# producer
def publishMessage(body):
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()
    channel.queue_declare(queue=queueToProduceTo, durable=True)
    channel.basic_publish(exchange='',
                        routing_key=queueToProduceTo,
                        body=body)
    print(" [x] Sent message")
    connection.close()

def receiveMessage(callback):
    # def callback(ch, method, properties, body):
    #     print(" [x] Received %r" % body)

    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()
    channel.queue_declare(queue=queueToReceiveFrom, durable=True)

    channel.basic_consume(queue=queueToReceiveFrom,
                      auto_ack=True,
                      on_message_callback=callback)
    print(' [*] Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()
    