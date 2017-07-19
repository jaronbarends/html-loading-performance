/*
* Just a bunch of javascript
* At the bottom, there's a console.log
*/

//-- Start dummy js
    if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
    };
    }
    if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
    }
    var zup = function(){};
    zup(function ($) {
    function getHeaderElement() {
    var $header;
    if ($('.nav-main').length) {
    $header = $('.nav-main');
    } else {
    $header = $('.topheader');
    }
    return $header;
    }
    debounce = function(func, wait) {
    var timeout, args, context, timestamp;
    return function() {
    context = this;
    args = [].slice.call(arguments, 0);
    timestamp = Date.now();
    var later = function() {
    var last = (Date.now()) - timestamp;
    if (last < wait) {
    timeout = setTimeout(later, wait - last);
    } else {
    timeout = null;
    func.apply(context, args);
    }
    };
    if (!timeout) {
    timeout = setTimeout(later, wait);
    }
    }
    }
    allEqualHeight = function(selector, parentSelector) {
    var rows = new Array();
    $(selector).each(function () {
    var row = $(this).closest(parentSelector)[0];
    if (rows.indexOf(row) === -1) {
    rows.push(row);
    }
    });
    $(rows).each(function () {
    var $this = $(this).find(selector);
    $this.height(Math.max.apply($this, $.map($this, function (e) { return $(e).height(); })));
    });
    }
    setAllToMaxHeight = function(selector, parentSelector) {
    var $this = $(selector);
    if ($this.length) {
    allEqualHeight(selector, parentSelector);
    $(window).on('resize orientationchange', debounce(function () {
    $this.css('height', '');
    allEqualHeight(selector, parentSelector);
    }, 300));
    }
    }

    initStickySidebar = function (blnOnlyReinit) {
    $('.nav-sidebar:not(.not-sticky)').removeClass('docked, is-fixed').css('bottom', 'auto');
    var sideBarOffset = $('.sidebar').length ? $('.sidebar').offset().top - $('.topheader').innerHeight() : 0,
    onResize = function () {
    if (sideBarOffset <= 0) sideBarOffset = $('.sidebar').length ? $('.sidebar').offset().top - $('.topheader').innerHeight() : 0;
    setStickyNess();
    },
    setStickyNess = function () {
    var footerHeight = $('footer').outerHeight(true);
    if ($(window).scrollTop() + $(window).height() > $('body').height() - footerHeight) {
    $('.nav-sidebar:not(.not-sticky)').addClass('docked').css('bottom', footerHeight);
    } else {
    $('.nav-sidebar:not(.not-sticky)').removeClass('docked').css('bottom', 'auto');
    }
    if ($(window).scrollTop() > sideBarOffset && !$('.nav-sidebar:not(.not-sticky)').hasClass('docked')) {
    $('.nav-sidebar:not(.not-sticky)').addClass('is-fixed');
    } else {
    $('.nav-sidebar:not(.not-sticky)').removeClass('is-fixed');
    }
    };
    onResize();
    if (blnOnlyReinit) return;
    $(window).off('.sticky');
    $(window).on({
    'scroll.sticky': setStickyNess,
    'resize.sticky': onResize
    });
    };
    scrollToElement = function ($target, numOffsetTop, fnCallback) {
    numOffsetTop = numOffsetTop || 0;
    var blnCallbackDone = false;
    if ($target.length) {
    $('html, body').animate({ scrollTop: $target.offset().top - numOffsetTop }, 300, function () {
    if (typeof (fnCallback) == 'function' && !blnCallbackDone) fnCallback();
    blnCallbackDone = true;
    });
    }
    };
    scrollToElementOnPageLoad = function ($target) {
    var $header = getHeaderElement();
    if ($target.length) {
    $('html, body').animate({ scrollTop: $target.offset().top - $header.innerHeight() }, 300);
    }
    };
    scrollToAnchorOnPageLoad = function() {
    window.onload = function() {
    if (window.location.hash) {
    scrollToElementOnPageLoad($(window.location.hash));
    }
    };
    }
    initFooter = function () {
    $('body').on('click', '.to-top-button', function () {
    scrollToElement($('body'));
    });
    };
    initAccordions = function (blnOnlyReInit) {
    var $normalAccordions = $(''),
    $nestedAccordions = $('');
    $('.accordion').each(function () {
    if ($(this).parents('.accordion').length) {
    $nestedAccordions = $nestedAccordions.add($(this));
    } else {
    $normalAccordions = $normalAccordions.add($(this));
    }
    });
    $nestedAccordions.each(function () {
    var $accordion = $(this),
    $togglers = $accordion.find('.nested-toggler'),
    $contents = $accordion.find('.nested-content'),
    $parentAccordion = $accordion.parents('.accordion').first(),
    $parentContent = $parentAccordion.find('.content').first();
    $contents.addClass('no-animation');
    $contents.css('height', 'auto');
    $contents.each(function () {
    var $content = $(this);
    if ($content.hasClass('open')) {
    var contentHeight = $content.outerHeight(true);
    $content.data('heightWhenOpen', contentHeight);
    $content.css('height', contentHeight);
    setTimeout(function () { $contents.removeClass('no-animation'); }, 0);
    } else {
    $content.addClass('open');
    setTimeout(function () {
    var contentHeight = $content.outerHeight(true);
    $content.data('heightWhenOpen', contentHeight);
    $content.css('height', 0);
    $content.removeClass('open');
    setTimeout(function () { $contents.removeClass('no-animation'); }, 0);
    }, 0);
    }
    });
    if (!blnOnlyReInit) {
    $togglers.on('click', function (e) {
    e.preventDefault();
    var $toggler = $(this),
    $content = $toggler.next('.nested-content'),
    viewport = giveViewPort();
    $contents.css('height', 0);
    if ($toggler.parents('.accordion').hasClass('mobile-tablet-only') && (viewport == 'md' || viewport == 'lg')) return false
    if ($toggler.parents('.accordion').hasClass('mobile-only') && (viewport == 'sm' || viewport == 'md' || viewport == 'lg')) return false
    $togglers.add($contents).not($toggler).not($content).removeClass('open');
    $toggler.add($content).toggleClass('open');
    var $openContent = $content.filter('.open');
    $openContent.css('height', $openContent.data('heightWhenOpen'));
    setTimeout(function () {
    $parentContent.addClass('no-animation');
    $parentContent.css('height', 'auto');
    var contentHeight = $parentContent.outerHeight(true);
    $parentContent.data('heightWhenOpen', contentHeight);
    $parentContent.css('height', contentHeight);
    setTimeout(function () { $parentContent.removeClass('no-animation'); }, 0);
    }, 750);
    });
    }
    });
    $normalAccordions.each(function () {
    var $accordion = $(this),
    $togglers = $accordion.find('.toggler, .inner-toggler').not('.has-inner-toggler'),
    $contents = $accordion.find('.content'),
    viewport = giveViewPort();
    if (viewport == 'md' || viewport == 'lg') {
    $('.accordion.premium .content[data-premium="first"]').insertBefore('.accordion.premium .content[data-premium="second"]');
    } else {
    $('.accordion.premium .content[data-premium="first"]').insertAfter('.accordion.premium .first-premium-toggler');
    }
    if ($accordion.hasClass('first-open')) {
    var $firstToggler = $accordion.find('.toggler').first();
    $firstToggler.addClass('open');
    $firstToggler.next().addClass('open');
    }
    $contents.addClass('no-animation');
    $contents.css('height', 'auto');
    $contents.each(function (i) {
    var $content = $(this);
    if ($content.hasClass('open')) {
    var contentHeight = $content.outerHeight(true);
    $content.data('heightWhenOpen', contentHeight);
    $content.css('height', contentHeight);
    setTimeout(function () { $contents.removeClass('no-animation'); }, 0);
    } else {
    $content.addClass('open');
    setTimeout(function () {
    var contentHeight = $content.outerHeight(true);
    $content.data('heightWhenOpen', contentHeight);
    $content.css('height', 0);
    $content.removeClass('open');
    setTimeout(function () { $contents.removeClass('no-animation'); }, 0);
    }, 0);
    }
    });
    if (!blnOnlyReInit) {
    $togglers.click(function (e) {
    e.preventDefault();
    var $toggler = $(this),
    $content,
    viewport = giveViewPort();
    if ($toggler.hasClass('inner-toggler')) $toggler = $toggler.parent('.has-inner-toggler');
    if ($accordion.hasClass('premium')) {
    if ($toggler.data('premium') !== undefined) {
    var dataAtr = $toggler.data('premium');
    $content = $accordion.find('.content[data-premium="' + dataAtr + '"]');
    if ($(this).hasClass('grey')) {
    var $this = $(this);
    $this.removeClass('grey');
    $this.prev().removeClass('grey');
    $togglers.not($this).addClass('grey');
    $togglers.not($this).prev().addClass('grey');
    } else if ($(this).hasClass('open')) {
    var $this = $(this);
    $togglers.not($this).removeClass('grey');
    $togglers.not($this).prev().removeClass('grey');
    }
    else {
    var $this = $(this);
    $togglers.not($this).addClass('grey');
    $togglers.not($this).prev().addClass('grey');
    }
    } else {
    $content = $accordion.find('.content');
    }
    } else {
    $content = $toggler.next('.content');
    }
    $contents.css('height', 0);
    if ($toggler.parents('.accordion').hasClass('mobile-only') && (viewport == 'md' || viewport == 'lg')) return false

    $togglers.add($contents).not($toggler).not($content).removeClass('open');
    $accordion.find('.has-inner-toggler').add($contents).not($toggler).not($content).removeClass('open');
    $toggler.add($content).toggleClass('open');
    var $openContent = $content.filter('.open');
    $openContent.css('height', $openContent.data('heightWhenOpen'));
    if (window.enhancedEcommerce != null) {
    window.enhancedEcommerce.registerImpressionLists($openContent);
    }
    });
    };
    if ($accordion.hasClass('premium')) {
    $accordion.find('.more').each(function () {
    $(this).click(function () {
    $(this).parent().find('.toggler').click();
    });
    });
    };
    });
    };
    initCostSpecification = function () {
    setTimeout(function () {
    if ($('.pip-basket').length) {
    toggleCostSpecification();
    };
    }, 1000);
    setTimeout(function () {
    if($('.pip-basket').hasClass('is-active')){
    toggleCostSpecification();
    }
    }, 7000);
    $('body').on('click', '.cost-specification-button', function () {
    if ($(this).parent().hasClass('pip-basket')) {
    toggleCostSpecification();
    } else {
    scrollToElement($('body'), 0, toggleCostSpecification);
    }
    });
    var vp = giveViewPort();
    if (vp == 'md' || vp == 'lg') {
    setCostSpecificationStickyness();
    $(window).resize(setCostSpecificationStickyness);
    }
    };
    setCostSpecificationStickyness = function () {
    if ($('.cost-specification-hook').length === 0) return false;
    var containerOffset = $('.cost-specification-hook').offset();
    var $header = getHeaderElement();
    var navHeight = $header.outerHeight(true);
    var topHook = containerOffset.top - navHeight;
    var sidebarHeight = $('.cost-specification-hook').height();
    var footerHeight = $('footer').outerHeight(true);
    var bottomHook = footerHeight + sidebarHeight;
    var sidebarWidth = $('.sidebar-right').outerWidth() + 'px';
    var mainWindowHeight = $(window).height() - $('.topheader').height();
    if (sidebarHeight < mainWindowHeight) {
    var sidebarWidth = $('.sidebar-right').outerWidth() + 'px';
    if ($('.sidebar-right').hasClass('is-fixed')) {
    $('.sidebar-right').removeClass('is-fixed');
    sidebarWidth = $('.sidebar-right').outerWidth() + 'px';
    sidebarHeight = $('.cost-specification-hook').height();
    bottomHook = footerHeight + sidebarHeight;
    $('.sidebar-right').addClass('is-fixed');
    }
    if ($(window).scrollTop() > topHook) {
    if ($(window).scrollTop() > ($('html').height() - bottomHook - navHeight)) {
    $('.sidebar-right').removeClass('is-fixed').addClass('is-docked');
    } else {
    $('.sidebar-right').removeClass('is-docked').addClass('is-fixed');
    }
    } else {
    $('.sidebar-right').removeClass('is-fixed').removeClass('is-docked');
    }
    } else {
    window.scrollBy(0, 1);
    }
    $(window).scroll(function () {
    if (sidebarHeight < mainWindowHeight) {
    if ($(window).scrollTop() > topHook) {
    if ($(window).scrollTop() > ($('html').height() - bottomHook - navHeight)) {
    $('.sidebar-right').removeClass('is-fixed').addClass('is-docked');
    } else {
    $('.sidebar-right').removeClass('is-docked').addClass('is-fixed');
    }
    } else {
    $('.sidebar-right').removeClass('is-fixed').removeClass('is-docked');
    }
    }
    });
    $('.sidebar-right-inner').css('width', sidebarWidth).data('width', sidebarWidth);
    initReviewComponent();
    };
    toggleCostSpecification = function () {
    var $wrapper = $('.cost-specification-container');
    var $button = $('.cost-specification-button');
    var $buttonOpen = $('.cost-specification-button .open');
    var $buttonClose = $('.cost-specification-button .close');
    var offsetTop = 10;
    var offsetBottom = 100;
    var top = $(window).scrollTop() + offsetTop;
    if ($wrapper.hasClass('is-active')) {
    $wrapper.removeClass('is-active');
    $buttonClose.removeClass('is-active');
    $buttonOpen.addClass('is-active');
    } else {
    $wrapper.css('top', top).addClass('is-active');
    $buttonOpen.removeClass('is-active');
    $buttonClose.addClass('is-active');
    }
    $(window).scroll(function () {
    if ($wrapper.hasClass('is-active')) {
    var realBottom = $wrapper.outerHeight(true) - offsetBottom;
    if (!($(window).scrollTop() <= realBottom)) {
    $button.addClass('is-inactive');
    $wrapper.removeClass('is-active');
    setTimeout(function () {
    $buttonClose.removeClass('is-active');
    $buttonOpen.addClass('is-active');
    $button.removeClass('is-inactive');
    }, 400);
    }
    }
    });
    };
    initFormAddressSwitcher = function () {
    if ($('.address-option-switcher').length == 0) return false;
    $('.address-option-switcher').parents('fieldset').each(function () {
    toggleFormAddressSwitch($(this));
    updatePersonalInformationCostStructure();
    });
    $('form.personal-information').on('change.countryselection', '.address-option-switcher', function () {
    toggleFormAddressSwitch($(this).parents('fieldset'));
    updatePersonalInformationCostStructure();
    });
    };
    toggleFormAddressSwitch = function ($fieldset) {
    var $switcher = $fieldset.find('.address-option-switcher');
    var value = $switcher.val();
    var $optionDefault = $fieldset.find('.address-option-default');
    var $optionAlternate = $fieldset.find('.address-option-alternate');
    var $optionDefaultInputs = $fieldset.find('.address-option-default input[data-val-required]');
    var $optionAlternateInputs = $fieldset.find('.address-option-alternate input[data-val-required]');
    var defaultValue = $switcher.data('default');

    if (value == defaultValue) {
    $optionDefault.addClass('is-active');
    $optionAlternate.removeClass('is-active');
    $optionDefaultInputs.each(function () {
    var $this = $(this);
    var val = $(this).val();
    if ($this.hasClass('lookup-zipcode')) {
    if (val == defaultInactiveZipcode) $this.val('');
    } else if ($this.hasClass('lookup-city')) {
    if (val == defaultInactiveCity) $this.val('');
    }
    else {
    if (val == defaultInactive) $this.val('');
    }
    });
    $optionAlternateInputs.each(function () {
    var $this = $(this);
    if ($this.hasClass('lookup-zipcode')) {
    $this.val(defaultInactiveZipcode);
    } else if ($this.hasClass('lookup-city')) {
    $this.val(defaultInactiveCity);
    } else {
    $this.val(defaultInactive);
    }
    });
    } else {
    $optionDefault.removeClass('is-active');
    $optionAlternate.addClass('is-active');
    $optionAlternateInputs.each(function () {
    var $this = $(this);
    var val = $(this).val();
    if ($this.hasClass('lookup-zipcode')) {
    if (val == defaultInactiveZipcode) $this.val('');
    } else if ($this.hasClass('lookup-city')) {
    if (val == defaultInactiveCity) $this.val('');
    } else {
    if (val == defaultInactive) $this.val('');
    }
    });
    $optionDefaultInputs.each(function () {
    var $this = $(this);
    if ($this.hasClass('lookup-zipcode')) {
    $this.val(defaultInactiveZipcode);
    } else if ($this.hasClass('lookup-city')) {
    $this.val(defaultInactiveCity);
    } else {
    $this.val(defaultInactive);
    }
    });
    }
    };
    initSideBarNav = function () {
    var $header = getHeaderElement();
    var $anchorItems = $('section.content-section[data-show-in-quicknav=True]'),
    $list = $('nav.nav-sidebar .anchorlist'),
    $anchorLinks = null,
    $title = $('nav.nav-sidebar .sidebar-title'),
    $anchorTemplate = $list.children('li').first(),
    numOffset = $header.innerHeight() + 40,
    viewport = giveViewPort();
    var scrollToSection = function (e) {
    e.preventDefault();
    var $link = $(this);
    var $header = getHeaderElement();
    scrollToElement($($link.attr('href')), $header.innerHeight() + 10);
    $link.blur();
    if ($('.sidebar').is('.is-open')) $('.mobile-dropdown-button').click();
    };
    var highlightActiveSection = function () {
    var idCurrent = null,
    numScrollPos = $(window).scrollTop() + numOffset;
    $anchorItems.each(function () {
    if (numScrollPos > $(this).offset().top) {
    idCurrent = $(this).attr('id');
    }
    });
    $anchorLinks.removeClass('highlight');
    $title.removeClass('dimmed');
    if (idCurrent != null) {
    $anchorLinks.each(function () {
    if ($(this).find('a[href="#' + idCurrent + '"]').length > 0) {
    $(this).addClass('highlight');
    $title.addClass('dimmed');
    }
    });
    }
    };
    if ($('html').hasClass('editmode')) {
    $list.after('<p>Paginanavigatie niet beschikbaar in edit-mode.</p>');
    $list.remove();
    } else {
    $anchorItems.each(function () {
    var $section = $(this),
    $title = $section.find('header h2'),
    $title2 = $section.find('header h5'),
    titleCaption = $title.data('short-title') ? $title.data('short-title') : $title.text(),
    titleCaption2 = $title2.data('short-title') ? $title2.data('short-title') : $title2.text();
    var mobileHiddenClass = '';
    if ($section.hasClass('hidden-xs')) {
    mobileHiddenClass = 'hidden-xs';
    }
    if (titleCaption.length > 0) {
    $anchorTemplate.clone()
    .children('a').text(titleCaption)
    .attr('href', '#' + $section.attr('id'))
    .click(scrollToSection)
    .end().appendTo($list)
    .removeClass('hidden')
    .addClass(mobileHiddenClass);
    } else if (titleCaption2.length > 0) {
    $anchorTemplate.clone()
    .children('a').text(titleCaption2)
    .attr('href', '#' + $section.attr('id'))
    .click(scrollToSection)
    .end().appendTo($list)
    .removeClass('hidden').addClass(mobileHiddenClass);
    }
    });
    $anchorTemplate.remove();
    $anchorLinks = $list.children('li');
    $('.mobile-dropdown-button').click(function () {
    $(this).add('.sidebar').toggleClass('is-open');
    });
    var hideMobileIfEmpty = function () {
    var viewport = giveViewPort();
    if (viewport == 'sm' || viewport == 'xs') {
    if ($anchorLinks.length < 1 && $('.search-facets').length < 1) {
    $('nav.nav-sidebar').hide();
    }
    } else {
    $('nav.nav-sidebar').show();
    }
    }
    $(window).scroll(highlightActiveSection);
    $(window).resize(highlightActiveSection);
    $(window).resize(hideMobileIfEmpty);
    highlightActiveSection();
    hideMobileIfEmpty();
    }
    };
    initCustomValidations = function () {
    var validator = $('form').data('validator');
    if (validator) {
    var orgCheckForm = validator.checkForm;
    validator.checkForm = function () {
    orgCheckForm.call(validator);
    setTimeout(function () { scrollToElement($('.input-validation-error').first(), 120); }, 0);
    };
    }
    $.validator.methods.number = function (value, element) {
    return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:.\d{3})+)?(?:\,\d+)?$/.test(value);
    }
    $('input[type=tel]').blur(function () {
    var $input = $(this),
    newVal = $input.val().replace(/[()\-*\/]/g, '');
    if ($input.parents('.address-option-default').length) {
    newVal = newVal.substr(0, 10);
    }
    $input.val(newVal);
    $input.valid();
    });
    $.validator.addMethod("zupmustbetrue",
    function (value, element) {
    return $(element).is(":checked");
    },
    function (value, element) {
    return $(element).data('val-zupmustbetrue');
    }
    );
    var $trueInputs = $('input[data-val-zupmustbetrue]');
    if ($trueInputs.length) {
    $trueInputs.each(function () {
    var $trueInput = $(this);
    $trueInput.rules('add', {
    zupmustbetrue: true
    });
    });
    }
    $.validator.addMethod("zupcheckedatleastone",
    function (value, element) {
    var elementName = $(element).attr('name');
    var list = $('form').find('input[name="' + elementName + '"]');
    var valid = false;
    list.each(function () {
    if ($(this).is(":checked")) {
    valid = true;
    }
    });
    return valid;
    },
    function (value, element) {
    return $(element).data('val-zupcheckedatleastone');
    }
    );
    var $atleastoneInputs = $('input[data-val-zupcheckedatleastone]');
    if ($atleastoneInputs.length) {
    $atleastoneInputs.each(function () {
    var $atleastoneInput = $(this);
    $atleastoneInput.rules('add', {
    zupcheckedatleastone: true
    });
    });
    }
    $.validator.addMethod("zupdate",
    function (value, element) {
    if (value === "") return true;
    var regex = /(\d{2})-?(\d{2})-?(\d{4})/;
    var match = regex.exec(value);
    if (match != null && match.length !== 4) return false;
    try {
    var d = new Date(match[3], match[2] - 1, match[1]);
    return (!isNaN(d.getTime()));
    }
    catch (err) {
    }
    return false;
    },
    function (value, element) {
    return $(element).data("val-date");
    }
    );
    $.validator.addMethod("zupdaterange",
    function (value, element) {
    var isValid = true,
    inputDate = new Date(),
    minDate = new Date($(element).data('val-zupdaterange-mindate')),
    maxDate = new Date($(element).data('val-zupdaterange-maxdate')),
    arrVal = value.split('-');
    if (arrVal.length == 3 && arrVal[2].length == 4 && arrVal[1].length == 2 && arrVal[0].length == 2) {
    inputDate.setDate(arrVal[0]);
    inputDate.setMonth(arrVal[1] - 1);
    inputDate.setFullYear(arrVal[2]);
    isValid = (inputDate >= minDate && inputDate <= maxDate);
    } else if (arrVal.length == 3 && arrVal[0].length == 4 && arrVal[1].length == 2 && arrVal[2].length == 2) {
    inputDate.setDate(arrVal[2]);
    inputDate.setMonth(arrVal[1] - 1);
    inputDate.setFullYear(arrVal[0]);
    isValid = (inputDate >= minDate && inputDate <= maxDate);
    }
    return isValid;
    },
    function (value, element) {
    return $(element).data('val-zupdaterange');
    });
    if ($('input[data-val-zupdaterange]').length) {
    $('input[data-val-zupdaterange]').rules('add', {
    zupdaterange: true
    });
    }
    var $dateInputs = $('input.date-past, input.date-today, input.date-future, input.date-picker');
    if ($dateInputs.length) {
    $dateInputs.each(function (i, el) {
    var $dateInput = $(el);
    $dateInput.rules('remove', 'date');
    $dateInput.rules('add', { zupdate: true });
    });
    $dateInputs.on('blur', function (e) {
    var newVal = $(this).val().replace(/[\/\s-]+/g, '');
    if (newVal.length == 8) {
    $(this).val(newVal.substring(0, 2) + '-' + newVal.substring(2, 4) + '-' + newVal.substring(4, 8));
    }
    $(this).valid();
    });
    }
    };
    correctToggledDivs = function () {
    if ($('input[name^="Specification.ExemptionRequested"]').is(":checked")) {
    $('.exemption-info').show();
    if ($('.apply-exemption').find('input').is(":checked")) {
    $('.redeem-code').show();
    }
    }
    }
    avoidDoubleCourseSelections = function () {
    var subjectInputs = $('.course-subject-option-label input');
    subjectInputs.each(function () {
    $(this).prop('disabled', false);
    $(this).closest('.course-subject-option-label').removeClass('disabled');
    });
    subjectInputs.filter(':visible:checked').each(function () {
    subjectInputs.filter('[value="' + $(this).val() + '"][name!="' + $(this).attr('name') + '"]').each(function () {
    $(this).prop('disabled', true);
    $(this).closest('.course-subject-option-label').addClass('disabled');
    });
    });
    }
    applyCourseSpecializationFormDiscount = function (elementInForm) {
    var form = $(elementInForm).closest('form');
    form.validate().element('input[name^="DiscountCode"]');
    updatePaymentOptions();
    }
    initCourseSpecializationForm = function () {
    $('input[name^="course-subject"]').click(updateCostStructure);
    $('#Specification_CourseStartDate').blur(updateCostStructure);
    $('#Specification_CourseInCompanyStartDate').blur(updateCostStructure);
    $('input[name^="article"]').click(updateCostStructure);
    $('body').on('click', '.personalInformationTab', function () {
    toggleSubscriptionPersonalInformationForm(this);
    });
    $('.course-options-tabs a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    updateCostStructure();
    var tab = $(this).attr('aria-controls');
    $('#Specification_CourseForm').val(tab);
    var form = $(this).attr('data-form');
    $('[data-forms]').each(function () {
    var allowedForms = $(this).attr('data-forms').split(",");
    if (allowedForms.indexOf(form) === -1) {
    $(this).hide();
    $("input[name='PrerequisitesMet']").prop('checked', true);
    } else {
    $(this).show();
    }
    });
    });
    $("input:radio[name='Specification.CourseStartMonth']").change(updateCostStructure);
    $("input:radio[name='Specification.SelectedDayTime']").change(updateCostStructure);
    $('input[name^="Specification.Exemption"]').change(updateCostStructure);
    $('input[name^="Specification.SelectedPrerequisites"]').change(updateCostStructure);
    $('input[name^="DiscountCode"]').bind('focusout keyup click', function (e) {
    e.stopPropagation();
    });
    $('.btn-apply-discount').click(function () {
    applyCourseSpecializationFormDiscount($(this));
    });
    $('select[name^="DiscountCodeListSelected"]').each(function () {
    var textField = $(this).closest('.row').find('input[name^="DiscountCode"]');
    var applyButton = $(this).closest('.row').find('.btn-apply-discount');
    $(this).change(function () {
    var other = $(this).val() == 'other';
    textField.toggle(other);
    applyButton.toggle(other);
    if (!other) {
    textField.val($(this).val());
    applyCourseSpecializationFormDiscount($(this));
    }
    });
    $(this).change();
    });
    initCourseFinancialOptions();
    var activeForm = $('.course-options-tabs .active a[data-form]');
    if (activeForm != null) {
    var form = $(activeForm).attr('data-form');
    $('[data-forms]').each(function () {
    var allowedForms = $(this).attr('data-forms').split(",");
    if (allowedForms.indexOf(form) === -1) {
    $(this).hide();
    } else {
    $(this).show();
    }
    });
    }
    $('.course-subject-option-label input').click(function () {
    avoidDoubleCourseSelections();
    });
    };
    initCourseFinancialOptions = function () {
    $('input[name^="PaymentMethod.PaymentOptionID"]').click(updatePaymentOptions);
    $('input[name^="PaymentInput.PaymentTerms"]').click(updatePaymentOptions);
    };
    updatePersonalInformationCostStructure = function () {
    var country;
    if ($("#Individual_ResidentialAddress_Country").length > 0)
    country = $("#Individual_ResidentialAddress_Country").val();
    else if ($("#Student_ResidentialAddress_Country").length > 0)
    country = $("#Student_ResidentialAddress_Country").val();
    else if ($("#BusinessCompany_Address_Country").length > 0)
    country = $("#BusinessCompany_Address_Country").val();
    else if ($("#Parent_ResidentialAddress_Country").length > 0)
    country = $("#Parent_ResidentialAddress_Country").val();
    var address = {
    "country": country
    };
    var warningspan = $(".personal-information .info-block");
    if (country === 'nl-NL') {
    warningspan.hide();
    } else {
    warningspan.show();
    }
    $.ajax({
    url: '/CostStructure/SetAddress',
    type: 'POST',
    data: JSON.stringify(address),
    contentType: 'application/json; charset=utf-8',
    success: function (data) {
    $('.cost-specification-hook').html(data);
    initMainHeight();
    initStickySidebar(true);
    setCostSpecificationStickyness();
    },
    error: function () {
    }
    });
    fixModals();
    };
    updateCostStructure = function () {
    var courseForm = $("ul.nav-tabs li.active a").attr("aria-controls");
    var courseStartMonth = $("input:radio[name='Specification.CourseStartMonth']:checked").val();
    var courseSelectedDayTime = $("input:radio[name='Specification.SelectedDayTime']:checked").val();
    var subjectListInputs = $('input[name^="course-subject-list|"]:checked');
    var subjectsLists = subjectListInputs.map(function () {
    return { "parentKey": this.name, "id": this.value }
    }).get();
    var subjectInputs = $('input[name^="course-subject-option|"]:checked');
    var subjects = subjectInputs.map(function () {
    return { "parentKey": this.name, "id": this.value }
    }).get();
    var articleInputs = $('input[name^="article"]:checked');
    var aticles = articleInputs.map(function () {
    return { "articleId": this.value }
    }).get();
    var courseExemption = ($('input[name^="Specification.ExemptionRequested"]:checked').length > 0);
    var exemptionModeRadio = $("input:radio[name='Specification.ExemptionMode']:checked");
    var courseExemptionMode;
    if (exemptionModeRadio != null && exemptionModeRadio.length > 0) {
    courseExemptionMode = $("input:radio[name='Specification.ExemptionMode']:checked").val();
    } else {
    courseExemptionMode = $("input:hidden[name='Specification.ExemptionMode']").val();
    }
    var prerequisitesInputs = $('input[name^="Specification.SelectedPrerequisites"]:checked');
    var prerequisites = prerequisitesInputs.map(function () {
    return this.value;
    }).get();
    var courseOptions =
    {
    "courseId": $('#Specification_CourseId').val(),
    "courseStreamId": $('input[id=Specification_CourseStreamID]:checked').val(),
    "courseStartDate": $('#Specification_CourseStartDate').val(),
    "courseInCompanyStartDate": $('#Specification_CourseInCompanyStartDate').val(),
    "courseSubjectLists": subjectsLists,
    "courseSubjects": subjects,
    "articles": aticles,
    "courseStartMonth": courseStartMonth,
    "courseForm": courseForm,
    "selectedDayTime": courseSelectedDayTime,
    "exemptionRequested": courseExemption,
    "exemptionMode": courseExemptionMode,
    "exemptionCode": $('#Specification_ExemptionCode').val(),
    "exemptionDateOfBirth": $('#Specification_ExemptionDateOfBirth').val(),
    "selectedPrerequisites": prerequisites
    };
    $.ajax({
    url: '/CostStructure/SetCourseSpecification',
    type: 'POST',
    data: JSON.stringify(courseOptions),
    contentType: 'application/json; charset=utf-8',
    success: function (data) {
    $('.cost-specification-hook').html(data);
    initMainHeight();
    initStickySidebar(true);
    setCostSpecificationStickyness();
    },
    error: function () {
    }
    });
    };
    getPaymentData = function () {
    var paymentMethod =
    {
    "paymentOptionID": $("input:radio[name='PaymentMethod.PaymentOptionID']:checked").val(),
    "paymentTerms": $("input:radio[name='PaymentInput.PaymentTerms']:checked").val(),
    "discountCode": $("input:text[name='DiscountCode']").val(),
    "bankAccount": $("input:text[name='PaymentMethod.BankAccount']").val(),
    "paymentTerms": $("input:radio:checked[name='PaymentInput.PaymentTerms']").val(),
    "paymentType": $("input[name='PaymentInput.PaymentType']").val()
    };
    return paymentMethod;
    }
    updatePaymentCostStructure = function (paymentMethodData) {
    if (typeof (paymentMethodData) == "undefined" || paymentMethodData == null) paymentMethodData = getPaymentData();
    $.ajax({
    url: '/CostStructure/SetPaymentOptions',
    type: 'POST',
    data: JSON.stringify(paymentMethodData),
    contentType: 'application/json; charset=utf-8',
    success: function (data) {
    $('.cost-specification-hook').html(data);
    initMainHeight();
    initStickySidebar(true);
    setCostSpecificationStickyness();
    },
    error: function () {
    }
    });
    }
    initPaymentTermsRbl = function () {
    $('input:radio[name="PaymentInput.PaymentTerms"]').first().prop('checked', true);
    }
    updatePaymentFields = function () {
    var selectedPaymentType = $("input:radio[name='PaymentInput.PaymentTerms']:checked").attr('data-term-option');
    $('input[name="PaymentInput.PaymentType"]').val(selectedPaymentType);
    }
    updatePaymentOptions = function () {
    updatePaymentFields();
    var paymentMethodData = getPaymentData();
    updatePaymentCostStructure(paymentMethodData);
    };
    toggleSubscriptionPersonalInformationForm = function (itemClicked) {
    var $form = $('form');
    var selectedSubscriptionType = $(itemClicked).find('input:radio[name=SubscriptionType]').val();
    $.ajax({
    url: '/Subscription/SelectSubscriptionType?type=' + selectedSubscriptionType,
    type: 'POST',
    data: $form.serialize(),
    })
    .success(function (result) {
    var viewPlaceHolder = $('#viewPlaceHolder');
    $(viewPlaceHolder).html(result);
    $form.removeData("validator");
    $form.removeData("unobtrusiveValidation");
    $.validator.unobtrusive.parse($form);
    initCustomValidations();
    initFormAddressSwitcher();
    initZipcodeSearchLoaders();
    initMainHeight();
    initStickySidebar(true);
    showNextStudentfield();
    initDeleteStudentfield();
    showNextChildfield();
    initDeleteChildfield();
    initInitialsFields();
    })
    .error(function (xhr, status) {
    });
    };
    initMoreButtonLists = function () {
    $('.list-has-more-button').each(function () {
    var $list = $(this),
    $li = $list.children('li'),
    numberOfItems = $li.length,
    numberOfvisibleItems = $list.data('visible-items'),
    numberOfNextItems = $list.data('step-size-items'),
    $nextItems,
    $inactiveChildren;
    $inactiveChildren = $list.children('li:gt(' + (numberOfvisibleItems - 1) + ')').addClass('is-inactive');
    if ($inactiveChildren.length) {
    $('<a class="btn btn-default btn-show-more">' + $list.data('more-button-text') + '</a>')
    .insertAfter($list)
    .click(function () {
    $inactiveChildren = $list.children('.is-inactive');
    $nextItems = $inactiveChildren.slice(0, numberOfNextItems);
    $nextItems.removeClass('is-inactive');
    if ($inactiveChildren.length <= numberOfNextItems) {
    $(this).addClass('is-inactive');
    $list.css("margin-bottom", "2em");
    }
    initMainHeight();
    if (window.enhancedEcommerce != null) {
    window.enhancedEcommerce.registerImpressionListProducts($list);
    }
    });
    $list.css("margin-bottom", 0);
    }
    });
    };
    giveViewPort = function () {
    if (!window.getComputedStyle) {
    window.getComputedStyle = function (el, pseudo) {
    this.el = el;
    this.getPropertyValue = function (prop) {
    var re = /(\-([a-z]){1})/g;
    if (prop == 'float') prop = 'styleFloat';
    if (re.test(prop)) {
    prop = prop.replace(re, function () {
    return arguments[2].toUpperCase();
    });
    }
    return el.currentStyle[prop] ? el.currentStyle[prop] : null;
    }
    return this;
    }
    }
    i = window.getComputedStyle($("html").get(0), ':after').getPropertyValue('content');
    if (i != null) i = i.replace(/['"]/g, '');
    return i;
    };
    initTabs = function () {
    $('.nav-tabs li.active input').prop("checked", true);
    $('.nav-tabs a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    initAccordions(true);
    setTimeout(function () {
    $('.nav-tabs li input').prop("checked", false);
    $('.nav-tabs li.active input').prop("checked", true);
    }, 0);
    });

    if (location.hash) {
    var $TabToShow = $('.nav-tabs a').filter(function () {
    return ($(this).data('toggle') == 'tab' && $(this).attr('href') == location.hash);
    });
    if ($TabToShow.length) $TabToShow.click();
    }
    };
    initZipcodeSearchLoaders = function () {
    $('.lookup-street, .lookup-city').siblings('label').append('<img src="/img/zup/ajax-loader.gif" alt="" class="loader" />');
    };
    initZipcodeSearch = function () {
    initZipcodeSearchLoaders();
    $('form.personal-information').on('blur', '.lookup-zipcode, .lookup-housenumber', function () {
    var $this = $(this);
    doZipcodeSearch($this);
    }, 0);
    };
    });



    doZipcodeSearch = function ($input) {
    var $fieldset = $input.parents('fieldset'),
    $zipcode = $fieldset.find('.lookup-zipcode'),
    $housenumber = $fieldset.find('.lookup-housenumber'),
    $housenumberextension = $fieldset.find('.lookup-housenumberextension'),
    $street = $fieldset.find('.lookup-street'),
    $city = $fieldset.find('.lookup-city'),
    $inputs = $street.add($city),
    $loaders = $street.siblings('label').children('.loader').add($city.siblings('label').children('.loader')),
    error = 0;
    $street.val('');
    $city.val('');
    if ($zipcode.val().length === 0) error++;
    if ($zipcode.hasClass('input-validation-error')) error++;
    if ($housenumber.val().length === 0) error++;
    if ($housenumber.hasClass('input-validation-error')) error++;
    if (error === 0) {
    $inputs.attr('disabled', 'disabled');
    $loaders.addClass('is-active');
    $.ajax({
    dataType: 'json',
    timeout: 4000,
    type: 'POST',
    url: '/formservice/GetAddress',
    data: {
    postalCode: $zipcode.val(),
    houseNumber: $housenumber.val(),
    houseNumberExtension: $housenumberextension.val()
    },
    complete: function (response) {
    if (response.responseJSON) {
    if (response.responseJSON.Success === true && response.responseJSON.StreetName && response.responseJSON.City) {
    $street.val(response.responseJSON.StreetName);
    $city.val(response.responseJSON.City);
    }
    }
    $inputs.removeAttr('disabled');
    $loaders.removeClass('is-active');
    $street.blur();
    $city.blur();
    }
    });
    }
    };
    initMegamenu = function () {
    $(".hamburger").on("click", function (e) {
    $(e.target).blur();
    if ($("body").hasClass("megamenu-open")) {
    $("body").removeClass("megamenu-open");
    $("body").addClass("megamenu-closed");
    } else {
    $('html, body').animate({ scrollTop: 0 }, 800);
    $("body").addClass("megamenu-open");
    $("body").removeClass("megamenu-closed");
    };
    });
    $(".megamenu").on("click", function () {
    $(".hamburger").trigger("click");
    });
    $('.megamenu .container').click(function (event) {
    event.stopPropagation();
    });
    $(".megamenu .toggler").on("click", function () {
    var $this = $(this);
    if (giveViewPort() == 'sm' || giveViewPort() == 'xs') {
    setTimeout(function () {
    $('html, body').animate({
    scrollTop: $this.offset().top - 90
    }, 200);
    }, 600);
    }
    });
    };
    initLinkedLists = function () {
    showLinkedLists();
    $('.linked-list-triggers > li input').on('click', function (e) {
    showLinkedLists();
    });
    };
    showLinkedLists = function () {
    var $triggers = $('.linked-list-triggers > li input');
    var $selected = $('.linked-list-triggers > li input:checked');
    var $content = $('.linked-list-content > li');
    if ($selected.length === 0) {
    $content.removeClass('is-active');
    } else {
    var index = $triggers.index($selected);
    $content.removeClass('is-active');
    $content.eq(index).addClass('is-active');
    $content.not('.is-active').find('input').prop('checked', false);
    avoidDoubleCourseSelections();
    }
    };
    initShowCookies = function () {
    if (document.cookie.indexOf("visited") >= 0 && document.cookie.indexOf("closedcookiebar") >= 0) {
    return;
    }
    else if (document.cookie.indexOf("visited") >= 0) {
    $(".cookie-bar").addClass("show");
    }
    else {
    expiry = new Date();
    document.cookie = "visited=yes; expires=" + expiry.toGMTString();
    $(".cookie-bar").addClass("show");
    }
    $(".close-cookie").on("click", function () {
    $(".cookie-bar").removeClass("show");
    expiry = new Date();
    document.cookie = "closedcookiebar=yes; expires=" + expiry.toGMTString();
    });
    };
    initShowAttachmentField = function () {
    var $fields = $(".scfSectionBorder.display-section-content .field-border").find("input[type=file]");
    $fields.on("change", function () {
    $(this).parents(".field-border").next(".field-border").show();
    });
    };
    initChangeIframeURL = function (blnOnlyReinit) {
    var desktopURL = '',
    mobileURL = '';
    if ($('iframe').data('desktop-url') == '' && $('iframe').data('mobile-url') == '') {
    return false;
    } else if ($('iframe').data('desktop-url') == '') {
    desktopURL = $('iframe').data('mobile-url');
    mobileURL = $('iframe').data('mobile-url');
    } else if ($('iframe').data('mobile-url') == '') {
    desktopURL = $('iframe').data('desktop-url');
    mobileURL = $('iframe').data('desktop-url');
    } else {
    desktopURL = $('iframe').data('desktop-url');
    mobileURL = $('iframe').data('mobile-url');
    }
    function setURL() {
    if (giveViewPort() == 'md' || giveViewPort() == 'lg') {
    if ($('iframe').attr('src') === desktopURL) {
    } else {
    $('iframe').attr('src', desktopURL);
    }
    } else {
    if ($('iframe').attr('src') === mobileURL) {
    } else {
    $('iframe').attr('src', mobileURL);
    }
    }
    }
    setURL();
    $(window).on('resize', setURL);
    };
    isDateInputSupported = function () {
    var d = document.createElement("input");
    d.setAttribute('type', 'date');
    return d.type === 'date';
    };
    initChangeMap = function () {
    $('.training-days .accordion .toggler').on("click", function () {
    $('.marker-wrapper').removeClass('show');
    var toggler = $('.training-days .accordion .toggler.open');
    if (toggler.length == 0) return false;
    var classList = toggler.attr('class').split(/\s+/);
    $.each(classList, function (index, item) {
    if (item === 'AMS') {
    $('.marker-wrapper.AMS').addClass('show');
    } else if (item === 'APEL') {
    $('.marker-wrapper.APEL').addClass('show');
    } else if (item === 'DENH') {
    $('.marker-wrapper.DENH').addClass('show');
    } else if (item === 'EIND') {
    $('.marker-wrapper.EIND').addClass('show');
    } else if (item === 'GRON') {
    $('.marker-wrapper.GRON').addClass('show');
    } else if (item === 'LEID') {
    $('.marker-wrapper.LEID').addClass('show');
    } else if (item === 'ROTT') {
    $('.marker-wrapper.ROTT').addClass('show');
    } else if (item === 'UTR') {
    $('.marker-wrapper.UTR').addClass('show');
    } else if (item === 'ZWOL') {
    $('.marker-wrapper.ZWOL').addClass('show');
    } else {
    return;
    }
    });
    });
    };
    initShowMap = function () {
    var count = $('.startMonth').length;
    if (count === 1) {
    $('.startMonth label input').css('display', 'none');
    }
    $('.training-days').each(function () {
    var $this = $(this);
    if ($this.parents('.tab-content') && count > 1) {
    if ($('input[name="Specification.CourseStartMonth"]:checked').length > 0) {
    return;
    } else {
    $this.addClass('hide');
    $('input[name="Specification.CourseStartMonth"]').parent().on('click', function () {
    if ($this.height() > 0) {
    return;
    } else {
    $this.removeClass('hide');
    initAccordions(true);
    }
    });
    }
    }
    });
    };
    initHideUnavailableStartLocations = function () {
    $('.input-start-month').click(function () {
    var firstMonthSelected = $('.input-start-month-first:checked').length > 0;
    if (firstMonthSelected) {
    $('.not-available-for-next-start-moment').each(function () {
    $(this).find('input[type="radio"]').prop('checked', false);
    $(this).hide();
    $(this).closest('.row').toggle($(this).find('li:not(.not-available-for-next-start-moment)').length > 0);
    });
    } else {
    $('.not-available-for-next-start-moment').show();
    $('.not-available-for-next-start-moment').closest('div.row').show();
    }
    });
    $('.input-start-month:checked').click();
    };
    initInterviewVideo = function () {
    $('.interview, .video-component').each(function (i, el) {
    var $interview = $(el),
    $playbut = $interview.find('.play.video'),
    $overlay = $interview.find('.video-overlay'),
    $iframe = $interview.find('iframe.youtube'),
    strYtCode = "",
    strYtUrl = "";
    if (!($iframe.length && $playbut.length && $overlay.length)) return;
    try {
    strYtCode = $iframe.data('yt-url').split('v=')[1].split('&')[0]
    } catch (e) {
    $playbut.add($overlay).remove();
    return false;
    };
    var closeVideo = function () {
    $(window).off('keypress.closevideo');
    $overlay.addClass('hidden');
    $iframe.attr('src', '');
    };
    $playbut.click(function () {
    if (!$overlay.parent().is('body')) $overlay.appendTo('body');
    $overlay.removeClass('hidden');
    $iframe.attr('src', strYtUrl);
    $(window).on('keypress.closevideo', function (e) {
    if (e.keyCode == 27) {
    e.preventDefault();
    closeVideo();
    }
    });
    });
    $overlay.click(closeVideo);
    });
    };
    initAccordionInterview = function () {
    $('.interview.boxed').each(function () {
    var $this = $(this),
    viewport = giveViewPort();
    if (($this.parent().hasClass('col-md-offset-3') && viewport == 'xs') || ($this.parents().hasClass('accordion') && viewport == 'xs')) {
    $this.css('padding', '10px 10px 10px 10px');
    } else if ($this.parent().hasClass('col-md-offset-3') || $this.parents().hasClass('accordion')) {
    $this.css('padding', '10px 50px 10px 10px');
    $this.find('.col-xs-12.col-md-9.col-md-offset-3').removeClass('col-md-offset-3');
    }
    });
    };
    addInterviewOutlineCharacter = function () {
    $('.interview.outline').each(function () {
    var $this = $(this),
    title = $this.find('.training-title'),
    letter = title.text().charAt(0).toLowerCase(),
    exp = /[a-z]/,
    bigLetters = ["b", "d", "f", "h", "i", "k", "l", "t"],
    viewport = giveViewPort();
    $(this).find('.interview-quote').removeClass('short-solid-top-border');
    $(this).find('.interview-quote').addClass('short-dotted-top-border');
    if (!exp.test(letter)) return false
    if (title.parents().hasClass('top')) {
    title.before('<div class=" outline-letter short-solid-top-border"><span class="outline">' + letter + '</span></div>');
    if ($.inArray(letter, bigLetters) > -1) {
    $('.outline-letter').css('padding-top', '30px')
    } else {
    if (viewport === "lg") {
    $('.outline-letter').css('padding-top', '0')
    }
    else {
    $('.outline-letter').css('padding-top', '5px')
    }
    }
    }
    });
    }
    initRteFullWidth = function () {
    $('.rte').each(function () {
    var $this = $(this);
    if ($this.closest(".col-xs-12 .col-sm-9").length || $this.closest(".col-xs-12 .col-md-9 .col-md-offset-3").length || $this.parents('form').siblings('.progress-steps').length || $this.parents('.premium')) {
    return;
    } else {
    $this.children().not('a, img, table').addClass('col-xs-12 col-sm-10');
    $this.children().not('a, img, table').css('float', 'none');
    $this.children().not('a, img, table').css('padding', 0);
    }
    });
    };
    positionModalBox = function ($modal) {
    $modal.after('<span id="modal-placeholder" />').appendTo('body');
    };
    rePositionModalBox = function ($modal) {
    $('#modal-placeholder').before($modal).remove();
    };
    initShowInputOnPayment = function () {
    if ($('.payment-options label input:radio:checked').length > 0) {
    $('.payment-options label input:radio:checked').each(function() {
    var wrapper = $(this).parents('.payment-wrapper')[0];
    if (wrapper != null) {
    var content = $(wrapper).find('.payment-method-content')[0];
    if (content != null) {
    $(content).show();
    }
    }
    });
    }
    $('.payment-options label input').on("click", function () {
    var $this = $(this);
    var wrapper = $this.parents('.payment-wrapper');
    wrapper.siblings('.payment-wrapper').each(function() {
    var content = $(this).find('.payment-method-content')[0];
    if (content != null) {
    $(content).hide();
    }
    });
    var content = wrapper.find('.payment-method-content')[0];
    if (content != null) {
    $(content).show();
    }
    initMainHeight();
    });
    };
    initDisableButton = function () {
    $('.disabled').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    return;
    });
    };
    initMainHeight = function () {
    $('main, .sidebar').css({
    'height': 'auto',
    'min-height': 0
    });
    var $sideBar = $('.sidebar'),
    bodyHeight = $('body').height(),
    winHeight = $(window).height(),
    mainHeight = $('main').innerHeight(),
    sidebarHeight = $('.sidebar').innerHeight(),
    viewport = giveViewPort();
    if (viewport === 'sm' || viewport === 'xs') {
    return;
    }
    if (bodyHeight <= winHeight + 10) {
    $('main').css('height', winHeight - bodyHeight + mainHeight);
    }
    var $header = getHeaderElement();
    $sideBar.css({
    'height': winHeight - $header.innerHeight(),
    'min-height': sidebarHeight,
    'max-height': $('main').height()
    });
    initStickySidebar(true);
    };
    initPersonalInformationTabs = function () {
    $('.personal-information .nav-tabs li').on('click', function () {
    $(this).children('input').prop('checked', true);
    });
    };
    initMobileTopMenu = function () {
    var menuItem = $('.nav-secondary .nav-list').children('li:first-child'),
    span = menuItem.find('.mobile-title')[0],
    count = $(span).text().length;
    if (count === 0) {
    menuItem.next().addClass('remove-pipe');
    }
    };
    initIframeResize = function () {
    $('iframe.content-iframe').iFrameResize({
    heightCalculationMethod: 'lowestElement',
    enablePublicMethods: true,
    scrollCallback: function (x, y) {
    var iframePos = $('iframe.content-iframe').offset().top;
    $('html, body').animate({ scrollTop: iframePos - 100 });
    }
    });
    };
    presetEditModeAccordions = function () {
    if ($('html').hasClass('editmode')) {
    $('.accordion').find('.toggler').addClass('open');
    $('.accordion').find('.content').addClass('open');
    }
    };
    initAccordionResizing = function () {
    $('a[data-toggle="tab"]').on('click', function () {
    initAccordions(true);
    });
    var timer;
    $(window).on("resize", function (event) {
    initMainHeight();
    if (typeof updateSearchSideBarHeight == 'function') {
    updateSearchSideBarHeight();
    }
    initAccordionInterview();
    clearTimeout(timer);
    timer = setTimeout(function () {
    initAccordions(true);
    }, 450);
    }).on("orientationchange", function (event) {
    setTimeout(function () {
    initAccordions(true);
    }, 450);
    });
    };
    fixModals = function () {
    $('.modal').on('show.bs.modal', function () {
    positionModalBox($(this));
    });
    $('.modal').on('hidden.bs.modal', function () {
    rePositionModalBox($(this));
    });
    };
    initDatepicker = function () {
    $('.date-future').each(function () {
    var $input = $(this);
    $input.datepicker({
    dateFormat: 'dd-mm-yy',
    constrainInput: false,
    onSelect: function () {
    $input.valid();
    updateCostStructure();
    },
    showOn: 'button',
    buttonImage: '/img/zup/calendar.svg',
    buttonImageOnly: true,
    buttonText: 'Selecteer een datum',
    prevText: '',
    nextText: '',
    minDate: $input.data('min-date') || null,
    maxDate: $input.data('max-date') || null,
    beforeShow: function () {
    $input.attr('readonly', 'readonly');
    },
    onClose: function () {
    $input.removeAttr('readonly');
    },
    beforeShowDay: function (date) {
    var day = date.getDay();
    return [(day != 6) && (day != 0), ''];
    }
    });
    });
    $('.date-picker').each(function () {
    var $input = $(this);
    $input.datepicker({
    dateFormat: 'dd-mm-yy',
    constrainInput: false,
    onSelect: function () {
    $input.valid();
    },
    showOn: 'button',
    buttonImage: '/img/zup/calendar.svg',
    buttonImageOnly: true,
    buttonText: 'Selecteer een datum',
    prevText: '',
    nextText: '',
    minDate: $input.data('min-date') || null,
    maxDate: $input.data('max-date') || null,
    beforeShow: function () {
    $input.attr('readonly', 'readonly');
    },
    onClose: function () {
    $input.removeAttr('readonly');
    }
    });
    });
    };
    var zip = function() {
    zup(window).on('message', function (e) {
    if ($('.content-iframe').length > 0) {
    var $header = getHeaderElement();
    if (e.originalEvent.data === 'scrollToTop') {
    window.scrollTo(0, topPos);
    };
    }
    });
    };
    initTrialLesson = function () {
    var URL = window.location.search,
    searchString,
    SKU;
    if (URL.indexOf('oplc=') != -1) {
    searchString = 'oplc=';
    } else if (URL.indexOf('p=') != -1) {
    searchString = 'p=';
    } else if (URL.indexOf('n=') != -1) {
    searchString = 'n=';
    } else {
    return;
    }
    SKU = URL.substr(URL.search(searchString) + searchString.length).split('&')[0];
    $('.hidden-field').each(function () {
    $(this).find('input').val(SKU);
    $(this).hide();
    });
    };
    initWfmformsStudieadviesgesprek = function () {
    $('.wfmselecttel, .wfmselectpers').hide();
    $('.wfmdate:first').hide();
    $('.scfForm input[type=radio]').change(function () {
    var radioType = $(this).val(),
    blnPersonal = (radioType == "Persoonlijk"),
    blnTelephonic = (radioType == "Telefonisch");
    if (blnPersonal) {
    $('.wfmselecttel').hide();
    $('.wfmselectpers').show();
    } else if (blnTelephonic) {
    $('.wfmselecttel').show();
    $('.wfmselectpers').hide();
    }
    toggleDatePicker(blnPersonal);
    });
    };
    toggleDatePicker = function (blnPersonal) {
    var $dateHolder = $('.wfmdate').first(),
    $dateInput = $dateHolder.find('input[type=text]'),
    today = new Date(),
    nearFuture = new Date(today),
    processDays = blnPersonal ? 3 : 2,
    offsetDays = 0,
    numSaturday = 6,
    numSaturdayIndex = numSaturday,
    numSunday = 7,
    numSundayIndex = 0,
    blnWeekend = false;
    $dateHolder.show();
    var isDayInWeekend = function (day) {
    switch (day) {
    case numSaturday:
    blnWeekend = true;
    offsetDays = 2;
    break;
    case numSunday:
    blnWeekend = true;
    offsetDays = 1;
    break;
    default:
    blnWeekend = false;
    offsetDays = 0;
    }
    return offsetDays;
    };
    for (var i = 1; i <= processDays; i++) {
    isDayInWeekend(nearFuture.getDay() + i);
    if (blnWeekend) break;
    }
    nearFuture.setDate(nearFuture.getDate() + processDays + offsetDays);
    isDayInWeekend(nearFuture.getDay());
    if (blnWeekend) nearFuture.setDate(nearFuture.getDate() + offsetDays);
    $dateHolder.datepicker('option', 'minDate', nearFuture);
    $dateHolder.datepicker('setDate', nearFuture);
    var numDay = nearFuture.getDate(),
    numMonth = nearFuture.getMonth() + 1,
    numYear = nearFuture.getFullYear();
    $dateInput.val((((numDay + '').length == 1) ? '0' : '') + numDay + '-' + (((numMonth + '').length == 1) ? '0' : '') + numMonth + '-' + numYear);
    $dateHolder.datepicker({
    dateFormat: 'dd-mm-yy',
    constrainInput: false,
    onSelect: function (date) {
    $dateInput.val($("#" + this.id).val());
    $dateHolder.find('.ui-datepicker').hide();
    },
    showOn: 'button',
    showWeek: false,
    buttonImage: '/img/zup/calendar.svg',
    buttonImageOnly: true,
    buttonText: 'Selecteer een datum',
    prevText: '',
    nextText: '',
    minDate: nearFuture,
    maxDate: null,
    beforeShow: function () {
    $dateInput.prop('readonly', 'readonly');
    },
    onClose: function () {
    $dateInput.removeProp('readonly');
    },
    beforeShowDay: function (date) {
    var day = date.getDay();
    return [(day != numSaturdayIndex) && (day != numSundayIndex), ''];
    }
    });
    $dateInput.on('focus', function () {
    $dateHolder.find('.ui-datepicker').show();
    });
    $dateHolder.next('.ui-datepicker-trigger').hide();
    };
    initWfmformsbverwachteopleiding = function () {
    };
    /* Autocomplete search courses,authour: meester Ralph Meeuws */
    initCourseData = function () {
    var $container = $('.course-data');
    if (!$container.length) return;
    var $loader = $('.course-loader'),
    $textInput = $container.find('.form-control.course-name'),
    $button = $container.find('.course-name-selector'),
    arrSource,
    strCourseName,
    numCourseId,
    blnSelected = false;

    if (window.CourseList == undefined) {
    $.ajax({
    type: 'GET',
    url: '/content-api/courses?format=json&filter.exemptions=true&filter.openforenrollment=true&filter.incompany=false',
    success: function (data) {
    window.CourseList = data;
    $loader.fadeOut();
    }
    });
    }
    $textInput.autocomplete({
    source: function (request, response) {
    var objCourses = window.CourseList.Courses;
    $loader.text($container.data('text-searching')).show();
    arrSource = zup.map(objCourses, function (objCourse) {
    if (objCourse.DisplayName.toLowerCase().indexOf(request.term.toLowerCase()) != -1) {
    return {
    label: objCourse.DisplayName,
    id: objCourse.TPID
    };
    }
    });
    $loader.fadeOut();
    response(arrSource);
    },
    minLength: 2,
    select: function (event, ui) {
    selectCourse(ui.item);
    },
    open: function () {
    blnSelected = false;
    },
    close: function () {
    if (arrSource.length > 0 && !blnSelected) {
    selectCourse(arrSource[0]);
    $loader.hide();
    }
    },
    response: function (event, ui) {
    if (ui.content.length === 0) {
    $loader.text($container.data('text-not-found')).addClass('field-validation-error').fadeIn();
    }
    },
    change: function (event, ui) {
    if ($textInput.val().length === 0) {
    $loader.fadeOut();
    }
    }
    });
    var selectCourse = function (objItem) {
    strCourseName = objItem.label;
    numCourseId = objItem.id;
    $("#CourseInput_CourseSku").val(numCourseId);
    blnSelected = true;
    };
    };
    clearExemptionForm = function () {
    var forms = $('.exemption-stap-1 form, .exemption-stap-2 form, .exemption-stap-3 form');
    $('.exemption-stap-3').on('click', '.subscription-button', function () {
    forms.reset();
    });
    };
    openExemptionForm = function () {
    var $buttonStart = $('.exemption').find('input'),
    $buttonRequestExemption = $('.request-exemption').find('input'),
    $exemptionContainer = $('.exemption-info'),
    $buttonApplyExemption = $('.apply-exemption').find('input'),
    $redeemCodeContainer = $('.redeem-code');
    $exemptionContainer.hide();
    $redeemCodeContainer.hide();
    $subminBtn = $('.subscription-button').find('input');

    $buttonStart.on('click', function () {
    $exemptionContainer.slideToggle().attr('checked');
    });
    $buttonApplyExemption.on('click', function () {
    $redeemCodeContainer.fadeIn();
    });
    $buttonRequestExemption.on('click', function () {
    $redeemCodeContainer.hide();
    });
    };
    hideErrorMessage = function () {


    }
    openDiplomaYearBlock = function () {
    var annexBlocks = $('.vrijstelling-stap-3 .annex-block');
    if (annexBlocks.length) {
    annexBlocks.each(function (i, el) {
    var $diplomaButton = $(el).find('.document-type ul li').first().find('input[type="radio"]'),
    $otherDocuments = $(el).find('.document-type ul li').not(':first-child').find('input[type="radio"]'),
    $diplomaYearBlock = $(el).find('.diplomaYearBlock');
    $diplomaButton.on('click', function () {
    $diplomaYearBlock.show();
    });
    $otherDocuments.on('click', function () {
    $diplomaYearBlock.hide();
    });
    });
    }
    };
    openModuleblock = function () {
    $(".select-course-btn").change(function () {
    var contentPanel = $(this).parents('li').find(".content");
    var checked = this.checked;
    if (contentPanel.hasClass("open") !== checked) {
    contentPanel.toggleClass("open", checked);
    contentPanel.find('[data-val]').each(function () {
    var $th = $(this);
    $th.attr('data-val', checked);
    });
    var $form = $('form');
    $form.removeData("validator");
    $form.removeData("unobtrusiveValidation");
    $.validator.unobtrusive.parse($form);
    initCustomValidations();
    }
    }).change();
    $("input[type='radio'][name$='StandardExemptionOption']").change(function () {
    var list = $(this).closest('ul');
    var options = $(list).find('li');
    options.each(function () {
    var option = $(this).find("input[type='radio'][name$='StandardExemptionOption']");
    var checked = $(option).is(':checked');
    var valueValidator = $(this).find("[name$='StandardExemptionValue']");
    valueValidator.attr('data-val', checked);
    var $form = $('form');
    $form.removeData("validator");
    $form.removeData("unobtrusiveValidation");
    $.validator.unobtrusive.parse($form);
    initCustomValidations();
    });
    }).change();
    /*
    var input = $('.module-options .kies-diploma').find('input');
    input.on('');
    */

    };
    addNewAnnex = function () {
    $('.annex-container').on('click', '.add-annex', function () {
    $(this).parents('.annex-block').find("input[type='file']").trigger('click');
    });
    $('.annex-container').on('change', 'input[type="file"]', function () {
    $(this).siblings('.replace-value').text(this.value.replace(/C:\\fakepath\\/i, ''));
    if (!$(this).parents('.annex-block').is(':first-child')) {
    $(this).parents('.annex-block').find('.delete').show();
    $(this).parents('.annex-block').addClass('deletable');
    }
    $(this).parents('.annex-block').find('.add-annex').attr('value', 'Wijzigen');
    });
    };
    showNextAnnexfield = function () {
    $(".annex-container .show-next").on("click", function () {
    var clone = $(".annex-block:last").clone();
    clone.append($('<a class="delete">verwijder</a>'));
    clone.find('input[type="file"], input[type="radio"], input[type="checkbox"],input[type="text"], textarea').each(function () {
    var $th = $(this);
    var newID = $th.attr('name').replace(/\d+$/, function (str) { return parseInt(str) + 1; });
    $th.attr('name', newID);
    });
    clone.find('span[data-valmsg-for]').each(function () {
    var $th = $(this);
    var newID = $th.attr('data-valmsg-for').replace(/\d+$/, function (str) { return parseInt(str) + 1; });
    $th.attr('data-valmsg-for', newID);
    });
    clone.find('input[type=file],input[type=text], textarea').val("");
    clone.find('.replace-value').empty();
    clone.find('input[type="radio"], input[openModuleblock="checkbox"]').prop('checked', false);
    clone.find('.diplomaYearBlock').hide();
    clone.find('.delete').show();
    clone.find('.add-annex').attr('value', 'Toevoegen');
    clone.insertBefore(".annex-container .show-next");
    clone.find('.field-validation-error').each(function () {
    var $validation = $(this);
    $validation.removeClass('field-validation-error').addClass('field-validation-valid');
    });
    var $form = $('form');
    $form.removeData("validator");
    $form.removeData("unobtrusiveValidation");
    $.validator.unobtrusive.parse($form);
    initCustomValidations();
    openDiplomaYearBlock();
    });
    };
    initDeleteAnnexField = function () {
    $('.annex-container').on('click', '.delete', function () {
    $(this).closest('.annex-block').remove();
    });
    };
    showNextStudentfield = function () {
    $(".student-container .show-next").on("click", function () {
    $.ajax({
    url: '/Subscription/GetEmptyStudentFormFields',
    type: 'Get',
    cache: false
    })
    .success(function (result) {
    $(result).insertBefore(".student-container .show-next");
    var $form = $('form');
    $form.removeData("validator");
    $form.removeData("unobtrusiveValidation");
    $.validator.unobtrusive.parse($form);
    initCustomValidations();
    initFormAddressSwitcher();
    })
    .error(function (xhr, status) {
    });
    });
    };
    initDeleteStudentfield = function () {
    $('.student-container').on('click', '.delete', function () {
    $(this).closest('.student-block').remove();
    });
    };
    showNextChildfield = function () {
    $(".child-container .show-next").on("click", function () {
    $.ajax({
    url: '/Subscription/GetEmptyChildFormFields',
    type: 'Get',
    cache: false
    })
    .success(function (result) {
    $(result).insertBefore(".child-container .show-next");
    var $form = $('form');
    $form.removeData("validator");
    $form.removeData("unobtrusiveValidation");
    $.validator.unobtrusive.parse($form);
    initCustomValidations();
    initFormAddressSwitcher();
    })
    .error(function (xhr, status) {
    });
    });
    };
    initDeleteChildfield = function () {
    $('.child-container').on('click', '.delete', function () {
    $(this).closest('.child-block').remove();
    });
    };

    disablePaymentOptions = function () {
    var termOptions = $('input[data-term-option]');
    var paymentOptions = $('input[data-term-options]');
    $(termOptions).each(function () {
    $(this).click(function () {
    var selectedTerm = $(this).attr('data-term-option');
    $(paymentOptions).each(function () {
    var options = $(this).attr('data-term-options').split(",");
    if (options.indexOf(selectedTerm) === -1) {
    $(this).parent().parent().hide();
    $(this).prop('checked', false);
    } else {
    $(this).parent().parent().show();
    }
    });
    });
    });
    var selectedTermInput = $('input[data-term-option]:checked');
    if (selectedTermInput != null) {
    var selectedTerm = $(selectedTermInput).attr('data-term-option');
    $(paymentOptions).each(function () {
    var options = $(this).attr('data-term-options').split(",");
    if (options.indexOf(selectedTerm) === -1) {
    $(this).parent().parent().hide();
    $(this).prop('checked', false);
    } else {
    $(this).parent().parent().show();
    }
    });
    }
    };
    addSubscriptionSubmitDisabled = function () {
    $('#btnSubscriptionStep3').prop("disabled", false);
    $('#btnSubscriptionStep3').click(function () {
    $(this).prop("disabled", true);
    if (!$('form').valid()) {
    $(this).prop("disabled", false);
    return false;
    }
    $('form').submit();
    return false;
    });
    };
    /* introduction lesson */
    initIntroductionLessonInput = function () {
    $('input[name = "ChosenLessonId"]:radio').on('change', function () {
    matchLessonImage();
    });
    if ($('.studyguide-list input[name="ChosenLessonId"]').size() == 1) {
    $('.studyguide-list input[name="ChosenLessonId"]').first().prop('checked', true);
    setTimeout(function () { matchLessonImage(); }, 500);
    }
    }
    function matchLessonImage() {
    var newImageUrl = $('input[name="ChosenLessonId"]:checked').data("img-url");
    $('.selected-studyguide img').attr("src", newImageUrl);
    }
    initStudyguideTypeChange = function () {
    initStudyguideLists();
    $('input[name="StudyGuideInfo.StudyGuideType"]:radio').on('change', function () {
    initMainHeight();
    $('.available-guides input[type=radio]:checked').prop('checked', false);
    if ($('input[value="Postal"]').is(':checked')) {
    $('.adres-info').removeClass('hide-form');
    ShowPostalGuides();
    $('.available-digital-guides input[type=radio]:checked').prop('checked', false)
    CheckPostalRadiobuttonIfOnlyOne();
    ClearDummyAddress();
    } else {
    $('.adres-info').addClass('hide-form');
    ShowDigitalGuides();
    $('.available-postal-guides input[type=radio]:checked').prop('checked', false)
    CheckDigitalRadiobuttonIfOnlyOne();
    FillDummyAddress();
    };
    });
    $('input[name = "StudyGuideInfo.ChosenGuideId"]:radio').on('change', function () {
    matchStudyguideImage();
    });
    };
    function CheckPostalRadiobuttonIfOnlyOne() {
    if ($('.available-postal-guides input').size() == 1) {
    $('.available-postal-guides input').first().prop('checked', true);
    setTimeout(function () { matchStudyguideImage(); }, 500);
    }
    }
    function CheckDigitalRadiobuttonIfOnlyOne() {
    if ($('.available-digital-guides input').size() == 1) {
    $('.available-digital-guides input').first().prop('checked', true);
    setTimeout(function () { matchStudyguideImage(); }, 500);
    }
    }
    function initStudyguideLists() {
    $('.adres-info').addClass('hide-form');
    if ($('.available-digital-guides input').size() > 10) {
    $('.available-digital-guides ul').addClass('two-columns');
    }
    if ($('.available-postal-guides input').size() > 10) {
    $('.available-postal-guides ul').addClass('two-columns');
    }
    if ($('.available-digital-guides input').size() == 0 && $('.available-postal-guides input').size() > 0) {
    ClearDummyAddress();
    ShowPostalGuides();
    $('.adres-info').removeClass('hide-form');
    CheckPostalRadiobuttonIfOnlyOne();
    }
    if ($('.available-digital-guides input').size() > 0 && $('.available-postal-guides input').size() == 0) {
    FillDummyAddress();
    ShowDigitalGuides();
    CheckDigitalRadiobuttonIfOnlyOne();
    }
    }
    function ShowDigitalGuides() {
    $('.available-postal-guides').addClass('hide-form');
    var newImageUrl = $('.studyguide-list').data("default-img-url");
    setTimeout(function () { $('.available-digital-guides').removeClass('hide-form'); $('.selected-studyguide img').attr("src", newImageUrl); }, 500);
    }
    function ShowPostalGuides() {
    $('.available-digital-guides').addClass('hide-form');
    var newImageUrl = $('.studyguide-list').data("default-img-url");
    setTimeout(function () { $('.available-postal-guides').removeClass('hide-form'); $('.selected-studyguide img').attr("src", newImageUrl); }, 500);
    }
    function ClearDummyAddress() {
    $('input.form-control.phone').val('');
    $('input.form-control.lookup-zipcode').val('');
    $('input.form-control.lookup-city').val('');
    $('input.form-control.lookup-street').val('');
    $('input.form-control.lookup-housenumber').val('');
    }
    function FillDummyAddress() {
    $('input.form-control.phone').val('0612341234');
    $('input.form-control.lookup-zipcode').val('1111ZZ');
    $('input.form-control.lookup-street').val('dummy');
    $('input.form-control.lookup-city').val('dummy');
    $('input.form-control.lookup-housenumber').val('0');
    }
    function matchStudyguideImage() {
    var newImageUrl = $('input[name="StudyGuideInfo.ChosenGuideId"]:checked').data("img-url");
    $('.selected-studyguide img').attr("src", newImageUrl);
    }
    countDown = function () {
    $('.countdown').each(function () {
    var thisCountDown = $(this);
    var thisTime = thisCountDown.find('.time');
    var thisEndDate = thisCountDown.find('.countdown-enddate');
    var thisEndTime = thisCountDown.find('.countdown-endtime');
    var thisExpiredText = thisCountDown.find('.countdown-expired-text');
    /* days vars */
    var today = new Date(),
    endDateText = thisEndDate.attr('data-date'),
    endDate = new Date(endDateText),
    oneDay = 24 * 60 * 60 * 1000,
    diffDays = "",
    daysOver = false;
    if (today > endDate) {
    diffDays = 0;
    daysOver = true;
    } else {
    diffDays = Math.ceil(Math.abs((today.getTime() - endDate.getTime()) / (oneDay)));
    }
    /* get current and asked time */
    var timeNow = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
    var timeThen = thisTime.attr('data-time');
    /* set datestamps to calculate difference in seconds*/
    var totalSeconds = (d1 - d2) / 1000;
    /* start counter */
    var count = totalSeconds;
    /* counter function */
    function timer() {
    count = count - 1;
    if (count == -1) {
    clearInterval(counter);
    thisEndTime.hide();
    thisExpiredText.show();
    return;
    }
    var seconds = count % 60;
    var minutes = Math.floor(count / 60);
    var hours = Math.floor(minutes / 60);
    minutes %= 60;
    hours %= 60;
    if (seconds.toString().length == 1) {
    seconds = "0" + seconds;
    }
    if (minutes.toString().length == 1) {
    minutes = "0" + minutes;
    }
    if (hours.toString().length == 1) {
    hours = "0" + hours;
    }
    thisTime.html(hours + ":" + minutes + ":" + seconds);
    }
    /* change timer in days or time */
    if (diffDays >= 1) {
    thisEndDate.html(diffDays);
    if (diffDays === 1) {
    thisCountDown.find('.days-text').html('dag!');
    }
    } else {
    if (daysOver === true) {
    if (totalSeconds > 0 && today.getDate() === endDate.getDate() && today.getMonth() === endDate.getMonth() && today.getYear() === endDate.getYear()) {
    thisEndTime.show();
    var counter = setInterval(timer, 1000);
    } else {
    thisExpiredText.show();
    }
    } else {
    thisEndTime.show();
    var counter = setInterval(timer, 1000);
    }
    thisCountDown.find('.days-counter').hide();
    }
    });
    };
    searchSalesForceCompanies = function () {
    $("#salesforce-noresults").hide();
    $("#salesforce-result").hide();
    $("#salesforce-loading").show();
    $("#salesforce-result-list").html('');
    var searchQuery =
    {
    "name": $("input[name='Salesforce.Company.Name']").val(),
    "zipcode": $("input[name='Salesforce.Company.Zipcode']").val(),
    "city": $("input[name='Salesforce.Company.City']").val(),
    "filterSchools": $("input[name='Salesforce.Filter.Schools']").val()
    };
    $.ajax({
    url: '/FormService/SearchCompanies',
    type: 'POST',
    data: JSON.stringify(searchQuery),
    contentType: 'application/json; charset=utf-8',
    success: function (data) {
    window.salesForceCompaniesResult = data;
    if (window.salesForceCompaniesResult.length == 0) {
    $("#salesforce-loading").hide();
    $("#salesforce-result").hide();
    $("#salesforce-noresults").show();
    } else {
    $(window.salesForceCompaniesResult).each(function (i, company) {
    var templateClone = $('#salesforce-resultTemplate').clone();
    $("#salesforce-result-list").append(templateClone.html());
    var addedRow = $("#salesforce-result-list").find('#salesforce-resultTemplate-Row');
    addedRow.attr('id', 'salesforce-company-' + company.OGNID);
    addedRow.find($('[data-company-property="Name"]')).html(company.Name);
    addedRow.find($('[data-company-property="Zipcode"]')).html(company.DefaultAddress.Zipcode);
    addedRow.find($('[data-company-property="City"]')).html(company.DefaultAddress.City);
    var companySelectElement = addedRow.find($('[data-company-select]'));
    companySelectElement.attr('data-company-id', company.OGNID);
    companySelectElement.click(function () { selectSalesForceCompany(company.OGNID); });
    });
    $("#salesforce-loading").hide();
    $("#salesforce-noresults").hide();
    $("#salesforce-result").show();
    }
    },
    error: function () {
    }
    });
    }
    selectSalesForceCompany = function (companyId, contactPersonId) {
    if (window.salesForceCompaniesResult != null) {
    $.each(window.salesForceCompaniesResult, function (i, company) {
    if (company.OGNID == companyId) {
    setSalesforceProperty('company.ognid', company.OGNID);
    setSalesforceProperty('company.name', company.Name);
    setSalesforceProperty('company.isschool', company.IsSchool);
    setSalesforceProperty('company.address.country.name', company.DefaultAddress.Country.Name);
    setSalesforceProperty('company.address.country.isocode', company.DefaultAddress.Country.Culture);
    setSalesforceProperty('company.address.zipcode', company.DefaultAddress.Zipcode);
    setSalesforceProperty('company.address.houseNumber', company.DefaultAddress.Housenumber);
    setSalesforceProperty('company.address.houseNumberPrefix', company.DefaultAddress.HouseNumberAffix);
    setSalesforceProperty('company.address.street', company.DefaultAddress.Street);
    setSalesforceProperty('company.address.city', company.DefaultAddress.City);
    setSalesforceProperty('company.address.addressLine1', company.DefaultAddress.AddressForeignCountry1);
    setSalesforceProperty('company.address.addressLine2', company.DefaultAddress.AddressForeignCountry2);
    setSalesforceProperty('company.address.addressLine3', company.DefaultAddress.AddressForeignCountry3);
    var listItems = "";
    listItems += "<option value=''> - </option>";
    for (var i = 0; i < company.ContactPersons.length; i++) {
    listItems += "<option value='" + company.ContactPersons[i].OGNID + "'>" + company.ContactPersons[i].FirstName + " " + company.ContactPersons[i].LastName + " : " + company.ContactPersons[i].JobTitle + "</option>";
    }
    $("[salesforcePrefill='contactPerson.ognid']").html(listItems);
    if (contactPersonId != null) {
    setSalesforceProperty('contactPerson.ognid', contactPersonId);
    }
    }
    });
    }
    $("#salesforce-modal").modal("hide");
    }
    setSalesforceProperty = function (attributeName, value) {
    var propertyElement = $("[salesforcePrefill='" + attributeName + "']");
    if (propertyElement != null) {
    propertyElement.val(value);
    if (attributeName === 'company.address.country.isocode') {
    propertyElement.trigger('change');
    }
    var prefillMode = propertyElement.attr('salesforcePrefillMode');
    if (prefillMode === 'makeReadOnly') {
    propertyElement.prop("readonly", true);
    }
    }
    };
    reloadSalesForce = function () {
    var companyId = $("[salesforcePrefill='company.ognid']").val();
    if (companyId == null || companyId == '') {
    return;
    }
    var searchQuery =
    {
    "id": companyId
    };
    $.ajax({
    url: '/FormService/SearchCompanies',
    type: 'POST',
    data: JSON.stringify(searchQuery),
    contentType: 'application/json; charset=utf-8',
    success: function (data) {
    window.salesForceCompaniesResult = data;
    if (window.salesForceCompaniesResult.length != 0) {
    selectSalesForceCompany(companyId, $("[salesforcePrefill='contactPerson.ognid']").attr('selectedValue'));
    }
    },
    error: function () {
    }
    });
    }
    initSalesForceCompanySearch = function () {
    $("#salesforce-search-button").click(searchSalesForceCompanies);
    };
    initAvoidDoubleSubmit = function () {
    $('.scfForm .form-submit').addClass('btn btn-avoid-double-submit');
    $('.btn-avoid-double-submit').each(function () {
    var btn = $(this);
    var disableSubmitButton = function () {
    btn.closest('form').validate();
    window.setTimeout(function () {
    btn.prop('disabled', true);
    }, 1);
    window.setTimeout(function () {
    btn.prop('disabled', false);
    });
    };
    $(this).click(disableSubmitButton);
    $(this).closest('form').submit(disableSubmitButton);
    });
    };
    useFullWidthForContentIfNoSidebarIsPresent = function () {
    if (!$('.nav-sidebar').length) {
    $('.fullwidth .row > .col-md-5.col-md-offset-3').removeClass('col-md-5 col-md-offset-3').addClass('col-md-8 col-md-offset-0');
    }
    };
    window.mbUitklap = function (id) {
    $('.mb').hide();
    $('.inklapspan').hide();
    $('.uitklapspan').show();
    $('.inklapspantxt').hide();
    $('.uitklapspantxt').show();
    $(id).closest('tr').children('td:first').children('div.mb').show();
    $(id).closest('tr').children('td.mbtoggle').children('.inklapspan').css('display', 'inline-block');
    $(id).closest('tr').children('td.mbtoggle').children('.uitklapspan').hide()
    $(id).closest('tr').children('td.mbtoggletxt').children('.inklapspantxt').css('display', 'inline-block');
    $(id).closest('tr').children('td.mbtoggletxt').children('.uitklapspantxt').hide()
    }
    window.mbInklap = function (id) {
    $('.mb').hide();
    $('.inklapspan').hide();
    $('.uitklapspan').show();
    $('.inklapspantxt').hide();
    $('.uitklapspantxt').show();
    }
    initRoleToggler = function() {
    var $toggler = $('.user-role-toggler');
    if ($toggler) {
    $.ajax({
    url: '/api/sitecore/Account/GetCurrentRole',
    type: 'POST',
    success: function (data) {
    $('.user-role').html(data.role);
    $toggler.find('.btn').filter(function (index) {
    return $(this).attr('data-role') === data.role;
    }).toggleClass('btn-default btn-primary');
    $('.user-role-toggler').on('click', '.btn-default', function (e) {
    window.location.href = '/api/sitecore/Account/SwitchRole?role=' + $(this).attr('data-role') + '&returnUrl=' + encodeURIComponent(window.location.href);
    });
    },
    error: function () {
    $toggler.hide();
    }
    });
    }
    }
    initReviewComponent = function() {
    var components = $('.review-component');
    components.each(function () {
    var component = $(this);
    if (component.length > 0) {
    var backgroundDiv = component.find('.review-component__rating-row--background');
    var percentage = backgroundDiv.data('rating-percentage');
    var width = component.find('.review-component__rating-row--background-grey').width();
    backgroundDiv.width((width * (percentage / 100)));
    var showAnchor = component.data('show-anchor');
    var isClickable = component.data('is-clickable');
    var anchor = component.find('.review-component__rating-row--anchor');
    var url = anchor.attr('href');
    if (showAnchor !== "True" && anchor.length > 0) {
    anchor.hide();
    }
    if (isClickable === "True" && anchor.length > 0) {
    component.addClass('clickable');
    component.click(function() {
    window.open(url, '_blank');
    });
    anchor.click(function(e) {
    e.preventDefault();
    });
    }
    var showBottomBorder = component.data('hide-bottom-border');
    if (showBottomBorder === "True") {
    component.addClass('review-component__hide-bottom-border');
    }
    }
    });
    }
    initInitialsFields = function () {
    var selectors = [
    '#Individual_Initials',
    '#PayingCompany_ContactPerson_ContactPersonInitials',
    '#Initials',
    '#Parent_Initials',
    '.student-initials'
    ];
    InitialsBlurHook(selectors);
    }
    function InitialsBlurHook(initialsFieldsSelectors) {
    $(document).on('blur', initialsFieldsSelectors.join(), function () {
    var input = $(this);
    var initials = input.val();
    if (initials.length === 0) return;
    initials = initials.replace(/\./g, '');
    initials = initials.replace(/\ /g, '').toUpperCase();
    var initialsArray = initials.split('');
    var maxLength = initials.length;
    if (maxLength > 5) maxLength = 5;
    var output = '';
    for (var initialsCounter = 0; initialsCounter < maxLength; initialsCounter++) {
    output += initialsArray[initialsCounter] + '.';
    }
    input.val(output);
    });
    }
    hideEmptyElements = function () {
    $('.hide-if-empty').each(function () {
    if ($(this).html().trim() === '') {
    $(this).hide();
    }
    });
    };
    ;
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
    addLoadedClass('script-1-status');

    console.log('script-1-large.js finished executing');
})();