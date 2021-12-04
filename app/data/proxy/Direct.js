Ext.define("Core.data.proxy.Direct", {
    extend: "Ext.data.proxy.Direct",
    alias: "proxy.itdirect",

    /**
     * Метод для проверки запроса на success:true
     */
    isSuccess: function (response) {
        if (response.meta && response.meta.success === false) return false;
        else return true;
    },

    extractResponseData: function (response) {
        if (!this.isSuccess(response)) this.showError(response.meta);

        return Ext.isDefined(response.result) ? response.result : response.data;
    },

    /**
     * Вывести текст ошибки
     * @param meta {any} мета данные результат запроса
     */
    showError: function (meta) {
        console.error(meta.msg);
        Ext.Msg.show({
            title: "Ошибка",
            message: "<div>" + meta.msg + "</div>",
            // buttons: Ext.Msg.OK,
            // icon: Ext.Msg.ERROR,
            fn: function (btn) {},
        });
    },

    processResponse: function (success, operation, request, response) {
        var me = this,
            exception,
            reader,
            resultSet;
        if (this.isSuccess(response) == true && me.isSimpleProperty(response.result) == true) {
            // подмена объекта
            var obj = response.result;
            response.result = {
                records: [obj],
                success: true,
                total: 1,
            };
        }

        // определяем статус и передаем его обработчику
        if ((response.xhr ? response.xhr.status : response.status) == 401) {
            Ext.getBody().fireEvent("requiredauth");
        }

        me.fireEvent("beginprocessresponse", me, response, operation);

        if (success === true) {
            reader = me.getReader();
            if (response.status === 204) {
                resultSet = reader.getNullResultSet();
            } else {
                resultSet = reader.read(me.extractResponseData(response), {
                    recordCreator: operation.getRecordCreator(),
                });
                //--
                if (!this.isSuccess(response)) {
                    resultSet.success = false;
                }
                //!--
            }
            operation.process(resultSet, request, response);
            exception = !operation.wasSuccessful();
        } else {
            me.setException(operation, response);
            exception = true;
        }
        if (exception) {
            me.fireEvent("exception", me, response, operation);
        }
        me.afterRequest(request, success);

        me.fireEvent("endprocessresponse", me, response, operation);
    },

    /**
     * метод для проверки возвращенного резальтата
     * @param result {any} результат выполнения
     * @returns
     */
    isSimpleProperty: function (result) {
        if (typeof result != "object") return true;

        return false;
    },

    // doRequest: function (operation) {
    //     var request = this.callParent([operation]);
    //     // var records = request.getRecords();
    //     debugger;
    //     return request;
    // },
});
