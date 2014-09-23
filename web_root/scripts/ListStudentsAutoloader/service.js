/*global $j, define*/

/**
 * Lists CRUD service module
 */
define(function() {
    return {
        getList: function(listId, includeGlobal) {

        },
        /**
         *
         * @param includeGlobal {Boolean} - include global lists in the returned returned array of lists
         * @return {Array}
         */
        getAllLists: function(includeGlobal) {
            
        },
        update: function(listObj, listId) {
            var listObjJson = JSON.stringify(listObj);

        },
        create: function(listObj) {

        },
        delete: function(listId) {

        }
    };
});