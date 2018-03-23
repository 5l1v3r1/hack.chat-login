var users_cont = 0;

function addUsers() {
	if (users_cont > 50) return;
	
	var ws = new WebSocket('wss://hack.chat/chat-ws');
	
	ws.onopen = function() {
		var num = ++users_cont;
		
		ws.send('{"cmd": "join", "channel": "****", "nick": "' + ( num < 10 ? '0' : '' ) + num + '"}');
		setInterval(function() { ws.send('{"cmd": "ping"}'); }, 50e3);
		
		setTimeout(addUsers, 25e3);
	};
}
addUsers();
