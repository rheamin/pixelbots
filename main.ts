namespace SpriteKind {
    export const Attack = SpriteKind.create()
}

/** 

0  1  2
3 [ ] 4
5  6  7


 */
//  game start
tiles.setCurrentTilemap(assets.tilemap`arena`)
let player1 = sprites.create(assets.image`hammerBot6`, SpriteKind.Player)
player1.setPosition(20, 60)
sprites.setDataNumber(player1, "dir", 6)
mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.One), player1)
mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.One))

let player2 = sprites.create(assets.image`hammerBot6`, SpriteKind.Player)
player2.setPosition(140, 60)
mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two), player2)
mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.Two))


//  button events
mp.onButtonEvent(mp.MultiplayerButton.A, ControllerButtonEvent.Pressed, function (player: mp.Player) {
    const dx = [-4, 0, 4, -4, 4, -4, 0, 4];
    const dy = [-4, -4, -4, 0, 0, 4, 4, 4];
    //  create attack sprite
    let attackHB = sprites.create(assets.image`hammerHitbox`, SpriteKind.Attack)
    attackHB.setFlag(SpriteFlag.Invisible, true)
    attackHB.lifespan = 500
    // set position
    let dir = sprites.readDataNumber(mp.getPlayerSprite(player), "dir")
    let x = mp.getPlayerSprite(player).x + dx[dir]
    let y = mp.getPlayerSprite(player).y + dy[dir]
    attackHB.setPosition(x, y)

    //  assign the player as parent
    sprites.setDataSprite(attackHB, "parent", mp.getPlayerSprite(player))
})
mp.onButtonEvent(mp.MultiplayerButton.Left, ControllerButtonEvent.Pressed, function (player: mp.Player) {
    let sprite = mp.getPlayerSprite(player)
    if (mp.isButtonPressed(player, mp.MultiplayerButton.Up)) {
        sprite.setImage(assets.image`hammerBot0`)
        sprites.setDataNumber(sprite, "dir", 0)
    } else if (mp.isButtonPressed(player, mp.MultiplayerButton.Down)) {
        sprite.setImage(assets.image`hammerBot5`)
        sprites.setDataNumber(sprite, "dir", 5)
    } else {
        sprite.setImage(assets.image`hammerBot3`)
        sprites.setDataNumber(sprite, "dir", 3)
    }

})
mp.onButtonEvent(mp.MultiplayerButton.Left, ControllerButtonEvent.Released, function (player: mp.Player) {
    let sprite = mp.getPlayerSprite(player)

    timer.after(50, function () {
        if (mp.isButtonPressed(player, mp.MultiplayerButton.Up)) {
            sprite.setImage(assets.image`hammerBot1`)
            sprites.setDataNumber(sprite, "dir", 1)
        } else if (mp.isButtonPressed(player, mp.MultiplayerButton.Down)) {
            sprite.setImage(assets.image`hammerBot6`)
            sprites.setDataNumber(sprite, "dir", 6)
        }
    })


})
mp.onButtonEvent(mp.MultiplayerButton.Right, ControllerButtonEvent.Pressed, function (player: mp.Player) {
    let sprite = mp.getPlayerSprite(player)
    if (mp.isButtonPressed(player, mp.MultiplayerButton.Up)) {
        sprite.setImage(assets.image`hammerBot2`)
        sprites.setDataNumber(sprite, "dir", 2)
    } else if (mp.isButtonPressed(player, mp.MultiplayerButton.Down)) {
        sprite.setImage(assets.image`hammerBot7`)
        sprites.setDataNumber(sprite, "dir", 7)
    } else {
        sprite.setImage(assets.image`hammerBot4`)
        sprites.setDataNumber(sprite, "dir", 4)
    }

})
mp.onButtonEvent(mp.MultiplayerButton.Right, ControllerButtonEvent.Released, function (player: mp.Player) {
    let sprite = mp.getPlayerSprite(player)

    timer.after(50, function () {
        if (mp.isButtonPressed(player, mp.MultiplayerButton.Up)) {
            sprite.setImage(assets.image`hammerBot1`)
            sprites.setDataNumber(sprite, "dir", 1)
        } else if (mp.isButtonPressed(player, mp.MultiplayerButton.Down)) {
            sprite.setImage(assets.image`hammerBot6`)
            sprites.setDataNumber(sprite, "dir", 6)
        }
    })


})
mp.onButtonEvent(mp.MultiplayerButton.Up, ControllerButtonEvent.Pressed, function (player: mp.Player) {
    let sprite = mp.getPlayerSprite(player)
    if (mp.isButtonPressed(player, mp.MultiplayerButton.Left)) {
        sprite.setImage(assets.image`hammerBot0`)
        sprites.setDataNumber(sprite, "dir", 0)
    } else if (mp.isButtonPressed(player, mp.MultiplayerButton.Right)) {
        sprite.setImage(assets.image`hammerBot2`)
        sprites.setDataNumber(sprite, "dir", 2)
    } else {
        sprite.setImage(assets.image`hammerBot1`)
        sprites.setDataNumber(sprite, "dir", 1)
    }

})

mp.onButtonEvent(mp.MultiplayerButton.Up, ControllerButtonEvent.Released, function (player: mp.Player) {
    let sprite = mp.getPlayerSprite(player)

    timer.after(50, function () {
        if (mp.isButtonPressed(player, mp.MultiplayerButton.Right)) {
            sprite.setImage(assets.image`hammerBot4`)
            sprites.setDataNumber(sprite, "dir", 4)
        } else if (mp.isButtonPressed(player, mp.MultiplayerButton.Left)) {
            sprite.setImage(assets.image`hammerBot3`)
            sprites.setDataNumber(sprite, "dir", 3)
        }
    })


})
mp.onButtonEvent(mp.MultiplayerButton.Down, ControllerButtonEvent.Pressed, function (player: mp.Player) {
    let sprite = mp.getPlayerSprite(player)
    if (mp.isButtonPressed(player, mp.MultiplayerButton.Left)) {
        sprite.setImage(assets.image`hammerBot5`)
        sprites.setDataNumber(sprite, "dir", 5)
    } else if (mp.isButtonPressed(player, mp.MultiplayerButton.Right)) {
        sprite.setImage(assets.image`hammerBot7`)
        sprites.setDataNumber(sprite, "dir", 7)
    } else {
        sprite.setImage(assets.image`hammerBot6`)
        sprites.setDataNumber(sprite, "dir", 6)
    }

})
mp.onButtonEvent(mp.MultiplayerButton.Down, ControllerButtonEvent.Released, function (player: mp.Player) {
    let sprite = mp.getPlayerSprite(player)

    timer.after(50, function () {
        if (mp.isButtonPressed(player, mp.MultiplayerButton.Right)) {
            sprite.setImage(assets.image`hammerBot4`)
            sprites.setDataNumber(sprite, "dir", 4)
        } else if (mp.isButtonPressed(player, mp.MultiplayerButton.Left)) {
            sprite.setImage(assets.image`hammerBot3`)
            sprites.setDataNumber(sprite, "dir", 3)
        }
    })


})


//  overlap events
sprites.onOverlap(SpriteKind.Player, SpriteKind.Attack, function (sprite: Sprite, otherSprite: Sprite) {
    if (sprite != sprites.readDataSprite(otherSprite, "parent")) {
        sprites.destroy(otherSprite)
        sprite.sayText("Hit", 2000)
    }

})
