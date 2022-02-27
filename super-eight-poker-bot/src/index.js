module.exports = async function App(context) {
  if (context.event.text === 'Emma Stone') {
    await context.sendText('She is hot!');
  }
};
