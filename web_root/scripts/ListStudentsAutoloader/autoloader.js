/*global $j,_,psData, psDialog, require*/
require(['underscore'], function() {
    'use strict';
    var template = $j($j('#template').html());
    var select = $j('table td').eq(0);
    select.append(template);

    var saveButtonTemplate = $j($j('#save-button-template').html());
    var btnSubmit = $j('#btnSubmit');
    saveButtonTemplate.insertBefore(btnSubmit);

    var deleteButtonTemplate = $j($j('#delete-button-template').html());
    var saveBtn = $j('#saveSubmit');
    deleteButtonTemplate.insertBefore(saveBtn);

    var noteTemplate = $j($j('#note-template').html());
    var headerSelect = $j('h1');
    noteTemplate.insertAfter(headerSelect);

    var clearFormTemplate = $j($j('#clear-form-template').html());
    var clearFormSelector = $j('input').eq(0);
    clearFormTemplate.insertAfter(clearFormSelector);

    $j('#clear-form').on('click', function(e) {
        // Clear the form by not passing in a report variable to loadFormFields.
        loadFormFields();
    });

    // Bind Field Name input boxes event handler
    var inputs = $j('input').filter(function() {
        return this.id.indexOf('tt') !== -1;
    });

    _.each(inputs, function(elem, index) {
        var jqElem = $j(elem);
        jqElem.attr('class', 'dialogR');
        jqElem.attr('href', '/admin/fields/fieldlist_yui.html?inf=' + elem.id + '&op=5');
        jqElem.attr('title', 'Fields');

        var manEntryTemplate = $j($j('#manual-entry-template').html());
        manEntryTemplate.insertAfter(elem);
        var matchingFieldNameInput = $j('#tt' + (index + 1));
        var manEntryBtn = $j('.manEntBtn').last();
        manEntryBtn.on('click', function(e) {
            e.preventDefault();
            matchingFieldNameInput.get(0).focus();
        });
    });

    inputs.off('click');
    inputs.on('click', psDialog);
    inputs.css({visibility: 'visible'});

    $j('#btnDelete').makeConfReqButton();

    // Load saved user and global list reports.
    var reports = [];
    $j.when($j.get('/admin/studentlist/data/sqlListGlobReports.txt'), $j.get('/admin/studentlist/data/sqlListReports.txt'))
        .done(function(globalReportsData, userReportsData) {
            var userReports = $j.parseJSON(userReportsData[0]);
            userReports.pop();

            var globalReports = $j.parseJSON(globalReportsData[0]);
            globalReports.pop();

            // Add all elements from both userReports and globalReports to reports Array.
            reports = userReports.concat(globalReports);

            // Insert list option tags into #loadlist select
            _.each(globalReports, function(elem) {
                var loadListTemplate = $j('#global-load-list-template').html();

                // Get the Global Lists option.
                var globalReportsOption = _.filter($j('#loadlist').children(), function(elem) {
                    return $j(elem).val() === 'Global Lists';
                });

                // Get the next option in the select tag, which is the dash-separator option.
                var select = $j(globalReportsOption).next();
                var renderedTemplate = _.template(loadListTemplate, {report: elem});

                $j(renderedTemplate).insertAfter(select);
            });

            _.each(userReports, function(elem) {
                var loadListTemplate = $j('#user-load-list-template').html();

                // Index of User Reports option in an Array of all child options of #loadlist.
                var userReportsOption = _.filter($j('#loadlist').children(), function(elem) {
                    return $j(elem).val() === 'User Lists';
                });

                // Get the next option in the select tag, which is the dash-separator option.
                var select = $j(userReportsOption).next();
                var renderedTemplate = _.template(loadListTemplate, {report: elem});

                $j(renderedTemplate).insertAfter(select);
            });

            $j('#loadlist').on('change', function() {
                var selectedOption = getSelectedOption();
                if (selectedOption) {
                    var selectedOptionId = selectedOption.data().id;
                    // A user-defined report was selected.
                    if (selectedOptionId) {
                        var selectedReport = _.filter(reports, function(currData) {
                            return currData.id === selectedOptionId.toString();
                        });
                        loadFormFields(selectedReport[0]);
                        // Make sure delete button is only visible for user lists.
                        if (selectedOption.data().type === 'global') {
                            $j('#btnConfirmProxy').css({visibility: 'hidden'});
                        } else {
                            $j('#btnConfirmProxy').css({visibility: 'visible'})
                        }
                    }
                }
            });

            var extraFieldsTemplate = $j($j('#extra-pref-fields-template').html());
            $j('form').append(extraFieldsTemplate);

            $j('form').on('submit', function(e) {
                var formObj = serializeFormToObject();
                var matchingReport = _.find(reports, function(elem) {
                    var tempObj = {};
                    $j.extend(tempObj, elem);

                    // Remove properties from tempObj that aren't present in the form.
                    delete tempObj.dcid;
                    delete tempObj.id;
                    delete tempObj.reportTitle;
                    delete tempObj.type;

                    return _.isEqual(formObj, tempObj);
                });

                if (matchingReport) {
                    var reportIdElem = $j('#report-id');
                    var reportTypeElem = $j('#report-type');

                    reportIdElem.val(matchingReport.id);
                    reportTypeElem.val(matchingReport.type);
                }

                // Make sure all column names have an associated Field Name.
                // If this isn't checked, a Java Exception will be displayed.
                var columnMissingTemplate = $j($j('#column-missing-template').html());
                $j('.error-message').remove();
                var formValid = true;
                if (formObj.columnTitle1 && !formObj.fieldName1) {
                    columnMissingTemplate.clone().insertAfter($j('#tt1').next());
                    formValid = false;
                }
                if (formObj.columnTitle2 && !formObj.fieldName2) {
                    columnMissingTemplate.clone().insertAfter($j('#tt2').next());
                    formValid = false;
                }
                if (formObj.columnTitle3 && !formObj.fieldName3) {
                    columnMissingTemplate.clone().insertAfter($j('#tt3').next());
                    formValid = false;
                }
                if (formObj.columnTitle4 && !formObj.fieldName4) {
                    columnMissingTemplate.clone().insertAfter($j('#tt4').next());
                    formValid = false;
                }
                if (formObj.columnTitle5 && !formObj.fieldName5) {
                    columnMissingTemplate.clone().insertAfter($j('#tt5').next());
                    formValid = false;
                }
                if (formObj.columnTitle6 && !formObj.fieldName6) {
                    columnMissingTemplate.clone().insertAfter($j('#tt6').next());
                    formValid = false;
                }
                if (formObj.columnTitle7 && !formObj.fieldName7) {
                    columnMissingTemplate.clone().insertAfter($j('#tt7').next());
                    formValid = false;
                }
                if (formObj.columnTitle8 && !formObj.fieldName8) {
                    columnMissingTemplate.clone().insertAfter($j('#tt8').next());
                    formValid = false;
                }
                if (formObj.columnTitle9 && !formObj.fieldName9) {
                    columnMissingTemplate.clone().insertAfter($j('#tt9').next());
                    formValid = false;
                }
                if (formObj.columnTitle10 && !formObj.fieldName10) {
                    columnMissingTemplate.clone().insertAfter($j('#tt10').next());
                    formValid = false;
                }
                if (!formValid) {
                    return false;
                }
            });

            var loadOptions = $j('#loadlist').children();

            // Get DOM option element that corresponds to previously run report.
            var loadListOption = _.filter(loadOptions, function(elem) {
                return $j(elem).data().type === psData.lastRunReportType &&
                    $j(elem).data().id.toString() === psData.lastRunReportId;
            });

            $j(loadListOption[0]).prop({'selected': true});


            /**
             *
             * @returns {jQuery|*} Returns the selected option in #loadlist if it's a valid selection. Return undefined
             * if the currently selected option is not a valid report.
             */
            function getSelectedOption() {
                var selectedOption = $j('#loadlist').children().filter(':selected').eq(0);

                // If the option's text includes any of these characters, it's not a valid selection that corresponds to an actual report.
                if (selectedOption.text() === '' || selectedOption.text() === '--------------' || selectedOption.text().indexOf('Lists') !== -1) {
                    selectedOption = undefined;
                }
                return selectedOption;
            }

            $j('#saveSubmit').on('click', function (e) {
                e.preventDefault();
                var formObj = serializeFormToObject();
                var formData;

                var selectedOption = getSelectedOption();

                // If an option is selected, check if the report they selected is the same exact settings in the form
                // If so, just edit that report instead of making a new entry.
                // If both of those conditions aren't true, make a new report record.
                if (selectedOption) {
                    var selectedOptionId = selectedOption.data().id;
                    var selectedReport = _.filter(reports, function(currData) {
                        return currData.id === selectedOptionId.toString();
                    })[0];
                    delete selectedReport.dcid;
                    delete selectedReport.id;
                    delete selectedReport.reportTitle;
                    delete selectedReport.type;

                    if (_.isEqual(formObj, selectedReport)) {
                        formData = serializeFormForPost(selectedOptionId);
                    } else {
                        formData = serializeFormForPost();
                    }

                } else {
                    formData = serializeFormForPost();
                }

                formData.push({name: 'ac', value: 'prim'});
                var encodedData = $j.param(formData);

                // In order for POST requests to work with child database extension tables,
                // a page using the ~[tlist_child] tag must first be loaded.
                // The contents of the page are never used, but for some reason any POST requests that change child tables will return a
                // security violation if the enable_requests page isn't loaded first.
                $j.get('/admin/studentlist/enable_requests.html?frn=204' + psData.userDCID, function() {
                    $j.ajax({
                        data: encodedData,
                        type: 'POST',
                        url: '/admin/changesrecorded.white.html',
                        success: function (msg) {
                            window.location = '/admin/changesrecorded.white.html';
                        }
                    });
                });
            });

            $j('#btnDelete').on('click', function() {
                var selectedReportId = $j('#loadlist').children().filter(':selected').data().id;
                if (selectedReportId) {
                    var postData = [];
                    postData.push({
                        name: 'DC-Users:18277.U_AUTOLOADER.U_DEF_AUTOLOADER_LISTS:' + selectedReportId,
                        value: 'on'
                    });
                    postData.push({
                        name: 'ac',
                        value: 'prim'
                    });
                    $j.ajax({
                        data: postData,
                        type: 'POST',
                        url: '/admin/changesrecorded.white.html',
                        success: function (msg) {
                            window.location = '/admin/changesrecorded.white.html';
                        }
                    });
                }
            });
        });

    function serializeFormToObject() {
        var formObj = {};
        var aFormElements = document.forms.aForm.elements;
        formObj.fieldName1 = aFormElements[3].value;
        formObj.columnTitle1 = aFormElements[4].value;
        formObj.fieldName2 = aFormElements[5].value;
        formObj.columnTitle2 = aFormElements[6].value;
        formObj.fieldName3 = aFormElements[7].value;
        formObj.columnTitle3 = aFormElements[8].value;
        formObj.fieldName4 = aFormElements[9].value;
        formObj.columnTitle4 = aFormElements[10].value;
        formObj.fieldName5 = aFormElements[11].value;
        formObj.columnTitle5 = aFormElements[12].value;
        formObj.fieldName6 = aFormElements[13].value;
        formObj.columnTitle6 = aFormElements[14].value;
        formObj.fieldName7 = aFormElements[15].value;
        formObj.columnTitle7 = aFormElements[16].value;
        formObj.fieldName8 = aFormElements[17].value;
        formObj.columnTitle8 = aFormElements[18].value;
        formObj.fieldName9 = aFormElements[19].value;
        formObj.columnTitle9 = aFormElements[20].value;
        formObj.fieldName10 = aFormElements[21].value;
        formObj.columnTitle10 = aFormElements[22].value;
        formObj.cellPadding = aFormElements[23].value;
        formObj.rowsBreaks = aFormElements[24].value;
        if (aFormElements[26].checked) {
            formObj.gridlines = '1';
        } else {
            formObj.gridlines = '0';
        }
        if (aFormElements[27].checked) {
            formObj.exportVal = '1';
        } else {
            formObj.exportVal = '0';
        }

        formObj.sortFieldName1 = aFormElements[28].value;
        formObj.sortDir1 = aFormElements[29].value;
        formObj.sortFieldName2 = aFormElements[30].value;
        formObj.sortDir2 = aFormElements[31].value;
        formObj.sortFieldName3 = aFormElements[32].value;
        formObj.sortDir3 = aFormElements[33].value;
        return formObj;
    }

    // Create a JavaScript object that matches the form ~[tlist_child] elements.
    function serializeFormForPost(recordId) {
        var extensionName = 'U_AUTOLOADER';
        var tableName = 'U_DEF_AUTOLOADER_LISTS';
        var formData = [];
        var formInputs = $j(':input').filter(':not("[type=hidden]")').filter(':not("button")').filter(':not("#loadlist")').filter(':not(".headerrow")');

        // Field names of database extension table in the order they appear on the form.
        var customFieldNames = [
            'REPORT_TITLE',
            'FIELD_NAME1',
            'COLUMN_TITLE1',
            'FIELD_NAME2',
            'COLUMN_TITLE2',
            'FIELD_NAME3',
            'COLUMN_TITLE3',
            'FIELD_NAME4',
            'COLUMN_TITLE4',
            'FIELD_NAME5',
            'COLUMN_TITLE5',
            'FIELD_NAME6',
            'COLUMN_TITLE6',
            'FIELD_NAME7',
            'COLUMN_TITLE7',
            'FIELD_NAME8',
            'COLUMN_TITLE8',
            'FIELD_NAME9',
            'COLUMN_TITLE9',
            'FIELD_NAME10',
            'COLUMN_TITLE10',
            'CELL_PADDING',
            'ROWS_BREAKS',
            'GRIDLINES',
            'EXPORT',
            'SORT_FIELD_NAME1',
            'SORT_DIR1',
            'SORT_FIELD_NAME2',
            'SORT_DIR2',
            'SORT_FIELD_NAME3',
            'SORT_DIR3'
        ];

        //Create form key names that match the form (example):
        //CF-[Users:18277.U_AUTOLOADER.U_DEF_AUTOLOADER_LISTS3:-1]REPORT_TITLE
        //CF-[{Parent table name}:{Foreign key to Users table}.{ExtensionGroup}.{ExtensionTable}:-1]{ColumnName}
        _.each(formInputs, function (elem, index) {
            var formKeyName = 'CF-[Users:' + psData.userDCID +
                '.' +
                extensionName +
                '.' +
                tableName +
                ':';
            if (!recordId) {
                formKeyName += '-1';
            } else {
                formKeyName += recordId;
            }
            formKeyName += ']' + customFieldNames[index];

            if (formInputs.eq(index).attr('type') === 'checkbox') {
                formData.push({ name: formKeyName, value: formInputs.eq(index).is(':checked') ? 1 : 0 });
            } else {
                formData.push({ name: formKeyName, value: formInputs.eq(index).val() });
            }
        });
        return formData;
    }

    function loadFormFields(report) {
        var aFormElements = document.forms.aForm.elements;
        if (report) {
            aFormElements[0].value = report.hasOwnProperty('reportTitle') ? report.reportTitle : '';
            aFormElements[3].value = report.hasOwnProperty('fieldName1') ? report.fieldName1 : '';
            aFormElements[4].value = report.hasOwnProperty('columnTitle1') ? report.columnTitle1 : '';
            aFormElements[5].value = report.hasOwnProperty('fieldName2') ? report.fieldName2 : '';
            aFormElements[6].value = report.hasOwnProperty('columnTitle2') ? report.columnTitle2 : '';
            aFormElements[7].value = report.hasOwnProperty('fieldName3') ? report.fieldName3 : '';
            aFormElements[8].value = report.hasOwnProperty('columnTitle3') ? report.columnTitle3 : '';
            aFormElements[9].value = report.hasOwnProperty('fieldName4') ? report.fieldName4 : '';
            aFormElements[10].value = report.hasOwnProperty('columnTitle4') ? report.columnTitle4 : '';
            aFormElements[11].value = report.hasOwnProperty('fieldName5') ? report.fieldName5 : '';
            aFormElements[12].value = report.hasOwnProperty('columnTitle5') ? report.columnTitle5 : '';
            aFormElements[13].value = report.hasOwnProperty('fieldName6') ? report.fieldName6 : '';
            aFormElements[14].value = report.hasOwnProperty('columnTitle6') ? report.columnTitle6 : '';
            aFormElements[15].value = report.hasOwnProperty('fieldName7') ? report.fieldName7 : '';
            aFormElements[16].value = report.hasOwnProperty('columnTitle7') ? report.columnTitle7 : '';
            aFormElements[17].value = report.hasOwnProperty('fieldName8') ? report.fieldName8 : '';
            aFormElements[18].value = report.hasOwnProperty('columnTitle8') ? report.columnTitle8 : '';
            aFormElements[19].value = report.hasOwnProperty('fieldName9') ? report.fieldName9 : '';
            aFormElements[20].value = report.hasOwnProperty('columnTitle9') ? report.columnTitle9 : '';
            aFormElements[21].value = report.hasOwnProperty('fieldName10') ? report.fieldName10 : '';
            aFormElements[22].value = report.hasOwnProperty('columnTitle10') ? report.columnTitle10 : '';
            aFormElements[23].value = report.hasOwnProperty('cellPadding') ? report.cellPadding : '';
            aFormElements[24].value = report.hasOwnProperty('rowsBreaks') ? report.rowsBreaks : '';
            if (report.hasOwnProperty('gridlines')) {
                if (!report.gridlines || report.gridlines === '0') {
                    aFormElements[26].checked = false;
                } else {
                    aFormElements[26].checked = true;
                }
            }

            if (report.hasOwnProperty('exportVal')) {
                if (!report.exportVal || report.exportVal === '0') {
                    aFormElements[27].checked = false;
                } else {
                    aFormElements[27].checked = true;
                }
            }
            aFormElements[28].value = report.hasOwnProperty('sortFieldName1') ? report.sortFieldName1 : '';
            aFormElements[29].value = report.hasOwnProperty('sortDir1') ? report.sortDir1 : '>';
            aFormElements[30].value = report.hasOwnProperty('sortFieldName2') ? report.sortFieldName2 : '';
            aFormElements[31].value = report.hasOwnProperty('sortDir2') ? report.sortDir2 : '>';
            aFormElements[32].value = report.hasOwnProperty('sortFieldName3') ? report.sortFieldName3 : '';
            aFormElements[33].value = report.hasOwnProperty('sortDir3') ? report.sortDir3 : '>';
            aFormElements[34].value = 'prim';
        } else {
            aFormElements[0].value = '';
            aFormElements[3].value = '';
            aFormElements[4].value = '';
            aFormElements[5].value = '';
            aFormElements[6].value = '';
            aFormElements[7].value = '';
            aFormElements[8].value = '';
            aFormElements[9].value = '';
            aFormElements[10].value = '';
            aFormElements[11].value = '';
            aFormElements[12].value = '';
            aFormElements[13].value = '';
            aFormElements[14].value = '';
            aFormElements[15].value = '';
            aFormElements[16].value = '';
            aFormElements[17].value = '';
            aFormElements[18].value = '';
            aFormElements[19].value = '';
            aFormElements[20].value = '';
            aFormElements[21].value = '';
            aFormElements[22].value = '';
            aFormElements[23].value = '';
            aFormElements[24].value = '';
            aFormElements[26].checked = false;
            aFormElements[27].checked = false;
            aFormElements[28].value = '';
            aFormElements[29].value = '>';
            aFormElements[30].value = '';
            aFormElements[31].value = '>';
            aFormElements[32].value = '';
            aFormElements[33].value = '>';
            aFormElements[34].value = 'prim';
        }
    }
});

