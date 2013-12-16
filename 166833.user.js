//==UserScript==
//@name        New Custom Flunik Tools
//@namespace   FlunikTools
//@description Upgrades Offense or Defense or Buildings but not RT CY CC DEFFac or DefHQ. 
//@version     Awesome 1.3.3 
//@author      dbendure
//@include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
//@updateURL   https://userscripts.org/scripts/source/166833.meta.js
//@downloadURL https://userscripts.org/scripts/source/166833.user.js
//@grant none
//==/UserScript==

(function (){
	var FlunikTools_main =  function() {
		try {
			/*function CCTAWrapperIsInstalled() {
				return (typeof (CCTAWrapper_IsInstalled) != 'undefined' && CCTAWrapper_IsInstalled);
			}*/

			function createFlunikTools() {
				console.log('FLUNIKTOOLS createFlunikTools');

				qx.Class.define("FlunikTools.Main", {
					type: "singleton",
					extend: qx.core.Object,
					members: {
						button : null,
						popup : null,
						AutoUpdateButton : null,
						BuildingsButton : null,
						DefenseButton : null,
						OffenseButton : null,
						autoUpdateHandle : null,
						AautoUpdateHandle : null,
						p : 1,
						f : 1,
						PowerOrTib : 0,
						h : 1,
						r : 1,
						s : 1,
						a : 1,
						ResOnly : 0,
						y: 1,
						z: 1,



						initialize: function() {

							console.log('FLUNIKTOOLS initialize');
							/*AutoUpdateButton = new qx.ui.form.Button("All", null).set({
								toolTipText: "Only Upgrades Everything, even if you turn it off... stupid all button!",
								width: 60,
								height: 30,
								maxWidth: 60,
								maxHeight: 30,
								appearance: ("button-text-small"), //"button-standard-"+factionText), button-playarea-mode-red-frame
								center: true
							});*/
							BuildingsButton = new qx.ui.form.Button("Building", null).set({
								toolTipText: "Only Upgrades Buildings",
								width: 63,
								height: 30,
								maxWidth: 60,
								maxHeight: 30,
								appearance: ("button-text-small"), //"button-standard-"+factionText), button-playarea-mode-red-frame
								center: true,

							});
							DefenseButton = new qx.ui.form.Button("Defence", null).set({
								toolTipText: "Only Upgrades Defence",
								width: 63,
								height: 30,
								maxWidth: 60,
								maxHeight: 30,
								appearance: ("button-text-small"), //"button-standard-"+factionText), button-playarea-mode-red-frame
								center: true,

							});
							OffenseButton = new qx.ui.form.Button("Offence", null).set({
								toolTipText: "Only Upgrades Offence",
								width: 63,
								height: 30,
								maxWidth: 60,
								maxHeight: 30,
								appearance: ("button-text-small"), //"button-standard-"+factionText), button-playarea-mode-red-frame
								center: true,

							});
							CommandBuildingChoice = new qx.ui.form.Button("Resonly?", null).set({
								toolTipText: "Allows only Resources to upgrade, press 1 for only resources, press 0 for normal procedure, then press the upgrade button",
								width: 63,
								height: 30,
								maxWidth: 60,
								maxHeight: 30,
								appearance: ("button-text-small"), //"button-standard-"+factionText), button-playarea-mode-red-frame
								center: true,

							});
							worldResBuildingChoice = new qx.ui.form.Button("World", null).set({
								toolTipText: "not pressed looks at everything as it is, New = harvester hungry, Old = Power plant hungry. However, both options upgrade refineries.",
								width: 63,
								height: 30,
								maxWidth: 60,
								maxHeight: 30,
								appearance: ("button-text-small"), //"button-standard-"+factionText), button-playarea-mode-red-frame
								center: true,

							});
							PowerBuildingChoice = new qx.ui.form.Button("PP's", null).set({
								toolTipText: "P = 0 stops power plants from upgrading, P = 1 allows powers plants to upgrade.",
								width: 63,
								height: 30,
								maxWidth: 60,
								maxHeight: 30,
								appearance: ("button-text-small"), //"button-standard-"+factionText), button-playarea-mode-red-frame
								center: true,

							});
							HarvBuildingChoice = new qx.ui.form.Button("Harv's", null).set({
								toolTipText: "P = 0 stops power plants from upgrading, P = 1 allows powers plants to upgrade.",
								width: 63,
								height: 30,
								maxWidth: 60,
								maxHeight: 30,
								appearance: ("button-text-small"), //"button-standard-"+factionText), button-playarea-mode-red-frame
								center: true,

							});

							RefBuildingChoice = new qx.ui.form.Button("Ref's", null).set({
								toolTipText: "P = 0 stops power plants from upgrading, P = 1 allows powers plants to upgrade.",
								width: 63,
								height: 30,
								maxWidth: 60,
								maxHeight: 30,
								appearance: ("button-text-small"), //"button-standard-"+factionText), button-playarea-mode-red-frame
								center: true,

							});

							SiloBuildingChoice = new qx.ui.form.Button("Silo's", null).set({
								toolTipText: "P = 0 stops power plants from upgrading, P = 1 allows powers plants to upgrade.",
								width: 63,
								height: 30,
								maxWidth: 60,
								maxHeight: 30,
								appearance: ("button-text-small"), //"button-standard-"+factionText), button-playarea-mode-red-frame
								center: true,

							});

							AccBuildingChoice = new qx.ui.form.Button("Acc's", null).set({
								toolTipText: "P = 0 stops power plants from upgrading, P = 1 allows powers plants to upgrade.",
								width: 63,
								height: 30,
								maxWidth: 60,
								maxHeight: 30,
								appearance: ("button-text-small"), //"button-standard-"+factionText), button-playarea-mode-red-frame
								center: true,

							});

							button = new qx.ui.form.Button("DB.aUp");
							button1 = new qx.ui.form.Button("Options");
							popup = new qx.ui.popup.Popup(new qx.ui.layout.Grid(5)).set({
								width: 120,
								height: 30,
								allowGrowY: false,
								allowGrowX: false,
								padding: 5,
								position: "top-right"
								//appearance: ("button-text-small")

							});
							popup1 = new qx.ui.popup.Popup(new qx.ui.layout.Grid(5)).set({
								width: 120,
								height: 30,
								allowGrowY: false,
								allowGrowX: false,
								padding: 5,
								position: "top-right"
								//appearance: ("button-text-small")

							});







							BuildingsButton.addListener("click", function (e) {
								if (window.FlunikTools.Main.getInstance().autoUpdateHandle != null) {
									window.FlunikTools.Main.getInstance().BstopAutoUpdate();
									BuildingsButton.setLabel("B.OFF");
									//alert("Stopped auto-update");

								} else {
									window.FlunikTools.Main.getInstance().BuildingstartAutoUpdate();
									BuildingsButton.setLabel("B.ON");

								}
							}, this);
							DefenseButton.addListener("click", function (e) {
								if (window.FlunikTools.Main.getInstance().autoUpdateHandle != null) {
									window.FlunikTools.Main.getInstance().DstopAutoUpdate();
									DefenseButton.setLabel("D.OFF");
									//alert("Stopped auto-update");
								} else {
									window.FlunikTools.Main.getInstance().DefensestartAutoUpdate();
									DefenseButton.setLabel("D.ON");
								}
							}, this);
							OffenseButton.addListener("click", function (e) {
								if (window.FlunikTools.Main.getInstance().autoUpdateHandle != null) {
									window.FlunikTools.Main.getInstance().OstopAutoUpdate();
									OffenseButton.setLabel("O.OFF");
									//alert("Stopped auto-update");
								} else {
									window.FlunikTools.Main.getInstance().OffensestartAutoUpdate();
									OffenseButton.setLabel("O.ON");
								}
							}, this);
							CommandBuildingChoice.addListener("click", function (e) {
								var _this = window.FlunikTools.Main.getInstance();
								if (window.FlunikTools.Main.getInstance().AautoUpdateHandle != null) {
									window.FlunikTools.Main.getInstance().OffFunction();
									CommandBuildingChoice.setLabel("R = 0");
									//BuildingsButton.setLabel("B.Hold");
									_this.ResOnly = 0;
									console.log(_this.ResOnly + " normal mode");
									//alert("Stopped auto-update");
								} else {
									window.FlunikTools.Main.getInstance().OnFunction();
									CommandBuildingChoice.setLabel("R = 1");
									//BuildingsButton.setLabel("B.Hold");
									//alert("Stop auto-update to return value to 0");
									_this.ResOnly = 1;
									console.log(_this.ResOnly + " ResOnly mode");
								}
							}, this);
							worldResBuildingChoice.addListener("click", function (e) {
								var _this = window.FlunikTools.Main.getInstance();
								if (window.FlunikTools.Main.getInstance().AautoUpdateHandle != null) {
									window.FlunikTools.Main.getInstance().OffFunction();
									worldResBuildingChoice.setLabel("New");
									//BuildingsButton.setLabel("B.Hold");
									_this.y = 1;
									_this.z = 0.293;
									_this.PowerOrTib = 0;
									console.log("_this.y "+_this.y + " _this.z " +_this.z +" new world mode" + "_this.PowerOrTib" + _this.PowerOrTib + "tibcost");
									//alert("Stopped auto-update");
								} else {
									window.FlunikTools.Main.getInstance().OnFunction();
									worldResBuildingChoice.setLabel("Old");
									//BuildingsButton.setLabel("B.Hold");
									//alert("Stop auto-update to return value to 0");
									_this.y = 0.293;
									_this.z = 1;
									_this.PowerOrTib=1;
									console.log("_this.y "+_this.y + " _this.z " +_this.z +  " old world mode"+ "_this.PowerOrTib" + _this.PowerOrTib + "powcost");
								}
							}, this);
							PowerBuildingChoice.addListener("click", function (e) {
								var _this = window.FlunikTools.Main.getInstance();
								if (window.FlunikTools.Main.getInstance().AautoUpdateHandle != null) {
									window.FlunikTools.Main.getInstance().OffFunction();
									PowerBuildingChoice.setLabel("P = 0");
									//BuildingsButton.setLabel("B.Hold");
									_this.p = 0;
									console.log(_this.p + " Power off mode");
									//alert("Stopped auto-update");
								} else {
									window.FlunikTools.Main.getInstance().OnFunction();
									PowerBuildingChoice.setLabel("P = 1");
									//BuildingsButton.setLabel("B.Hold");
									//alert("Stop auto-update to return value to 0");
									_this.p = 1;
									console.log(_this.p + " Power On mode");
								}
							}, this);

							HarvBuildingChoice.addListener("click", function (e) {
								var _this = window.FlunikTools.Main.getInstance();
								if (window.FlunikTools.Main.getInstance().AautoUpdateHandle != null) {
									window.FlunikTools.Main.getInstance().OffFunction();
									HarvBuildingChoice.setLabel("H = 0");
									//BuildingsButton.setLabel("B.Hold");
									_this.h = 0;
									console.log(_this.h + " Harvester off mode");
									//alert("Stopped auto-update");
								} else {
									window.FlunikTools.Main.getInstance().OnFunction();
									HarvBuildingChoice.setLabel("H = 1");
									//BuildingsButton.setLabel("B.Hold");
									//alert("Stop auto-update to return value to 0");
									_this.h = 1;
									console.log(_this.h + " Harvester On mode");
								}
							}, this);

							RefBuildingChoice.addListener("click", function (e) {
								var _this = window.FlunikTools.Main.getInstance();
								if (window.FlunikTools.Main.getInstance().AautoUpdateHandle != null) {
									window.FlunikTools.Main.getInstance().OffFunction();
									RefBuildingChoice.setLabel("R = 0");
									//BuildingsButton.setLabel("B.Hold");
									_this.r = 0;
									console.log(_this.r + " Refinery off mode");
									//alert("Stopped auto-update");
								} else {
									window.FlunikTools.Main.getInstance().OnFunction();
									RefBuildingChoice.setLabel("R = 1");
									//BuildingsButton.setLabel("B.Hold");
									//alert("Stop auto-update to return value to 0");
									_this.r = 1;
									console.log(_this.r + " Refinery On mode");
								}
							}, this);

							SiloBuildingChoice.addListener("click", function (e) {
								var _this = window.FlunikTools.Main.getInstance();
								if (window.FlunikTools.Main.getInstance().AautoUpdateHandle != null) {
									window.FlunikTools.Main.getInstance().OffFunction();
									SiloBuildingChoice.setLabel("S = 0");
									//BuildingsButton.setLabel("B.Hold");
									_this.s = 0;
									console.log(_this.s + " Silo off mode");
									//alert("Stopped auto-update");
								} else {
									window.FlunikTools.Main.getInstance().OnFunction();
									SiloBuildingChoice.setLabel("S = 1");
									//BuildingsButton.setLabel("B.Hold");
									//alert("Stop auto-update to return value to 0");
									_this.s = 1;
									console.log(_this.s + " Silo On mode");
								}
							}, this);

							AccBuildingChoice.addListener("click", function (e) {
								var _this = window.FlunikTools.Main.getInstance();
								if (window.FlunikTools.Main.getInstance().AautoUpdateHandle != null) {
									window.FlunikTools.Main.getInstance().OffFunction();
									AccBuildingChoice.setLabel("A = 0");
									//BuildingsButton.setLabel("B.Hold");
									_this.a = 0;
									console.log(_this.a + " Accumulator off mode");
									//alert("Stopped auto-update");
								} else {
									window.FlunikTools.Main.getInstance().OnFunction();
									AccBuildingChoice.setLabel("A = 1");
									//BuildingsButton.setLabel("B.Hold");
									//alert("Stop auto-update to return value to 0");
									_this.a = 1;
									console.log(_this.p + " Accumulator On mode");
								}
							}, this);

							/*AutoUpdateButton.addListener("click", function (e) {
								if (window.FlunikTools.Main.getInstance().autoUpdateHandle != null) {

									AutoUpdateButton.setLabel("F.OFF");
									//window.FlunikTools.Main.getInstance().stopAutoUpdate();
									BuildingsButton.setLabel("F.OFF");
									window.FlunikTools.Main.getInstance().BstopAutoUpdate();
									DefenseButton.setLabel("F.OFF");
									window.FlunikTools.Main.getInstance().DstopAutoUpdate();
									OffenseButton.setLabel("F.OFF");
									window.FlunikTools.Main.getInstance().OstopAutoUpdate();
									//alert("Stopped auto-update");
								} else {
									//window.FlunikTools.Main.getInstance().startAutoUpdate("Construction Yard, Command Center, Defense HQ, Defense Facility, Barracks, Factory, Airfield, Accumulator, Silo, Refinery, Power Plant, Harvester, Blade of Kane, Eye of Kane, Fist of Kane, Falcon Support, Ion Cannon Support, Skystrike Support, War Factory, Hand of Nod, Airport");
									AutoUpdateButton.setLabel("F.ON");

									window.FlunikTools.Main.getInstance().BuildingstartAutoUpdate();
									BuildingsButton.setLabel("F.ON");

									window.FlunikTools.Main.getInstance().DefensestartAutoUpdate();
									DefenseButton.setLabel("F.ON");

									window.FlunikTools.Main.getInstance().OffensestartAutoUpdate();
									OffenseButton.setLabel("F.ON");
								}
							}, this);*/

							//popup.add(new qx.ui.basic.Atom(null, null));//new qx.ui.basic.Atom("Hello World #1", "button-text-small")

							//popup.add(AutoUpdateButton, {row: 0, column: 0});
							popup.add(button1, {row: 1, column: 3});
							popup.add(worldResBuildingChoice, {row: 1, column: 1});
							popup.add(CommandBuildingChoice, {row: 1, column: 2});
							popup.add( BuildingsButton, {row: 0, column: 1});
							popup.add(DefenseButton, {row: 0, column: 2});
							popup.add(OffenseButton, {row: 0, column: 3});
							popup1.add(PowerBuildingChoice, {row: 0, column: 0});
							popup1.add(RefBuildingChoice, {row: 0, column: 1});
							popup1.add(HarvBuildingChoice, {row: 0, column: 2});
							popup1.add(SiloBuildingChoice, {row: 0, column: 3});
							popup1.add(AccBuildingChoice, {row: 0, column: 4});
							button.addListener("click", function(e)
									{
								popup.placeToMouse(e);
								popup.show();
									}, this);
							button1.addListener("click", function(e)
									{
								popup1.placeToMouse(e);
								popup1.show();
									}, this);


							var app = qx.core.Init.getApplication();

							/*app.getDesktop().add(BuildingsButton, {
								left : 0
							});
							app.getDesktop().add(DefenseButton, {
								left : 60
							});
							app.getDesktop().add(OffenseButton, {
								left : 120
							});
							app.getDesktop().add(AutoUpdateButton, {
								left : 180
							});	*/						
							app.getDesktop().add(button, {
								right: 128,
								top: 3
							});					



						},


						// Use
						// this.canUpgradeUnit(unit, city)
						// instead of
						// unit.CanUpgrade()
						//Thanks to KRS_L
						canUpgradeUnit: function (unit, city) {
							var _this = FlunikTools.Main.getInstance();
							var nextLevel = unit.get_CurrentLevel() + 1;
							var gameDataTech = unit.get_UnitGameData_Obj();
							var hasEnoughResources = city.HasEnoughResources(ClientLib.Base.Util.GetTechLevelResourceRequirements_Obj(nextLevel, gameDataTech));
							if (gameDataTech == null || unit.get_IsDamaged() || city.get_IsLocked() || !hasEnoughResources) {
								return false;
							}
							var id = _this.PowerOrTibetMainProductionBuildingMdbId(gameDataTech.pt, gameDataTech.f);
							var building = city.get_CityBuildingsData().GetBuildingByMDBId(id);
							if ((building == null) || (building.get_CurrentDamage() > 0)) {
								return false;
							}
							var levelReq = ClientLib.Base.Util.GetUnitLevelRequirements_Obj(nextLevel, gameDataTech);
							var reqTechIndexes = _this.PowerOrTibetMissingTechIndexesFromTechLevelRequirement(levelReq, true, city);
							if ((reqTechIndexes != null) && (reqTechIndexes.length > 0)) {
								return false;
							}
							return true;
						},

						getMainProductionBuildingMdbId: function (placementType, faction) {
							var mdbId = -1;
							var techNameId = -1;
							if (placementType == 2) {
								techNameId = 3;
							} else {
								techNameId = 4;
							}
							if (techNameId > 0) {
								mdbId = ClientLib.Base.Tech.GetTechIdFromTechNameAndFaction(techNameId, faction);
							}
							return mdbId;
						},

						getMissingTechIndexesFromTechLevelRequirement: function (levelRequirements, breakAtFirst, city) {
							var reqTechIndexes = [];
							if (levelRequirements != null && levelRequirements.length > 0) {
								for (var lvlIndex=0; (lvlIndex < levelRequirements.length); lvlIndex++) {
									var lvlReq = levelRequirements[lvlIndex];
									var requirementsMet = false;
									var amountCounter = lvlReq.Amount;
									for (var buildingIndex in city.get_Buildings().d) {
										if (city.get_Buildings().d[buildingIndex].get_MdbBuildingId() == lvlReq.RequiredTechId && city.get_Buildings().d[buildingIndex].get_CurrentLevel() >= lvlReq.Level) {
											amountCounter--;
											if (amountCounter <= 0) {
												requirementsMet=true;
												break;
											}
										}
									}
									if (!requirementsMet) {
										requirementsMet = ClientLib.Data.MainData.GetInstance().get_Player().get_PlayerResearch().IsResearchMinLevelAvailable(lvlReq.RequiredTechId, lvlReq.Level);
									}
									if (!requirementsMet) {
										reqTechIndexes.push(lvlIndex);
										if (breakAtFirst) {
											return reqTechIndexes;
										}
									}
								}
							}
							return reqTechIndexes;
						},

						// Add the below function to your code and then use
						// this.canUpgradeBuilding(building, city)
						// instead of
						// building.CanUpgrade()
						//Thanks to KRS_L

						canUpgradeBuilding: function (building, city) {
							var nextLevel = (building.get_CurrentLevel() + 1);
							var gameDataTech = building.get_TechGameData_Obj();
							var hasEnoughResources = city.HasEnoughResources(ClientLib.Base.Util.GetTechLevelResourceRequirements_Obj(nextLevel, gameDataTech));
							return (!building.get_IsDamaged() && !city.get_IsLocked() && hasEnoughResources);
						},


						OnFunction: function() {
							this.AautoUpdateHandle = 0;
						},
						OffFunction: function() {
							this.AautoUpdateHandle = null;
						},


						BuildingstartAutoUpdate: function () {

							//this.buildingsToUpdate = _buildingsToUpdate;
							this.BuildingautoUpgrade();
							this.autoUpdateHandle = window.setInterval(this.BuildingautoUpgrade, 2000);
						},

						OffensestartAutoUpdate: function () {

							//this.buildingsToUpdate = _buildingsToUpdate;
							this.OffenseautoUpgrade();
							this.autoUpdateHandle = window.setInterval(this.OffenseautoUpgrade, 2000);
						},

						DefensestartAutoUpdate: function () {

							//this.buildingsToUpdate = _buildingsToUpdate;
							this.DefenseautoUpgrade();
							this.autoUpdateHandle = window.setInterval(this.DefenseautoUpgrade, 2000);
						},

						BstopAutoUpdate : function() {
							window.clearInterval(this.autoUpdateHandle);
							this.autoUpdateHandle = null;
						},

						DstopAutoUpdate : function() {
							window.clearInterval(this.autoUpdateHandle);
							this.autoUpdateHandle = null;
						},

						OstopAutoUpdate : function() {
							window.clearInterval(this.autoUpdateHandle);
							this.autoUpdateHandle = null;
						},


						totalRepairTime: function ( airRT, vehRT, infRT) {
							return Math.max(airRT, vehRT, infRT);
<<<<<<< HEAD

						},


=======
					
>>>>>>> d29850c9bc7581ddd0189e32c5e3af5407a72727
//						************************************************************************************************************************************************************************************************************
//						Just for fun
//						***********************************************************************************************************************************************************************************************************						
						distanceFromCenter: function (city){
							//type this into console log of the page to read this function: var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentCity();window.FlunikTools.Main.getInstance().distanceFromCenter(city);
							if(city){
								var cityX = city.get_PosX();
								var cityY = city.get_PosY();
								var x = 500;
								var y = 500;
								var title = "You are here{";
								var NQuad = "North";
								var EQuad = "East";
								var SQuad = "South";
								var WQuad = "West";
								var run;
								var rise;
								var dist = Math.sqrt( ( Math.pow( ( cityX - x ) ,2 ) ) + ( Math.pow( ( cityY - y ) ,2 ) ) );

								var totdis = "Total Dist:"+ Math.round(dist);


								//slope= ( rise / run  );
								//y - y1 = m(x -x1);
								//standard
								//console.log("y = (" + rise + " / " + run + ")*(x - " + x + ") + " + y + ";");
								//console.log("y = (" + rise + " / " + run + ")*(x - " + cityX + ") + " + cityY + ";");


								//y = North +500 - 500 farthest away is 0
								//x = East 500 + 500 farthest away is 1000
								//-y = South 500 +500 farthest away is 1000
								//-x = West +500 - 500 farthest away is 0
								if (cityX > x && cityY > y){
									var rise = ( cityY - y);
									var run = (cityX - x);
									var distxy = "}Distance coords:(x,y): ("+  run +", "+ rise+")";

									var postion =title +" "+ SQuad +" "+ EQuad +" "+ cityX +" "+ cityY +" "+ distxy +" "+ totdis ;
									return (postion);
								}

								if (cityX > x && cityY < y){
									var rise = (y - cityY);
									var run = (cityX - x);
									var distxy = "}Distance coords:(x,y): ("+  run +", "+ rise+")";

									var postion =title +" "+ NQuad +" "+ EQuad +" "+ cityX +" "+ cityY +" "+ distxy + " " + totdis;
									return (postion);
								}

								if (cityX < x && cityY > y){
									var rise = (cityY - y);
									var run = (x - cityX);
									var distxy = "}Distance coords:(x,y): ("+  run +", "+ rise+")";

									var postion =title +" "+ SQuad +" "+ WQuad +" "+ cityX +" "+ cityY +" "+ distxy + " " + totdis;
									return (postion);
								}

								if (cityX < x && cityY < y){
									var rise = (y - cityY);
									var run = (x - cityX);
									var distxy = "}Distance coords:(x,y): ("+  run +", "+ rise+")";

									var postion =title +" "+ NQuad +" "+ WQuad  +" "+ cityX +" "+ cityY  +" "+ distxy + " " + totdis;
									return (postion);
								}


							}
						},
//						************************************************************************************************************************************************************************************************************
//						End Just for fun
//						***********************************************************************************************************************************************************************************************************						
						Mod_And_Link_Type : function (city, building_ID, modType, linkType){//not 100% on if this idea would work, we may need a separate function to do the math, or do the math in the for loop.
							if(modType !== null ){
							//for(var modType in this.city.GetBuildingCache(building_ID).DetailViewInfo.OwnProdModifiers.d){
								var Prodution = city.GetBuildingCache(building_ID).DetailViewInfo.OwnProdModifiers.d[modType];
								
								
								return Production.TotalValue;
							}
							if(linkType !== null ){
							//for(var linkType in this.city.GetBuildingCache(building_ID).DetailViewInfo.OwnProdModifiers.d){
								var LinkType = city.GetBuildingCache(building_ID).DetailViewInfo.OwnProdModifiers.d[modType].ConnectedLinkTypes.d[linkType];
								return LinkType.Value;
							}

						},
						Mod_And_Link_Type : function (city, building_ID, modType, linkType){//not 100% on if this idea would work, we may need a separate function to do the math, or do the math in the for loop.
							//console.log( city, building_ID, modType, linkType );
							if(linkType != null ){
								var LinkType0 = city.GetBuildingCache(building_ID).DetailViewInfo.OwnProdModifiers.d[modType].ConnectedLinkTypes.d[linkType].Value;
								return (LinkType0);
							//console.log( LinkType0 );
							}else{
								var LinkType1 = city.GetBuildingCache(building_ID).DetailViewInfo.OwnProdModifiers.d[modType].TotalValue;
								return (LinkType1);
							//console.log( LinkType1 );
							}
							

						},
						Production_Math : function (city, building_ID, _atype){
							//refineries, power plants, and harvesters
								//console.log( city, building_ID, _atype);
								var btype = _atype;
								if(btype == ClientLib.Base.ETechName.Refinery){ 
										if(this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.CreditsProduction, null) != undefined ){
											var mods = this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.CreditsProduction, null);
										}else{
											var mods = 0;
										}
										if(this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.CreditsPackageSize, null) != undefined ){
											var pacMods = this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.CreditsPackageSize, null);
										}else{
											var pacMods = 0;
										}
										if(this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.CreditsBonusTimeToComplete, null) != undefined){
											var pacMods1 =this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.CreditsBonusTimeToComplete, null);
									    }else{
											var pacMods1 = 0;
										}
									   if(city.GetBuildingCache(building_ID).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CreditsProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.PowerplantCreditBonus] != undefined){ 
											var Ltype1 = this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.CreditsProduction, ClientLib.Base.ELinkType.PowerplantCreditBonus);
									   }else{
										var Ltype1 = 0;
										}
									   if( city.GetBuildingCache(building_ID).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CreditsProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.TiberiumCreditProduction] != undefined){
											var Ltype2 = this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.CreditsProduction, ClientLib.Base.ELinkType.TiberiumCreditProduction);
									   }else{
										var Ltype2 = 0;
										}
									   
									   
									   var proofLevel12 = (605 + (7260/6) + 484 + 605);
									   var	Total_Production =  (mods + (pacMods /(pacMods1/3600)) + Ltype1 + Ltype2) / proofLevel12;
								}
								
								if(btype == ClientLib.Base.ETechName.PowerPlant){ 
										if(this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.PowerProduction, null) != undefined ){
											var mods = this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.PowerProduction, null);
										}else{
											var mods = 0;
										}
										if(this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.PowerPackageSize, null) != undefined ){
											var pacMods = this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.PowerPackageSize, null);
										}else{
											var pacMods = 0;
										}
										if(this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.PowerBonusTimeToComplete, null) != undefined){
											var pacMods1 =this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.PowerBonusTimeToComplete, null);
									    }else{
											var pacMods1 = 0;
										}
									   if(city.GetBuildingCache(building_ID).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.AccumulatorPowerBonus] != undefined){ 
											var Ltype1 = this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.PowerProduction, ClientLib.Base.ELinkType.AccumulatorPowerBonus);
									   }else{
										var Ltype1 = 0;
										}
									   if( city.GetBuildingCache(building_ID).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.CrystalCreditProduction] != undefined){
											var Ltype2 = this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.PowerProduction, ClientLib.Base.ELinkType.CrystalCreditProduction);
									   }else{
										var Ltype2 = 0;
										}
									   if (city.GetBuildingCache(building_ID).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.RefineryPowerBonus] != undefined ){
											var Ltype3 = this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.PowerProduction, ClientLib.Base.ELinkType.RefineryPowerBonus);
									   }else{
										var Ltype3 = 0;
										}
									   
									   var proofLevel12 = (605+(7260/6)+570+456+484);
									   var	Total_Production =  (mods + (pacMods /(pacMods1/3600)) + Ltype1 + Ltype2 + Ltype3) / proofLevel12;
								}/*
								if(btype == "green_har"){ 
									var	Total_Production = (
									  
									   if(this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.TiberiumProduction, null) != undefined || this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.TiberiumPackageSize, null) != undefined || this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.TiberiumBonusTimeToComplete, null) != undefined){
											var mods = this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.TiberiumProduction, null);
											var pacMods = this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.TiberiumPackageSize, null);
											var pacMods1 =this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.TiberiumBonusTimeToComplete, null);
									    }else{
											var mods = 0;
											var pacMods = 0;
											var pacMods1 = 0;
										}
									   if(city.GetBuildingCache(building_ID).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.TiberiumProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.SiloTiberiumProduction] != undefined){ 
											var Ltype1 = this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.TiberiumProduction, ClientLib.Base.ELinkType.SiloTiberiumProduction);
									   }else{
										var Ltype1 = 0;
										}
									   var proofLevel12 = (570 + (7260/6) + 380);
									   var	Total_Production =  (mods + (pacMods /(pacMods1/3600)) + Ltype1 ) / proofLevel12;
								}
								if(btype == "blue_har"){ 
									
									   
									   if(this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.CrystalProduction, null) != undefined || this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.CrystalPackageSize, null) != undefined || this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.CrystalBonusTimeToComplete, null) != undefined){
											var mods = this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.CrystalProduction, null);
											var pacMods = this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.CrystalPackageSize, null);
											var pacMods1 =this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.CrystalBonusTimeToComplete, null);
									    }else{
											var mods = 0;
											var pacMods = 0;
											var pacMods1 = 0;
										}
									   if(city.GetBuildingCache(building_ID).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CrystalProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.SiloCrystalProduction] != undefined){ 
											var Ltype1 = this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.CrystalProduction, ClientLib.Base.ELinkType.SiloCrystalProduction);
									   }else{
										var Ltype1 = 0;
										}
									   
									   
									   
									   var proofLevel12 = (570 + (7260/6) + 380);
									   var	Total_Production =  (mods + (pacMods /(pacMods1/3600)) + Ltype1 ) / proofLevel12;
								}
							//silos  and accumulators
								if(btype == "sil"){
									if(city.GetBuildingCache(building_ID).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.CrystalProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.HarvesterCrystalProduction] != undefined){ 
											var Ltype1 = this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.CrystalProduction, ClientLib.Base.ELinkType.HarvesterCrystalProduction);
									   }else{
										var Ltype1 = 0;
										}
									   if( city.GetBuildingCache(building_ID).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.TiberiumProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.HarvesterTiberiumProduction] != undefined){
											var Ltype2 = this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.TiberiumProduction, ClientLib.Base.ELinkType.HarvesterTiberiumProduction);
									   }else{
										var Ltype2 = 0;
										}
									   
									   
									   var proofLevel12 = (380 + 380);
									   var	Total_Production =  (Ltype1 + Ltype2) / proofLevel12;
								}
								if(btype == "acc"){
									
									   if(city.GetBuildingCache(building_ID).DetailViewInfo.OwnProdModifiers.d[ClientLib.Base.EModifierType.PowerProduction].ConnectedLinkTypes.d[ClientLib.Base.ELinkType.PowerPlantAccumulatorBonus] != undefined){ 
											var Ltype1 = this.Mod_And_Link_Type(city, building_ID, ClientLib.Base.EModifierType.PowerProduction, ClientLib.Base.ELinkType.PowerPlantAccumulatorBonus);
									   }else{
										var Ltype1 = 0;
										}
									   var proofLevel12 = (456) ;
									   var	Total_Production =  (Ltype1) / proofLevel12;
									   
								}*/
								if(Total_Production != NaN){
							console.log("Total_Pro: "+Total_Production);
							return (Total_Production);
							}
						},


						/*
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                               The Defense Function
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
						 */
						DefenseautoUpgrade : function() {
							var _this = window.FlunikTools.Main.getInstance();
							var basenum = 0;
							for (var nCity in ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d)
							{basenum++;
							var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d[nCity];
							var buildings = city.get_Buildings();
							var baseName = city.m_SupportDedicatedBaseName;



							var baselvl = city.get_LvlBase();
							var blvlLow = baselvl + 3;



							var defarr = new Array();
							var defnum = 0;

							var units = city.get_CityUnitsData();


							var defenceUnits = units.get_DefenseUnits();
							for (var nUnit in defenceUnits.d ) 
							{defnum++
								var unit = defenceUnits.d[nUnit];
							//console.log(_this.PowerOrTibetUnitMaxHealth(unit.get_CurrentLevel(), unit.get_MdbUnitId (), false));
							var HQ = new Array ();
							for(var nBuildings in buildings.d){
								var building = buildings.d[nBuildings];
								var tech = building.get_TechName();
								if(tech == ClientLib.Base.ETechName.Defense_HQ){
									var HQlevel = building.get_CurrentLevel();
									HQ[0] = HQlevel;
								}
							}


							if(!_this.canUpgradeUnit(unit, city))continue;
							var unitlvlup1 = unit.get_CurrentLevel() + 1;
							var name  = unit.get_UnitGameData_Obj().dn;
							//console.log(HQ[0]);

							if(unit.get_CurrentLevel() > 3){
								var unitHealthperCost = _this.PowerOrTibetUnitMaxHealth(unit.get_CurrentLevel(), ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(unit.get_MdbUnitId()), false)/(ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(unitlvlup1, unit.get_UnitGameData_Obj())[1].Count);
							}
							if(unit.get_CurrentLevel() <= 3){
								var unitHealthperCost = Math.pow( (_this.PowerOrTibetUnitMaxHealth(unit.get_CurrentLevel(), ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(unit.get_MdbUnitId()), false)/(ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(unitlvlup1, unit.get_UnitGameData_Obj())[0].Count)), -1);
							}
							defarr[defnum] =  unitHealthperCost;
							defarr.sort(function(a,b){return b-a});
							//console.log(defarr[0], defarr[1]);

							if((defarr[0] >= defarr[1]) && ((unit.get_CurrentLevel() > 3)&&( unit.get_CurrentLevel() <= 4) ) && (defarr[1] != undefined)  ){

								//console.log(defarr[0], defarr[1]);
								defarr.shift();
							}
							if((defarr[0] >= defarr[1]) && (unit.get_CurrentLevel() > 4) && (defarr[1] != undefined)  ){
								defarr.sort(function(a,b){return a-b});
								//console.log(defarr[0], defarr[1]);
								defarr.shift();
							}

							if((defarr[0] >= defarr[1]) && (unit.get_CurrentLevel() <= 3) && (defarr[1] != undefined)){
								defarr.shift();
							}


							if(unitHealthperCost == defarr[0] ){
								var defunit_obj = {
										cityid: city.get_Id(),
										basename: city.m_SupportDedicatedBaseName,
										Ratio: unitHealthperCost,
										unitname: unit.get_UnitGameData_Obj().dn,
										level: unit.get_CurrentLevel(),
										type: "Defense",
										unitId: unit.get_Id()
								}
							}
							/*if(_this.PowerOrTibetUnitMaxHealth(unit.get_CurrentLevel(), ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(unit.get_MdbUnitId()), false).toString() !== "NaN"){
									console.log(_this.PowerOrTibetUnitMaxHealth(unit.get_CurrentLevel(), ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(unit.get_MdbUnitId()), false));
									}*/
							}
							if ( (defunit_obj != undefined)&&(defunit_obj.Ratio == defarr[0]) && (defunit_obj.level <= (HQ[0]-1) )) {
								//console.log(units);
								console.log(defunit_obj, defarr);
								ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UnitUpgrade", defunit_obj, null, null, true);
								defarr = [];
								HQ = [];
								break;
							}

							}

						},


						/*
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                             The Offense Function
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
						 */

						OffenseautoUpgrade : function() {
							var _this = window.FlunikTools.Main.getInstance();
							var basenum = 0;
							for (var nCity in ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d)
							{basenum++;
							var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d[nCity];
							var buildings = city.get_Buildings();
							var baseName = city.m_SupportDedicatedBaseName;



							var baselvl = city.get_LvlBase();
							var blvlLow = baselvl + 3;



							var offarr = new Array();
							var offnum = 0;

							var units = city.get_CityUnitsData();


							var offenceUnits = units.get_OffenseUnits();
							for (var nUnit in offenceUnits.d) 
							{offnum++
								var unit = offenceUnits.d[nUnit];

							if(!_this.canUpgradeUnit(unit, city))continue;
							var unitlvlup1 = unit.get_CurrentLevel() + 1;
							var name  = unit.get_UnitGameData_Obj().dn;
							if(unit.get_CurrentLevel() > 2){
								var unitHealthperCost = _this.PowerOrTibetUnitMaxHealth(unit.get_CurrentLevel(), ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(unit.get_MdbUnitId()), false)/(ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(unitlvlup1, unit.get_UnitGameData_Obj())[1].Count);
							}
							if(unit.get_CurrentLevel() <= 2){
								var unitHealthperCost = Math.pow( (_this.PowerOrTibetUnitMaxHealth(unit.get_CurrentLevel(), ClientLib.Res.ResMain.GetInstance().GetUnit_Obj(unit.get_MdbUnitId()), false)/(ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(unitlvlup1, unit.get_UnitGameData_Obj())[0].Count)), -1);
							}
							offarr[offnum] =  unitHealthperCost;
							//What this does is sort the array from highest to lowest, then it dumps the first ratio with the .shift(), and upgrades the next best thing. 

							offarr.sort(function(a,b){return b-a});
							//console.log(offarr[0], offarr[1]);

							if(offarr[0] >= offarr[1] && ((unit.get_CurrentLevel() > 2)&&( unit.get_CurrentLevel() <= 3) ) && (offarr[1] != undefined)  ){

								offarr.shift();

							}
							if(offarr[0] >= offarr[1] &&( unit.get_CurrentLevel() > 3)  && (offarr[1] != undefined)  ){
								offarr.sort(function(a,b){return a-b});
								offarr.shift();

							}
							if(offarr[0] >= offarr[1] &&( unit.get_CurrentLevel() <= 2)  && (offarr[1] != undefined)  ){

								offarr.shift();

							}
							if(unitHealthperCost == offarr[0]){
								var offunit_obj = {
										cityid: city.get_Id(),
										basename: city.m_SupportDedicatedBaseName,
										unitname: unit.get_UnitGameData_Obj().dn,
										Ratio: unitHealthperCost,
										level: unit.get_CurrentLevel(),
										type: "Offense",
										unitId: unit.get_Id()
								}
							}







							}

							//console.log(offarr[1].toString());

							if ( (offunit_obj != undefined)&&(offunit_obj.Ratio == offarr[0]) && (offunit_obj.level <= (city.get_CommandCenterLevel() - 1)) ) {
								//console.log(units);

								console.log(offunit_obj, offarr);
								ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UnitUpgrade", offunit_obj, null, null, true);
								offarr = [];
								break;
							}

							}

						},


						/*The Building Function*/BuildingautoUpgrade : function() {
							var _this = window.FlunikTools.Main.getInstance();
							var basenum = 0;
							for (var nCity in ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d)
							{basenum++;
							var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d[nCity];
							var buildings = city.get_Buildings();
							var baseName = city.m_SupportDedicatedBaseName;
							//console.log(baseName,  _this.ResOnly, _this.y, _this.z);
							var airRT = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
							var vehRT = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
							var infRT = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
							var totalRT = _this.totalRepairTime(airRT, vehRT, infRT);
							// var maxRT = math.Max(airRT, vehRT, infRT)

							var baselvl = city.get_LvlBase();
							var blvlLow = baselvl + 3;
							var defLvl = city.get_LvlDefense();
							var offLvl = city.get_LvlOffense();
							//var offensehealth = city.get_CityUnitsData().GetTotalOffenseUnitHealth();
							//console.log(totalRT, infRT);
							var cryMax = city.GetResourceMaxStorage(ClientLib.Base.EResourceType.Crystal);
							var tibMax = city.GetResourceMaxStorage(ClientLib.Base.EResourceType.Tiberium);
							var powMax = city.GetResourceMaxStorage(ClientLib.Base.EResourceType.Power);
							var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();
							var tiberiumAlly = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Tiberium);
							var tiberiumCont = city.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Tiberium, false, false);
							var tiberiumPac = city.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Tiberium);
							var tibContGain = (tiberiumCont +tiberiumAlly + 1 ) /(tiberiumPac + 1);
							var tibPacGain = (tiberiumPac + 1) /(tiberiumCont +tiberiumAlly + 1 );
							//console.log(baseName + " tibContGain " +  tibContGain + " tibPacGain " +  tibPacGain + " tibContGain * _this.y " +  tibContGain * _this.y +" tibPacGain * _this.y " + tibPacGain * _this.y );
							var powerAlly = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Power);
							var powerCont = city.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Power, false, false);
							var powerPac = city.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Power);
							var powContGain = (powerCont + powerAlly + 1) /(powerPac + 1);
							var powPacGain = (powerPac + 1) /(powerCont + powerAlly + 1);
							//console.log(baseName + " powContGain " +  powContGain + " powPacGain " +  powPacGain +" powContGain * _this.z "+ powContGain * _this.z +" powPacGain * _this.z "+ powPacGain * _this.z);
							var crystalAlly = alliance.GetPOIBonusFromResourceType(ClientLib.Base.EResourceType.Crystal);
							var crystalCont = city.GetResourceGrowPerHour(ClientLib.Base.EResourceType.Crystal, false, false);
							var crystalPac = city.GetResourceBonusGrowPerHour(ClientLib.Base.EResourceType.Crystal);
							var cryContGain = (crystalCont + crystalAlly + 1) /(crystalPac + 1);
							var cryPacGain = (crystalPac + 1) /(crystalCont + crystalAlly + 1);
							//console.log(baseName + " cryContGain " +  cryContGain + " cryPacGain " +  cryPacGain + " cryContGain * _this.y " +  cryContGain * _this.y +" cryPacGain * _this.y " + cryPacGain * _this.y );
							var creditCont = ClientLib.Base.Resource.GetResourceGrowPerHour(city.get_CityCreditsProduction(), false);
							var creditPac = ClientLib.Base.Resource.GetResourceBonusGrowPerHour(city.get_CityCreditsProduction(), false);

							var creditPacGain = (creditPac+1)/(creditCont+1);
							var creditContGain = (creditCont+1)/(creditPac+1);
							//console.log(baseName + " creditContGain " +  creditContGain + " creditPacGain " +  creditPacGain +" creditContGain * _this.z "+ creditContGain * _this.z +" creditPacGain * _this.z "+ creditPacGain * _this.z);
							//console.log(baseName, airRT, vehRT, infRT, totalRT);

							var refarr = new Array();
							var refnum = 0;
							var powarr = new Array();
							var pownum = 0;
							var hararr = new Array();
							var hararr1 = new Array();
							var harnum = 0;
							var harnum1 = 0;
							var accarr = new Array();
							var accnum = 0;
							var silarr = new Array();
							var silnum = 0;
							var maxarr = [];

							for (var nBuildings in buildings.d) {

								var building = buildings.d[nBuildings];
								if(!_this.canUpgradeBuilding(building, city))continue;
								var name = building.get_UnitGameData_Obj().dn;
								var buildinglvlup1 = building.get_CurrentLevel() + 1;
								var building_ID = building.get_Id();
								var tech = building.get_TechName();

								//var buildTibCost = ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[0].Count;
								//var buildPowCost = ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[1].Count;
								//if (name == "Silo" || name == "Accumulator" || name == "Command Center" || name == "Defence HQ" ) {
									/*						  
									 **************************************************************************************************************************************************************************************************************************************************************************************************************************************
Upgrade RT CC CY DHQ DFac and low level resource building Defining
									 **************************************************************************************************************************************************************************************************************************************************************************************************************************************							  
									 */                             



								//	/*	 
								if(	(tech == ClientLib.Base.ETechName.Factory)	&& ((totalRT == vehRT) && (_this.ResOnly == 0))){
									var offRT = building;
									var offRT_obj = {
											cityid: city.get_Id(),
											buildingid: building.get_Id(),
											basename: city.m_SupportDedicatedBaseName,
											building: building.get_UnitGameData_Obj().dn,
											buildTibCost: ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[0].Count,
											buildPowCost: ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[1].Count,
											specal: vehRT,
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
									};


								}

								if(	(tech == ClientLib.Base.ETechName.Barracks) &&	((totalRT == infRT)&& (_this.ResOnly == 0))){
									var offRT = building;
									var offRT_obj = {
											cityid: city.get_Id(),
											buildingid: building.get_Id(),
											basename: city.m_SupportDedicatedBaseName,
											building: building.get_UnitGameData_Obj().dn,
											buildTibCost: ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[0].Count,
											buildPowCost: ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[1].Count,
											specal:  infRT,
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
									};

								}

								if(	(tech == ClientLib.Base.ETechName.Airport) && ((totalRT == airRT)&& (_this.ResOnly == 0)))	{
									var offRT = building;
									var offRT_obj = {
											cityid: city.get_Id(),
											buildingid: building.get_Id(),
											basename: city.m_SupportDedicatedBaseName,
											building: building.get_UnitGameData_Obj().dn,
											buildTibCost: ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[0].Count,
											buildPowCost: ClientLib.Base.Util.GetUnitLevelResourceRequirements_Obj(buildinglvlup1, building.get_UnitGameData_Obj())[1].Count,
											specal:  airRT,
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
									};

								}
								//    */
								//      /*

								if (	(tech == ClientLib.Base.ETechName.Construction_Yard ) && ((building.get_CurrentLevel() < baselvl) && (totalRT < 14400)&& (_this.ResOnly == 0))	){
									var cbuilding = building;
									//console.log(name);
									var building_obj = {
											cityid: city.get_Id(),
											buildingid: building.get_Id(),
											basename: city.m_SupportDedicatedBaseName,
											buildinglevel: building.get_CurrentLevel(),
											building: building.get_UnitGameData_Obj().dn,
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
									};

								}

								if (	(tech ==ClientLib.Base.ETechName.Command_Center ) && ((building.get_CurrentLevel() <= offLvl) && (totalRT < 14400)&& (_this.ResOnly == 0))	){
									var cbuilding = building;
									//console.log(name);
									var building_obj = {
											cityid: city.get_Id(),
											buildingid: building.get_Id(),
											basename: city.m_SupportDedicatedBaseName,
											buildinglevel: building.get_CurrentLevel(),
											building: building.get_UnitGameData_Obj().dn,
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
									};

								}

								if (	(tech ==ClientLib.Base.ETechName.Defense_HQ ) && ((building.get_CurrentLevel() <= defLvl) && (totalRT < 14400)&& (_this.ResOnly == 0))	){
									var cbuilding = building;
									//console.log(name);
									var building_obj = {
											cityid: city.get_Id(),
											buildingid: building.get_Id(),
											basename: city.m_SupportDedicatedBaseName,
											buildinglevel: building.get_CurrentLevel(),
											building: building.get_UnitGameData_Obj().dn,
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
									};

								}

								if (	(tech == ClientLib.Base.ETechName.Defense_Facility) &&  ((building.get_CurrentLevel() <= defLvl + 3) && (totalRT < 14400)&& (_this.ResOnly == 0))	){
									var cbuilding = building;
									//console.log(name);
									var building_obj = {
											cityid: city.get_Id(),
											buildingid: building.get_Id(),
											basename: city.m_SupportDedicatedBaseName,
											buildinglevel: building.get_CurrentLevel(),
											building: building.get_UnitGameData_Obj().dn,
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
									};

								}

								//	*/ 
								//	/*
								if (((tech ==ClientLib.Base.ETechName.Support_Air)||(tech == ClientLib.Base.ETechName.Support_Ion)||(tech == ClientLib.Base.ETechName.Support_Art)) && (( totalRT < 14400) &&  (building.get_CurrentLevel() <= defLvl + 3)&& (_this.ResOnly == 0))	){
									var support = building;
									var support_obj = {
											cityid: city.get_Id(),
											buildingid: building.get_Id(),
											basename: city.m_SupportDedicatedBaseName,
											building: building.get_UnitGameData_Obj().dn,
											buildinglevel: building.get_CurrentLevel(),
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
									};


								} 
								//	 */

								if (
										(
												(tech == ClientLib.Base.ETechName.Harvester && building.get_CurrentLevel() <= 2) || 
												(tech == ClientLib.Base.ETechName.Refinery && building.get_CurrentLevel() <= 2) ||
												(tech == ClientLib.Base.ETechName.PowerPlant && building.get_CurrentLevel() <= 2) ||
												( (tech == ClientLib.Base.ETechName.Accumulator && building.get_CurrentLevel() <= 2)) ||
												((tech == ClientLib.Base.ETechName.Silo && building.get_CurrentLevel() <= 2) )
										)




								){
									var lowres = building;
									var LowResbuilding_obj = {
											cityid: city.get_Id(),
											buildingid: building.get_Id(),
											type: "LowResbuilding",
											basename: city.m_SupportDedicatedBaseName,
											building: building.get_UnitGameData_Obj().dn,
											buildinglevel: building.get_CurrentLevel(),
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
									};
									//ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", building_obj, null, null, true);

								}
								/*if (name == "Refinery"  || name == "Power Plant" || name == "Harvester" || name == "Accumulator" || name == "Silo") {
									//if (name == "Silo") {
										var building_obj = {
											cityid: city.get_Id(),
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
										}*/

								/*						  
								 **************************************************************************************************************************************************************************************************************************************************************************************************************************************
Upgrade Resource Defining 
								 **************************************************************************************************************************************************************************************************************************************************************************************************************************************							  
								 */                                        

								if ((tech == ClientLib.Base.ETechName.Refinery    &&  building.get_CurrentLevel() > 2) && (_this.r == 1)){
									var ref = building;
									var a = "ref";
									refnum++;
									var refProRatio = this.Production_Math(building_ID, a);
									refarr[refnum] = refProRatio;
									
									if ((refProRatio > 0) ){
										refarr.sort(function(a,b){return b-a});


									}
									if((Math.max(refProRatio) == refarr[0])){
										var Ref_obj = {
												cityid: city.get_Id(),
												basename: city.m_SupportDedicatedBaseName,
												building: building.get_UnitGameData_Obj().dn,
												buildinglevel: building.get_CurrentLevel(),
												posX: building.get_CoordX(),
												posY: building.get_CoordY(),
												isPaid: true
										}
										//ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Ref_obj, null, null, true);

									}

								}
								if ((tech == ClientLib.Base.ETechName.PowerPlant) && (building.get_CurrentLevel() > 2) &&(_this.p == 1)){
									var pow = building;
									var a = "p_p";
									pownum++;
									
									var powProRatio = this.Production_Math(building_ID, a);
									powarr[pownum] = powProRatio;

									if ((powProRatio > 0) ){
										powarr.sort(function(a,b){return b-a});


									}
									if((Math.max(powProRatio) == powarr[0])){
										var Pow_obj = {
												cityid: city.get_Id(),
												basename: city.m_SupportDedicatedBaseName,
												building: building.get_UnitGameData_Obj().dn,
												buildinglevel: building.get_CurrentLevel(),
												posX: building.get_CoordX(),
												posY: building.get_CoordY(),
												isPaid: true
										}
										//ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Pow_obj, null, null, true);

									}

								}
								if ((tech == ClientLib.Base.ETechName.Harvester   &&  building.get_CurrentLevel() > 2) && (_this.h == 1)){
									var harv = building;
									harnum++;   harnum1++;
									if((city.GetBuildingCache(bulid).DetailViewInfo.OwnProdModifiers.d[1,25,33])
									){var a = "green_har";
										var harTibProRatio = this.Production_Math(building_ID, a);
										hararr[harnum] = harTibProRatio;


										if ((harTibProRatio > 0) ){/* Math.floor((Math.random()*10)+1)){*/
					// console.log(((harTibTotalProOfLevel12/72000)*100)/((harTibTotalPro/refCost)*100) );
											hararr.sort(function(a,b){return b-a});
										}



										if((Math.max(harTibProRatio) == hararr[0])){
											var Har_obj = {
													cityid: city.get_Id(),
													basename: city.m_SupportDedicatedBaseName,
													building: building.get_UnitGameData_Obj().dn,
													buildinglevel: building.get_CurrentLevel(),
													type: "Tiberium",
													posX: building.get_CoordX(),
													posY: building.get_CoordY(),
													isPaid: true
											}
											//ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Har_obj, null, null, true);

										}
									}
									if((city.GetBuildingCache(building_ID).DetailViewInfo.OwnProdModifiers.d[4,26,34])){
										var a = "blue_har";
										var harCryProRatio = this.Production_Math(building_ID, a);


										hararr1[harnum1] = harCryProRatio;

										if ( harCryProRatio > 0 ){// Math.floor((Math.random()*10)+1)){
					//console.log(((harCryTotalProOfLevel12/96000)*100)/((harCryTotalPro/harCryCost)*100) );

											hararr1.sort(function(a,b){return b-a});


										}
										if((Math.max(harCryProRatio) == hararr1[0])){
											var Har1_obj = {
													cityid: city.get_Id(),
													basename: city.m_SupportDedicatedBaseName,
													building: building.get_UnitGameData_Obj().dn,
													buildinglevel: building.get_CurrentLevel(),
													type: "Crystal",
													posX: building.get_CoordX(),
													posY: building.get_CoordY(),
													isPaid: true
											}
											//ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Har1_obj, null, null, true);

										}

									}

								}
								if((tech == ClientLib.Base.ETechName.Accumulator) && (building.get_CurrentLevel() > 2) && (_this.a == 1)){
									var acc = building;
									var a = "acc";
									
									accnum++;
									
									var accProRatio = this.Production_Math(building_ID, a);
									accarr[accnum] = accProRatio;

									if ((accProRatio > 0) ){/* Math.floor((Math.random()*10)+1)){*/
					//console.log(((accTotalProOfLevel12/36360)*100)/((accTotalPro/accCost)*100) );
										accarr.sort(function(a,b){return b-a});


									}
									if((Math.max(accProRatio) == accarr[0])){
										var Acc_obj = {
												cityid: city.get_Id(),
												basename: city.m_SupportDedicatedBaseName,
												building: building.get_UnitGameData_Obj().dn,
												buildinglevel: building.get_CurrentLevel(),
												posX: building.get_CoordX(),
												posY: building.get_CoordY(),
												isPaid: true
										}
										//ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Acc_obj, null, null, true);

									} 
								}
								if((tech == ClientLib.Base.ETechName.Silo)        && (building.get_CurrentLevel() > 2)  && (_this.s == 1) ){
									var silo = building;
									var a = "sil";
									silnum++;
									 
									var silProRatio = this.Production_Math(building_ID, a);


									silarr[silnum] = silProRatio;

									if ((silProRatio >= 0) ){// Math.floor((Math.random()*10)+1)){
					//console.log(((accTotalProOfLevel12/36360)*100)/((accTotalPro/accCost)*100) );
										silarr.sort(function(a,b){return b-a});


									}
									if((Math.max(silProRatio) == silarr[0])){
										var Sil_obj = {
												cityid: city.get_Id(),
												basename: city.m_SupportDedicatedBaseName,
												building: building.get_UnitGameData_Obj().dn,
												buildinglevel: building.get_CurrentLevel(),
												posX: building.get_CoordX(),
												posY: building.get_CoordY(),
												isPaid: true
										}
										//ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Sil_obj, null, null, true);

									}
									//silCryLinkType = 0;
									//silTibLinkType = 0;
									//silTotalPro = 0;
								}
								//if((Ref_obj.toString() != "undefined" || Pow_obj.toString() != "undefined" || Har_obj.toString() != "undefined" || Har1_obj.toString() != "undefined" || Acc_obj.toString() != "undefined" || Sil_obj.toString() != "undefined")&&
								// (refarr.toString() != "[]" || powarr.toString() != "[]" || hararr.toString() != "[]" || hararr1.toString() != "[]" || accarr.toString() != "[]" || silarr.toString() != "[]")){


								// }   
								//}


							}

							/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
					 if( (Ref_obj != undefined) || (Pow_obj != undefined) || (Har_obj != undefined) || (Har1_obj != undefined) || (Acc_obj != undefined) || (Sil_obj != undefined)){
                       console.log(Ref_obj, refarr);console.log(Pow_obj, powarr);console.log(Har_obj, hararr); console.log(Har1_obj, hararr1);console.log(Acc_obj, accarr);console.log(Sil_obj, silarr);

                             ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Sil_obj, null, null, true);
                              ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Acc_obj, null, null, true);
                             ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Har1_obj, null, null, true);
                             ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Har_obj, null, null, true);
                             ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Pow_obj, null, null, true);
                              ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Ref_obj, null, null, true);
							  }
						/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	  
							 */
							/*						  
							 **************************************************************************************************************************************************************************************************************************************************************************************************************************************
Upgrade decisions
							 **************************************************************************************************************************************************************************************************************************************************************************************************************************************							  
							 */						  // console.log(baseName,refnum,pownum);
							maxarr = [refarr[0], powarr[0], hararr[0], hararr1[0], accarr[0], silarr[0]];
							maxarr.sort(function(a,b){return b-a});
							//	  /* 
							if((offRT_obj != undefined)&& (_this.ResOnly == 0)){

								console.log(offRT_obj, _this.ResOnly);
								ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", offRT_obj, null, null, true);
								offRT_obj = {};
								break;
							}

							//	  */
							//	  /* 	  
							if((building_obj != undefined) && (_this.ResOnly == 0) ){

								console.log(building_obj, _this.ResOnly);
								ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", building_obj, null, null, true);
								building_obj = {};
								break;


							}
							//	  */ 

							if((LowResbuilding_obj != undefined)){
								console.log(LowResbuilding_obj, _this.ResOnly );
								ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", LowResbuilding_obj, null, null, true);
								LowResbuilding_obj = {};
								break;
							}
							//	  /*
							if((support_obj != undefined)&& (_this.ResOnly == 0)){

								console.log(support_obj, _this.ResOnly);
								ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", support_obj, null, null, true);
								support_obj = {};

								break;



							}
							//	  */

							if( (Ref_obj != undefined) && (refarr.toString() != "") && (maxarr[0] == refarr[0]) && (((totalRT < 14400) && (_this.ResOnly == 0))||(_this.ResOnly == 1))){/*(totalRT < 14400)||( building.get_CurrentLevel() > 2)*/
								console.log(Ref_obj, refarr, _this.ResOnly);
								ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Ref_obj, null, null, true);
								Ref_obj = {};
								refarr = [];
								maxarr = [];
								break; }

							if(  (Pow_obj != undefined)&& (powarr.toString() != "") && (maxarr[0] == powarr[0]) && (((totalRT < 14400) && (_this.ResOnly == 0))||(_this.ResOnly == 1))){/*(totalRT < 14400)||*/
								console.log(Pow_obj, powarr, _this.ResOnly);
								ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Pow_obj, null, null, true);
								Pow_obj = {};
								powarr = [];
								maxarr = [];
								break;
							}

							if( (Har_obj != undefined)&& (hararr.toString()!= "") && (maxarr[0] == hararr[0]) && (((totalRT < 14400) && (_this.ResOnly == 0))||(_this.ResOnly == 1))){/*(totalRT < 14400)||*/
								console.log(Har_obj, hararr, _this.ResOnly);
								ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Har_obj, null, null, true);
								Har_obj = {};
								hararr = [];
								maxarr = [];
								break;
							}

							if( (Har1_obj != undefined)&& (hararr1.toString() != "") && (maxarr[0] == hararr1[0]) && (((totalRT < 14400) && (_this.ResOnly == 0))||(_this.ResOnly == 1))){/*(totalRT < 14400)||*/
								console.log(Har1_obj, hararr1, _this.ResOnly);
								ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Har1_obj, null, null, true);
								Har1_obj = {};
								hararr1 = [];
								maxarr = [];
								break;
							}

							if( (Acc_obj != undefined)&& (accarr.toString() != "") && (maxarr[0] == accarr[0]) && (((totalRT < 14400) && (_this.ResOnly == 0))||(_this.ResOnly == 1))){/*(totalRT < 14400)||*/
								console.log(Acc_obj, accarr, _this.ResOnly);
								ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Acc_obj, null, null, true);
								Acc_obj = {};
								accarr = [];
								maxarr = [];
								break;
							}

							if((Sil_obj != undefined)&& (silarr.toString() != "") && (maxarr[0] == silarr[0]) && (((totalRT < 14400) && (_this.ResOnly == 0))||(_this.ResOnly == 1))){/*(totalRT < 14400)||*/
								console.log(Sil_obj, silarr, _this.ResOnly);
								ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Sil_obj, null, null, true);
								Sil_obj = {};
								silarr = [];
								maxarr = [];
								break;
							}
							/*						  
							 **************************************************************************************************************************************************************************************************************************************************************************************************************************************
Upgrade decisions end
							 **************************************************************************************************************************************************************************************************************************************************************************************************************************************							  
							 */								

							}

						}


					}
				});
			}
		} catch (e) {
			console.log("createFlunikTools: ", e);
		}

		function FlunikTools_checkIfLoaded() {
			try {
				if (typeof qx != 'undefined' && qx.core.Init.getApplication() && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION) && qx.core.Init.getApplication().getUIItem(ClientLib.Data.Missions.PATH.BAR_NAVIGATION).isVisible()) {
					createFlunikTools();
					if (typeof ClientLib.API.Util.GetUnitMaxHealth == 'undefined'){
						for (var key in ClientLib.Base.Util)
						{
							var strFunction = ClientLib.Base.Util[key].toString();
							if ((strFunction.indexOf("function (a,b,c)") == 0 || strFunction.indexOf("function (a,b)") == 0) &&
									strFunction.indexOf("*=1.1") > -1)
							{
								FlunikTools.Main.getInstance().GetUnitMaxHealth = ClientLib.Base.Util[key];
								console.log("FlunikTools.Main.getInstance().GetUnitMaxHealth = ClientLib.Base.Util["+key+"]");
								break;
							}
						}
					}else{
						FlunikTools.Main.getInstance().GetUnitMaxHealth = ClientLib.API.Util.GetUnitMaxHealth;	



					}
					// ClientLib.Data.CityUnits.prototype.get_OffenseUnits
					strFunction = ClientLib.Data.CityUnits.prototype.HasUnitMdbId.toString();
					var searchString = "for (var b in {d:this.";
					var startPos = strFunction.indexOf(searchString) + searchString.length;
					var fn_name = strFunction.slice(startPos, startPos + 6);
					strFunction = "var $createHelper;return this." + fn_name + ";";
					var fn = Function('', strFunction);
					ClientLib.Data.CityUnits.prototype.get_OffenseUnits = fn;
					console.log("ClientLib.Data.CityUnits.prototype.get_OffenseUnits = function(){var $createHelper;return this." + fn_name + ";}");

					// ClientLib.Data.CityUnits.prototype.get_DefenseUnits
					strFunction = ClientLib.Data.CityUnits.prototype.HasUnitMdbId.toString();
					searchString = "for (var c in {d:this.";
					startPos = strFunction.indexOf(searchString) + searchString.length;
					fn_name = strFunction.slice(startPos, startPos + 6);
					strFunction = "var $createHelper;return this." + fn_name + ";";
					fn = Function('', strFunction);
					ClientLib.Data.CityUnits.prototype.get_DefenseUnits = fn;
					console.log("ClientLib.Data.CityUnits.prototype.get_DefenseUnits = function(){var $createHelper;return this." + fn_name + ";}");


					FlunikTools.Main.getInstance();
					window.FlunikTools.Main.getInstance().initialize();
				} else {
					window.setTimeout(FlunikTools_checkIfLoaded, 1000);
				}
			} catch (e) {
				console.log("FlunikTools_checkIfLoaded: ", e);
			}
		}
		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(FlunikTools_checkIfLoaded, 1000);
		}
	}

	try
	{
		var FlunikScript = document.createElement("script");
		FlunikScript.innerHTML = "(" + FlunikTools_main.toString() + ")();";
		FlunikScript.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(FlunikScript);
		}
	} catch (e) {
		console.log("FlunikTools: init error: ", e);
	}
})();