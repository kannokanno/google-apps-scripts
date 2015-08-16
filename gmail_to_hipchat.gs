function sendHipChat(message) {
  if (message === "") {
    return;
  }
  var authToken = ''; // setup
  var url = 'https://api.hipchat.com/v1/rooms/message?auth_token=' + authToken;
  var params = {
    "contentType" : "application/x-www-form-urlencoded",
    "method": "post",
    "payload": {
      "room_id": ,// setup
      "from": 'Gmail',
      "notify": 1,
      "message": message,
      "color": 'yellow',
      "message_format": 'text'
    },
  };
  UrlFetchApp.fetch(url, params).getContentText();
}

function make_notify_message(message) {
  return message.getTitle();
}

function main() {
  GmailApp.search('<search for gmail>').forEach(function(thread) {
    thread.getMessages().forEach(function(message) {
      message.markRead();
      sendHipChat(make_notify_message(message));
    });
  });
}
