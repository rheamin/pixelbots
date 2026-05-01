namespace SpriteKind {
    export const Attack = SpriteKind.create()
}

/** 
0  1  2
3 [ ] 4
5  6  7
 */

// setup
let hammerbotImages = [assets.image`hammerBot0`, assets.image`hammerBot1`, assets.image`hammerBot2`, assets.image`hammerBot3`,
    assets.image`hammerBot4`, assets.image`hammerBot5`, assets.image`hammerBot6`, assets.image`hammerBot7`]
let hammerbotAttackImages = [assets.image`hammerBotAttack0`, assets.image`hammerBotAttack1`, assets.image`hammerBotAttack2`, assets.image`hammerBotAttack3`,
    assets.image`hammerBotAttack4`, assets.image`hammerBotAttack5`, assets.image`hammerBotAttack6`, assets.image`hammerBotAttack7`]

//  game start
tiles.setCurrentTilemap(assets.tilemap`arena`)


let player1 = sprites.create(assets.image`hammerBot6`, SpriteKind.Player)
player1.setPosition(20, 60)
player1.fx = 50
sprites.setDataBoolean(player1, "attacking", false)
sprites.setDataNumber(player1, "dir", 6)
mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.One), player1)
mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.One))

let statusbar1 = statusbars.create(40, 10, StatusBarKind.Health)
statusbar1.setBarBorder(1, 15)
statusbar1.setPosition(40, 8)
statusbar1.max = 10
statusbar1.value = 10
sprites.setDataSprite(player1, "statusbar", statusbar1)
sprites.setDataSprite(statusbar1, "player", player1)

let player2 = sprites.create(assets.image`hammerBot6`, SpriteKind.Player)
player2.setPosition(140, 60)
player2.fx = 50
sprites.setDataNumber(player2, "dir", 6)
mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two), player2)
mp.moveWithButtons(mp.playerSelector(mp.PlayerNumber.Two))

let statusbar2 = statusbars.create(40, 10, StatusBarKind.Health)
statusbar2.setBarBorder(1, 15)
statusbar2.setPosition(120, 8)
statusbar2.max = 10
statusbar2.value = 10
sprites.setDataSprite(player2, "statusbar", statusbar2)
sprites.setDataSprite(statusbar2, "player", player2)

//  button eventsacvainvesting.ca
mp.onButtonEvent(mp.MultiplayerButton.A, ControllerButtonEvent.Pressed, function (player: mp.Player) {
    const dx = [-4, 0, 4, -4, 4, -4, 0, 4];
    const dy = [-4, -4, -4, 0, 0, 4, 4, 4];
    // change sprite image
    let sprite = mp.getPlayerSprite(player)
    sprite.setImage(hammerbotAttackImages[sprites.readDataNumber(sprite, "dir")])
    sprites.setDataBoolean(sprite, "attacking", true)
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


    timer.after(500, function() {
        sprite.setImage(hammerbotImages[sprites.readDataNumber(sprite, "dir")])
        sprites.setDataBoolean(sprite, "attacking", false)
    })
})

mp.onButtonEvent(mp.MultiplayerButton.Left, ControllerButtonEvent.Pressed, function (player: mp.Player) {
    let sprite = mp.getPlayerSprite(player)
    // set direction
    if (mp.isButtonPressed(player, mp.MultiplayerButton.Up)) {
        sprites.setDataNumber(sprite, "dir", 0)
    } else if (mp.isButtonPressed(player, mp.MultiplayerButton.Down)) {
        sprites.setDataNumber(sprite, "dir", 5)
    } else {
        sprites.setDataNumber(sprite, "dir", 3)
    }

    // set image
    if (sprites.readDataBoolean(sprite, "attacking")) {
        sprite.setImage(hammerbotAttackImages[sprites.readDataNumber(sprite, "dir")])
    } else {
        sprite.setImage(hammerbotImages[sprites.readDataNumber(sprite, "dir")])
    }
})
mp.onButtonEvent(mp.MultiplayerButton.Left, ControllerButtonEvent.Released, function (player: mp.Player) {
    let sprite = mp.getPlayerSprite(player)

    timer.after(50, function () {
        if (mp.isButtonPressed(player, mp.MultiplayerButton.Up)) {
            sprites.setDataNumber(sprite, "dir", 1)
        } else if (mp.isButtonPressed(player, mp.MultiplayerButton.Down)) {
            sprites.setDataNumber(sprite, "dir", 6)
        }
        // set image
        if (sprites.readDataBoolean(sprite, "attacking")) {
            sprite.setImage(hammerbotAttackImages[sprites.readDataNumber(sprite, "dir")])
        } else {
            sprite.setImage(hammerbotImages[sprites.readDataNumber(sprite, "dir")])
        }
    })
    
    
})
mp.onButtonEvent(mp.MultiplayerButton.Right, ControllerButtonEvent.Pressed, function (player: mp.Player) {
    let sprite = mp.getPlayerSprite(player)
    if (mp.isButtonPressed(player, mp.MultiplayerButton.Up)) {
        sprites.setDataNumber(sprite, "dir", 2)
    } else if (mp.isButtonPressed(player, mp.MultiplayerButton.Down)) {
        sprites.setDataNumber(sprite, "dir", 7)
    } else {
        sprites.setDataNumber(sprite, "dir", 4)
    }

    // set image
    if (sprites.readDataBoolean(sprite, "attacking")) {
        sprite.setImage(hammerbotAttackImages[sprites.readDataNumber(sprite, "dir")])
    } else {
        sprite.setImage(hammerbotImages[sprites.readDataNumber(sprite, "dir")])
    }
})
mp.onButtonEvent(mp.MultiplayerButton.Right, ControllerButtonEvent.Released, function (player: mp.Player) {
    let sprite = mp.getPlayerSprite(player)

    timer.after(50, function () {
        if (mp.isButtonPressed(player, mp.MultiplayerButton.Up)) {
            sprites.setDataNumber(sprite, "dir", 1)
        } else if (mp.isButtonPressed(player, mp.MultiplayerButton.Down)) {
            sprites.setDataNumber(sprite, "dir", 6)
        }
        // set image
        if (sprites.readDataBoolean(sprite, "attacking")) {
            sprite.setImage(hammerbotAttackImages[sprites.readDataNumber(sprite, "dir")])
        } else {
            sprite.setImage(hammerbotImages[sprites.readDataNumber(sprite, "dir")])
        }
    })


})
mp.onButtonEvent(mp.MultiplayerButton.Up, ControllerButtonEvent.Pressed, function (player: mp.Player) {
    let sprite = mp.getPlayerSprite(player)
    if (mp.isButtonPressed(player, mp.MultiplayerButton.Left)) {
        sprites.setDataNumber(sprite, "dir", 0)
    } else if (mp.isButtonPressed(player, mp.MultiplayerButton.Right)) {
        sprites.setDataNumber(sprite, "dir", 2)
    } else {
        sprites.setDataNumber(sprite, "dir", 1)
    }

    // set image
    if (sprites.readDataBoolean(sprite, "attacking")) {
        sprite.setImage(hammerbotAttackImages[sprites.readDataNumber(sprite, "dir")])
    } else {
        sprite.setImage(hammerbotImages[sprites.readDataNumber(sprite, "dir")])
    }
})

mp.onButtonEvent(mp.MultiplayerButton.Up, ControllerButtonEvent.Released, function (player: mp.Player) {
    let sprite = mp.getPlayerSprite(player)

    timer.after(50, function () {
        if (mp.isButtonPressed(player, mp.MultiplayerButton.Right)) {
            sprites.setDataNumber(sprite, "dir", 4)
        } else if (mp.isButtonPressed(player, mp.MultiplayerButton.Left)) {
            sprites.setDataNumber(sprite, "dir", 3)
        }

        // set image
        if (sprites.readDataBoolean(sprite, "attacking")) {
            sprite.setImage(hammerbotAttackImages[sprites.readDataNumber(sprite, "dir")])
        } else {
            sprite.setImage(hammerbotImages[sprites.readDataNumber(sprite, "dir")])
        }
    })


})
mp.onButtonEvent(mp.MultiplayerButton.Down, ControllerButtonEvent.Pressed, function (player: mp.Player) {
    let sprite = mp.getPlayerSprite(player)
    if (mp.isButtonPressed(player, mp.MultiplayerButton.Left)) {
        sprites.setDataNumber(sprite, "dir", 5)
    } else if (mp.isButtonPressed(player, mp.MultiplayerButton.Right)) {
        sprites.setDataNumber(sprite, "dir", 7)
    } else {
        sprites.setDataNumber(sprite, "dir", 6)
    }

    // set image
    if (sprites.readDataBoolean(sprite, "attacking")) {
        sprite.setImage(hammerbotAttackImages[sprites.readDataNumber(sprite, "dir")])
    } else {
        sprite.setImage(hammerbotImages[sprites.readDataNumber(sprite, "dir")])
    }

})
mp.onButtonEvent(mp.MultiplayerButton.Down, ControllerButtonEvent.Released, function (player: mp.Player) {
    let sprite = mp.getPlayerSprite(player)

    timer.after(50, function () {
        if (mp.isButtonPressed(player, mp.MultiplayerButton.Right)) {
            sprites.setDataNumber(sprite, "dir", 4)
        } else if (mp.isButtonPressed(player, mp.MultiplayerButton.Left)) {
            sprites.setDataNumber(sprite, "dir", 3)
        }
        // set image
        if (sprites.readDataBoolean(sprite, "attacking")) {
            sprite.setImage(hammerbotAttackImages[sprites.readDataNumber(sprite, "dir")])
        } else {
            sprite.setImage(hammerbotImages[sprites.readDataNumber(sprite, "dir")])
        }
    })


})


//  overlap events
sprites.onOverlap(SpriteKind.Player, SpriteKind.Attack, function (sprite: Sprite, otherSprite: Sprite) {
    if (sprite != sprites.readDataSprite(otherSprite, "parent")) {
        sprites.destroy(otherSprite)
        sprite.sayText("Hit", 2000)

        // deal damage
        let sb = sprites.readDataSprite(sprite, "statusbar") as StatusBarSprite
        sb.value--

        // knock back
        const dx = [-50, 0, 50, -50, 50, -50, 0, 50];
        const dy = [-50, -50, -50, 0, 0, 50, 50, 50];

        let dir = sprites.readDataNumber(sprites.readDataSprite(otherSprite, "parent"), "dir")
        sprite.setVelocity(dx[dir], dy[dir])
    }
})


// status bar events
statusbars.onZero(StatusBarKind.Health, function (status: StatusBarSprite) {

    game.splash("Match over")
    game.gameOver(true)
})


// functions

