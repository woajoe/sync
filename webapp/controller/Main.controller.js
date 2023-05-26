sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, JSONModel) {
        "use strict";

        return Controller.extend("ER.zfercarpo.controller.Main", {
            onInit: function () {
                this.byId("idComboBox");
                let datas = {
                    list:
                        [
                            { branch: 'SE01', branchname:'강북'},
                            { branch: 'SE02', branchname:'강남'},
                            { branch: 'IN01', branchname:'인천'},
                            { branch: 'GY01', branchname:'경기'},
                            { branch: 'DG01', branchname:'대구'},
                            { branch: 'DJ01', branchname:'대전'},
                            { branch: 'BU01', branchname:'부산'}
                        ]
                };

                this.getView().setModel(new JSONModel(datas), 'branchList');
            },

            onSearch: function (oEvent) {
                // 상대 경로로 값 가져오기 연습
                const oFilterItems = oEvent.getParameter("selectionSet"),
                        oComboBox = oFilterItems[0],
                        sSelectedKey = oComboBox.getSelectedKey();
                const oComboBox2 = oFilterItems[1],
                        sSelectedType = oComboBox2.getSelectedKey();
   
                let oFlattendDataset = this.byId("idFlattendDataset");

                var oVizFrame = oEvent.getParameter("selectionSet");

                let oFilter = new Filter({
                    filters: [
                        new Filter({ path: 'OrderID', operator: 'EQ', value1: sSelectedKey })
                    ]
                });

                var result = this._onChangeBox(oFlattendDataset,sSelectedKey, sSelectedType, oFilter);
                this.byId("idVizFrame").setVizType(sSelectedType);

            },

            _onChangeBox: function ( oFlattendDataset, sSelectedKey, sSelectedType, oFilter) {
                var test = '33';
                if(!sSelectedType) {       // type값이 없으면 에러처리 후 return
                    this.byId("idComboBox2").setValueState("Error");
                    return;
                };

                if (sSelectedKey) {
                    this.byId("idComboBox2").setValueState("None");
                    oFilter = new Filter("OrderID", "EQ", sSelectedKey);
                    oFlattendDataset.getBinding("data").filter(oFilter);
                }else{
                    
                };
                
                return test;
            },

            onChartSelectData: function (oEvent) {
                const oComponent = this.getOwnerComponent(),
                    oRouter = oComponent.getRouter(),
                    // debugger 해서 oEvent.getParameter 확인. 선택한 데이터 정보 얻기.
                    oData = oEvent.getParameter("data")[0].data,
                    oVizFrame = this.byId('idVizFrame'); 

                oVizFrame.vizSelection(oData, { clearSelection: true });  //차트 선택된거 초기화

                oRouter.navTo("RouteDetail", {    // Detail로 이동
                    OrderID: oData.OrderID,
                    ProductID: oData.ProductID,
                });
            }
        });
    });