require("dotenv").config();
const sendMessage = require("../component/send");

let handleMessage = (sender_psid, received_message) => {

    if (received_message.text) {

        let textmessage = received_message.text;
        handleText(sender_psid, textmessage)

    }

    else if (received_message.attachments) {

        let attachment_url = received_message.attachments[0].payload.url;
        handleAttachments(sender_psid, attachment_url)


    }

    else if (received_message && received_message.quick_reply && received_message.quick_reply.payload) {

        let payload = received_message.quick_reply.payload;
        handleQuickreply(sender_psid, payload)

    }

}

function handleText(sender_psid, textmessage) {
    let response

    response = {
        "text": 'you sent me ' + textmessage
    }

    sendMessage(sender_psid, response)

}

function handleAttachments(sender_psid, attachment_url) {
    let response

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

    sendMessage(sender_psid, response)

}

function handleQuickreply(sender_psid, payload) {
    let response

    response = {
        "text": 'you sent me Quickreply'
    }

    sendMessage(sender_psid, response)


}

let handlePostback = (sender_psid, received_postback) => {
    let response
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    switch (payload) {
        case "yes":
            response = {
                "text": 'you pressed YES'
            }
            break;
        case "no":
            response = {
                "text": 'you pressed NO'
            }
            break;
        default:
            console.log("run default switch case")

    }

    sendMessage(sender_psid, response)
}

module.exports = {
    handleMessage: handleMessage,
    handlePostback: handlePostback
}