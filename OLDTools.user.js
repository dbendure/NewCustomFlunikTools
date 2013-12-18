// ==UserScript==
// @name        Flunik Tools
// @namespace   FlunikTools
// @description Just buildings so far.
// @version     0.5.0
// @author      Flunik
// @include     http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// ==/UserScript==


(function (){
        var FlunikTools_main =  function() {
                try {
                        /*function CCTAWrapperIsInstalled() {
                                return (typeof (CCTAWrapper_IsInstalled) != 'undefined' && CCTAWrapper_IsInstalled);
                        }*/
                        
                        function createFlunikTools() {
                                console.log('FLUNIKTOLS createFlunikTools');
                                
                                qx.Class.define("FlunikTools.Main", {
                                        type: "singleton",
                                        extend: qx.core.Object,
                                        members: {
                                                AutoUpdateButton : null,
                                                
                                                
                                                autoUpdateHandle : null,


                                                
                                                initialize: function() {
                                                
                                                        console.log('FLUNIKTOLS initialize');
                                                        AutoUpdateButton = new qx.ui.form.Button("Db.Aup", null).set({
                                                                toolTipText: "Autoupdate",
                                                                width: 100,
                                                                height: 40,
                                                                maxWidth: 100,
                                                                maxHeight: 40,
                                                                appearance: ("button-text-small"), //"button-standard-"+factionText), button-playarea-mode-red-frame
                                                                center: true
                                                        });
                                                        
                                                        
                                                        
                                                        AutoUpdateButton.addListener("click", function(e) {
                                                                if (window.FlunikTools.Main.getInstance().autoUpdateHandle != null) {
                                                                       
                                                                        window.FlunikTools.Main.getInstance().stopAutoUpdate();
                                                                         AutoUpdateButton.setLabel("B.OFF");
                                                                } else {
                                                                        
                                                                        window.FlunikTools.Main.getInstance().startAutoUpdate();
                                                                        AutoUpdateButton.setLabel("B.ON");
                                                                }
                                                        }, this);
                                                
                                                        
                                                
                                                
                                                        var app = qx.core.Init.getApplication();


                                                        app.getDesktop().add(AutoUpdateButton, {
                                                                right: 120,
                                                                bottom: 100
                                                        });                                        
                                                                        
                                                },
                                                
                                                
                                                
                                                
                                                
                                                startAutoUpdate : function() {
                                                        //var _this = window.FlunikTools.Main.getInstance();
                                                        //this.autoUpgrade();
                                                        this.autoUpdateHandle = window.setInterval(this.BuildingautoUpgrade, 5000);
                                                },
                                                stopAutoUpdate : function() {
													var a = 0;
                                                        window.clearInterval(this.autoUpdateHandle);
                                                        this.autoUpdateHandle = null;
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
						    var id = _this.getMainProductionBuildingMdbId(gameDataTech.pt, gameDataTech.f);
						    var building = city.get_CityBuildingsData().GetBuildingByMDBId(id);
						    if ((building == null) || (building.get_CurrentDamage() > 0)) {
						        return false;
						    }
						    var levelReq = ClientLib.Base.Util.GetUnitLevelRequirements_Obj(nextLevel, gameDataTech);
							var reqTechIndexes = _this.getMissingTechIndexesFromTechLevelRequirement(levelReq, true, city);
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
							//console.log( building.get_UnitGameData_Obj().dn);
							return (!building.get_IsDamaged() && !city.get_IsLocked() && hasEnoughResources);
						},
												
												Production_Math: function(city, building_Id, Production, Package_Size, Time_To_Get_Package, LinkType0, LinkType1, LinkType2){
													var Production_Value = -1;
													var Package = -1;
													var Package_Per_Hour = -1;
													var type0 = -1;
													var type1 = -1;
													var type2 = -1;
													var Total_Production = -1;
													
													if(city != null){
													
														Production_Value = city.GetBuildingCache(building_Id).DetailViewInfo.OwnProdModifiers.d[Production].TotalValue;
														Package = city.GetBuildingCache(building_Id).DetailViewInfo.OwnProdModifiers.d[Package_Size].TotalValue;
														Package_Per_Hour = city.GetBuildingCache(building_Id).DetailViewInfo.OwnProdModifiers.d[Time_To_Get_Package].TotalValue;
														
														if(city.GetBuildingCache(building_Id).DetailViewInfo.OwnProdModifiers.d[Production].ConnectedLinkTypes.d[LinkType0] != undefined){
															type0 = city.GetBuildingCache(building_Id).DetailViewInfo.OwnProdModifiers.d[Production].ConnectedLinkTypes.d[LinkType0].Value;
														}else{
															type0 = 0;
														}
														if(city.GetBuildingCache(building_Id).DetailViewInfo.OwnProdModifiers.d[Production].ConnectedLinkTypes.d[LinkType1] != undefined){
															type1 = city.GetBuildingCache(building_Id).DetailViewInfo.OwnProdModifiers.d[Production].ConnectedLinkTypes.d[LinkType1].Value;
														}else{
															type1 = 0;
														}
														if(city.GetBuildingCache(building_Id).DetailViewInfo.OwnProdModifiers.d[Production].ConnectedLinkTypes.d[LinkType2] != undefined){
															type2 = city.GetBuildingCache(building_Id).DetailViewInfo.OwnProdModifiers.d[Production].ConnectedLinkTypes.d[LinkType2].Value;
														}else{
															type2 = 0;
														}
														Total_Production = Production_Value + (Package/(Package_Per_Hour/3600)) + type0 + type1 + type2;
														
														return Total_Production;
													
													}
												},
												
                                                Building_Object: function(city, building, type){
                                                        var building_obj = -1;
														if(city != null && building != null){
															if(type != null){
																building_obj = {
																		base_name: city.m_SupportDedicatedBaseName,
																		building_name: building.get_UnitGameData_Obj().dn,
																		Ratio: type,
																		cityid: city.get_Id(),
																		posX: building.get_CoordX(),
																		posY: building.get_CoordY(),
																		isPaid: true
																	}
																} else {
																	building_obj = {
																			base_name: city.m_SupportDedicatedBaseName,
																			building_name: building.get_UnitGameData_Obj().dn,
																			cityid: city.get_Id(),
																			posX: building.get_CoordX(),
																			posY: building.get_CoordY(),
																			isPaid: true
																		}
																}
														return building_obj;
                                                        
                                                        }
                                                },
                                                
                                               
                                                BuildingautoUpgrade : function() {
																try{
																var _this = window.FlunikTools.Main.getInstance();
														for (var nCity in ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d)
                                                        {
														try{
                                                                var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d[nCity];
                                                                var buildings = city.get_Buildings();
                                                                
																var airRT = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
                                                                var vehRT = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
                                                                var infRT = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
                                                                var maxRT = Math.max(airRT, vehRT, infRT);
																var TotalProduction = -1;
																var LinkType0 = -1;
																var LinkType1 = -1;
																var LinkType2 = -1;
																var Production = -1;
																var PackageSize = -1;
																var BonusTimeToComplete = -1;
																var Build = -1;
                                                                
																
																
																var Package_Obj = null;
                                                                var Building_Obj = null;
																
																for (var nBuildings in buildings.d) {
																try{
                                                                        var building = buildings.d[nBuildings];
																		//console.log(this.canUpgradeBuilding(building, city));
																		try{
																		if(_this.canUpgradeBuilding(building, city))continue;
																		} catch (e) {
																			console.log("can upgrade error: ", e, this.canUpgradeBuilding(building, city));
																	}
																		
                                                                        var tech = building.get_TechName();
                                                                        var name = building.get_UnitGameData_Obj().dn;
                                                                        var baseLvl = city.get_LvlBase();
                                                                        var defLvl = city.get_LvlDefense();
                                                                        var offLvl = city.get_LvlOffense();
                                                                        var buildinglvl = building.get_CurrentLevel();
																		
																		var building_Id = building.get_Id();
                                                                        var isPackageBuilding = building.get_ProducesPackages();
																		var MainModType = building.get_MainModifierTypeId();
																		
																		switch (tech) {
																			case ClientLib.Base.ETechName.Factory:
																				if(maxRT == vehRT){
																				Build = 0;
																				}break;
																			case ClientLib.Base.ETechName.Barracks:
																				if(maxRT == infRT){
																				Build = 1;
																				}break;
																			case ClientLib.Base.ETechName.Airport:
																				if(maxRT == airRT){
																				Build = 2;
																				}break;
																																
																			case ClientLib.Base.ETechName.Defense_Facility:
																				if (buildinglvl <= (defLvl + 3)){
																				Build = 3;
																				}break;
																			case ClientLib.Base.ETechName.Command_Center:
																				if(buildinglvl <= offLvl){
																				Build = 4;
																				}break;
																			case ClientLib.Base.ETechName.Defense_HQ:
																				if (buildinglvl <= defLvl){
																				Build = 5;
																				}break;
																			case ClientLib.Base.ETechName.Construction_Yard:
																				if (buildinglvl <= baseLvl){
																				Build = 6;
																				}break;
																			case ClientLib.Base.ETechName.Refinery : if(buildinglvl <= 2){
																				Build = 7;
																				Production = ClientLib.Base.EModifierType.CreditsProduction;
																				PackageSize = ClientLib.Base.EModifierType.CreditsPackageSize;
																				BonusTimeToComplete = ClientLib.Base.EModifierType.CreditsBonusTimeToComplete;
																				
																				LinkType0 = ClientLib.Base.ELinkType.TiberiumCreditProduction;
																				LinkType1 = ClientLib.Base.ELinkType.PowerplantCreditBonus;
																				//TotalProduction = Math.round(this.Production_Math(city, building_Id, Production, PackageSize, BonusTimeToComplete, LinkType0, LinkType1, LinkType2));
																				//Package_Obj = this.Building_Object(city, building, refarr[refnum]);
																				//console.log(Package_Obj, refarr);
																			}break;
																			case ClientLib.Base.ETechName.PowerPlant :if(buildinglvl <= 2){
																				Build = 8;
																				Production = ClientLib.Base.EModifierType.PowerProduction;
																				PackageSize = ClientLib.Base.EModifierType.PowerPackageSize;
																				BonusTimeToComplete = ClientLib.Base.EModifierType.PowerBonusTimeToComplete;
																				
																				LinkType0 = ClientLib.Base.ELinkType.CrystalCreditProduction;
																				LinkType1 = ClientLib.Base.ELinkType.AccumulatorPowerBonus;
																				LinkType2 = ClientLib.Base.ELinkType.RefineryPowerBonus;
																				//TotalProduction = Math.round(this.Production_Math(city, building_Id, Production, PackageSize, BonusTimeToComplete, LinkType0, LinkType1, LinkType2));
																				//Package_Obj = this.Building_Object(city, building, powarr[pownum]);
																				//console.log(Package_Obj, powarr);
																			}break;
																			case ClientLib.Base.ETechName.Harvester :if(buildinglvl <= 2){
																				Build = 9;
																				if(MainModType == ClientLib.Base.EModifierType.TiberiumBonusTimeToComplete){
																				Production = ClientLib.Base.EModifierType.TiberiumProduction;
																				PackageSize = ClientLib.Base.EModifierType.TiberiumPackageSize;
																				BonusTimeToComplete = ClientLib.Base.EModifierType.TiberiumBonusTimeToComplete;
																				
																				LinkType0 = ClientLib.Base.ELinkType.SiloTiberiumProduction;
																				//TotalProduction = Math.round(this.Production_Math(city, building_Id, Production, PackageSize, BonusTimeToComplete, LinkType0, LinkType1, LinkType2));
																				//Package_Obj = this.Building_Object(city, building, tibarr[tibnum]);
																				//console.log(Package_Obj, tibarr);
																				}
																				else if(MainModType == ClientLib.Base.EModifierType.CrystalBonusTimeToComplete){
																					Production = ClientLib.Base.EModifierType.CrystalProduction;
																					PackageSize = ClientLib.Base.EModifierType.CrystalPackageSize;
																					BonusTimeToComplete = ClientLib.Base.EModifierType.CrystalBonusTimeToComplete;
																					
																					LinkType0 = ClientLib.Base.ELinkType.SiloCrystalProduction;
																					//TotalProduction = Math.round(this.Production_Math(city, building_Id, Production, PackageSize, BonusTimeToComplete, LinkType0, LinkType1, LinkType2));
																					//Package_Obj = this.Building_Object(city, building, cryarr[crynum]);
																					//console.log(Package_Obj, cryarr);
																				}
																			}break;
																			
																			case ClientLib.Base.ETechName.Accumulator:
																				if (buildinglvl <= 15){
																				Build = 10;
																				}break;
																			case ClientLib.Base.ETechName.Silo:
																				if (buildinglvl <= 15){
																				Build = 11;
																				}break;
																			case ClientLib.Base.ETechName.Support_Air:
																			case ClientLib.Base.ETechName.Support_Ion:
																			case ClientLib.Base.ETechName.Support_Art:
																			   if (buildinglvl <= (defLvl + 3)){
																				Build = 12;
																				}break;
																			default :
																				console.log("Building: "+name+" Found");break;
																		}
																		
																if(Build > 0){
																	if(Production > 0){
																	console.log(Production);
																	}
																}
															
                                                                        
                                                             break;
														} catch (e) {
                        console.log("Building error: ", e);
                }		
                                                                
                                                        }
														} catch (e) {
                        console.log("City error: ", e);
                }
														}
														
														console.log(Package_Obj, Building_Obj);
														//refarr = []; tibarr = []; cryarr = []; powarr = [];
												} catch (e) {
                        console.log("Function error: ", e);
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

