Ext.require([
    'AIDRFM.common.AIDRFMFunctions',
    'AIDRFM.common.StandardLayout',
    'AIDRFM.common.Header',
    'AIDRFM.common.Footer'
]);

Ext.onReady(function() {
    Ext.BLANK_IMAGE_URL = 'http://extjs.cachefly.net/ext-3.2.1/resources/images/default/s.gif';
    App.Demo.init();
});


Ext.ns('App');
App.Demo = {
    init:function()
    {
        
    },

    openWindow:function(url)
    {
        var win = new Ext.Window({
            width:800,
            height:600,
            title:'Pick up the Coordinates:' + 'www.boundingbox.klokantech.com/',
            scrollable:true,
            modal:false
        });

        var iframeid = win.getId() + '_iframe';

        var iframe = {
            id:iframeid,
            tag:'iframe',
            src:'http://boundingbox.klokantech.com/',
            width:'100%',
            height:'100%',
            frameborder:0
        }

        // show first
        win.show();
        // then iframe
        Ext.DomHelper.insertFirst(win.body, iframe)

    }

}
//Code Ends

Ext.define('AIDRFM.collection-details.view.CollectionDetailsPanel', {
    extend: 'AIDRFM.common.StandardLayout',
    alias: 'widget.collection-details-view',

    fieldDefaults: {
        labelAlign: 'left',
        msgTarget: 'side'
    },

    initComponent: function () {
        var me = this;

        this.breadcrumbs = Ext.create('Ext.container.Container', {
            html: '<div class="bread-crumbs"><a href="' + BASE_URL + '/protected/home">My Collections</a></div>',
            margin: 0,
            padding: 0
        });

        /*this.collectionTitle = Ext.create('Ext.form.Label', {
            cls: 'header-h1',
            margin: '10 0 15 0',
            padding: 0,
            text: '',
            flex: 1
        });*/

        this.refreshButton = Ext.create('Ext.Button', {
            height: 32,
            width: 32,
            
            margin: '13 0 0 0',
            tooltip: 'Refresh',
            
            cls:'btn btn-blueish4',
            id: 'refreshBtn'
        });

        this.horizontalLineTop = Ext.create('Ext.container.Container', {
            width: '100%',
            html: '<div class="horizontalLine"></div>'
        });
        
        this.horizontalLineBottomMargin = Ext.create('Ext.container.Container', {
            width: '100%',
            margin: '0 0 30 0',
            html: '<div class="horizontalLine"></div>'
        });
        
        this.collectionHistoryDoNotChangeMessage = Ext.create('Ext.panel.Panel', {
            html: '<div style="padding-top:160px; padding-bottom:10px;"><center><div style="font-size:16pt">This collection has not changed since it was created.</div></center></div>',
            hidden: true
        });

        this.statusL = Ext.create('Ext.form.Label', {width: 500, padding: '0', top: '0px'});
        this.statusMsgL = Ext.create('Ext.form.Label', {flex: 1, cls:'bold-text', top: '0px', text: 'Test Value'});
        this.lastStartedL = Ext.create('Ext.form.Label', {flex: 1});
        this.lastStoppedL = Ext.create('Ext.form.Label', {flex: 1});
        this.willStoppedL = Ext.create('Ext.form.Label', {flex: 1});
        this.codeL = Ext.create('Ext.form.Label', {flex: 1});
        this.collectionTitle = Ext.create('Ext.form.Label', {
            cls: 'header-h3',
            fontSize: '25px',
            padding: 0,
            top: '15px',
            text: '',
            flex: 1
        });
        this.keywordsL = Ext.create('Ext.form.Label', {
            flex: 1,
            cls: 'word-wrap-class'
        });
        this.geoL = Ext.create('Ext.form.Label', {
            flex: 1});
        this.followL = Ext.create('Ext.form.Label', {flex: 1});
        this.languageFiltersL = Ext.create('Ext.form.Label', {flex: 1});
        this.createdL = Ext.create('Ext.form.Label', {flex: 1});
        this.docCountL = Ext.create('Ext.form.Label', {flex: 1});
        this.totalDocCountL = Ext.create('Ext.form.Label', {flex: 1});
        this.lastDocL = Ext.create('Ext.form.Label', {flex: 1, cls:'tweet'});

        this.geoContainer = Ext.create('Ext.container.Container', {
            hidden: true,
            defaultType: 'label',
            layout: 'hbox',
            items: [
                {
                    width: 220,
                    text: 'Geographical boundaries:'
                },
                this.geoL
            ]
        });

        this.willStoppedContainer = Ext.create('Ext.container.Container', {
            defaultType: 'label',
            layout: 'hbox',
            items: [
                {
                    width: 220,
                    text: 'Scheduled stop:'
                },
                this.willStoppedL
            ]
        });

        this.followContainer = Ext.create('Ext.container.Container', {
            hidden: true,
            xtype: 'container',
            defaultType: 'label',
            layout: 'hbox',
            items: [
                {
                    width: 220,
                    text: 'Follow specific users:'
                },
                this.followL
            ]
        });

        this.timeDurationL = Ext.create('Ext.form.Label', {
            flex: 1,
            text: 'Time period',
            padding: '15 0 0 0',
            cls: 'header-h2'
        });

        this.configurationsL = Ext.create('Ext.form.Label', {
            flex: 1,
            text: 'Configuration',
            padding: '15 0 0 0',
            cls: 'header-h2'
        });

        this.administrationL = Ext.create('Ext.form.Label', {
            flex: 1,
            text: 'Collaborators',
            padding: '0 0 0 0',
            cls: 'header-h2'
        });

        this.managersL = Ext.create('Ext.form.Label', {flex: 1});

        this.codeE = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Short names',
            name: 'code',
            allowBlank: false,
            width: 370,
            emptyText: 'e.g., Sandy2012 or EQJapan2011',
            maxLength: 64,
            maxLengthText: 'The maximum length for this field is 64',
            maskRe: /[^ ]/,
            disabled: true,
            labelWidth: 130,
            hidden: true
        });

        this.nameE = Ext.create('Ext.form.field.Text', {
            width: 370,
            fieldLabel: 'Name',
            name: 'name',
            allowBlank: false,
            maxLength: 50,
            maxLengthText: 'The maximum length for this field is 50',
            emptyText: 'e.g., Hurricane Sandy',
            labelWidth: 130,
            maskRe: /[a-z0-9-_ ]/i,
            regex: /^[a-zA-Z0-9-_ ]+$/,
            invalidText: 'Not a valid crisis name. Supports alphabets and numbers no special characters except underscore and hyphen".'
        });

        this.keywordsE = Ext.create('Ext.form.field.TextArea', {
            fieldLabel: 'Keyword(s)',
            name: 'track',
            allowBlank: true,
            maxLength: 24000,
            maxLengthText: 'The maximum length for this field is 400',
            flex: 1,
            rows: 4,
            labelWidth: 130,
            emptyText: 'e.g., #sandy, #newyork,#joplin (max 400)'
        });

        this.geoE = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Geographical boundaries',
            labelWidth: 130,
            name: 'geo',
            flex: 1,
            emptyText: 'e.g., 43.43, 22.44, 89.32, 56.43 (max 25)'
        });
        
        this.geoR = Ext.create('Ext.form.Panel', {
            id:'geoRPanel',
            items:[{
                name: 'geoR',
                xtype: 'radiogroup',
                fieldLabel: 'Geographical boundary strictness',
                labelWidth: 130,
                // Arrange radio buttons into two columns, distributed vertically
                columns: 1,
                vertical: true,
                items: [
                    { boxLabel: 'Does not apply (no geographical boundary)', name: 'geoR1', inputValue: 'null'},
                    { boxLabel: 'Approximate: a tweet may be collected if it comes from a country that overlaps with the geographical boundaries.', name: 'geoR1', inputValue: 'approximate' },
                    { boxLabel: 'Strict: a tweet can only be collected if it has geographical coordinates strictly inside the geographical boundaries.', name: 'geoR1', inputValue: 'strict'}
                ]
            }]
        });

        this.geoDescription = Ext.create('Ext.form.Label', {
            flex: 1,
            //added additional onclick event to display bounding box in a popup window instead of opening up in a new tab
            id:'geoDescription',
            html: '<span class="redInfo">*</span> ' +
                'Click here to get coordinates: <a href="#" onclick="App.Demo.openWindow()" >boundingbox.klokantech.com</a> ' +
                '("Copy/paste CSV format of a boundingbox")',
            padding: '2 0 2 135'
        });

        this.followE = Ext.create('Ext.form.field.Text', {
            fieldLabel: 'Follow specific users',
            name: 'follow',
            labelWidth: 130,
            flex: 1,
            emptyText: 'e.g., 47423744, 53324456 (max 5000)'
        });

        this.durationDescription = Ext.create('Ext.form.Label', {
            flex: 1,
            id:'durationDescription',
            html: '<span class="redInfo">*</span> If you need to run your collection for more than 7 days, please contact the AIDR team.',
            padding: '2 0 2 135'
        });

        this.durationStore = Ext.create('Ext.data.Store', {
            fields: ['val', 'label'],
            data : [
                { "val": 12, "label": '12 hours' },
                { "val": 24, "label": '1 day' },
                { "val": 36, "label": '1 day 12 hours' },
                { "val": 48, "label": '2 days'},
                { "val": 60, "label": '2 days 12 hours' },
                { "val": 72, "label": '3 days' },
                { "val": 168, "label": '7 days' }
            ]
        });

        this.duration = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Automatically stop after',
            flex: 1,
            labelWidth: 130,
            name: 'durationHours',
            editable: false,
            text: 'Edit',
            valueField: 'val',
            displayField: 'label',
            width: 125,
            store: this.durationStore,
//            default duration is 2 days (48 hours)
            value: 48,
            queryMode: 'local'
        });

        this.collectionTypeComboStore = Ext.create('Ext.data.Store', {
            fields: ['val', 'label'],
            data: [
                { "val": 'Twitter', "label": 'Twitter' },
                { "val": 'SMS', "label": 'SMS' }
            ]
        });

        this.collectionTypeCombo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Collection Type',
            width: 370,
            labelWidth: 130,
            id: 'CollectionType',
            name: 'collectionType',
            editable: false,
            text: 'Edit',
            valueField: 'val',
            displayField: 'label',
            store: this.collectionTypeComboStore,
            value: 'Twitter'
        });

        this.collectionTypeNote = Ext.create('Ext.form.Label', {
            flex: 1,
            html: '<div></div>',
            padding: '2 0 2 135'
        });

        this.configurationsL = Ext.create('Ext.form.Label', {
            flex: 1,
            id:'configurationsL',
            text: 'Optional settings',
            padding: '15 0 0 0',
            cls: 'header-h2 bordered-top'
        });

        this.langComboStore = Ext.create('Ext.data.ArrayStore', {
            autoDestroy: true,
            storeId: 'langComboStore',
            idIndex: 0,
            fields: [
                'name',
                'code'
            ],
            data: LANG
        });

        this.langCombo = Ext.create('Ext.form.ComboBox', {
            store: this.langComboStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'code',
            multiSelect: true,
            fieldLabel: 'Language(s)',
            labelWidth: 130,
            editable: false,
            name: 'langFilters',
            flex: 1,
            emptyText: 'e.g., en, ar, ja',
            tpl: '<tpl for=".">' +
                '<li role="option" class="x-boundlist-item">{name}</li>' +
                '<tpl if="xindex == 9"><hr/></tpl>' +
                '<tpl if="xindex == 56"><hr/>Other ...<hr/></tpl>' +
                '</tpl>'
        });

        this.startButton = Ext.create('Ext.Button', {
            text: 'Start',
            margin: 0,
            cls:'btn btn-green',
            id: 'collectionStart',
            // margin: '0 0 0 480',
            hidden: true
        });

        this.stopButton = Ext.create('Ext.Button', {
            text: 'Stop',
            cls:'btn btn-redSmall',
            id: 'collectionStop',
            margin: '0 0 0 10',
            //margin: '0 0 0 480',
            hidden: true
        });

        this.trashButton = Ext.create('Ext.Button', {
            text: 'Delete Collection',
            cls:'btn btn-redSmall',
            id: 'collectionTrash',
            margin: '25 0 0 0',
            hidden: true,
            //flex: 1  
        });

        this.untrashButton = Ext.create('Ext.Button', {
            text: 'Untrash Collection',
            cls:'btn btn-redSmall',
            id: 'collectionUntrash',
            margin: '25 0 0 0',
            hidden: true
        });

        this.configurationsEditTabL = Ext.create('Ext.form.Label', {
            id:'AdvancedConfiguration',
            flex: 1,
            text: 'Advanced configuration',
            padding: '15 0 0 0',
            cls: 'header-h2'
        });

        this.saveButton = Ext.create('Ext.Button', {
            text: 'Save',
            margin: '0 10 0 10',
            cls:'btn btn-green',
            id: 'collectionUpdate'
        });

        this.cancelButton = Ext.create('Ext.Button', {
            text: 'Cancel',
            cls:'btn btn-redSmall',
            id: 'collectionEditCancel'
        });

        this.enableTaggerButton = Ext.create('Ext.Button', {
            text: 'Enable Classifier',
            cls:'btn btn-blueSmall',
            id: 'enableTagger',
            margin: '0 0 0 10',
            disabled: true,
            hidden: true
        });

        this.gotoTaggerButton = Ext.create('Ext.Button', {
            text: 'Go To Classifier',
            cls:'btn btn-blueSmall',
            id: 'goToTagger',
            margin: '0 0 0 10',
            hidden: true
        });

        this.collectionLogStore = Ext.create('Ext.data.Store', {
            storeId: 'collectionLogStore',
            fields: ['id', 'collectionID', 'langFilters', 'startDate', 'endDate', 'count', 'track', 'geo', 'follow'],
            proxy: {
                type: 'ajax',
                url: BASE_URL + '/protected/collection-log/findAllForCollection.action',
                reader: {
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            },
            autoLoad: true,
            listeners: {
                beforeload: function (s) {
                    var id = me.currentCollectionId;
                    s.getProxy().setExtraParams({
                        id: id,
                        'limit' : -1
                    })
                },
                load: function (s) {
                    var count = s.getCount();

                    if (count > 0) {
                        collectionHistoryChart.show();
                        me.horizontalLineTop.show();
                        me.collectionHistoryPanelView.show();
                        me.horizontalLineBottomMargin.show();
                        me.collectionHistoryGrid.show();
                        //Adding dock to display total record count 
                        me.down('#collectionLogStoreCount').setText("Total no. of records :  " + s.getCount());
                        me.collectionHistoryDoNotChangeMessage.hide();
                    } else {
                        collectionHistoryChart.hide();
                        me.horizontalLineTop.hide();
                        me.collectionHistoryPanelView.hide();
                        me.horizontalLineBottomMargin.hide();
                        me.collectionHistoryGrid.hide();
                        me.collectionHistoryDoNotChangeMessage.show();
                    }
                }
            }
        });

        this.crisesTypeTpl = new Ext.XTemplate(
            '<div class="popup choose-crises">' +

            '<tpl if="xindex == 1">' +
                '<h2>Choose Crisis Type</h2>' +
                '<div class="crises-list">' +
                '<ul>' +
            '</tpl>' +
            '<tpl for=".">',

                '<li class="crisesItem"><a>{name}</a></li>' +

            '</tpl>',
            '<tpl if="xindex == 1">' +
                '</ul>' +
                '</div>' +
            '</tpl>' +

            '</div>'
        );

        this.collectionHistoryPanelTpl = new Ext.XTemplate(
            '<div class="collections-list">',
       
            '<tpl if="values.length == 0">' +
            //'<div><center><div style="font-size:16pt; padding:64px 0 0px 0">Please select a row.</div></center></div>',
            '<div><center><div style="font-size:16pt; padding:10px 0 0px 0">Please select a row.</div></center></div>',
            '</tpl>',
            
            '<tpl for=".">',
            '<div></div>',
            
            '<div class="collection-item">',

            '<div class="img">',
            '<tpl if="[this.getType()] == 0">' +
            '<img alt="Collection History image" height="70" src="/AIDRFetchManager/resources/img/twitter_icon2.png" width="70">',
            '</tpl>',
            '<tpl if="[this.getType()] == 1">' +
            '<img alt="Collection History image" height="70" src="/AIDRFetchManager/resources/img/sms_icon.png" width="70">',
            '</tpl>',
            '</div>',

            '<div class="content">',

            '<div class="rightColumn">',
            '<div>Collected ' + COLLECTION_TYPES[TYPE]['plural'] + ':</div>',
            '<div>Start date:</div>',
            '<div>End date:</div>',
            '{[this.showGeoLabel(values.geo)]}',
            '{[this.showFollowLabel(values.follow)]}',
            
            '<tpl if="[this.getType()] == 0">' +
            '<div>Language(s):</div>',
            '<div>Keyword(s):</div>',
            '</tpl>',
           
            '</div>',

            '<div class="leftColumn">',
            '<div>{[this.getDocNumber(values.count)]}</div>',
            '<div>{[this.getDateTimeField(values.startDate)]}</div>',
            '<div>{[this.getDateTimeField(values.endDate)]}</div>',
            '{[this.showValue(values.geo)]}',
            '{[this.showValue(values.follow)]}',
            
            '<tpl if="[this.getType()] == 0">' +
            '<div>{[this.getLanguageField(values.langFilters)]}</div>',
            '<div class="word-wrap-class">{[this.getField(values.track)]}</div>',
            '</tpl>',
            '</div>',

            '</div>',
            '</div>',

            '</tpl>',
            '</div>',
            {
                getField: function (r) {
                    return r ? r : "<span class='na-text'>Not specified</span>";
                },
                getType: function(){
                    if(TYPE == 'SMS'){
                        return 1;
                    }
                    else{
                        return 0;
                    }
                },
                getLanguageField: function (r) {
                    var languageFull = "";
                    if(r && r != ''){
                        var lns = r.split(",");
                        lns.forEach(function(val, i){
                            var index = me.langComboStore.find('code', val);
                            var s =  me.langComboStore.getAt(index);
                            languageFull += s.data.name;
                            if(i < (lns.length - 1)){
                                languageFull +=", ";
                            }
                        });

                    }
                    return r ? languageFull : "<span class='na-text'>Not specified</span>";
                },
                getDateTimeField: function(r){
                    return r ? moment(r).format("MMM Do, YYYY hh:mm A") : "Not specified";

                },
                getDocNumber: function (r) {
                    return r ? Ext.util.Format.number(r,'0,000') : 0;
                },
                showGeoLabel: function (r) {
                    return r ? '<div>Geographical regions:</div>' : '';
                },
                showValue: function (r) {
                    return r ? '<div>' + r + '</div>' : '';
                },
                showFollowLabel: function (r) {
                    return r ? '<div>Follow specific users:</div>' : '';
                }
            }
        );

        this.collectionHistoryPanelStore = Ext.create('Ext.data.Store', {
            storeId: 'collectionHistoryPanelStore',
            fields: ['collectionId', 'langFilters', 'startDate', 'endDate', 'count', 'track', 'geo', 'follow'],
            autoLoad: false,
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                }
            }
        });
        
        this.collectionHistoryPanelView = Ext.create('Ext.container.Container', {
        	
        	items: [{
        	        	xtype: 'dataview',
        	        	store: 'collectionHistoryPanelStore',
        	        	itemTpl: this.collectionHistoryPanelTpl,
        	}],
        	      	emptyText: 'Please select a row.',
            loadMask: false,
            margin: '0 0 10 0',
            scrollable: 'y',
            height: 140
        });

        this.collectionLogPaging = Ext.create('Ext.toolbar.Paging', {
            cls: 'aidr-paging',
            margin: '12 2 0 2',
            store:'collectionLogStore',
            displayInfo:true,
            displayMsg:'Collection history records {0} - {1} of {2}',
            emptyMsg:'No collection history records to display'
        });

        this.crisisTypesStore = Ext.create('Ext.data.Store', {
            pageSize: 30,
            storeId: 'crisisTypesStore',
            fields: ['crisisTypeID', 'name'],
            proxy: {
                type: 'ajax',
                url: BASE_URL + '/protected/tagger/getAllCrisisTypes.action',
                reader: {
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            },
            autoLoad: true
        });

        this.crisisTypesCombo = Ext.create('Ext.form.ComboBox', {
            store: this.crisisTypesStore,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'crisisTypeID',
            fieldLabel: 'Type',
            flex: 1,
            name: 'crisisType',
            editable: false,
            allowBlank: true,
            labelWidth: 130
        });

        this.editForm = {
            xtype: 'form',
            border: false,
            id: 'collectionForm',
            items: [
                {
                    xtype: 'container',
                    defaults: {
                        width: 350,
                        labelWidth: 120
                    },
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '5 0',
                            items: [
                                this.nameE,
                                {
                                    border: false,
                                    bodyStyle: 'background:none',
                                    html: '<img src="/AIDRFetchManager/resources/img/info.png"/>',
                                    height: 22,
                                    width: 22,
                                    id: 'collectionNameInfo'
                                }
                            ]
                        },
                         {
                             xtype: 'container',
                             layout: 'hbox',
                             margin: '5 0',
                             items: [
                                 this.codeE,
//                                 {
//                                     border: false,
//                                     bodyStyle: 'background:none',
//                                     html: '<img src="/AIDRFetchManager/resources/img/info.png"/>',
//                                     height: 22,
//                                     width: 22,
//                                     id: 'collectionCodeInfo'
//                                 }
                             ]
                         },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '5 0 0 0',
                            padding: '0 0 8 0',
                            items: [
                                this.collectionTypeCombo,
                                {
                                    border: false,
                                    bodyStyle: 'background:none',
                                    html: '<img src="/AIDRFetchManager/resources/img/info.png"/>',
                                    height: 22,
                                    width: 22,
                                    id: 'collectionTypeInfo'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '5 0',
                            id:'keywordsPanel',
                            items: [
                                this.keywordsE,
                                {
                                    border: false,
                                    bodyStyle: 'background:none',
                                    html: '<img src="/AIDRFetchManager/resources/img/info.png"/>',
                                    height: 22,
                                    width: 22,
                                    id: 'collectionkeywordsInfo'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '5 0',
                            items: [
                                this.crisisTypesCombo,
                                {
                                    border: false,
                                    bodyStyle: 'background:none',
                                    html: '<img src="/AIDRFetchManager/resources/img/info.png"/>',
                                    height: 22,
                                    width: 22,
                                    id: 'crisisTypesInfo'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '5 0 0 0',
                            padding: '0 0 8 0',
                            id:'langPanel',
                            items: [
                                this.langCombo,
                                {
                                    border: false,
                                    bodyStyle: 'background:none',
                                    html: '<img src="/AIDRFetchManager/resources/img/info.png"/>',
                                    height: 22,
                                    width: 22,
                                    id: 'collectionLangInfo'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '5 0',
                            items: [
                                this.duration,
                                {
                                    border: false,
                                    margin: '5 0 0 0',
                                    bodyStyle: 'background:none',
                                    html: '<img src="/AIDRFetchManager/resources/img/info.png"/>',
                                    height: 22,
                                    width: 22,
                                    id: 'collectionDurationInfo'
                                }
                            ]
                        },
                        this.durationDescription,
                        {
                            xtype: 'container',
                            margin: '5 0 0 0',
                            html: '<div class="horizontalLine"></div>'
                        },

                        this.configurationsEditTabL,
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '0 0 5 0',
                            id:'geoPanel',
                            items: [
                                this.geoE,
                                {
                                    border: false,
                                    margin: '5 0 0 0',
                                    bodyStyle: 'background:none',
                                    html: '<img src="/AIDRFetchManager/resources/img/info.png"/>',
                                    height: 22,
                                    width: 22,
                                    id: 'collectionGeoInfo'
                                }
                            ]
                        },
                        this.geoDescription,
                        this.geoR,
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '5 0',
                            id:'followPanel',
                            items: [
                                this.followE,
                                {
                                    border: false,
                                    bodyStyle: 'background:none',
                                    html: '<img src="/AIDRFetchManager/resources/img/info.png"/>',
                                    height: 22,
                                    width: 22,
                                    id: 'collectionFollowInfo'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            padding: '15 0 0 0',
                            items: [
                                this.cancelButton,
                                this.saveButton
                            ]
                        }
                    ]
                }
            ]
        };

        this.detailsPanel = Ext.create('Ext.container.Container', {
            defaults: {
                margin: '5 0'
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    defaults: {
                        margin: '5 0'
                    },
                    minHeight: 300,
                    items: [
                        {
                            xtype: 'container',
                            defaultType: 'label',
                            padding: '0',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'container',
                                    padding: '0 20 0 0',
									margin: '8 0 0 0',
                                    //height:72,
                                    height:50,
                                    width:75,
                                    id:'iconPanel',
                                    html: '<img src="/AIDRFetchManager/resources/img/collection-icon.png"/>'
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    defaultType: 'label',
                                    layout: 'vbox',
                                    defaults: {
                                        margin: '0 0'
                                    },
                                    items: [
                                        {
                                             xtype: 'container',
                                             defaultType: 'label',
                                             layout: 'hbox',
                                             items: [
                                                this.collectionTitle
                                             ]
                                        },
                                        {
                                            xtype: 'container',
                                            defaultType: 'label',
											margin: '0 0 0 0',
                                            layout: 'hbox',
                                            style: {'top':'0px!important'},
                                            items: [
                                                this.statusL
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            defaultType: 'label',
                                            layout: 'hbox',
											margin: '5 0 0 0',
                                            items: [
                                                this.statusMsgL
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    defaultType: 'label',
                                    padding: '12 0 0 0',
                                    layout: 'hbox',
                                    items: [
                                        this.startButton,
                                        this.stopButton,
                                        this.enableTaggerButton,
                                        this.gotoTaggerButton
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id:'endpointLabel',
                            defaultType: 'label',
                            hidden:true,
                            layout: 'hbox',
                            margin: '5 0 0 0',
                            items: [
                                {
                                    width: 220,
                                    text: 'Collector end-point:'
                                },
                                {
                                    text: window.location.origin + BASE_URL +'/public/collection/sms/push/'+COLLECTION_CODE
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            defaultType: 'label',
                            layout: 'hbox',
							margin: '25 0 0 0',
                            items: [
                                {
                                    id:'downloadLabel',
                                    width: 220,
                                    html: 'Collected ' + COLLECTION_TYPES[TYPE]['plural'] + ' <br/> (since last re-start):'
                                },
                                this.docCountL
                            ]
                        },
                        {
                            xtype: 'container',
                            defaultType: 'label',
                            layout: 'hbox',
                            items: [
                                {
                                    id:'totalDownloadLabel',
                                    width: 220,
                                    text: 'Total collected ' + COLLECTION_TYPES[TYPE]['plural'] + ':'
                                },
                                this.totalDocCountL
                            ]
                        },
                        {
                            xtype: 'container',
                            defaultType: 'label',
                            layout: 'hbox',
                            cls: 'bordered-bottom',
                            items: [
                                {
                                    id:'lastDownloadLabel',
                                    width: 220,
                                    text: 'Last collected ' + COLLECTION_TYPES[TYPE]['singular'] + ':'
                                },
                                this.lastDocL
                            ]
                        },
                        this.timeDurationL,
                        {
                            xtype: 'container',
                            defaultType: 'label',
                            layout: 'hbox',
                            items: [
                                {
                                    width: 220,
                                    text: 'Created:'
                                },
                                this.createdL
                            ]
                        },
                        {
                            xtype: 'container',
                            defaultType: 'label',
                            layout: 'hbox',
                            items: [
                                {
                                    width: 220,
                                    text: 'Last started:'
                                },
                                this.lastStartedL
                            ]
                        },
                        {
                            xtype: 'container',
                            defaultType: 'label',
                            layout: 'hbox',
                            items: [
                                {
                                    width: 220,
                                    text: 'Last stopped:'
                                },
                                this.lastStoppedL
                            ]
                        },
                        this.willStoppedContainer,
                        {
                            xtype: 'container',
                            width: '100%',
                            margin: '5 0 0 0'
                            //html: '<div class="horizontalLine"></div>' // Blocked this line that shows a horizantal line on the collection details page.
                        },
                        this.configurationsL,
                        {
                            xtype: 'container',
                            id:'keywords',
                            defaultType: 'label',
                            layout: 'hbox',
                            items: [
                                {
                                    width: 220,
                                    text: 'Keyword(s):'
                                },
                                this.keywordsL
                            ]
                        },
                        this.geoContainer,
                        this.followContainer,
                        {
                            xtype: 'container',
                            id:'Language',
                            defaultType: 'label',
                            layout: 'hbox',
                            cls: 'bordered-bottom',
                            items: [
                                {
                                    width: 220,
                                    text: 'Language(s):'
                                },
                                this.languageFiltersL
                            ]
                        },

                        {
                            xtype: 'container',
                            defaultType: 'label',
                            padding: '5 0 0 0',
                            layout: 'hbox',
                            items: [
                                    {
                                        xtype: 'container',
                                        defaultType: 'label',
                                        layout: 'vbox',
                                        flex: 5,
                                        items: [
                                                this.administrationL,
                                                this.managersL
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        flex: 1
                                    },
                                    this.trashButton,
                                    this.untrashButton
                            ]
                        }

                    ]
                }
            ]
        });

        this.CSVLink = Ext.create('Ext.form.Label', {
            flex: 1,
            padding: '5 5 5 5',
            html: ''
        });

        this.tweetsIdsLink = Ext.create('Ext.form.Label', {
            flex: 1,
            margin: '5 5 5 5',
            html: ''
        });

        this.generateCSVButton = Ext.create('Ext.Button', {
            text: 'Export ' + COLLECTION_TYPES[TYPE]['plural'] + ' (.csv) (Last 100k ' + COLLECTION_TYPES[TYPE]['plural'] + ')',
            margin: 5,
            cls:'btn btn-blueBig download-button',
            id: 'generateCSVLink'
        });

        this.generateTweetIdsButton = Ext.create('Ext.Button', {
            text: 'Export ' + COLLECTION_TYPES[TYPE]['singular'] + '-ids only (.csv) (All ' + COLLECTION_TYPES[TYPE]['plural'] + ')',
            margin: 5,
            cls:'btn btn-blueBig download-button',
            id: 'generateTweetIdsLink'
        });

        this.JSONLink = Ext.create('Ext.form.Label', {
            flex: 1,
            padding: '5 5 5 5',
            html: ''
        });

        this.JsonTweetsIdsLink = Ext.create('Ext.form.Label', {
            flex: 1,
            margin: '5 5 5 5',
            html: ''
        });

        this.generateJSONButton = Ext.create('Ext.Button', {
            text: 'Export ' + COLLECTION_TYPES[TYPE]['plural'] + ' (.json) (Last 100k ' + COLLECTION_TYPES[TYPE]['plural'] + ')',
            margin: 5,
            cls:'btn btn-blueBig download-button',
            id: 'generateJSONLink'
        });

        this.generateJsonTweetIdsButton = Ext.create('Ext.Button', {
            text: 'Export ' + COLLECTION_TYPES[TYPE]['singular'] + '-ids only (.json) (All ' + COLLECTION_TYPES[TYPE]['plural'] + ')',
            margin: 5,
            cls:'btn btn-blueBig download-button',
            id: 'generateJsonTweetIdsLink'
        });

        this.usersCombo = Ext.create('Ext.form.field.ComboBox', {
            minChars: 0,
            width: 300,
            pageSize: true,
            triggerAction: 'query',
            margin: '1 0 0 0',
            emptyText: 'Please select a user',
            displayField: 'userName',
            valueField: 'id',
            store: {
                fields: ['id', 'userName'],
                pageSize: 10,
                proxy: {
                    type: 'ajax',
                    url: BASE_URL + '/protected/user/getUsers.action',
                    reader: {
                        rootProperty: 'data',
                        type: 'json'
                    }
                }
            }
        });

        this.addManagerInfo = Ext.create('Ext.form.Label', {
            cls: 'styled-text',
            margin: '7 0 0 0',
            html: '<p>This page lists the Twitter usernames of people who have access to manage this collection.</p>',
            flex: 1
        });

        this.addManagerButton = Ext.create('Ext.Button', {
            text: 'Add Collaborator',
            margin: '0 0 0 10',
            cls:'btn btn-green',
            id: 'addManager'
        });

        this.managersStore = Ext.create('Ext.data.Store', {
            pageSize: 50,
            storeId: 'managersStore',
            fields: ['id', 'userName']
        });

        this.managersGrid = Ext.create('Ext.grid.Panel', {
            store: this.managersStore,
            cls: 'aidr-grid',
            columns: [
                {
                    xtype: 'gridcolumn', dataIndex: 'userName', text: 'Collaborator', flex: 1
                },
                {
                    xtype: 'gridcolumn', dataIndex: 'id', text: 'Action', width: 205, sortable: false,
                    renderer: function (recordValue, metaData, record, rowIdx, colIdx, store) {
                        var id = Ext.id();

                        Ext.defer(function () {
                            Ext.widget('button', {
                                exampleId: recordValue,
                                renderTo: id,
                                cls: 'btn btn-redSmall',
                                text: 'Remove Collaborator',
                                width: 185,
                                action: 'removeManager'
                            });
                        }, 50);

                        return Ext.String.format('<div class="margin-left" id="{0}"></div>', id);
                    }
                }
            ]
        });

        this.addManagersPanel = Ext.create('Ext.container.Container', {
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                this.addManagerInfo,
                {
                    xtype: 'container',
                    padding: '10 0 15 0',
                    defaultType: 'label',
                    layout: 'hbox',
                    items: [
                        this.usersCombo,
                        this.addManagerButton
                    ]
                },
                this.managersGrid
            ]
        });

        this.classifierIsRunningText = Ext.create('Ext.form.Label', {
            cls: 'styled-text',
            margin: '7 0 0 0',
            html: 'A classifier is running.',
            flex: 1
        });

        this.toMyClassifiersToDownload = Ext.create('Ext.Button', {
            text: 'Go to my classifiers to download',
            cls:'btn btn-blueBig',
            id: 'toMyClassifiersToDownload',
            margin: '10 0 0 0'
        });

        var collectionHistoryChart = Ext.create('Ext.chart.Chart', {
            width: 900,
            height: 350,
            margin: '0 0 20 0',
            animate: true,
            store: 'collectionLogStore',
            legend: {
                position: 'right'
            },
            axes: [{
                type: 'numeric',
                fields: 'count',
                position: 'left',
                grid: true,
                minimum: 0
            }, {
                type: 'time',
                dateFormat: 'M j,y',
                fields: 'endDate',
                position: 'bottom',
                grid: true,
                label:{
                    rotate: {
                                degrees: -90
                    }
                }
            }],
            series: [{
                type: 'line',
                axis: 'left',
                title: 'Collected '+COLLECTION_TYPES[TYPE]["plural"],
                xField: 'endDate',
                yField: 'count',
                style: {
                    lineWidth: 4
                },
                marker: {
                    radius: 4
                },
                highlight: {
                    fillStyle: '#000',
                    radius: 5,
                    lineWidth: 4,
                    strokeStyle: '#fff'
                },
                tips: {
                    trackMouse: true,
                    width: 180,
                    //height: 60,
                    renderer: function(storeItem, item) {
                      var fromTime = moment(new Date(storeItem.data.startDate)).format("MMM Do, YYYY hh:mm A");
                      var toTime = moment(new Date(storeItem.data.endDate)).format("MMM Do, YYYY hh:mm A");
                          this.setHtml(Ext.util.Format.capitalize(COLLECTION_TYPES[TYPE]["plural"]) + ' collected from '+ fromTime + ' to ' + toTime +" = " + storeItem.get(item.series.yField));
                      }
                }
            }]
        });
        
        this.collectionHistoryGrid = Ext.create('Ext.grid.Panel', {
            flex: 1,
            store: 'collectionLogStore',
            cls: 'aidr-grid',
            loadMask: false,
            selModel: {
                selType: 'rowmodel'
            },
            height: 150,
            dockedItems: [{
                  xtype: 'toolbar',
                  dock: 'bottom',
                  cls: 'aidr-paging',
                  items: [
                      { xtype: 'tbfill' },
                      {  xtype: 'tbtext', text: 'Loading...', itemId: 'collectionLogStoreCount' },
                 ]
            }],
            columns: [
                {
                    xtype: 'gridcolumn', text: 'Collected '+COLLECTION_TYPES[TYPE]["plural"],
                    dataIndex: 'count', flex:1, tdCls:'align-right',
                    renderer: function (r, meta, record) {
                        return r ? Ext.util.Format.number(r,'0,000') : 0;
                    }
                },
                {
                    xtype: 'gridcolumn', text: 'Start date',  flex:1, dataIndex: 'startDate',
                    renderer: function (r, meta, record) {
                           return r ? moment(r).format("MMM Do, YYYY hh:mm A") : "Not specified";
                    }
                },
                {
                    xtype: 'gridcolumn', text: 'End date',  flex:1, dataIndex: 'endDate',
                    renderer: function (r, meta, record) {
                           return r ? moment(r).format("MMM Do, YYYY hh:mm A") : "Not specified";
                    }
                },
                {
                    xtype: 'gridcolumn', text: 'Language(s)', flex:1, dataIndex: 'langFilters',
                    hidden: (TYPE=="SMS"),
                    /*renderer: function (r, meta, record) {
                           return this.getLanguageField(r);
                    }*/
                }
            ],
            listeners: {
            	selectionchange: function(model, records) {
	                if (records[0]) {
	                	var selectedRec = records[0].data;
	                    var model = [];
	                    model.push(selectedRec);
		                    
	                	 //Highlighting the point on chart
		                var collectionSeries = collectionHistoryChart.series.items[0];
		                //collectionSeries.unHighlightItem();
	                    Ext.Array.each(collectionSeries.items, function(pointOnchart, index){
	                    	 if (pointOnchart.value[0] == selectedRec.endDate && pointOnchart.value[1] == selectedRec.count) {
	                    		 collectionSeries.highlightItem(pointOnchart);
	                        }
	                    });
	                    //Set data in docked panel
	                    me.down('#collectionLogStoreCount').setText("Total no. of records :  " + Ext.getStore('collectionLogStore').data.length);
	                    //Push data into the view panel
	                    Ext.getStore('collectionHistoryPanelStore').add(model);
	                }},
                deselect: function (grid, record) {
                	if(collectionHistoryChart.series.items[0]!=null){
	            		collectionHistoryChart.series.items[0].unHighlightItem();
	            	}
                    Ext.getStore('collectionHistoryPanelStore').remove(record);
                },
                viewready : function(grid){
                	setTimeout(function() {
                		grid.getSelectionModel().select(0);
                    }, 1000); 
                    	   
                         
                         //Commented during extJs 5.1 migration. Need to uncomment to enable functioning
                    //});
                },
            },
            getLanguageField: function (r) {
                var languageFull = "";
                if(r && r != ''){
                    var lns = r.split(",");
                    lns.forEach(function(val, i){
                        var index = me.langComboStore.find('code', val);
                        var s =  me.langComboStore.getAt(index);
                        languageFull += s.data.name;
                        if(i < (lns.length - 1)){
                            languageFull +=", ";
                        }
                    });

                }
                return r ? languageFull : "<span class='na-text'>Not specified</span>";
            }
        });
        
        this.tabPanel = Ext.create('Ext.tab.Panel', {
            cls: 'tabPanel',
            width: '100%',
            minHeight: 400,
            activeTab: 0,
            deferredRender: false,
            items: [
                {
                    title: 'Details',
                    items: [
                        this.detailsPanel
                    ]
                },
                {
                    title: 'History',
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                collectionHistoryChart,
                                this.horizontalLineTop,
                                this.collectionHistoryPanelView,
                                /*{
                                    xtype: 'container',
                                    width: '100%',
                                    margin: '0 0 30 0',
                                    html: '<div class="horizontalLine"></div>'
                                },*/
                                this.horizontalLineBottomMargin,
                                this.collectionHistoryGrid,
                                //this.collectionLogPaging,
                            ]
                        },
                        this.collectionHistoryDoNotChangeMessage
                    ]
                },
                {
                    title: 'Edit',
                    padding: '10 0 0 0',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        this.editForm
                    ]
                },

                {
                    title: 'Permissions',
                    padding: '10 0 0 0',
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                this.addManagersPanel
                            ]
                        }
                    ]
                }
            ]
        });

        this.items = [
            this.breadcrumbs,
            /* {
                                    xtype: 'container',
                                    defaultType: 'label',
                                    padding: '12 0 0 0',
                                    layout: 'hbox',
                                    items: [
                                    this.breadcrumbs,
                                        this.startButton,
                                        this.stopButton,
                                        this.enableTaggerButton,
                                        this.gotoTaggerButton
                                    ]
                                },*/
            {
                xtype: 'container',
                width: '100%',
                margin: '5 0 0 0',
                html: '<div class="horizontalLine"></div>'
            },
            /*{
                xtype: 'container',
                layout: 'hbox',
                padding: '10 0',
                items: [
                    this.collectionTitle,
                    this.refreshButton
                ]
            },*/
            this.tabPanel
        ];

        this.callParent(arguments);
    }

});
