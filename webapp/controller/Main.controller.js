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
                this.byId("idComboBox2").setValue("bar");
                let datas = {
                    list:
                        [
                            { type: 'bar' },
                            { type: 'column' },
                            { type: 'line' },
                            { type: 'donut' }
                        ]
                };

                this.getView().setModel(new JSONModel(datas), 'typeList');
            },

            onSearch: function (oEvent) {
                // 상대 경로로 값 가져오기 연습
                const oFilterItems = oEvent.getParameter("selectionSet"),
                        oComboBox = oFilterItems[0],
                        sSelectedKey = oComboBox.getSelectedKey();
                const oComboBox2 = oFilterItems[1],
                        sSelectedType = oComboBox2.getSelectedKey();
   
                let oFlattendDataset = this.byId("idFlattendDataset");

                // var sSelectedKey = this.byId("idComboBox").getSelectedKey();   // OrderID
                // var sSelectedType = this.byId('idComboBox2').getSelectedKey(); // type
                var oVizFrame = oEvent.getParameter("selectionSet");

                
                // oModel.read(sBindPath, {
                //     success : function(oReturn){

                        
                //         // typeList.setProperty("/OrderDetail", 받아온 데이터);
                //         // oReturn 안에 조회데이터가 JSON 형태로 들어오게 됨.
                //         // 해당 데이터를 가지고 데이터 가공을 할 수 있음.

                //         // 여기에서 데이터를 받아와서 데이터 핸들링!
                //     }
                // });

                let oFilter = new Filter({
                    filters: [
                        new Filter({ path: 'OrderID', operator: 'EQ', value1: sSelectedKey })
                    ]
                });

                // function _onChangeBox (oFlattendDataset,sSelectedKey, sSelectedType, oFilter){
                //     // 내용ㅇ
                // };

                var result = this._onChangeBox(oFlattendDataset,sSelectedKey, sSelectedType, oFilter);
                // if (sSelectedKey) {
                //     oFlattendDataset.getBinding("data").filter(oFilter);
                // };

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
                // this.byId("idComboBox2").setValueState("None");

                // if (sSelectedKey) oFilter = new Filter("OrderID", "EQ", sSelectedKey);
                
                // { key : value }
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