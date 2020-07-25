class WildAnimal extends Character {
    constructor(name, positionCm, sizeCm, moveSpeedCm, imageName,
        characterDetectDist, attackDamage) {
        super(name, positionCm, sizeCm, moveSpeedCm, imageName, null, null, null);
        this.attackDamage = attackDamage;
        this.characterDetectDist = characterDetectDist;
    }

    move(mapSections, characterToChase) {
        var blocks = this.getNearbyBlocks(mapSections);

        this.fall(blocks);
        if (this.nearCharacter(characterToChase)) this.chaseCharacter(characterToChase);
        //this.avoidCliffs(blocks);
        this.collideBlocks(blocks);
    }

    draw(translationCm=new p5.Vector(0, 0)) {
        push();
            
        translate(cWidth / 2, cHeight / 2);
        scale(scaleMult);

        translate(this.positionCm);
        translate(translationCm);

        noStroke();

        var imageToDraw = images[this.imageName];
        image(imageToDraw, 0, 0, this.sizeCm.x, this.sizeCm.y);
        pop();
    }

    chaseCharacter(character) {
        // Go towards the character horizontally

        var xDistToCharacter = character.positionCm.x - this.positionCm.x
        
        // if character is to the right of me
        if (xDistToCharacter > this.moveSpeedCm) {
            var speed = this.moveSpeedCm;
        }
        // If character is to the left of me
        else if (xDistToCharacter < -this.moveSpeedCm) {
            var speed = -this.moveSpeedCm;
        }
        // If the character is less than one step away
        else {
            var speed = xDistToCharacter;
        }
        this.positionCm.x += speed;
    }

    nearCharacter(character) {
        // If the distance between the center point of this and the center pos...
        // ...of the character is less than the detection distance (using squares for efficiency),
        // then return true
        if (distSq(this.getCenterPos(), character.getCenterPos()) < this.characterDetectDist ** 2) {
            return true;
        }
        else return false;
    }
}