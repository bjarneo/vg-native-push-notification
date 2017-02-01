const path = require('path');
const notifier = require('node-notifier');
const Instantly = require('instantly');

const endpoint = 'https://sse.vg.no/vgsnarvei';

function onError(err) {
    console.error(' [x] Something happened.. retrying..');
}

function onMessage(msg) {
    console.log(' [*] Got notification: %s', msg.lastEventId);

    const data = JSON.parse(msg.data);

    notifier.notify({
        title: 'VG.no',
        message: data.title,
        icon: path.join(__dirname, 'logo.png'),
        open: data.payload.src
    });
}

const es = new Instantly(endpoint, {
    error: onError,
    injectEventSourceNode: require('eventsource')
});

es.on('message', onMessage);

console.log(' [*] Notification service started');

es.listen();
