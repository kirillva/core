/**
 * @file /src/form/findform/Splitter.js
 * @project ui_classic_package
 * @author Александр
 * @todo применяется для IServ.UI.Classic.form.findform.FieldContainer
 */

/**
 * Разделитель для полей
 * @class IServ.UI.Classic.form.findform.Splitter
 * @example
 * xtype: 'findfieldcontainer',
 * fieldLabel: 'Логин',
 * layout: 'hbox',
 * items: [{
 *   xtype: 'textfield',
 *   name: "login",
 *   value: "admin"
 * }, {
 *   xtype: 'findform-splitter'
 * }, {
 *   xtype: 'textfield',
 *   name: "login"
 * }]
 */
Ext.define('IServ.UI.Classic.form.findform.Splitter', {
    extend: 'Ext.Container',
    xtype: 'findform-splitter',

    /**
     * ширина
     * @default 10
     * @type {number}
     */
    width: 10,

    /**
     * Применение логики для полей
     * @default 'OR''
     * @type {string}
     * @todo возможны два значения OR или BETWEEN
     */
    logic: 'OR'
});