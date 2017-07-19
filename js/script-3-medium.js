 /*
 * Just a bunch of javascript
 * At the bottom, there's a console.log
 */

 //-- Start dummy js
    function hideSpinner() {
    jQuery('#spinner-container').fadeOut(500);
    }
    function initDatePicker(minDate, maxDate) {
    jQuery.datepicker.regional['nl'] = {
    closeText: 'Sluiten',
    prevText: 'Volgende',
    nextText: 'Vorige',
    currentText: 'Vandaag',
    monthNames: ['januari', 'februari', 'maart', 'april', 'mei', 'juni',
    'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
    monthNamesShort: ['jan', 'feb', 'maa', 'apr', 'mei', 'jun',
    'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
    dayNames: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
    dayNamesShort: ['zon', 'maa', 'din', 'woe', 'don', 'vri', 'zat'],
    dayNamesMin: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
    weekHeader: 'Wk',
    dateFormat: 'dd-mm-yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
    };
    jQuery.datepicker.regional['nl-BE'] = {
    closeText: 'Sluiten',
    prevText: 'Volgende',
    nextText: 'Vorige',
    currentText: 'Vandaag',
    monthNames: ['januari', 'februari', 'maart', 'april', 'mei', 'juni',
    'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
    monthNamesShort: ['jan', 'feb', 'maa', 'apr', 'mei', 'jun',
    'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
    dayNames: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
    dayNamesShort: ['zon', 'maa', 'din', 'woe', 'don', 'vri', 'zat'],
    dayNamesMin: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
    weekHeader: 'Wk',
    dateFormat: 'dd/mm/yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
    };
    jQuery.datepicker.regional['de'] = {
    closeText: 'schließen',
    prevText: '&#x3c;zurück',
    nextText: 'Vor&#x3e;',
    currentText: 'heute',
    monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    monthNamesShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun',
    'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    dayNamesShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    dayNamesMin: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    weekHeader: 'Wo',
    dateFormat: 'dd.mm.yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
    };
    if (jQuery('html').attr('lang') == 'nl-NL') jQuery.datepicker.setDefaults(jQuery.datepicker.regional['nl']);
    if (jQuery('html').attr('lang') == 'nl-BE') jQuery.datepicker.setDefaults(jQuery.datepicker.regional['nl-BE']);
    if (jQuery('html').attr('lang') == 'de-DE') jQuery.datepicker.setDefaults(jQuery.datepicker.regional['de']);
    jQuery('.datepicker').datepicker({ onSelect: dateSelected, dateFormat: 'dd-mm-yy', minDate: minDate, maxDate: maxDate });
    }
    function openExternalLinksInNewWindow() {
    var arrExternalLinks = jQuery('a[href^="http://"], a[rel~=external]');
    var strCurrentDomain = window.location.host;
    jQuery(arrExternalLinks).each(function (index, elExternalLink) {
    var blnShadowboxLink = false;
    if (jQuery(elExternalLink).attr('rel')) {
    if (jQuery(elExternalLink).attr('rel').indexOf('lightbox') != -1) blnShadowboxLink = true;
    }
    if (jQuery(elExternalLink).attr('href').indexOf(strCurrentDomain) == -1 && !blnShadowboxLink) {
    jQuery(elExternalLink).on('click', function (e) {
    e.preventDefault();
    window.open(jQuery(this).attr('href'));
    });
    }
    blnShadowboxLink = false;
    });
    }
    function equalizeHeight(arrItems) {
    var intHeight = 0;
    var intHeightMax = 0;
    var intItemsPerRow = 0;
    var intIndexPerParent = -1;
    var elParent = jQuery(arrItems).first().parent();
    var intChildrenCount = jQuery(elParent).children().length;
    var arrItemsOnRow = [];
    var elHiddenParent;
    var blnPseudoSelectors = false;
    jQuery(arrItems).each(function (index, elItem) {
    elHiddenParent = '';
    if (jQuery(elParent)[0] != jQuery(jQuery(elItem).parent())[0]) {
    elParent = jQuery(elItem).parent();
    intItemsPerRow = 0;
    intIndexPerParent = -1;
    intChildrenCount = jQuery(elParent).children().length;
    }
    if (intItemsPerRow == 0) intItemsPerRow = Math.floor(jQuery(elParent).width() / jQuery(elItem).outerWidth());
    intIndexPerParent++;
    if (jQuery(elItem).css('display') == 'none') {
    jQuery(elItem).addClass('measure');
    } else {
    jQuery(elItem).parents().each(function () {
    if (jQuery(this).css('display') == 'none') {
    elHiddenParent = jQuery(this);
    return false;
    }
    });
    jQuery(elHiddenParent).addClass('measure');
    }
    intHeightMax = (jQuery(elItem).height() > intHeightMax) ? jQuery(elItem).height() : intHeightMax;
    if (jQuery(elItem).add(elHiddenParent).hasClass('measure')) jQuery(elItem).add(elHiddenParent).removeClass('measure');
    arrItemsOnRow.push(elItem);
    if (intIndexPerParent % intItemsPerRow == intItemsPerRow - 1 || intIndexPerParent == intChildrenCount - 1) {
    jQuery(arrItemsOnRow).css('height', intHeightMax);
    jQuery(arrItemsOnRow).data('height', intHeightMax);
    if (blnPseudoSelectors) {
    jQuery(jQuery(arrItemsOnRow)[0]).addClass('left');
    jQuery(jQuery(arrItemsOnRow)[jQuery(arrItemsOnRow).length - 1]).addClass('right');
    if (intIndexPerParent == intChildrenCount - 1) jQuery(elItem).addClass('last');
    }
    intHeightMax = 0;
    arrItemsOnRow = [];
    }
    });
    }
    function equalizeHeightOfItemsWithinColumns(arrColumns) {
    var intHeightMax = 0;
    var intItemsPerRow = jQuery(arrColumns).length;
    var arrItemsOnRow = [];
    if (jQuery(arrColumns).first().children().length > 1) {
    jQuery(arrColumns).first().children().each(function (intItemIndex) {
    for (var i = 0; i < intItemsPerRow; i++) {
    var elItem = jQuery(arrColumns[i]).children()[intItemIndex];
    if (elItem) arrItemsOnRow.push(elItem);
    intHeightMax = (jQuery(elItem).height() > intHeightMax) ? jQuery(elItem).height() : intHeightMax;
    }
    if (arrItemsOnRow.length > 1) jQuery(arrItemsOnRow).css('height', intHeightMax);
    intHeightMax = 0;
    arrItemsOnRow = [];
    });
    }
    }
    function breadcrumbPathDropdownMenu() {
    jQuery('.breadcrumb-path > div.dropdown-menu-holder').each(function (index, elDropdownMenuHolder) {
    var removeStates = function () {
    jQuery(elDropdownMenuHolder).removeClass('state-hover');
    jQuery(elDropdownMenuHolder).removeClass('state-dropdown-enabled');
    }
    jQuery(elDropdownMenuHolder).on('mouseleave', function (e) {
    removeStates();
    });
    jQuery(elDropdownMenuHolder).children('a.icon').on('hover', function (e) {
    jQuery(elDropdownMenuHolder).addClass('state-hover');
    if (typeof objDelayedRemove === 'undefined') {
    } else {
    window.clearTimeout(objDelayedRemove);
    }
    });
    jQuery(elDropdownMenuHolder).children('a.icon').on('click', function (e) {
    jQuery(elDropdownMenuHolder).toggleClass('state-dropdown-enabled');
    });
    jQuery(elDropdownMenuHolder).find('ul.dropdown-menu').on('mouseleave', function (e) {
    objDelayedRemove = window.setTimeout(function () {
    removeStates();
    }, 100);
    });
    });
    }
    function tooltips(arrElements) {
    var $ = jQuery;// so we don't have to type it out in full
    var $tooltip = $('<div class="tooltip">')
    .append($('<div class="tooltip-body">')
    .text('&#160;'))
    .append($('<div class="tooltip-arrow">') 
    .text('&#160;'));
    $('body').append($tooltip);
    $(arrElements).add($('.tooltip-link')).each(function (index, el) {
    var $elm = $(el);
    if (!$.isBlank($elm.attr('title'))) {
    $elm.data('tooltip-text', $elm.attr('title'));
    } else if ($elm.text() !== '' && $elm.attr('class') !== 'like-details' && $elm.attr('class') !== 'dislike-details') {
    $elm.data('tooltip-text', $elm.text());
    } else {
    $elm.data('tooltip-text', '');
    $elm.unbind('mouseenter').unbind('mouseleave');
    }
    if (!$.isBlank($elm.attr('title')) || ($elm.text() !== '' && $elm.attr('class') !== 'like-details' && $elm.attr('class') !== 'dislike-details')) {
    $elm.removeAttr('title');
    $elm.on('mouseenter', function () {
    $tooltip.find('.tooltip-body').html($elm.data('tooltip-text'));
    $tooltip.show();
    $tooltip.css({
    'top': Math.floor($elm.offset().top - $tooltip.height() - 8),
    'left': Math.floor($elm.offset().left - $tooltip.find('.tooltip-arrow').position().left + 2)
    });
    });
    $elm.on('mouseleave', function () {
    $tooltip.hide();
    });
    }
    });
    }
    function reactionsPanel() {
    jQuery('.reactions-container > .react-form textarea').focus(function () {
    var $this = jQuery(this);
    if (!$this.data('orgiginal-content')) {
    $this.data('orgiginal-content', $this.val());
    $this.val('');
    }
    }).blur(function () {
    var $this = jQuery(this);
    if (!$this.val() && $this.data('orgiginal-content')) {
    $this.val($this.data('orgiginal-content'));
    $this.data('orgiginal-content', false);
    }
    });
    jQuery('.user-reaction textarea').focus(function () {
    jQuery(this).parents('.user-reaction').addClass('state-edit');
    });
    jQuery('.reactions-container .button-attention').click(function (e) {
    e.preventDefault();
    var elListItem = jQuery(this).parent('li');
    ReportAbuse(jQuery(elListItem), jQuery(elListItem).data('fcReactionid'));
    });
    jQuery('.user-reaction .button-edit').click(function () {
    jQuery(this).parent('li').addClass('state-edit');
    });
    jQuery('.reactions-container').each(function (indexContainer, elContainer) {
    var listItems = jQuery(elContainer).find('ul.reactions-list > li');
    if (listItems.length > 2) {
    jQuery(elContainer).find('div.show-all-reactions-holder > a.more-link').click(function () {
    listItems.removeClass('hidden');
    jQuery(this).addClass('hidden');
    }).removeClass('hidden');
    }
    });
    jQuery('.reactions-panel').each(function (index, elReactionsPanel) {
    if (jQuery(elReactionsPanel).hasClass('state-closed')) {
    jQuery(elReactionsPanel).hide();
    } else {
    jQuery(elReactionsPanel).show();
    }
    jQuery(elReactionsPanel).siblings('.share-state').find('.share-state-reactions > a').on('click', function (event) {
    event.preventDefault();
    if (jQuery(elReactionsPanel).hasClass('state-closed')) {
    jQuery(elReactionsPanel).show('fast');
    jQuery(elReactionsPanel).removeClass('state-closed');
    } else {
    jQuery(elReactionsPanel).hide('fast');
    jQuery(elReactionsPanel).addClass('state-closed');
    }
    });
    });
    function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results == null)
    return "";
    else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    var thread = getParameterByName('thread');
    if (thread && jQuery('*[data-fc-sharedpageid=' + thread + ']').length > 0) {
    if (jQuery('.share-state-container').size() > 0) {
    jQuery('.share-state-container').find('.reactions-panel').removeClass('state-close');
    jQuery('.share-state-container').find('.reactions-panel').show();
    jQuery(window).scrollTop(jQuery('.share-state-container > h3').first().offset().top - 10);
    }
    }
    jQuery('.reactions-container a.button-action').click(function (e) {
    e.preventDefault();
    var $this = jQuery(this),
    reactionpanel = $this.parents('div.reactions-container'),
    contentId = reactionpanel.find('div#ContentItemDiv').text(),
    parentLi = $this.parents('li.user-reaction'),
    textarea = $this.parent('div').find('textarea'),
    mode = parentLi.length > 0 ? 'edit' : 'new';
    if (textarea.val() != '' && !$this.attr('disabled')) {
    $this.attr('disabled', 'disabled').addClass('button-loading');
    var url = (mode == 'new') ? '/zip/zup/Reactions.jpg/AddReaction' : '/zip/zup/Reactions.jpg/UpdateReaction',
    sendData =
    {
    sharedPageID: reactionpanel.data('fc-sharedpageid'),
    contentItemId: reactionpanel.data('fc-contentitemid'),
    from: reactionpanel.data('fc-userid'),
    message: textarea.val(),
    reactionID: parentLi.data('fc-reactionid')
    };
    jQuery.ajax({
    type: 'POST',
    contentType: 'application/json; charset=utf-8',
    url: url,
    data: JSON.stringify(sendData),
    dataType: 'json',
    complete: function () {
    $this.removeAttr('disabled').removeClass('button-loading');
    },
    success: function (result) {
    if (!result || !result.d) {
    location.href = '/500.html';
    return;
    }
    if (result.d.StatusCode > 0) {
    alert(result.d.ServerMessage);
    return;
    }
    if (mode == 'new') {
    location.href = result.d.ServerMessage;
    } else {
    parentLi.removeClass('state-edit');
    }
    }
    });
    }
    });
    }
    function deleteReaction(item, id) {
    var sendData = 'reactieID:"' + id + '"';
    jQuery.ajax({
    type: 'POST',
    contentType: 'application/json; charset=utf-8',
    url: '/zip/zup/Reactions.jpg/RemoveReaction',
    data: '{' + sendData + '}',
    dataType: 'json',
    success: function (result) {
    if (result.d.StatusCode == 0) {
    item.remove();
    }
    }
    });
    }
    function ReportAbuse(item, id) {
    var sendData = 'reactieID:"' + id + '"';
    jQuery.ajax({
    type: 'POST',
    contentType: 'application/json; charset=utf-8',
    url: '/zip/zup/Reactions.jpg/ReportAbuse',
    data: '{' + sendData + '}',
    dataType: 'json',
    success: function (result) {
    item.find('a.button-attention').addClass('reported');
    item.find('div.reaction-inappropriate-text').find('span.text').text(result.d.ServerMessage)
    item.find('div.reaction-inappropriate-text').show();
    }
    });
    }
    function removeNotification() {
    jQuery('.notification').each(function (index, elNotification) {
    jQuery(elNotification).find('.button-close').on('click', function () {
    jQuery(elNotification).hide();
    });
    });
    }
    function headerPrimaryNavIndicatorPreset() {
    var elIndicator = jQuery('.header .nav-indicator');
    var intIndicatorWidth = 180;
    var intIndicatorLeft = 0;
    jQuery('.primary-nav > li > a').each(function (index, elMainNavLink) {
    if (jQuery(this).parent('li').hasClass('active')) {
    intIndicatorWidth = Math.floor(jQuery(elMainNavLink).width());
    intIndicatorLeft = parseInt(jQuery('.primary-nav').css('left')) + jQuery(elMainNavLink).position().left;
    return false;
    }
    });
    jQuery(elIndicator).css({
    'width': intIndicatorWidth,
    'left': intIndicatorLeft
    });
    }
    function headerPrimaryNav() {
    var intShowingDelayMilliSeconds = 350;
    var intHidingDelayMilliSeconds = 2500;
    var arrMainNavItems = jQuery('.primary-nav > li');
    var elSubNavPanelPrevious;
    var elSubNavPanelCurrent;
    var elHeaderSubNavOverlay = jQuery('.header-sub-nav-overlay');
    var objDelayedHiding;
    var objDelayedShowing;
    var objDelayedResetHover;
    var objDelayedIndicatorReturn;
    var intSubNavPanelIndex = -1;
    var elIndicator = jQuery('.header .nav-indicator');
    var intMainNavLeft = parseInt(jQuery('.primary-nav').css('left'));
    var arrMainNavLinks = jQuery(arrMainNavItems).children('a');
    var arrIndicatorWidths = [[180, 0]]; // Default width en left position of the blue FC logo text.
    var intMainNavItemActiveIndex = 0;
    var showSubNavPanel = function (elSubNavPanel, intSubNavPanelHeight) {
    jQuery(elSubNavPanel).stop();
    jQuery(elSubNavPanel).css('height', 0);
    jQuery(elSubNavPanel).animate({
    'height': intSubNavPanelHeight
    });
    jQuery(elHeaderSubNavOverlay).stop();
    jQuery(elHeaderSubNavOverlay).show();
    jQuery(elHeaderSubNavOverlay).animate({
    'opacity': 0.5
    });
    }
    var hideSubNavPanel = function (elSubNavPanel) {
    intSubNavPanelIndex = -1;
    jQuery(elSubNavPanel).stop();
    jQuery(elSubNavPanel).animate({
    'height': 0
    });
    jQuery(elHeaderSubNavOverlay).stop();
    jQuery(elHeaderSubNavOverlay).animate({
    'opacity': 0
    }, function () {
    jQuery(elHeaderSubNavOverlay).hide()
    });
    }
    var resetHover = function () {
    jQuery(arrMainNavItems).removeClass('state-hover');
    }
    jQuery(arrMainNavItems).each(function (index, elMainNavItem) {
    jQuery(elMainNavItem).on({
    'mouseenter': function () {
    clearTimeout(objDelayedResetHover);
    clearTimeout(objDelayedIndicatorReturn);
    resetHover();
    jQuery(this).addClass('state-hover');
    },
    'mouseleave': function () {
    objDelayedResetHover = setTimeout(function () { resetHover() }, intHidingDelayMilliSeconds);
    }
    });
    var elSubNavPanel = jQuery(elMainNavItem).children('.sub-nav-panel');
    if (jQuery(elSubNavPanel).length > 0) {
    var elSubNav = jQuery(elSubNavPanel).children('.sub-nav');
    var intSubNavPanelHeight = parseInt(jQuery(elSubNav).css('paddingTop')) + parseInt(jQuery(elSubNav).children('li').first().css('height')) + parseInt(jQuery(elSubNav).css('paddingBottom'));
    jQuery(elMainNavItem).children('a').on({
    'click': function(e) {
    if ('ontouchmove' in window) {
    e.preventDefault();
    }
    },
    'mouseenter': function () {
    clearTimeout(objDelayedHiding);
    elSubNavPanelCurrent = elSubNavPanel;
    if (intSubNavPanelIndex != index) {
    hideSubNavPanel(elSubNavPanelPrevious)
    objDelayedShowing = setTimeout(function () { showSubNavPanel(elSubNavPanel, intSubNavPanelHeight) }, intShowingDelayMilliSeconds);
    }
    },
    'mouseleave': function () {
    clearTimeout(objDelayedShowing);
    elSubNavPanelPrevious = elSubNavPanel;
    objDelayedHiding = setTimeout(function () { hideSubNavPanel(elSubNavPanel) }, intHidingDelayMilliSeconds);
    }
    });
    }
    jQuery(elSubNav).on({
    'mouseenter': function () {
    intSubNavPanelIndex = index;
    clearTimeout(objDelayedHiding);
    clearTimeout(objDelayedIndicatorReturn);
    },
    'mouseleave': function () {
    objDelayedHiding = setTimeout(function () { hideSubNavPanel(elSubNavPanel) }, intHidingDelayMilliSeconds);
    objDelayedIndicatorReturn = setTimeout(function () { indicatorReturnAnimation() }, intHidingDelayMilliSeconds);
    }
    });
    });
    var indicatorReturnAnimation = function () {
    jQuery(elIndicator).stop();
    jQuery(elIndicator).animate({
    'width': jQuery(arrIndicatorWidths)[intMainNavItemActiveIndex][0],
    'left': jQuery(arrIndicatorWidths)[intMainNavItemActiveIndex][1]
    });
    }
    jQuery(arrMainNavLinks).each(function (index, elMainNavLink) {
    if (jQuery(this).parent('li').hasClass('active')) intMainNavItemActiveIndex = index + 1;
    arrIndicatorWidths.push([jQuery(this).width(), intMainNavLeft + Math.floor(jQuery(this).position().left)]);
    jQuery(this).on({
    'mouseenter': function () {
    jQuery(elIndicator).stop();
    jQuery(elIndicator).animate({
    'width': jQuery(arrIndicatorWidths)[index + 1][0],
    'left': jQuery(arrIndicatorWidths)[index + 1][1]
    });
    },
    'mouseleave': function () {
    objDelayedIndicatorReturn = setTimeout(function () { indicatorReturnAnimation() }, intHidingDelayMilliSeconds);
    }
    });
    });
    jQuery('.header .logo').on({
    'mouseenter': function () {
    jQuery(elIndicator).stop();
    jQuery(elIndicator).animate({
    'width': jQuery(arrIndicatorWidths)[0][0],
    'left': jQuery(arrIndicatorWidths)[0][1]
    });
    },
    'mouseleave': function () {
    indicatorReturnAnimation();
    }
    });
    jQuery('.nav-indicator-holder > .pagewrapper').on({
    'mouseenter': function () {
    clearTimeout(objDelayedResetHover);
    clearTimeout(objDelayedHiding);
    clearTimeout(objDelayedIndicatorReturn);
    },
    'mouseleave': function () {
    objDelayedHiding = setTimeout(function () { hideSubNavPanel(elSubNavPanelCurrent) }, intHidingDelayMilliSeconds);
    }
    });
    jQuery(elIndicator).css({
    'width': jQuery(arrIndicatorWidths)[intMainNavItemActiveIndex][0],
    'left': jQuery(arrIndicatorWidths)[intMainNavItemActiveIndex][1]
    });
    }//headerPrimaryNav
    function submitOnEnter(elParent) {
    var elSubmitButton = jQuery(elParent).find('a.button.submit');
    jQuery(elParent).find('input[type=text]').each(function (intIndex, elInput) {
    jQuery(elInput).on('keydown', function (e) {
    if (e.which == 13) {
    e.preventDefault();
    eval(jQuery(elSubmitButton).attr('href'));
    }
    });
    });
    }
    function nestedInputs() {
    var arrNestedInputs = jQuery('.nested-input');
    var objCheckAllNestedInputsLoop;
    var test = document.createElement('input');
    if ('placeholder' in test) {
    arrNestedInputs.addClass('placeholder');
    } else {
    var blnInputEmpty = function (elInput) {
    var blnInputEmpty = false;
    if (jQuery(elInput).attr('value') == '') blnInputEmpty = true;
    return blnInputEmpty;
    }
    checkAllNestedInputs = function () {
    jQuery(arrNestedInputs).each(function (index, elNestedInput) {
    var elLabel = jQuery(elNestedInput).children('label');
    var elInput = jQuery(elNestedInput).children('input.text');
    if (!blnInputEmpty(elInput)) {
    jQuery(elLabel).hide();
    }
    });
    }
    jQuery(arrNestedInputs).each(function (index, elNestedInput) {
    var elLabel = jQuery(elNestedInput).children('label');
    var elInput = jQuery(elNestedInput).children('input.text');
    jQuery(elInput).on({
    'focus': function () {
    jQuery(elLabel).hide();
    clearInterval(objCheckAllNestedInputsLoop);
    objCheckAllNestedInputsLoop = setInterval('checkAllNestedInputs()', 1000);
    },
    'blur': function () {
    if (blnInputEmpty(elInput)) jQuery(elLabel).show();
    clearInterval(objCheckAllNestedInputsLoop);
    }
    });
    if (blnInputEmpty(elInput)) jQuery(elLabel).show();
    });
    }
    }
    function linksWithinLabels() {
    if (jQuery('label').find('a').length != 0) {
    jQuery('label').find('a').click(function (event) {
    event.preventDefault();
    event.stopPropagation();
    window.open(jQuery(this).attr('href'));
    });
    }
    }
    function multiColumizeList(arrLists) {
    jQuery(arrLists).each(function (index, elList) {
    var intAmountLi = jQuery(elList).children('ul').children().length;
    var intAmountLiLeft = Math.ceil(intAmountLi / 2);
    if (intAmountLi > 2) {
    jQuery(elList).children('ul').addClass('column-left');
    jQuery('<ul />').insertAfter('.column-left').addClass('links-list column-right');
    for (var i = (intAmountLiLeft) ; i < (intAmountLi) ; i++) {
    var thisLi = jQuery(elList).children('ul').children()[(intAmountLiLeft)];
    jQuery(thisLi).appendTo(jQuery(elList).find('.column-right'));
    }
    }
    });
    }
    function ulHasUl(el) {
    jQuery(el).has('ul').addClass('has-child');
    }
    function lastChildSelector() {
    jQuery('.simple-table tbody tr:last-child').addClass('last-child');
    }
    function scrollableTable(arrTables) {
    var blnIE7 = (jQuery.browser.msie && jQuery.browser.version == 7);
    var elViewport = jQuery('<div>').addClass('table-viewport');
    var intLabelCellWidth;
    var intCellCountMax;
    var intContentCellWidth = new Array();
    var totalWidth = 0;
    var intTableMaxWidth = 730;
    jQuery(arrTables).each(function (index, elTable) {
    intLabelCellWidth = jQuery(elTable).find('tbody > tr:first > th').width();
    intCellCountMax = jQuery(elTable).find('tbody > tr:first > td').length;
    jQuery(elTable).find('tbody > tr:first > td').each(function (i, el) {
    intContentCellWidth.push(jQuery(el).width());
    totalWidth += jQuery(el).width();
    });
    if (totalWidth > (intTableMaxWidth - intLabelCellWidth - ((intCellCountMax + 1) * 20)) && intLabelCellWidth != null) {
    jQuery(elTable).wrap(jQuery(elViewport).clone());
    }
    });
    jQuery('div.table-viewport').each(function (index, elTableViewport) {
    jQuery(elTableViewport).addClass('measure');
    var elTableLabels = jQuery(elTableViewport).children('table').first();
    var arrTableColumns = (blnIE7) ? jQuery(elTableLabels).find('tr:first > th, tr:first > td') : jQuery(elTableLabels).find('col');
    jQuery(arrTableColumns).first().css('width', intLabelCellWidth);
    jQuery(arrTableColumns).not(':first').each(function (i, col) {
    jQuery(col).width(intContentCellWidth[i]);
    });
    jQuery(arrTableColumns).not(':first').css('width', intContentCellWidth);
    var elTableContents = elTableLabels.clone().addClass('table-contents');
    jQuery(elTableContents).prependTo(jQuery(elTableViewport));
    var elTableFooter = elTableLabels.clone().addClass('table-footer');
    jQuery(elTableFooter).find('thead, tbody').remove();
    jQuery(elTableFooter).appendTo(jQuery(elTableViewport).parent());
    jQuery(elTableLabels).addClass('table-labels');
    if (jQuery('.table-labels thead th').outerHeight() > jQuery('.table-contents thead th').outerHeight()) {
    jQuery('.table-contents thead th').height(jQuery('.table-labels thead th').outerHeight());
    } else if (jQuery('.table-contents thead th').outerHeight() > jQuery('.table-labels thead th').outerHeight()) {
    jQuery('.table-labels thead th').height(jQuery('.table-contents thead th').outerHeight());
    }
    var intFirstColumnWidth = jQuery(elTableLabels).outerWidth();
    var intFirstLabelColumnWidth = intFirstColumnWidth + parseInt(jQuery(arrTableColumns).first().css('paddingLeft')) - 5;
    if (blnIE7) intFirstLabelColumnWidth -= 30;
    var intViewportWidth = jQuery(elTableViewport).width() - intFirstLabelColumnWidth;
    var intTableDataWidth = jQuery(arrTableColumns).not(':first').length * jQuery(arrTableColumns[1]).outerWidth();
    jQuery(elTableContents).css('width', intFirstColumnWidth + intTableDataWidth);
    jQuery(elTableLabels).css('width', intFirstLabelColumnWidth);
    var elViewportShadowLeft = jQuery('<div>').addClass('viewport-shadow-left').css({
    'opacity': 0,
    'marginLeft': intFirstLabelColumnWidth
    });
    var elViewportShadowRight = jQuery('<div>').addClass('viewport-shadow-right');
    jQuery(elViewportShadowLeft).add(elViewportShadowRight).appendTo(elTableViewport);
    var elParent = jQuery(elTableViewport).parent();
    var intDifference = jQuery(elTableContents).width() - jQuery(elTableViewport).width();
    if (intDifference > 0) {
    var fltProportion = intDifference / intViewportWidth;
    var intHandleWidth = Math.round((1 - fltProportion) * intViewportWidth);
    intHandleWidth -= intHandleWidth % 2;
    jQuery(elTableViewport).after('<\div class="slider-holder"><\div class="ui-slider"><\/div><\/div>');
    var elSliderHolder = jQuery(elParent).find('.slider-holder');
    var elSlider = jQuery(elParent).find('.ui-slider');
    jQuery(elSliderHolder).width(intViewportWidth);
    var viewportShadowFading = function (intValue) {
    if (intValue > 90) {
    jQuery(elViewportShadowLeft).css('opacity', 1);
    jQuery(elViewportShadowRight).css('opacity', (100 - intValue) / 10);
    } else if (intValue < 10) {
    jQuery(elViewportShadowLeft).css('opacity', intValue / 10);
    jQuery(elViewportShadowRight).css('opacity', 1);
    } else {
    jQuery(elViewportShadowLeft).css('opacity', 1);
    jQuery(elViewportShadowRight).css('opacity', 1);
    }
    }
    jQuery(elSlider).slider({
    orientation: 'horizontal',
    min: 0,
    max: 100,
    value: 0,
    slide: function (event, ui) {
    var intLeftValue = -(ui.value * intDifference / 100);
    jQuery(elTableContents).css({ left: intLeftValue });
    viewportShadowFading(ui.value);
    },
    change: function (event, ui) {
    var intLeftValue = -(ui.value * intDifference / 100);
    jQuery(elTableContents).css({ left: intLeftValue });
    viewportShadowFading(ui.value);
    }
    });
    var elSliderHandle = jQuery(elParent).find('.ui-slider-handle');
    var intHandleMargin = Math.ceil(-0.25 * intHandleWidth);
    jQuery(elSliderHandle).css({
    'width': intHandleWidth,
    'margin-left': -(intHandleWidth / 2)
    });
    jQuery(elSliderHolder).css({
    'width': intViewportWidth,
    'margin-left': intFirstLabelColumnWidth
    });
    jQuery(elSlider).css('width', jQuery(elSliderHolder).width())
    var intSliderWidth = jQuery(elSlider).width() - intHandleWidth;
    jQuery(elSlider).css({
    'width': intSliderWidth,
    'margin-left': intHandleWidth / 2
    });
    }
    jQuery(elParent).find('.ui-slider').click(function (event) {
    event.stopPropagation();
    });
    jQuery(elSliderHolder).click(function (event) {
    var intOffsetLeft = jQuery(this).offset().left;
    var intClickValue = (event.pageX - intOffsetLeft) * 100 / jQuery(this).width();
    jQuery(elSlider).slider('value', intClickValue);
    });
    jQuery(elTableViewport).removeClass('measure');
    });
    }
    var initLightboxCookies = function(permaCookieName, sessionCookieName, linkText, showMsg) {
    var $ = jQuery;
    $.cookie(sessionCookieName, '1');
    if (showMsg) {
    var $linkHolder = $('#lightbox'),
    $link = $('<a href="#">'+linkText+'</a>');
    $link.appendTo($linkHolder)
    .addClass('js-dont-show-again')
    .on('click', function(e) {
    e.preventDefault();
    $.cookie(permaCookieName, '1', {expires: 365, path:'/'});
    $linkHolder.find('.lightbox-link-close').trigger('click');
    });
    }
    };
    function openUrlInLightbox(strUrl, msgId, linkText, showMsg) {
    jQuery(window).ready(function () {
    var $ = jQuery;//create shortcut
    var um = $.cookie("loas");
    var permaCookieName = 'hide-lightbox-'+msgId+um,
    sessionCookieName = 'hide-lightbox-session-'+msgId+um;
    if ($.cookie(permaCookieName) || $.cookie(sessionCookieName)) {
    } else {
    lightbox.createIframe(jQuery('<a>').attr({
    'href': strUrl,
    'data-player': 'iframe'
    }));
    initLightboxCookies(permaCookieName, sessionCookieName, linkText, showMsg);
    }
    });
    }
    function findClosestLabel(el) {
    jQuery(el).parent().addClass('scfValidationRequiredBorder');
    }
    function oddEvenRows() {
    jQuery('.login-as-table > tbody > tr:odd').addClass('row-odd');
    jQuery('.login-as-table > tbody > tr:even').addClass('row-even');
    }
    function initPageSlider() {
    jQuery('div.page-slider').each(function (index, elPageSlider) {
    var heighest = 0;
    var arrSlides = jQuery(elPageSlider).find('ul > li.slide');
    jQuery(arrSlides).each(function (i, slide) {
    if (jQuery(slide).height() > heighest) {
    heighest = jQuery(slide).height();
    }
    });
    if (arrSlides.length == 1) {
    jQuery(this).addClass('oneslide');
    }
    jQuery(arrSlides).height(heighest);
    jQuery(elPageSlider).find('ul.slides').height(heighest);
    var pushbox = new Pushbox(jQuery(arrSlides), { interval: 0, navigation: true, freezeonhover: false, prevnext: true });
    });
    }
    function initVideos() {
    jQuery('a.video').each(function (i, el) {
    if (jQuery(el).attr('rel')) {
    var options = stringToObject(jQuery(el).attr('rel'));
    } else {
    var options = null;
    }
    jQuery(el).video(options, i);
    });
    }
    function stringToObject(strInput) {
    var obj = {};
    var arr = strInput.replace(/ /g, '').split(';');
    for (i in arr) {
    if (typeof (arr[i]) == 'string') {
    if (arr[i].split('=').length == 2) {
    var name = String(arr[i]).split('=')[0];
    var val = arr[i].split('=')[1];
    obj[name] = val;
    }
    }
    }
    return obj;
    }
    function initTabs() {
    jQuery('.ui-tabs,.ui-sub-tabs').tabs({
    select: function (event, ui) {
    var sub = jQuery('.ui-tabs-selected a', ui.panel).last();
    if (sub && sub.length) { //if there is a sub-tab selected, use that (the deepest one)
    window.location.hash = sub.get(0).hash;
    } else {
    window.location.hash = ui.tab.hash;
    }
    document.forms[0].action = document.forms[0].action.split('#')[0] + window.location.hash;
    }
    });
    if (window.location.hash) {
    jQuery('.ui-tabs').tabs('select', window.location.hash);
    var elm = jQuery(window.location.hash);
    if (elm.parent('.ui-sub-tabs').length > 0) {
    jQuery('.ui-tabs').tabs('select', elm.parent('.ui-sub-tabs').parent().attr('id'));
    jQuery('.ui-sub-tabs').tabs('select', elm.attr('id'));
    }
    document.forms[0].action = document.forms[0].action.split('#')[0] + window.location.hash;
    }
    setTimeout(function () {
    if (location.hash) {
    window.scrollTo(0, 0);
    }
    }, 1);
    }
    function setActiveTab(intTabIndex, intSubTabIndex) {
    if (intTabIndex != null && jQuery('.ui-tabs').length > 0) {
    jQuery('.ui-tabs').tabs('select', intTabIndex);
    } else if (intTabIndex != null && jQuery('.tabs').length > 0) {
    jQuery('.ui-tabs').find('ul.tabs-nav > li').removeClass('ui-tabs-selected').removeClass('ui-state-active');
    jQuery(jQuery('.ui-tabs').find('ul.tabs-nav > li')[intTabIndex]).addClass('ui-tabs-selected').addClass('ui-state-active');
    jQuery('.ui-tabs').find('.tabs-panel').addClass('ui-tabs-hide');
    jQuery(jQuery('.ui-tabs').find('.tabs-panel')[intTabIndex]).removeClass('ui-tabs-hide');
    }
    if (intSubTabIndex != null && jQuery('.ui-sub-tabs').length > 0) {
    jQuery('.ui-sub-tabs').tabs('select', intSubTabIndex);
    } else if (intSubTabIndex != null && jQuery('.sub-tabs').length > 0) {
    jQuery('.ui-sub-tabs').find('ul.sub-tabs-nav > li').removeClass('ui-tabs-selected').removeClass('ui-state-active');
    jQuery(jQuery('.ui-sub-tabs').find('ul.sub-tabs-nav > li')[intSubTabIndex]).addClass('ui-tabs-selected').addClass('ui-state-active');
    jQuery('.ui-sub-tabs').find('.sub-tabs-panel').addClass('ui-tabs-hide');
    jQuery(jQuery('.ui-sub-tabs').find('.sub-tabs-panel')[intSubTabIndex]).removeClass('ui-tabs-hide');
    }
    }
    function setLinkToOpenTabPanel() {
    var arrAnchoredLinks = jQuery('a[href*="#"]');
    var arrTabPanels = jQuery('.ui-tabs-panel');
    jQuery(arrAnchoredLinks).each(function (index, elLink) {
    if (jQuery(elLink).parents('.tabs').length == 0) {
    jQuery(arrTabPanels).each(function (index, elTabPanel) {
    var strAnchor = jQuery(elLink).attr('href').split('#')[1];
    if (jQuery(elTabPanel).attr('id') == strAnchor) {
    jQuery(elLink).on('click', function (event) {
    event.preventDefault();
    jQuery(elTabPanel).parents('.tabs').tabs('select', strAnchor);
    });
    }
    });
    }
    });
    }
    function dependingPeriodSelection() {
    jQuery('.period-selection').each(function (index, elPeriodSelection) {
    var arrSelects = jQuery(elPeriodSelection).find('select');
    if (jQuery(arrSelects).length > 1) {
    var elSelectSecond = jQuery(arrSelects[1]);
    jQuery(arrSelects[0]).change(function () {
    if (jQuery(this).children('option:selected')[0] == jQuery(this).children('option:first')[0]) {
    jQuery(elSelectSecond).prop('disabled', 'disabled');
    jQuery(elSelectSecond).children('option').removeProp('selected');
    jQuery(elSelectSecond).children('option:first').prop('selected', 'selected');
    } else {
    jQuery(elSelectSecond).removeProp('disabled');
    }
    });
    }
    });
    }
    function reloadPageFromSelectOption(elSelect) {
    jQuery(elSelect).change(function () {
    var hash = "";
    if (location.href.indexOf('#') > 0) {
    hash = location.href.substring(location.href.indexOf('#'));
    }
    var strLocation = (location.search != '') ? location.href.split(location.search)[0] : location.href;
    window.location = strLocation + '?type=' + jQuery(jQuery(this).children('option:selected')[0]).attr('value') + hash;
    });
    }
    function limitCharacters(fields, max) {
    fields.each(function (index, el) {
    var charsleft = (max - jQuery(el).val().length);
    if (charsleft < 0) {
    var showText = jQuery(el).val().substring(0, max);
    jQuery(el).val(showText);
    charsleft = 0;
    }
    jQuery(el).keyup(function () {
    if ((max - jQuery(el).val().length) <= 0) {
    var showText = jQuery(el).val().substring(0, max);
    jQuery(el).val(showText);
    jQuery(el).blur();
    }
    });
    });
    }
    function limitListItems(container, max) {
    container = jQuery(container);
    var items = jQuery('li:gt(' + (max - 1) + ')', container).hide();
    if (!items.length) {
    jQuery('a.more-link', container).hide();
    } else {
    jQuery('a.more-link', container).click(function () {
    var $this = jQuery(this),
    toggled = $this.data('toggled') === true;
    items[toggled ? 'hide' : 'show']();
    $this.data('toggled', !toggled);
    if ($this.data('toggle-text')) {
    var currentText = $this.html();
    $this.html($this.data('toggle-text'));
    $this.data('toggle-text', currentText);
    }
    });
    }
    }
    function injectPrintButton(strText, elPositionToInject) {
    var elButton = jQuery('<input>').attr({
    'type': 'button',
    'value': strText
    });
    jQuery(elButton).on('click', function (e) {
    e.preventDefault();
    window.print();
    });
    jQuery(elPositionToInject).append(elButton);
    }
    function emptyElementAddClass() {
    jQuery('.definition-list-group dt:empty').parent('dl').addClass('empty');
    }
    function liHasDisplaynone() {
    jQuery(".error-report li").each(function () {
    jQuery(this).find('span:hidden').parent().addClass('error-report-ie7-hide');
    });
    }
    function faq() {
    jQuery('.faq-container').find('dd').end().find('dt').click(function () {
    var question = jQuery(this);
    var answer = jQuery(this).next();
    if (answer.is(':visible')) {
    answer.slideUp('fast');
    question.removeClass('open').addClass('closed');
    } else {
    jQuery('.faq-container').find('dd').hide().end().find('dt').removeClass('open').addClass('closed');
    answer.slideDown('fast').addClass('openbla');
    question.removeClass('closed').addClass('open');
    }
    });
    }
    function setGoals() {
    var arrGoalInputs = jQuery('.bar-holders input[type=text]');
    var arrGoalBarHolders = jQuery('.bar-holders > li');
    var intPartPercentage = 100 / 4;
    var postGoals = function () {
    jQuery.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    dataType: 'json',
    url: "/webzip/zup/dhctargetservice.jpg/SetTarget",
    data: '{klinischeMastitis: ' + jQuery(arrGoalInputs[0]).attr('value') * 1 +
    ', zuptankcelGetal: ' + jQuery(arrGoalInputs[1]).attr('value') * 1 +
    ', nieuwVerhoogd: ' + jQuery(arrGoalInputs[3]).attr('value') * 1 +
    ', verhoogd: ' + jQuery(arrGoalInputs[2]).attr('value') * 1 +
    '}',
    success: function () {
    jQuery(this).addClass("done");
    }
    });
    }
    var setGoal = function (index, elGoalInput) {
    var intGoalValue = jQuery(elGoalInput).attr('value') * 1;
    var elGoalIndicator = jQuery(arrGoalBarHolders[index]).find('.bar-indicators .your-goal');
    var arrLabelNumbers = [0];
    var arrLabels = jQuery(arrGoalBarHolders[index]).find('.bar-labels > li');
    var intPreviousLabelValue = 0;
    jQuery(arrLabels).each(function (intLabelIndex, elLabel) {
    var intLabelValue = jQuery(elLabel).text().split('%')[0].split('.000')[0] * 1;
    arrLabelNumbers.push(intLabelValue);
    if (intLabelIndex == arrLabels.length - 1) {
    arrLabelNumbers.push(intLabelValue + (intLabelValue - intPreviousLabelValue));
    }
    intPreviousLabelValue = intLabelValue;
    });
    jQuery(arrLabelNumbers).each(function (intLabelNumberIndex, intLabelNumber) {
    if (intGoalValue <= 0) {
    jQuery(elGoalIndicator).css('left', 0 + '%');
    return false;
    } else if (intGoalValue >= jQuery(arrLabelNumbers)[arrLabelNumbers.length - 1]) {
    jQuery(elGoalIndicator).css('left', 100 + '%');
    return false;
    } else if (intGoalValue > 0 && intGoalValue <= jQuery(arrLabelNumbers)[1]) {
    var intPosLeft = (intPartPercentage * (intLabelNumberIndex + 1)) + (intPartPercentage * (intGoalValue - jQuery(arrLabelNumbers)[1]) / (jQuery(arrLabelNumbers)[1] - jQuery(arrLabelNumbers)[0]));
    jQuery(elGoalIndicator).css('left', intPosLeft + '%');
    return false;
    } else {
    var intPosLeft = (intPartPercentage * (intLabelNumberIndex + 1)) + (intPartPercentage * (intGoalValue - jQuery(arrLabelNumbers)[1]) / (jQuery(arrLabelNumbers)[2] - jQuery(arrLabelNumbers)[1]));
    jQuery(elGoalIndicator).css('left', intPosLeft + '%');
    return false;
    }
    });
    }
    jQuery(arrGoalInputs).each(function (index, elGoalInput) {
    jQuery(elGoalInput).blur(function () {
    postGoals();
    setGoal(index, elGoalInput);
    });
    jQuery(elGoalInput).keydown(function (event) {
    if (event.keyCode == 13) {
    event.preventDefault();
    postGoals();
    setGoal(index, elGoalInput);
    }
    });
    setGoal(index, elGoalInput);
    });
    }
    function showLoaderAdvies() {
    jQuery('.col_l').on("click", 'input.button', function (event) {
    if (jQuery('.ajax-loader').length > 0) {
    jQuery('.ajax-loader').remove();
    }
    jQuery('<img src="/img/zup/ajax-loader.gif" alt="" class="ajax-loader" />').insertAfter(jQuery('.research-fieldset').find('input.button'));
    });
    }
    function wrapValidators() {
    jQuery('div.add-message-form span.error').wrapInner('<span class="form-error" />');
    }
    function addLightboxToGalleryImages() {
    jQuery('div.gallery img').not('div.gallery a img').wrap(function () {
    return jQuery('<a />').addClass('gallery').attr('href', jQuery(this).attr('src'));
    });
    }
    function initPrint() {
    jQuery('.print').click(function () {
    window.print();
    });
    }
    function setAnchorOnValidationSummary() {
    jQuery('div.scfValidationSummary').each(function () {
    if (jQuery(this).is(":visible")) {
    jQuery(window).scrollTop(jQuery(this).offset().top);
    }
    });
    }
    function UpdateItemViews(id, lang, countThisView, callback) {
    jQuery.ajax({
    type: "POST",
    url: "/zip/zup/ViewsCounter.jpg/GetItemViews",
    data: '{"Id": "' + id + '", "Language": "' + lang + '", "CountThisView": "' + countThisView + '"}',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
    if (callback != null)
    callback(data);
    }
    });
    }
    var qs = (function (a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
    var p = a[i].split('=');
    if (p.length != 2) continue;
    b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
    })(window.location.search.substr(1).split('&'));
    var fixYoutubeZindex   = function(){
    jQuery("iframe").each(function(){
    var ifr_source = jQuery(this).attr('src');
    var wmode = "wmode=transparent";
    if(ifr_source.indexOf('?') != -1) {
    var getQString = ifr_source.split('?');
    var oldString = getQString[1];
    var newString = getQString[0];
    jQuery(this).attr('src',newString+'?'+wmode+'&'+oldString);
    }
    else jQuery(this).attr('src',ifr_source+'?'+wmode);
    });
    }
    function getUrl(url, withQs, withAnchor) {
    var splits1 = url.split('#');
    var splits2 = splits1[0].split('?');
    var urlwithoutqs = splits2[0];
    var urlwithqs = splits2[1] ? splits2[0] + '?' + splits2[1] : splits2[0];
    var urlwithanchor = splits1[1] ? urlwithqs + '#' + splits1[1] : urlwithqs;
    if (!withQs && !withAnchor) return urlwithoutqs;
    else if (!withAnchor) return urlwithqs;
    else return urlwithanchor;
    }
    function setQsParam(url, param, value) {
    var querystring = parseQuerystring(url);
    querystring[param] = value;
    var vars = [];
    for (var i in querystring) vars.push(i + '=' + querystring[i]);
    url = getUrl(url, false, false);
    if (vars.length > 0) url += '?' + vars.join('&');
    return url;
    }
    function parseQuerystring(url) {
    var arr = {};
    var que = url;
    if (que.indexOf('?') >= 0)
    que = que.substring(que.indexOf('?') + 1);
    else que = "";
    if (que != "") {
    que = que.split("&");
    for (var i = 0; i < que.length; i++) {
    var inter = que[i].split("=");
    var inter2 = inter[1];
    var inter3 = inter[0];
    que[i] = inter2;
    arr[inter3] = inter2;
    }
    }
    return arr;
    }
    function getQsParam(param) {
    var querystring = parseQuerystring(location.href);
    return querystring[param] ? unescape(querystring[param]) : '';
    }
    function removeQsParam(url, param) {
    var querystring = parseQuerystring(url);
    delete (querystring[param]);
    var vars = [];
    for (var i in querystring) vars.push(i + '=' + querystring[i]);
    url = getUrl(url, false, false);
    if (vars.length > 0) url += '?' + vars.join('&');
    return url;
    }
    function CustomDoubleCompareValidatorEvaluateIsValid(val) {
    var value = ValidatorGetValue(val.controltovalidate);
    if (ValidatorTrim(value).length == 0)
    return true;
    var compareTo = "";
    if ((typeof (val.controltocompare) != "string") ||
    (typeof (document.getElementById(val.controltocompare)) == "undefined") ||
    (null == document.getElementById(val.controltocompare))) {
    if (typeof (val.valuetocompare) == "string") {
    compareTo = val.valuetocompare;
    }
    }
    else {
    compareTo = ValidatorGetValue(val.controltocompare);
    }
    var operator = "Equal";
    if (typeof (val.operator) == "string") {
    operator = val.operator;
    }
    return ValidatorCompare(value.replace(",", val.decimalchar).replace(".", val.decimalchar), compareTo, operator, val);
    }
//-- end dummy js


(function() {

    var addLoadedClass = function(elmId) {
        var elm = document.getElementById(elmId);
        if (!elm) {
            window.addEventListener('DOMContentLoaded', function() {
                var elm = document.getElementById(elmId);
                elm.classList.add('is-loaded');
            });
        } else {
            elm.classList.add('is-loaded');
        }
    }
    addLoadedClass('script-3-status');

    console.log('script-3-medium.js finished executing');
})();