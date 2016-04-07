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
	        var c = this.catgroup.create(this.rnd.integerInRange(-10, this.world.width-50), this.rnd.integerInRange(this.world.height-180, this.world.height-60), 'cat');
	        c.anchor.setTo(0.5, 0.5);
	        c.body.moves = false;
	        c.animations.add('Rest', this.game.math.numberArray(1,50));
	        c.animations.add('Walk', this.game.math.numberArray(0,3));
	        c.animations.play('Rest', 10, true);
	        this.assignCatMovement(c);
	    }
	},

	assignCatMovement: function(c) {
	    cposition = Math.floor(this.rnd.realInRange(50, this.world.width-50));
	    cdelay = this.rnd.integerInRange(2000, 6000);
	    if(cposition < c.x){
	        c.scale.x = -1;
	    }else{
	        c.scale.x = 1;
	    }
	    t = this.add.tween(c).to({x:cposition}, 3500, Phaser.Easing.Quadratic.InOut, true, cdelay);
	    t.onStart.add(this.startCat, this);
	    t.onComplete.add(this.stopCat, this);
	},

	startCat: function(c) {
	    c.animations.stop('Rest');
	    c.animations.play('Walk', 10, true);
	},

	stopCat: function(c) {
	    c.animations.stop('Walk');
	    c.animations.play('Rest', 10, true);
	    this.assignCatMovement(c);
	},

	update: function() {}
	
};