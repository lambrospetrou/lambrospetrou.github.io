/**
 * Created by lambros on 28/10/15.
 */

var LPAWS = {};

LPAWS.sendToTopic = function() {
    // Initialize the Amazon Cognito credentials provider
    AWS.config.region = 'eu-west-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'eu-west-1:6ba3e4c8-d105-4a7a-889f-fbd7970ee3ae',
    });

    var sns = new AWS.SNS();
    var params = {
        Message: 'Hello topic', /* required */
        Subject: 'Browser SNS publish',
        TopicArn: 'arn:aws:sns:eu-west-1:717437904155:com-lambrospetrou-contact-me'
    };
    sns.publish(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });
};
