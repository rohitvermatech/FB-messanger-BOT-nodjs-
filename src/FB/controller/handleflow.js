require("dotenv").config();
const comp = require('../component/comp');
const sendMessage = require("../component/send");

let handleMessage = (sender_psid, received_message) => {
    let response

    if (received_message.text) {

        let textmessage = received_message.text;
        switch (textmessage) {
            case "hi":
                response = { "text": 'hello' }
                break;
            case "bye":
                response = { "text": 'bye bye' }
                break;
            default:
                response = { "text": 'you sent me ' + textmessage }

        }

    }

    else if (received_message.attachments) {

        let attachment_url = received_message.attachments[0].payload.url;

        response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "Is this the right?",
                        "subtitle": "Tap a button to answer.",
                        "image_url": attachment_url,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Yes!",
                                "payload": "yes",
                            },
                            {
                                "type": "postback",
                                "title": "No!",
                                "payload": "no",
                            }
                        ],
                    }]
                }
            }
        }
    }

    else if (received_message && received_message.quick_reply && received_message.quick_reply.payload) {

        let payload = received_message.quick_reply.payload;
        response = {
            "text": 'you sent me ' + payload
        }
    }
    sendMessage(sender_psid, response)
}

let handlePostback = (sender_psid, received_postback) => {
    let response
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    switch (payload) {
        case "yes":
            response = { "text": 'you pressed YES' }
            break;
        case "no":
            response = { "text": 'you pressed NO' }
            break;
        case "GET_STARTED":
            response = { "text": 'hello welcome to webfactory' }
            break;
        default:
            response = { "text": ' ' }

    }

    sendMessage(sender_psid, response)
}

module.exports = {
    handleMessage: handleMessage,
    handlePostback: handlePostback
}
