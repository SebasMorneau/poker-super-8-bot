module.exports = async function App(context) {
  if (context.event.text) {
    await context.sendText('Welcome Emma Stone 2');
  }
};
