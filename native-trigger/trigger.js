const robot = require('robotjs');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Read message from stdin (Native Messaging protocol)
function readInput() {
  return new Promise((resolve) => {
    const stdin = process.stdin;
    stdin.once('readable', () => {
      const lengthBuffer = stdin.read(4);
      if (!lengthBuffer) return resolve(null);
      const length = lengthBuffer.readUInt32LE(0);
      const messageBuffer = stdin.read(length);
      if (!messageBuffer) return resolve(null);
      const message = JSON.parse(messageBuffer.toString());
      resolve(message);
    });
  });
}

async function main() {
  const message = await readInput();
  if (message && message.trigger) {
    // 1. Click to open the extension menu
    robot.moveMouse(EXT_MENU_X, EXT_MENU_Y); // <-- Set this to the extension menu button
    robot.mouseClick();
    await sleep(500); // Wait for menu to open

    // 2. Click to activate the phone extension
    robot.moveMouse(PHONE_EXT_X, PHONE_EXT_Y); // <-- Set this to the phone extension toggle/button
    robot.mouseClick();
    await sleep(500); // Wait for extension UI

    // 3. Click to start the search
    robot.moveMouse(SEARCH_BTN_X, SEARCH_BTN_Y); // <-- Set this to the search/start button
    robot.mouseClick();
  }
  process.exit(0);
}

main();