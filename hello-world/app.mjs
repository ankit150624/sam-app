
// export const lambdaHandler = async (event, context) => {
//     const response = {
//       statusCode: 200,
//       body: JSON.stringify({
//         message: 'hello world',
//       })
//     };
//
//     return response;
//   };


   //const AWS = require('aws-sdk');
   import AWS from 'aws-sdk';
  // AWS.config.update({
  //   accessKeyId : AWS_ACCESS_KEY,
  //   secretAccessKey : AWS_SECRET_KEY
  // });
   AWS.config.region = 'us-east-1';
   const sns = new AWS.SNS();

  console.log('loading function');


  export const lambdaHandler = async (event, context) => {
    console.log(event)
     for (const message of event.Records) {
      await processMessageAsync(message);
    }
    console.info("done");
  };


  async function processMessageAsync(message) {
    try {
      console.log("Processed message "+ message.body);
      // TODO: Do interesting work based on the new message
      await Promise.resolve(1); //Placeholder for actual async work
      //params.Message = JSON.stringify(message.body);
       const jsonMessage = {
        "default": JSON.stringify(message.body),
        "APNS": "{\"aps\":{\"alert\": {\"title\": \"Hello\",\"body\": \"This is the content of our push notification. In body\"},\"badge\":1}}"
      };

       const params = {
        Message: JSON.stringify(message.body),

        TopicArn: 'arn:aws:sns:us-east-1:891612584141:ThorUploadsNotificationTopic' /* From step 2 */
      };

      try {
              const data = await sns.publish(params).promise();
              //messageId = data.MessageId;
               console.log('Message published.'+ data);
            } catch (e) {
              console.log(e.stack)
               console.log('Message wasn’t able to publish to SNS. ');
            }

    } catch (err) {
      console.error("An error occurred");
      throw err;
    }
  }


  //exports.handler({"Records":[{"body":'{"message":"An image has been uploaded","imgSize":5652,"imgName":"aws.png","ext":"png","path":"ankitkumarbucket1/74fa338b-2d7e-4dc4-b643-a20c9e90e98f","createdAt":"2024-09-10T03:03:05.330+00:00"}',
   //                                    }]})
