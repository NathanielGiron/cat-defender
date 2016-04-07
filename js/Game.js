CatDefender.Game = function(game) {
	this.totalCats;
	this.catgroup;
	this.totalSpacerocks;
	this.spacerockgroup;
	this.burst;
};

CatDefender.Game.prototype = {
	
	create: function() {
		this.totalCats = 20;
		this.totalSpacerocks = 13;
		this.buildWorld();
	},

	buildWorld: function() {
		this.add.image(0, 0, 'sky');
		this.add.image(0, 800, 'hill');
		this.buildCats();
		this.buildSpaceRocks();
		this.buildEmitter();
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

	buildSpaceRocks: function() {
	    this.spacerockgroup = this.add.group();
	    for(var i=0; i<this.totalSpacerocks; i++) {
	        var r = this.spacerockgroup.create(this.rnd.integerInRange(0, this.world.width), this.rnd.realInRange(-1500, 0), 'spacerock', 'SpaceRock0000');
	        var scale = this.rnd.realInRange(0.3, 1.0);
	        r.scale.x = scale;
	        r.scale.y = scale;
	        this.physics.enable(r, Phaser.Physics.ARCADE);
	        r.enableBody = true;
	        r.body.velocity.y = this.rnd.integerInRange(200, 400);
	        r.animations.add('Fall');
	        r.animations.play('Fall', 24, true);
	        r.checkWorldBounds = true;
			r.events.onOutOfBounds.add(this.resetRock, this);
	    }

	},

	resetRock: function(r) {
	    if(r.y > this.world.height){
	        this.respawnRock(r);
	    }
	},

	respawnRock: function(r) {
	    r.reset(this.rnd.integerInRange(0, this.world.width), this.rnd.realInRange(-1500, 0));
	    r.body.velocity.y = this.rnd.integerInRange(200, 400);
	},

	buildEmitter:function() {
	    this.burst = this.add.emitter(0, 0, 80);
	    this.burst.minParticleScale = 0.3;
	    this.burst.maxParticleScale = 1.2;
	    this.burst.minParticleSpeed.setTo(-30, 30);
	    this.burst.maxParticleSpeed.setTo(30, -30);
	    this.burst.makeParticles('explosion');
	    this.input.onDown.add(this.fireBurst, this);
	},

	fireBurst: function(pointer) {
	    this.burst.emitX = pointer.x;
	    this.burst.emitY = pointer.y;
	    this.burst.start(true, 2000, null, 20);
	},

	update: function() {}
	
};