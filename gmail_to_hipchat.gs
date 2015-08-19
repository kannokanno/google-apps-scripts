function sendHipChat(payload) {
  if (typeof payload === "undefined") {
    return;
  }
  var authToken = ''; // setup
  var url = 'https://api.hipchat.com/v1/rooms/message?auth_token=' + authToken;
  var params = {
    "contentType" : "application/x-www-form-urlencoded",
    "method": "post",
    "payload": payload,
  };
  UrlFetchApp.fetch(url, params).getContentText();
}

function eachMessage(criteria, callback) {
  GmailApp.search(criteria).forEach(function(thread) {
    thread.getMessages().forEach(callback);
  });
}

function markAndSend(criteria, messageBuilder) {
  eachMessage(criteria, function(message) {
    message.markRead();
    sendHipChat(messageBuilder(message));
  });
}

function main() {
  markAndSend('<search for gmail>', function(message) {
    return {
      "room_id": 100, // setup
      "from": 'Gmail',
      "notify": 1,
      "message": message.getTitle(),
      "color": 'yellow',
      "message_format": 'text'
    }
  });
}
