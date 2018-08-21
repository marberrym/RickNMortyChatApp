console.log("Make me do things!");

let $messageContainer = $('.chat-message-list');

let drawMessage = ({
    user: u,
    timestamp: t,
    message: m
  }) => {
    let $messageRow = $('<li>', {
      'class': 'message-row'
    });
    console.log(u);
    if (u === 'Jaydoe') {
      $messageRow.addClass('me');
    }
    // if (this is me?) {
    //   $messageRow.addClass('me');
    // }
    let $message = $('<p>');
    $message.append($('<span>', {
      'class': 'message-username',
      text: u
    }));
    $message.append($('<span>', {
      'class': 'timestamp',
      'data-time': t,
      text: t.toString()
    }));
    $message.append($('<span>', {
      'class': 'message-message',
      text: m
    }));
    let $img = $('<img>', {
      src: './images/rick.jpg',
      title: u
    });
    $img.addClass('icon');
    $messageRow.append($img);
    $messageRow.append($message);
    return $messageRow;
  };

let $messageRow = drawMessage({
    user: 'Rick Sanchez',
    message: 'HEY MORTY, IT IS TIME FOR AN ADVENTURE',
    timestamp: new Date()
});

$messageContainer.append($messageRow);
$messageRow.get(0).scrollIntoView();

let ws = new WebSocket("ws://localhost:3001")

let newMSG = document.querySelector('.cb-container');
newMSG.addEventListener('submit', event => {
  event.preventDefault();
  let msg = document.querySelector(".form-control").value
  let submitMessage = {
    user: 'Jaydoe',
    message: msg,
    timestamp: new Date()
  }
  console.log(submitMessage);
  ws.send(JSON.stringify(submitMessage));
  newMSG.reset();
});

ws.addEventListener('message', event => {
  let $messageRow = drawMessage(JSON.parse(event.data));
  $messageContainer.append($messageRow);
  $messageRow.get(0).scrollIntoView();
})
