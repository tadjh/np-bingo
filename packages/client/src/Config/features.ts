const config = {
  'single-player': true, // Allow solo mode
  'share-room': true,
  'public-rooms': false, // TODO Only mock-up
  'game-modes': false, // TODO no game logic built for alternate modes
  'special-rules': false, // TODO no win conditions built for special rules
  'streamer-mode': false, // TODO not implemented
  'max-room-size': 30,
  'max-active-games': 5,
  'ball-delay': 3500, // 3.5 seconds before next auto-draw in solo mode
};

export default config;
