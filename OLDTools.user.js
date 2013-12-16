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
                                                        //var a = this.autoUpgrade();
                                                        this.autoUpdateHandle = window.setInterval(this.autoUpgrade, 60000);
                                                },
                                                stopAutoUpdate : function() {
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

<<<<<<< HEAD

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
												
												Production_Math: function(city, building, Production, Package_Size, Time_To_Get_Package, LinkType0, LinkType1, LinkType2){
													var building_Id = building.get_Id();
													if(city != null){
														var Production_Value = city.GetBuildingCache(building_Id).DetailViewInfo.OwnProdModifiers.d[Production].TotalValue;
														var Package = city.GetBuildingCache(building_Id).DetailViewInfo.OwnProdModifiers.d[Package_Size].TotalValue;
														var Package_Per_Hour = city.GetBuildingCache(building_Id).DetailViewInfo.OwnProdModifiers.d[Time_To_Get_Package].TotalValue;
														
														if(city.GetBuildingCache(building_Id).DetailViewInfo.OwnProdModifiers.d[Production].ConnectedLinkTypes.d[LinkType0] != undefined){
															var type0 = city.GetBuildingCache(building_Id).DetailViewInfo.OwnProdModifiers.d[Production].ConnectedLinkTypes.d[LinkType0].Value;
														}else{
															var type0 = 0;
														}
														if(city.GetBuildingCache(building_Id).DetailViewInfo.OwnProdModifiers.d[Production].ConnectedLinkTypes.d[LinkType1] != undefined){
															var type1 = city.GetBuildingCache(building_Id).DetailViewInfo.OwnProdModifiers.d[Production].ConnectedLinkTypes.d[LinkType1].Value;
														}else{
															var type1 = 0;
														}
														if(city.GetBuildingCache(building_Id).DetailViewInfo.OwnProdModifiers.d[Production].ConnectedLinkTypes.d[LinkType2] != undefined){
															var type2 = city.GetBuildingCache(building_Id).DetailViewInfo.OwnProdModifiers.d[Production].ConnectedLinkTypes.d[LinkType2].Value;
														}else{
															var type2 = 0;
														}
														var Total_Production = Production_Value + (Package/(Package_Per_Hour/3600)) + type0 + type1 + type2;
														
														return Total_Production;
													
													}
												},
												
                                                Building_Object: function(city, building, type){
                                                        if(city != null && building != null){
															if(type != null){
																var building_obj = {
																		base_name: city.m_SupportDedicatedBaseName,
																		building_name: building.get_UnitGameData_Obj().dn,
																		Ratio: type,
																		cityid: city.get_Id(),
																		posX: building.get_CoordX(),
																		posY: building.get_CoordY(),
																		isPaid: true
																	}
																} else {
																	var building_obj = {
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
                                                
                                               
                                                autoUpgrade : function() {
                                                        for (var nCity in ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d)
                                                        {
                                                                var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d[nCity];
                                                                var buildings = city.get_Buildings();
                                                                var airRT = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
                                                                var vehRT = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
                                                                var infRT = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
                                                                var maxRT = Math.max(airRT, vehRT, infRT);
																var LinkType0 = -1;
																var LinkType1 = -1;
																var LinkType2 = -1;
                                                                var refarr = new Array();
																var refnum = 0;
																var powarr = new Array();
																var pownum = 0;
																var tibarr = new Array();
																var tibnum = 0;
																var cryarr = new Array();
																var crynum = 0;
                                                                for (var nBuildings in buildings.d) {
                                                                        var building = buildings.d[nBuildings];
                                                                        if(!this.canUpgradeBuilding(building, city))continue;
                                                                        var tech = building.get_TechName();
                                                                        var name = building.get_UnitGameData_Obj().dn;
                                                                        var baseLvl = city.get_LvlBase();
                                                                        var defLvl = city.get_LvlDefense();
                                                                        var offLvl = city.get_LvlOffense();
                                                                        var building_Id = building.get_Id();
                                                                        var buildinglvl = building.get_CurrentLevel();
                                                                        
                                                                        
                                                                        switch (tech) {
                                                                            case ClientLib.Base.ETechName.Factory:
																				if(maxRT == vehRT)break;
                                                                            case ClientLib.Base.ETechName.Barracks:
																				if(maxRT == infRT)break;
                                                                            case ClientLib.Base.ETechName.Airport:
																				if(maxRT == airRT)break;
                                                                                                                                
                                                                            case ClientLib.Base.ETechName.Defense_Facility:
                                                                                if (buildinglvl <= (defLvl + 3)) break;
                                                                            case ClientLib.Base.ETechName.Command_Center:
                                                                                if(buildinglvl <= offLvl)break;
                                                                            case ClientLib.Base.ETechName.Defense_HQ:
                                                                                if (buildinglvl <= defLvl) break;
                                                                            case ClientLib.Base.ETechName.Construction_Yard:
                                                                                if (buildinglvl <= baseLvl) break;
                                                                                                                                
                                                                            case ClientLib.Base.ETechName.Harvester:
                                                                                if (buildinglvl <= 50) 
                                                                                break;
                                                                                                                                
                                                                            case ClientLib.Base.ETechName.Refinery:
                                                                                if (buildinglvl <= 50) 
                                                                                        break;
                                                                            case ClientLib.Base.ETechName.PowerPlant:
                                                                                if (buildinglvl <= 50) 
                                                                                        break;
                                                                            case ClientLib.Base.ETechName.Accumulator:
                                                                                if (buildinglvl <= 15) 
                                                                                        break;
                                                                            case ClientLib.Base.ETechName.Silo:
                                                                                if (buildinglvl <= 15) 
                                                                                        break;
                                                                            case ClientLib.Base.ETechName.Support_Air:
                                                                            case ClientLib.Base.ETechName.Support_Ion:
                                                                            case ClientLib.Base.ETechName.Support_Art:
                                                                               if (buildinglvl >= defLvl) break;
                                                                        }
																			
																			if(building.get_ProducesPackages()){
																				if(building.get_MainModifierTypeId() == ClientLib.Base.EModifierType.CreditsBonusTimeToComplete){
																				refnum++;
																					//if(refnum < 3){
																					var CreditsProduction = ClientLib.Base.EModifierType.CreditsProduction;
																					var CreditsPackageSize = ClientLib.Base.EModifierType.CreditsPackageSize;
																					var CreditsBonusTimeToComplete = ClientLib.Base.EModifierType.CreditsBonusTimeToComplete;
																					
																					LinkType0 = ClientLib.Base.ELinkType.TiberiumCreditProduction;
																					LinkType1 = ClientLib.Base.ELinkType.PowerplantCreditBonus;
																					refarr[refnum] = this.Production_Math(city, building, CreditsProduction, CreditsPackageSize, CreditsBonusTimeToComplete, LinkType0, LinkType1, LinkType2);
																					var Ref_Package_Obj = this.Building_Object(city, building, refarr[refnum]);
																					//console.log(Ref_Package_Obj, refarr);
																					
																					//}
																					break;
																				}
																				
																				if(building.get_MainModifierTypeId() == ClientLib.Base.EModifierType.TiberiumBonusTimeToComplete){
																				tibnum++;
																					//if(tibnum < 3){
																					var TiberiumProduction = ClientLib.Base.EModifierType.TiberiumProduction;
																					var TiberiumPackageSize = ClientLib.Base.EModifierType.TiberiumPackageSize;
																					var TiberiumBonusTimeToComplete = ClientLib.Base.EModifierType.TiberiumBonusTimeToComplete;
																					
																					LinkType0 = ClientLib.Base.ELinkType.SiloTiberiumProduction;
																					tibarr[tibnum] = this.Production_Math(city, building, TiberiumProduction, TiberiumPackageSize, TiberiumBonusTimeToComplete, LinkType0, LinkType1, LinkType2);
																					var Tib_Package_Obj = this.Building_Object(city, building, tibarr[tibnum]);
																					//console.log(this.Building_Object(city, building), tibarr);
																					
																					//}
																					break;
																				}
																				if(building.get_MainModifierTypeId() == ClientLib.Base.EModifierType.CrystalBonusTimeToComplete){
																				crynum++;
																					//if(crynum < 3){
																					var CrystalProduction = ClientLib.Base.EModifierType.CrystalProduction;
																					var CrystalPackageSize = ClientLib.Base.EModifierType.CrystalPackageSize;
																					var CrystalBonusTimeToComplete = ClientLib.Base.EModifierType.CrystalBonusTimeToComplete;
																					
																					LinkType0 = ClientLib.Base.ELinkType.SiloCrystalProduction;
																					cryarr[crynum] = this.Production_Math(city, building, CrystalProduction, CrystalPackageSize, CrystalBonusTimeToComplete, LinkType0, LinkType1, LinkType2);
																					var Cry_Package_Obj = this.Building_Object(city, building, cryarr[crynum]);
																					//console.log(this.Building_Object(city, building), cryarr);
																					
																					//}
																					break;
																				}
																				if(building.get_MainModifierTypeId() == ClientLib.Base.EModifierType.PowerBonusTimeToComplete){
																				pownum++
																					//if(pownum < 3){
																					var PowerProduction = ClientLib.Base.EModifierType.PowerProduction;
																					var PowerPackageSize = ClientLib.Base.EModifierType.PowerPackageSize;
																					var PowerBonusTimeToComplete = ClientLib.Base.EModifierType.PowerBonusTimeToComplete;
																					
																					LinkType0 = ClientLib.Base.ELinkType.CrystalCreditProduction;
																					LinkType1 = ClientLib.Base.ELinkType.AccumulatorPowerBonus;
																					LinkType2 = ClientLib.Base.ELinkType.RefineryPowerBonus;
																					powarr[pownum] = this.Production_Math(city, building, PowerProduction, PowerPackageSize, PowerBonusTimeToComplete, LinkType0, LinkType1, LinkType2);
																				   var Pow_Package_Obj = this.Building_Object(city, building, powarr[pownum]);
																				   //console.log(this.Building_Object(city, building), powarr);
																				   
																					//}
																					break;
																				}
																			}else{
																			var Building_Obj = this.Building_Object(city, building);break;
																			
                                                                                }
                                                                                
                                                                                
                                                                        //}
                                                                        
                                                                }
																refarr.sort(function(a,b){return b-a});
																tibarr.sort(function(a,b){return b-a});
																cryarr.sort(function(a,b){return b-a});
																powarr.sort(function(a,b){return b-a});
																var Max_Total = Math.max(refarr[0], tibarr[0], cryarr[0], powarr[0]);
																if(Ref_Package_Obj.Ratio == Max_Total){
																console.log(Ref_Package_Obj);
																 ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Ref_Package_Obj, null, null, true);
																 refarr = []; tibarr = []; cryarr = []; powarr = []; break;
																}
																if(Tib_Package_Obj.Ratio == Max_Total){
																console.log(Tib_Package_Obj);
																ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Tib_Package_Obj, null, null, true);
																refarr = []; tibarr = []; cryarr = []; powarr = []; break;
																}
																if(Cry_Package_Obj.Ratio == Max_Total){
																console.log(Cry_Package_Obj);
																ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Cry_Package_Obj, null, null, true);
																refarr = []; tibarr = []; cryarr = []; powarr = []; break;
																}
																if( Pow_Package_Obj.Ratio == Max_Total){
																console.log(Pow_Package_Obj);
																ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Pow_Package_Obj, null, null, true);
																refarr = []; tibarr = []; cryarr = []; powarr = []; break;
																}
																if(Building_Obj != null){
																console.log(this.Building_Object(city, building));
																ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", Building_Obj, null, null, true);
																refarr = []; tibarr = []; cryarr = []; powarr = []; break;
																}
																
																
																//refarr = []; tibarr = []; cryarr = []; powarr = [];
																
                                                          
                                                                
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
=======
						canUpgradeBuilding: function (building, city) {
							var nextLevel = (building.get_CurrentLevel() + 1);
							var gameDataTech = building.get_TechGameData_Obj();
							var hasEnoughResources = city.HasEnoughResources(ClientLib.Base.Util.GetTechLevelResourceRequirements_Obj(nextLevel, gameDataTech));
							return (!building.get_IsDamaged() && !city.get_IsLocked() && hasEnoughResources);
						},
                        
						Building_Object: function(city, building){
							if(city != null && building != null){
							var building_obj = {
											base_name: city.m_SupportDedicatedBaseName,
											building_name: building.get_UnitGameData_Obj().dn,
											cityid: city.get_Id(),
											posX: building.get_CoordX(),
											posY: building.get_CoordY(),
											isPaid: true
										}
							return building_obj;
							
							}
						},
						
						upgradeBuilding: function(obj){
							if(obj == unit_obj){
								var upgrade = ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UnitUpgrade", obj, null, null, true);
							}else{
								var upgrade = ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", obj, null, null, true);
							}
							return 	upgrade;
						},
						autoUpgrade : function() {
							for (var nCity in ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d)
							{
								var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_AllCities().d[nCity];
								var buildings = city.get_Buildings();
								var airRT = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Aircraft, false);
								var vehRT = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Vehicle, false);
								var infRT = city.get_CityUnitsData().GetRepairTimeFromEUnitGroup(ClientLib.Data.EUnitGroup.Infantry, false);
                                				var maxRT = Math.max(airRT, vehRT, infRT);
								
								for (var nBuildings in buildings.d) {
									var building = buildings.d[nBuildings];
									if(!this.canUpgradeBuilding(building, city))continue;
									var tech = building.get_TechName();
									var name = building.get_UnitGameData_Obj().dn;
									var baseLvl = city.get_LvlBase();
									var defLvl = city.get_LvlDefense();
									var offLvl = city.get_LvlOffense();
									var building_Id = building.get_Id();
									
									
									
									switch (tech) {
				                                            case ClientLib.Base.ETechName.Factory:if(maxRT == vehRT)break;
				                                            case ClientLib.Base.ETechName.Barracks:if(maxRT == infRT)break;
				                                            case ClientLib.Base.ETechName.Airport:if(maxRT == airRT)break;
																
				                                            case ClientLib.Base.ETechName.Defense_Facility:
				                                                if (buildinglvl <= (defLvl + 3)) break;
				                                            case ClientLib.Base.ETechName.Command_Center:
										if(building.get_CurrentLevel() <= offLvl)break;
				                                            case ClientLib.Base.ETechName.Defense_HQ:
				                                                if (buildinglvl <= defLvl) break;
				                                            case ClientLib.Base.ETechName.Construction_Yard:
				                                                if (buildinglvl <= baseLvl) break;
																
				                                            case ClientLib.Base.ETechName.Harvester:
										if (buildinglvl >= 2) 
										break;
																
				                                            case ClientLib.Base.ETechName.Refinery:
										if (buildinglvl >= 2) 
											break;
				                                            case ClientLib.Base.ETechName.PowerPlant:
										if (buildinglvl >= 2) 
											break;
				                                            case ClientLib.Base.ETechName.Accumulator:
										if (buildinglvl >= 2) 
											break;
				                                            case ClientLib.Base.ETechName.Silo:
										if (buildinglvl >= 2) 
											break;
				                                            case ClientLib.Base.ETechName.Support_Air:
				                                            case ClientLib.Base.ETechName.Support_Ion:
				                                            case ClientLib.Base.ETechName.Support_Art:
				                                               if (buildinglvl >= defLvl) break;
				                                        }
										
										console.log(this.Building_Object(city, building));
											//ClientLib.Net.CommunicationManager.GetInstance().SendCommand("UpgradeBuilding", building_obj, null, null, true);
										//}
										
										
									//}
									
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
>>>>>>> 8b34539abea582b3c2c223c68d8f7592f60ae8cc




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

<<<<<<< HEAD
=======
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
>>>>>>> 8b34539abea582b3c2c223c68d8f7592f60ae8cc
