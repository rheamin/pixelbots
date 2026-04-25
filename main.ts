
scene.setBackgroundColor(1)

/**
 *  0  1  2
 *  3 [ ] 4
 *  5  6  7
 */

let player1 = sprites.create(assets.image`hammerBot6`, SpriteKind.Player)
mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.One), player1)
mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.One))

