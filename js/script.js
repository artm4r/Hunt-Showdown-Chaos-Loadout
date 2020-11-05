//Variables for options
var rank = 100;
var maxSize = 4;
var generateWeapon1 = true;
var generateWeapon2 = true;
var allowDualWield = true;
var allowQuatermaster = false;
var allowDuplicateWeapons = true;
var sound = true;
var animation = true;

//Variables for result
var weapon1 = null;
var weapon2 = null;

// store the actual values of tools/consumables
var store = {
	tools: [null, null, null, null],
	consumables: [null, null, null, null],
	weapon: [null, null]
};

// store which slots need updating
var updateStack = {
	tools: [],
	consumables: [],
	weapons: [] /* not used, but needed for checkboxes */
};

var remainingSize = 0;

//Data intialization
var gunFamilies = new Array( 
	new GunFamily(1, 2, new Array(
			new Gun(3, false, "Winfield M1873C", 41, "img/winfieldc.jpg"),
			new Gun(3, false,"Winfield M1873C Silencer", 55, "img/winfieldc_sup.jpg"),
			new Gun(3, false, "Winfield M1873C Marksman", 56, "img/winfieldc_mark.jpg"),
			new Gun(2, false, "Winfield M1873C Vandal", 35, "img/winfieldc_van.jpg"),
			new Gun(2, false, "Winfield M1873C Vandal Striker", 39, "img/winfieldc_van_str.jpg"),
			new Gun(2, false, "Winfield M1873C Vandal Deadeye", 45, "img/winfieldc_van_dead.jpg")
		)
	),
	new GunFamily(1, 2, new Array(
			new Gun(3, false, "Springfield 1866", 38, "img/springfield.jpg"),
			new Gun(3, false, "Springfield 1866 Marksman", 73, "img/springfield_mark.jpg"),
			new Gun(2, false, "Springfield 1866 Compact", 33, "img/springfield_com.jpg"),
			new Gun(2, false, "Springfield 1866 Compact Striker", 56, "img/springfield_com_str.jpg"),
			new Gun(2, false, "Springfield 1866 Compact Deadeye", 46, "img/springfield_com_dead.jpg")
		)
	),
	new GunFamily(6, 3, new Array(
			new Gun(3, false, "Vetterli 71 Karabiner", 105, "img/vetterli.jpg"),
			new Gun(3, false, "Vetterli 71 Karabiner Deadeye", 155, "img/vetterli_dead.jpg"),
			new Gun(3, false, "Vetterli 71 Karabiner Bayonet", 130, "img/vetterli_bay.jpg")
		)
	),
	new GunFamily(16, 3, new Array(
			new Gun(3, false, "Martini-Henry IC1", 122, "img/martini.jpg"),
			new Gun(3, false, "Martini-Henry IC1 Deadeye", 145, "img/martini_dead.jpg"),
			new Gun(3, false, "Martini-Henry IC1 Riposte", 164, "img/martini_rip.jpg"),
			new Gun(3, false, "Martini-Henry IC1 Marksman", 173, "img/martini_mark.jpg")
		)
	),
	new GunFamily(26, 3, new Array(
			new Gun(3, false, "Sparks LRR", 130, "img/sparks.jpg"),
			new Gun(3, false, "Sparks LRR Silencer", 150, "img/sparks_sup.jpg"),
			new Gun(3, false, "Sparks LRR Sniper", 199, "img/sparks_snip.jpg")
		)
	),
	new GunFamily(42, 3, new Array(
			new Gun(3, false, "Winfield M1873", 75, "img/winfield.jpg"),
			new Gun(3, false, "Winfield M1873 Aperture", 80, "img/winfield_ap.jpg"),
			new Gun(3, false, "Winfield M1873 Talon", 100, "img/winfield_tal.jpg"),
			new Gun(3, false, "Winfield M1873 Swift", 128, "img/winfield_swi.jpg")
		)
	),
	new GunFamily(52, 3, new Array(
			new Gun(3, false, "Lebel 1886", 397, "img/lebel.jpg"),
			new Gun(3, false, "Lebel 1886 Talon", 422, "img/lebel_tal.jpg"),
			new Gun(3, false, "Lebel 1886 Marksman", 437, "img/lebel_mark.jpg")
		)
	),
	new GunFamily(72, 2, new Array(
			new Gun(3, false, "Mosin-Nagant M1891", 490, "img/mosin.jpg"),
			new Gun(2, false, "Mosin-Nagant M1891 Obrez", 290, "img/mosin_obr.jpg"),
			new Gun(3, false, "Mosin-Nagant M1891 Bayonet", 540, "img/mosin_bay.jpg"),
			new Gun(2, false, "Mosin-Nagant M1891 Obrez Mace", 310, "img/mosin_obr_mace.jpg"),
			new Gun(3, false, "Mosin-Nagant M1891 Sniper", 550, "img/mosin_snip.jpg"),
			new Gun(2, false, "Mosin-Nagant M1891 Obrez Drum", 350, "img/mosin_obr_drum.jpg"),
			new Gun(3, false, "Mosin-Nagant M1891 Avtomat", 1250, "img/mosin_avto.jpg")
		)
	),
	new GunFamily(88, 3, new Array(
			new Gun(3, false, "Nitro Express Rifle", 1015, "img/nitro.jpg")
		)
	),
	new GunFamily(1, 1, new Array(
			new Gun(1, false, "Nagant M1895", 24, "img/nagant.jpg"),
			new Gun(2, true, "Dual Nagant M1895", 48, "img/nagant_dual.jpg"),
			new Gun(2, false, "Nagant M1895 Precision", 29, "img/nagant_prec.jpg"),
			new Gun(1, false, "Nagant M1895 Silencer", 53, "img/nagant_sup.jpg"),
			new Gun(2, true, "Dual Nagant M1895 Silencer", 106, "img/nagant_sup_dual.jpg"),
			new Gun(2, false, "Nagant M1895 Deadeye", 42, "img/nagant_prec_dead.jpg")
		)
	),
	new GunFamily(10, 1, new Array(
			new Gun(1, false, "Caldwell Pax", 100, "img/pax.jpg"),
			new Gun(2, true, "Dual Caldwell Pax", 200, "img/pax_dual.jpg"),
			new Gun(1, false, "Caldwell Pax Claw", 125, "img/pax_claw.jpg"),
			new Gun(2, true, "Dual Caldwell Pax Claw", 250, "img/pax_claw_dual.jpg")
		)
	),
	new GunFamily(22, 1, new Array(
			new Gun(1, false, "Caldwell Conversion Pistol", 26, "img/conversion.jpg"),
			new Gun(2, true, "Dual Caldwell Conversion Pistol", 52, "img/conversion_dual.jpg"),
			new Gun(1, false, "Caldwell Conversion Chain Pistol", 50, "img/conversion_chain.jpg"),
			new Gun(2, true, "Dual Caldwell Conversion Chain Pistol", 100, "img/conversion_chain_dual.jpg"),
			new Gun(1, false, "Caldwell Conversion Upercut", 275, "img/conversion_up.jpg"),
			new Gun(2, true, "Dual Caldwell Conversion Upercut", 550, "img/conversion_up_dual.jpg")
		)
	),
	new GunFamily(30, 1, new Array(
			new Gun(1, false, "Bornheim No. 3", 201, "img/bornheim.jpg"),
			new Gun(2, true, "Dual Bornheim No. 3", 402, "img/bornheim_dual.jpg"),
			new Gun(1, false, "Bornheim No. 3 Extended", 306, "img/bornheim_ext.jpg"),
			new Gun(2, true, "Dual Bornheim No. 3 Extended", 612, "img/bornheim_ext_dual.jpg"),
			new Gun(2, false, "Bornheim No. 3 Match", 224, "img/bornheim_match.jpg")
			)
		),
	new GunFamily(36, 1, new Array(
			new Gun(1, false, "Nagant M1895 Officer", 66, "img/officer.jpg"),
			new Gun(2, true, "Dual Nagant M1895 Officer", 132, "img/officer_dual.jpg"),
			new Gun(1, false, "Nagant M1895 Officer Brawler", 80, "img/officer_bra.jpg"),
			new Gun(2, true, "Dual Nagant M1895 Officer Brawler", 160, "img/officer_bra_dual.jpg"),
			new Gun(3, false, "Nagant M1895 Officer Carbine", 80, "img/officer_carb.jpg")
		)
	),
	new GunFamily(46, 1, new Array(
			new Gun(1, false, "LeMat Mark II Revolver", 95, "img/lemat.jpg"),
			new Gun(2, true, "Dual LeMat Mark II Revolver", 190, "img/lemat_dual.jpg")
		)
	),
	new GunFamily(68, 1, new Array(
			new Gun(1, false, "Dolch 96", 750, "img/dolch.jpg"),
			new Gun(2, true, "Dual Dolch 96", 1500, "img/dolch_dual.jpg"),
			new Gun(2, false, "Dolch 96 Precision", 790, "img/dolch_prec.jpg")
		)
	),
	new GunFamily(1, 2, new Array(
			new Gun(3, false, "Romero 77", 34, "img/romero.jpg"),
			new Gun(2, false, "Romero 77 Handcannon", 26, "img/romero_hand.jpg"),
			new Gun(3, false, "Romero 77 Talon", 59, "img/romero_tal.jpg"),
			new Gun(2, false, "Romero 77 Hatchet", 62, "img/romero_hatc.jpg")
		)
	),
	new GunFamily(18, 2, new Array(
			new Gun(3, false, "Caldwell Rival 78", 100, "img/rival.jpg"),
			new Gun(2, false, "Caldwell Rival 78 Handcannon", 85, "img/rival_hand.jpg")
		)
	),
	new GunFamily(58, 2, new Array(
			new Gun(3, false, "Specter 1882", 188, "img/specter.jpg"),
			new Gun(2, false, "Specter 1882 Compact", 164, "img/specter_com.jpg"),
			new Gun(3, false, "Specter 1882 Bayonet", 223, "img/specter_bay.jpg")
		)
	),
	new GunFamily(82, 3, new Array(
			new Gun(3, false, "Crown And King Auto-5", 600, "img/crown.jpg")
		)
	),
	new GunFamily(1, 2, new Array(
			new Gun(2, false, "Combat Axe", 5, "img/axe.jpg")
		)
	),
	new GunFamily(12, 1, new Array(
			new Gun(1, false, "Machete", 18, "img/machete.jpg")
		)
	),
	new GunFamily(62, 1, new Array(
			new Gun(1, false, "Cavalry Saber", 60, "img/saber.jpg")
		)
	),
	new GunFamily(78, 3, new Array(
			new Gun(3, false, "Bomb Lance", 199, "img/bomb_lance.jpg")
		)
	),
	new GunFamily(4, 2, new Array(
			new Gun(2, false, "Hand Crossbow", 44, "img/crossbow_hand.jpg"),
			new Gun(2, false, "Hand Crossbow Poison", 61, "img/crossbow_hand_poi.jpg"),
			new Gun(3, false, "Crossbow", 73, "img/crossbow.jpg"),
			new Gun(3, false, "Crossbow Explosive", 130, "img/crossbow_ex.jpg"),
			new Gun(3, false, "Crossbow Shotbolt", 150, "img/crossbow_sho.jpg")
		)
	)
);

var toolFamilies = new Array(
	new ToolFamily(1, new Array(
			new Tool("Knife", 20,"img/knife.jpg"),
			new Tool("Throwing Knives", 40, "img/knife_throw.jpg"),
			new Tool("Heavy Knife", 25,"img/knife_heavy.jpg")
		)
	),
	new ToolFamily(1, new Array(
			new Tool("Electric Lamp", 5, "img/lamp.jpg"),
			new Tool("Fusees", 5, "img/fusees.jpg"),
			new Tool("Flare Pistol", 36, "img/flare.jpg")
		)
	),
	new ToolFamily(1, new Array(
			new Tool("First Aid Kit", 30, "img/aid.jpg")
		)
	),
	new ToolFamily(11, new Array(
			new Tool("Choke Bomb", 25, "img/choke.jpg")
		)
	),
	new ToolFamily(20, new Array(
			new Tool("Dusters", 15, "img/dusters.jpg"),
			new Tool("Knuckle Knife", 15, "img/knuckle.jpg")
		)
	),
	new ToolFamily(24, new Array(
			new Tool("Spyglass", 8, "img/spyglass.jpg")
		)
	),
	new ToolFamily(32, new Array(
			new Tool("Decoys", 6, "img/decoy.jpg"),
			new Tool("Alert Trip Mine", 15, "img/trip_alert.jpg"),
			new Tool("Blank Fire Decoys", 45, "img/decoy_blank.jpg"),
			new Tool("Decoy Fuses", 60, "img/decoy_fuses.jpg")
		)
	),
	new ToolFamily(40, new Array(
			new Tool("Concertina Trip Mine", 90, "img/trip_con.jpg")
		)
	),
	new ToolFamily(48, new Array(
			new Tool("Poison Trip Mine", 60, "img/trip_poi.jpg")
		)
	),
	new ToolFamily(66, new Array(
			new Tool("Quad Derringer", 60, "img/derringer.jpg")
		)
	)
);

var consumableFamilies = new Array(
	new ConsumableFamily(1, new Array(
			new Consumable("Fire Bomb", 18, "img/fire.jpg"),
			new Consumable("Liquid Fire Bomb", 23, "img/fire_liq.jpg"),
			new Consumable("Hellfire Bomb", 70, "img/fire_hell.jpg")
		)
	),
	new ConsumableFamily(8, new Array(
			new Consumable("Dynamite Stick", 18, "img/dynamite.jpg"),
			new Consumable("Waxed Dynamite Stick", 24, "img/dynamite_wax.jpg"),
			new Consumable("Sticky Bomb", 64, "img/sticky.jpg"),
			new Consumable("Dynamite Bundle", 75, "img/dynamite_bun.jpg"),
			new Consumable("Frag Bomb", 70, "img/frag.jpg"),
			new Consumable("Big Dynamite Bundle", 110, "img/dynamite_big.jpg")
		)
	),
	new ConsumableFamily(1, new Array(
			new Consumable("Weak Vitality Shot", 10, "img/vitality_weak.jpg"),
			new Consumable("Weak Stamina Shot", 10, "img/stamina_weak.jpg"),
			new Consumable("Vitality Shot", 75, "img/vitality.jpg"),
			new Consumable("Stamina Shot", 40, "img/stamina.jpg")
		)
	),
	new ConsumableFamily(48, new Array(
			new Consumable("Poison Bomb", 25, "img/poison.jpg"),
			new Consumable("Weak Antidote Shot", 25, "img/antidote_weak.jpg"),
			new Consumable("Antidote Shot", 55, "img/antidote.jpg"),
			new Consumable("Hive Bomb", 40, "img/hive.jpg")
		)
	),
	new ConsumableFamily(32, new Array(
			new Consumable("Chaos Bomb", 15, "img/chaos.jpg")
		)
	),
	new ConsumableFamily(40, new Array(
			new Consumable("Concertina Bomb", 48, "img/concertina.jpg"),
			new Consumable("Flash Bomb", 47, "img/flash.jpg")
		)
	),
	new ConsumableFamily(80, new Array(
			new Consumable("Ammo Box", 65, "img/ammo.jpg")
		)
	)
);

function randomizeSlots() {
	Object.keys(updateStack).forEach(function(key) {
		updateStack[key].forEach(function(num) {
			switch (key) {
				case "tools":
					store[key][(num-1)] = generateTool();
					break;
				case "consumables":
					store[key][(num-1)] = generateConsumable();
					break;
			}
		})
	});
}

function updateSlots() {
	Object.keys(updateStack).forEach(function(key) {
		if(key != "weapons"){
		updateStack[key].forEach(function(num) {
			var e = document.getElementById(key.substr(0,1)+num);
			if (store[key][(num-1)] != null) {
				e.src = store[key][(num-1)].image;
				e.alt = store[key][(num-1)].name;
			}
		})
	}});
}

async function generateLoadout(){
	setParameterValues();
	if(animation){
		disableFormElements();
		var intervalLong = 300;
		var intervalShort= 150;
		for (i = 0; i < 3; i++) {
			playSound("tick");
			generate();
			await sleep (300);
		}
	
		for (i = 0; i < 15; i++) {
			playSound("tick");
			generate();
			await sleep (150);
		}
	
		for (i = 0; i < 2; i++) {
			playSound("tick");
			generate();
			await sleep (300);
		}
	
		await sleep (150);
		playSound("tick");
		playSound("found");
		generate();
		enableFormElements();
	} else {
		playSound("tick");
		generate();
	}
}

function playSound(soundToPlay){
	if(sound) {
		document.getElementById(soundToPlay).play();
	}
}

function disableFormElements(){
	document.getElementById("generate_loadout").disabled = true;
	document.getElementById("dual").disabled = true;
	document.getElementById("dup").disabled = true;
	document.getElementById("quartermaster").disabled = true;
	document.getElementById("rank").disabled = true;
	document.getElementById("sound").disabled = true;
	document.getElementById("anim").disabled = true;
}

function enableFormElements(){
	document.getElementById("generate_loadout").disabled = false;
	document.getElementById("dual").disabled = false;
	document.getElementById("dup").disabled = false;
	document.getElementById("quartermaster").disabled = false;
	document.getElementById("rank").disabled = false;
	document.getElementById("sound").disabled = false;
	document.getElementById("anim").disabled = false;
}

function generate() {
	setParameterValues();
	setMaxSize();
	if (rank <= 100 && rank >= 1) {
		emptyStore()
		updateRemainingSize();
		if (generateWeapon1) {
			weapon1 = generateWeapon();
			updateRemainingSize();
			document.getElementById("w1").src = weapon1.image;
			document.getElementById("w1").alt = weapon1.name;
		} 
		if (generateWeapon2) {
			weapon2 = generateWeapon();
			updateRemainingSize();
			document.getElementById("w2").src = weapon2.image;
			document.getElementById("w2").alt = weapon2.name;
		}
		randomizeSlots();
		updateSlots();
	}
}

function updateRemainingSize(){
	remainingSize = maxSize;
	if(weapon1 != null){
		remainingSize = remainingSize - weapon1.size;
	}
	if(weapon2 != null){
		remainingSize = remainingSize - weapon2.size;
	}
}

function emptyStore() {
	if(weapon1 != null && generateWeapon1){
		weapon1 = null;
	}
	if(weapon2 != null && generateWeapon2){
		weapon2 = null;
	}
	store = {
		tools: [null, null, null, null],
		consumables: [null, null, null, null]
	};
}

function GunFamily(rank, minimumSize, guns){
	this.rank = rank;
	this.minimumSize = minimumSize;
	this.guns = guns;
}

function Gun(size, dualWield, name, price, image){
	this.size = size;
	this.dualWield = dualWield;
	this.name = name;
	this.price = price;
	this.image = image;
}

function ToolFamily(rank, tools){
	this.rank = rank;
	this.tools = tools;
}

function Tool(name, price, image){
	this.name = name;
	this.price = price;
	this.image = image;
}

function ConsumableFamily(rank, consumables){
	this.rank = rank;
	this.consumables = consumables;
}

function Consumable(name, price, image){
	this.name = name;
	this.price = price;
	this.image = image;
}

function setMaxSize() {
	if (allowQuatermaster) {
		maxSize = 5;
	} else {
		maxSize = 4;
	}
}

function setParameterValues() {
	generateWeapon1 = document.getElementById("weapon1").checked;
	generateWeapon2 = document.getElementById("weapon2").checked;
	clearUpdateStack();
	var checks = [].slice.call(document.getElementsByTagName("input"))
			.filter(i => i.type == "checkbox" && /.*\d+$/.test(i.id));
	checks.forEach(function(box) {
		if (box.checked) {
			// maybe introduce a dataset field? (hp)
			var name = box.id.slice(0, -1)+"s";//wtf. (hp)
			updateStack[name].push(parseInt(box.id.slice(-1)));
		}
	});

	allowDualWield = document.getElementById("dual").checked
	allowQuatermaster = document.getElementById("quartermaster").checked
	allowDuplicateWeapons = document.getElementById("dup").checked
	sound = document.getElementById("sound").checked
	animation = document.getElementById("anim").checked
	rank = document.getElementById("rank").value;
}

function generateWeapon() {
	var weapon = null;
	var candidates = filterWeaponFamilyCandidates();
	while (weapon == null) {
		var randomFamily = candidates[getRandomInt(candidates.length)];
		var weaponCandidates = filterWeaponCandidates(randomFamily);
		weapon = weaponCandidates[getRandomInt(weaponCandidates.length)]
		if (!allowDuplicateWeapons) {
			if ((weapon1 != null && weapon.name == weapon1.name) || (weapon2 != null && weapon.name == weapon2.name)) {
				weapon = null;
			}
		}
	}
	return weapon;
}

function filterWeaponFamilyCandidates(){
	var candidates = new Array();
	for (family of gunFamilies){
		if (family.rank <= rank && family.minimumSize <= remainingSize) {
			candidates.push(family);
		}
	}
	return candidates;
}

function filterWeaponCandidates(family){
var weaponCandidates = new Array();
	for (gun of family.guns){
		if (gun.size <= remainingSize) {
			if(gun.dualWield){
				if (allowDualWield) {
					weaponCandidates.push(gun)
				}
			} else {
				weaponCandidates.push(gun);
			}
		}
	}
	return weaponCandidates;
}

function generateTool() {
	var tool = null;
	var candidates = filterToolFamilyCandidates();
	if(isToolUnavailable(candidates)){
		return null;
	}
	while (tool == null) {
		var randomFamily = candidates[getRandomInt(candidates.length)];
		var toolCandidates = filterToolCandidates(randomFamily);
		tool = toolCandidates[getRandomInt(toolCandidates.length)];
		if (store.tools.includes(tool)){
			tool = null;
		}
	}
	return tool;
}

function filterToolFamilyCandidates(){
	var candidates = new Array();
	for (family of toolFamilies) {
		if (family.rank <= rank) {
			candidates.push(family);
		}
	}
	return candidates;
}

function isDuplicate(array) {
	return (array.filter((item, index) => item != null && array.indexOf(item) != index)).length != 0;
}

function activateEvents() {
	var checks = [].slice.call(document.getElementsByTagName("input"));
	checks = checks.filter(box => box.type == "checkbox");
	checks.forEach(function(box) {
		box.addEventListener("change", function(e) {
			var name = e.target.id.slice(0, -1)+"s";//wtf. (hp)
			var number = parseInt(e.target.id.slice(-1))


			if (e.target.checked) {
				updateStack[name].push(number);
			} else {
				updateStack[name] = updateStack[name].filter(n => n !== number);
			}
		})
	});

	var buttons = [].slice.call(document.getElementsByTagName("button"))
			.filter(btn => btn.type == "submit");
	buttons.forEach(function(btn) {
		btn.addEventListener("click", function(e) {
			switch (e.target.id) {
				case "generate_loadout":
					generateLoadout();
				break;
			}
		})
	});
}

function findFamilyOf(searchin, sub, searchfor) {
	var index = searchin.findIndex(function(family, index) {
		if ((family[sub].findIndex(function(item, index) {
			return (item.name == searchfor.name);
		})) != -1) {
			return true;
		} else {
			return false;
		}
	});

	return (index != -1 ? searchin[index] : null);
}

function filterToolCandidates(family){
	var candidates = new Array();
	for (tool of family.tools){
		if (store.tools.every(function(t) {
			return (t == null || t != null && t.name);
		})) {
			candidates.push(tool);
		}
	}
	return candidates;
}

function isToolUnavailable(candidates){
	var totalNumberOfTools = 0;
	var totalNumberOfCandidate = 0;

	store.tools.forEach(function(tool) {
		if (tool != null) {
			totalNumberOfTools += 1;
		}
	});

	for (family of candidates){
		for(tool of family.tools){
			totalNumberOfCandidate = totalNumberOfCandidate + 1;
		}
	}
	if (totalNumberOfTools == totalNumberOfCandidate) {
		return true;
	}
	return false;
}

function generateConsumable() {
	var candidates = filterConsumableCandidates();
	consumable = candidates[getRandomInt(candidates.length)];
	return consumable;
}

function filterConsumableCandidates(){
	var candidates = new Array();
	for (family of consumableFamilies) {
		if (family.rank <= rank) {
			for (cons of family.consumables){
				candidates.push(cons);
			}
		}
	}
	return candidates;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function previous(toRoll){
	setParameterValues();
	if (toRoll == "weapon1") {
		if (generateWeapon1) {
			if (weapon1 == null) {
				initialName = " ";
			} else {
				initialName = weapon1.name;
			}
			setMaxSize();
			remainingSize = maxSize;
			if (weapon2 != null) {
				remainingSize = maxSize - weapon2.size;
			}
			for(family of gunFamilies){
				found = false;
				for (var i = family.guns.length - 1; i >= 0; i--) {
					if (found) {
						gun = family.guns[i];
						if (gun.size <= remainingSize) {
							if (!(gun.dualWield && !allowDualWield)) {
								if ((weapon2 != null && weapon2.name != gun.name) || weapon2 == null || (weapon2 != null && allowDuplicateWeapons)) {
									weapon1 = gun;
									break;
								}
							}
						}
					}
					if (weapon1 != null && family.guns[i].name == weapon1.name){
						found = true;
					}
				}
			}
			if (weapon1 !=null && initialName != weapon1.name){
				document.getElementById("w1").src = weapon1.image;
				document.getElementById("w1").alt = weapon1.name;
			}
		}
	}
	if (toRoll == "weapon2") {
		if (generateWeapon2) {
			if (weapon2 == null) {
				initialName = " ";
			} else {
				initialName = weapon2.name;
			}
			setMaxSize();
			remainingSize = maxSize;
			if (weapon1 != null) {
				remainingSize = maxSize - weapon1.size;
			}
			for(family of gunFamilies){
				found = false;
				for (var i = family.guns.length - 1; i >= 0; i--) {
					if (found) {
						gun = family.guns[i];
						if (gun.size <= remainingSize) {
							if (!(gun.dualWield && !allowDualWield)) {
								if ((weapon1 != null && weapon1.name != gun.name) || weapon1 == null || (weapon1 != null && allowDuplicateWeapons)) {
									weapon2 = gun;
									break;
								}
							}
						}
					}
					if (weapon2 !=null && family.guns[i].name == weapon2.name){
						found = true;
					}
				}
			}
			if (weapon2 !=null && initialName != weapon2.name){
				document.getElementById("w2").src = weapon2.image;
				document.getElementById("w2").alt = weapon2.name;
			}
		}
	}

	if (toRoll.substring(0, 4) == "tool") {
		var tnum = parseInt(toRoll.substring(4))-1;
		var prev = store.tools[tnum];

		var fam = findFamilyOf(toolFamilies, "tools", store.tools[tnum]);
		var toolIndex = fam.tools.findIndex((t) => t.name == store.tools[tnum].name);
		var newTool = prev;

		while(toolIndex > 0 && newTool == prev){
			newTool = fam.tools[--toolIndex];
			if (store.tools.includes(newTool)){
				newTool = prev;
			}
		}
		
		store.tools[tnum] = newTool;
		updateSlots();
		
	}

	if (toRoll.substring(0, 10) == "consumable") {
		var cnum = parseInt(toRoll.substring(10))-1;

		var fam   = findFamilyOf(consumableFamilies, "consumables", store.consumables[cnum]);
		var consumableIndex = fam.consumables.findIndex((c) => c.name == store.consumables[cnum].name);
		
		store.consumables[cnum] = (consumableIndex > 0 ? fam.consumables[consumableIndex-1] : fam.consumables[consumableIndex]);
		updateSlots();
	}
}

function reroll(toRoll){
	setParameterValues();
	if (toRoll == "weapon1") {
		if (generateWeapon1) {	
			setMaxSize();
			weapon1 = null;
			remainingSize = maxSize;
			if (weapon2 != null) {
				remainingSize = maxSize - weapon2.size;
			}
			weapon1 = generateWeapon(); 
			document.getElementById("w1").src = weapon1.image;
			document.getElementById("w1").alt = weapon1.name;
		}
	}
	if (toRoll == "weapon2") {
		if (generateWeapon2) {	
			setMaxSize();
			weapon2 = null;
			remainingSize = maxSize;
			if (weapon1 != null) {
				remainingSize = maxSize - weapon1.size;
			}
			weapon2 = generateWeapon(); 
			document.getElementById("w2").src = weapon2.image;
			document.getElementById("w2").alt = weapon2.name;
		}
	}

	if (toRoll.substring(0, 4) == "tool") {
		var tnum = parseInt(toRoll.substring(4))-1;
		var prev = store.tools[tnum]
		while(store.tools[tnum] == prev){
			store.tools[tnum] = null;
			store.tools[tnum] = generateTool();
		}
	}

	if (toRoll.substring(0, 10) == "consumable") {
		var cnum = parseInt(toRoll.substring(10))-1;
		store.consumables[cnum] = null;
		store.consumables[cnum] = generateConsumable();
	}

	updateSlots();
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }

function clearUpdateStack(){
	updateStack = {
		tools: [],
		consumables: [],
		weapons: [] /* not used, but needed for checkboxes */
	}
}
  
function toggleMenu(){
	var menu = document.getElementById("menu");
	var container = document.getElementsByClassName("option-menu")[0];
	if (menu.style.display === "inline-block"){
		menu.style.display = "none";
		container.classList.remove("menu-open");
	} else {
		menu.style.display = "inline-block";
		container.classList.add("menu-open");
	}
}