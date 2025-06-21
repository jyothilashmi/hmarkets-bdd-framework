export async function allureLog(world, message) {
  if (world.attach) {
    await world.attach(message, 'text/plain');
  }
}