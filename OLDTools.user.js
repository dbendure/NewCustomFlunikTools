// ==UserScript==
// @name        Flunik Tools
// @namespace   FlunikTools
// @description Mirror Army, Auto Level
// @version     0.5.0
// @author      Flunik
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// ==/UserScript==

(function (){
	var FlunikTools_main =  function() {
		try {
			function CCTAWrapperIsInstalled() {
				return (typeof (CCTAWrapper_IsInstalled) != 'undefined' && CCTAWrapper_IsInstalled);
			}
			
			function createFlunikTools() {
				console.log('FLUNIKTOLS createFlunikTools');
				
				qx.Class.define("FlunikTools.Main", {
					type: "singleton",
					extend: qx.core.Object,
					members: {
						AutoUpdateButton : null,
						MirrorArmyButton : null,
						UpgradeOffenceButton : null,
						autoUpdateHandle : null,

						
						initialize: function() {
						
							console.log('FLUNIKTOLS initialize');
							AutoUpdateButton = new qx.ui.form.Button("Toggle Autoupdate", null).set({
								toolTipText: "Autoupdate",
								width: 100,
								height: 40,
								maxWidth: 100,
								maxHeight: 40,
								appearance: ("button-playarea-mode-frame"), //"button-standard-"+factionText), button-playarea-mode-red-frame
								center: true
							});
							
							MirrorArmyButton = new qx.ui.form.Button("Mirror Army", null).set({
								toolTipText: "Mirror Army",
								width: 100,
								height: 40,
								maxWidth: 100,
								maxHeight: 40,
								appearance: ("button-playarea-mode-frame"), //"button-standard-"+factionText), button-playarea-mode-red-frame
								center: true
							});

							UpgradeOffenceButton = new qx.ui.form.Button("Upgrade Army", null).set({
								toolTipText: "Upgrade Army",
								width: 100,
								height: 40,
								maxWidth: 100,
								maxHeight: 40,
								appearance: ("button-playarea-mode-frame"), //"button-standard-"+factionText), button-playarea-mode-red-frame
								center: true
							});
							
							AutoUpdateButton.addListener("click", function(e) {
								if (window.FlunikTools.Main.getInstance().autoUpdateHandle != null) {
									window.FlunikTools.Main.getInstance().stopAutoUpdate();
								} else {
									window.FlunikTools.Main.getInstance().startAutoUpdate();
								}
							}, this);
						
							MirrorArmyButton.addListener("click", function(e) {
								window.FlunikTools.Main.getInstance().mirrorArmy();
							}, this);
						
							UpgradeOffenceButton.addListener("click", function(e) {
								window.FlunikTools.Main.getInstance().upgradeAllOffenceCurrentCity();
							}, this);
						
						
							var app = qx.core.Init.getApplication();

							app.getDesktop().add(AutoUpdateButton, {
								right: 120,
								bottom: 100
							});					
							app.getDesktop().add(MirrorArmyButton, {
								right: 120,
								bottom: 60
							});					
							app.getDesktop().add(UpgradeOffenceButton, {
								right: 120,
								bottom: 140
							});			
						},
						
						upgradeAllOffenceCurrentCity : function() {
							var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();
							var units = city.get_CityUnitsData();
							var offenceUnits = units.get_OffenseUnits();
							for (var nUnit in offenceUnits.d) 
							{
								var unit = offenceUnits.d[nUnit];
								var unit_obj = {
									cityid: city.get_Id(),
									unitId: unit.get_Id()
								}
								  
								ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UnitUpgrade", unit_obj, null, null, true);
								console.log(unit);
							}
						},
						
						upgradeAllOffenceCurrentCityMax : function() {
							for (var i = 0; i<40; i++)
							this.upgradeAllOffenceCurrentCity();
						},
						
						mirrorArmy : function() {
							var army = window.TASuite.main.getInstance().J.V;
					
							for (var i = 0; i < army.length; i++) {
								var unit = army[i];
								unit.MoveBattleUnit(8 - unit.get_CoordX(), unit.get_CoordY())
							}
						},
						
						startAutoUpdate : function() {
							this.autoUpgrade();
							this.autoUpdateHandle = window.setInterval(function() { autoUpgrade() } , 60000);
						},
						stopAutoUpdate : function() {
							window.clearInterval(this.autoUpdateHandle);
							this.autoUpdateHandle = null;
						},


						autoUpgrade : function() {
							for (var nCity in ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d)
							{
								var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d[nCity];
								var buildings = city.get_CityBuildingsData().get_Buildings();

								for (var nBuildings in buildings.d) {
									var building = buildings.d[nBuildings];
									var name = building.get_UnitGameData_Obj().dn;
									//if (name == "Silo" || name == "Accumulator" || name == "Command Center" || name == "Defence HQ" ) {
									if (name == "Silo" || name == "Command Center" || name == "Defence HQ" ) {
									//if (name == "Silo") {
										var building_obj = {
											cityid: city.get_Id(),
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
										}

										if (Math.random() > 0.90) {
											console.log(building);
											ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", building_obj, null, null, true);
										}
									}
								}
							  
								var units = city.get_CityUnitsData();
								var offenceUnits = units.get_OffenseUnits();
								for (var nUnit in offenceUnits.d) 
								{
									var unit = offenceUnits.d[nUnit];
									var unit_obj = {
										cityid: city.get_Id(),
										unitId: unit.get_Id()
									}
								  
									if (Math.random() > 0.95) {
										ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UnitUpgrade", unit_obj, null, null, true);
										console.log(unit);
									}
								}

								var defenceUnits = units.get_DefenseUnits();
								for (var nUnit in defenceUnits.d) 
								{
									var unit = defenceUnits.d[nUnit];
									var unit_obj = {
										cityid: city.get_Id(),
										unitId: unit.get_Id()
									}
								  
									if (Math.random() > 0.95) {
										ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UnitUpgrade", unit_obj, null, null, true);
										console.log(unit);
									}
								}
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
