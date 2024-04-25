class _1DMovement extends Phaser.Scene {
    constructor() {
        super("1dMovementScene");
        
        // Create an object to hold sprite bindings
        this.my = { sprite: {} };

        // Initial positions of character and emitted sprite
        this.characterX = 200;
        this.characterY = 450;
        this.fireballX = 350;
        this.fireballY = 400;

        // Key objects for player movement
        this.aKey = null;
        this.dKey = null;

        // Counter for any additional functionality
        this.counter = 0;

        // Array to store emitted sprites
        this.emittedSprites = [];
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load character and emitted sprite assets
        this.load.image("redCharacter", "character_roundRed.png");
        this.load.image("redFireball", "character_handRed.png");

        // Update instruction text (if needed)
        document.getElementById('description').innerHTML = '<h2>1D Movement<br>A - Move left // D - Move right // SPACE - Emit</h2>';
    }

    create() {
        // Alias for this.my for readability
        let my = this.my;

        // Add character to the scene
        my.sprite.character = this.add.sprite(this.characterX, this.characterY, "redCharacter");

        // Set up A and D keys for player movement
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() {
        // Alias for this.my for readability
        let my = this.my;
        let sprite = my.sprite.character;

        // Define screen boundaries
        const minX = 0 + (sprite.width/4);
        const maxX = this.game.config.width - sprite.width/4;

        // Move player character based on key presses within screen boundaries
        if (this.keyA.isDown && sprite.x > minX) {
            sprite.x -= 5.0;
        } else if (this.keyD.isDown && sprite.x < maxX) {
            sprite.x += 5.0;
        }

        // Event handling for emitting sprite on spacebar press
        this.input.keyboard.on('keydown-SPACE', () => {
            // Calculate the position of the emitted sprite above the character
            let emitX = sprite.x;
            let emitY = sprite.y - sprite.displayHeight / 2;

            // Add emitted sprite to the scene
            let emit = this.add.sprite(emitX, emitY, 'redFireball');
            emit.setOrigin(0.5, 0.5);

            // Store the emitted sprite in the array
            this.emittedSprites.push(emit);
        });

        // Update position of emitted sprites
        for (let i = this.emittedSprites.length - 1; i >= 0; i--) {
            let emit = this.emittedSprites[i];
            emit.y -= 2.0; // Move upwards
        }
    }
}
