namespace SpriteKind {
    export const Attack = SpriteKind.create()
}


/**
 *  0  1  2
 *  3 [ ] 4
 *  5  6  7
 */

// game start
tiles.setCurrentTilemap(assets.tilemap`arena`)

let player1 = sprites.create(assets.image`hammerBot6`, SpriteKind.Player)
player1.setPosition(20, 60)
mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.One), player1)
mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.One))

let player2 = sprites.create(assets.image`hammerBot6`, SpriteKind.Player)
player2.setPosition(140, 60)
mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two), player2)
mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.Two))
// button events

mp.onButtonEvent(mp.MultiplayerButton.A, ControllerButtonEvent.Pressed, function(player: mp.Player) {
    // create attack sprite
    let attackHB = sprites.create(assets.image`hammerHitbox`, SpriteKind.Attack)
    attackHB.setFlag(SpriteFlag.Invisible, true)
    attackHB.setPosition(mp.getPlayerSprite(player).x, mp.getPlayerSprite(player).y)
    attackHB.lifespan = 500

    // assign the player as parent
    sprites.setDataSprite(attackHB, "parent", mp.getPlayerSprite(player))

})

// overlap events

sprites.onOverlap(SpriteKind.Player, SpriteKind.Attack, function(sprite: Sprite, otherSprite: Sprite) {
    if (sprite != sprites.readDataSprite(otherSprite, "parent")) {
        sprites.destroy(otherSprite)
        sprite.sayText("Hit", 2000)
    }
})