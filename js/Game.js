CatDefender.Game = function(game) {
	this.totalCats;
	this.catgroup;
};

CatDefender.Game.prototype = {
	
	create: function() {
		this.totalCats = 20;
		this.buildWorld();
	},

	buildWorld: function() {
		this.add.image(0, 0, 'sky');
		this.add.image(0, 800, 'hill');
		this.buildCats();
	},

	buildCats: function() {
	    this.catgroup = this.add.group();
	    this.catgroup.enableBody = true;
	    for(var i=0; i<this.totalCats; i++) {
	        var b = this.catgroup.create(this.rnd.integerInRange(-10, this.world.width-50), this.rnd.integerInRange(this.world.height-180, this.world.height-60), 'cat');
	        b.anchor.setTo(0.5, 0.5);
	        b.body.moves = false;
	        b.animations.add('Rest', this.game.math.numberArray(1,58));
	        b.animations.add('Walk', this.game.math.numberArray(68,107));
	        b.animations.play('Rest', 24, true);
	    }
	},


	update: function() {}
	
};