var HMCTSFrontend = {};
HMCTSFrontend.removeAttributeValue = function(el, attr, value) {
  var re, m;
  if (el.getAttribute(attr)) {
    if (el.getAttribute(attr) == value) {
      el.removeAttribute(attr);
    } else {
      re = new RegExp('(^|\\s)' + value + '(\\s|$)');
      m = el.getAttribute(attr).match(re);
      if (m && m.length == 3) {
        el.setAttribute(attr, el.getAttribute(attr).replace(re, (m[1] && m[2])?' ':''))
      }
    }
  }
}

HMCTSFrontend.addAttributeValue = function(el, attr, value) {
  var re;
  if (!el.getAttribute(attr)) {
    el.setAttribute(attr, value);
  }
  else {
    re = new RegExp('(^|\\s)' + value + '(\\s|$)');
    if (!re.test(el.getAttribute(attr))) {
      el.setAttribute(attr, el.getAttribute(attr) + ' ' + value);
    }
  }
};
HMCTSFrontend.AddAnother = function(container) {
	this.container = $(container);
	this.container.on('click', '.hmcts-add-another__remove-button', $.proxy(this, 'onRemoveButtonClick'));
	this.container.on('click', '.hmcts-add-another__add-button', $.proxy(this, 'onAddButtonClick'));
	this.container.find('.hmcts-add-another__add-button, hmcts-add-another__remove-button').prop('type', 'button');
};

HMCTSFrontend.AddAnother.prototype.onAddButtonClick = function(e) {
	var item = this.getNewItem();
	this.updateAttributes(this.getItems().length, item);
	this.resetItem(item);
	var firstItem = this.getItems().first();
	if(!this.hasRemoveButton(firstItem)) {
		this.createRemoveButton(firstItem);
	}
	this.getItems().last().after(item);
	item.find('input, textarea, select').first().focus();
};

HMCTSFrontend.AddAnother.prototype.hasRemoveButton = function(item) {
	return item.find('.hmcts-add-another__remove-button').length;
};

HMCTSFrontend.AddAnother.prototype.getItems = function() {
	return this.container.find('.hmcts-add-another__item');
};

HMCTSFrontend.AddAnother.prototype.getNewItem = function() {
	var item = this.getItems().first().clone();
	if(!this.hasRemoveButton(item)) {
		this.createRemoveButton(item);
	}
	return item;
};

HMCTSFrontend.AddAnother.prototype.updateAttributes = function(index, item) {
	item.find('[data-name]').each(function(i, el) {
		el.name = $(el).attr('data-name').replace(/%index%/, index);
		el.id = $(el).attr('data-id').replace(/%index%/, index);
		($(el).prev('label')[0] || $(el).parents('label')[0]).htmlFor = el.id;
	});
};

HMCTSFrontend.AddAnother.prototype.createRemoveButton = function(item) {
	item.append('<button type="button" class="govuk-button hmcts-button--secondary hmcts-add-another__remove-button">Remove</button>');
};

HMCTSFrontend.AddAnother.prototype.resetItem = function(item) {
	item.find('[data-name], [data-id]').each(function(index, el) {
		if(el.type == 'checkbox' || el.type == 'radio') {
			el.checked = false;
		} else {
			el.value = '';
		}
	});
};

HMCTSFrontend.AddAnother.prototype.onRemoveButtonClick = function(e) {
	$(e.currentTarget).parents('.hmcts-add-another__item').remove();
	var items = this.getItems();
	if(items.length === 1) {
		items.find('.hmcts-add-another__remove-button').remove();
	}
	items.each($.proxy(function(index, el) {
		this.updateAttributes(index, $(el));
	}, this));
	this.focusHeading();
};

HMCTSFrontend.AddAnother.prototype.focusHeading = function() {
	this.container.find('.hmcts-add-another__heading').focus();
};
HMCTSFrontend.FilterToggleButton = function(options) {
  this.options = options;
  this.container = this.options.toggleButton.container;
  this.createToggleButton();
  this.setupResponsiveChecks();
  this.options.filter.container.attr('tabindex', '-1');
  if(this.options.startHidden) {
    this.hideMenu();
  }
};

HMCTSFrontend.FilterToggleButton.prototype.setupResponsiveChecks = function() {
  this.mq = window.matchMedia(this.options.bigModeMediaQuery);
  this.mq.addListener($.proxy(this, 'checkMode'));
  this.checkMode(this.mq);
};

HMCTSFrontend.FilterToggleButton.prototype.createToggleButton = function() {
  this.menuButton = $('<button class="govuk-button '+this.options.toggleButton.classes+'" type="button" aria-haspopup="true" aria-expanded="false">'+this.options.toggleButton.showText+'</button>');
  this.menuButton.on('click', $.proxy(this, 'onMenuButtonClick'));
  this.options.toggleButton.container.append(this.menuButton);
};

HMCTSFrontend.FilterToggleButton.prototype.checkMode = function(mq) {
  if(mq.matches) {
    this.enableBigMode();
  } else {
    this.enableSmallMode();
  }
};

HMCTSFrontend.FilterToggleButton.prototype.enableBigMode = function() {
  this.showMenu();
  this.removeCloseButton();
};

HMCTSFrontend.FilterToggleButton.prototype.enableSmallMode = function() {
  this.hideMenu();
  this.addCloseButton();
};

HMCTSFrontend.FilterToggleButton.prototype.addCloseButton = function() {
  if(this.options.closeButton) {
    this.closeButton = $('<button class="hmcts-filter__close" type="button">'+this.options.closeButton.text+'</button>');
    this.closeButton.on('click', $.proxy(this, 'onCloseClick'));
    this.options.closeButton.container.append(this.closeButton);
  }
};

HMCTSFrontend.FilterToggleButton.prototype.onCloseClick = function() {
  this.hideMenu();
  this.menuButton.focus();
};

HMCTSFrontend.FilterToggleButton.prototype.removeCloseButton = function() {
  if(this.closeButton) {
    this.closeButton.remove();
    this.closeButton = null;
  }
};

HMCTSFrontend.FilterToggleButton.prototype.hideMenu = function() {
  this.menuButton.attr('aria-expanded', 'false');
  this.options.filter.container.addClass('hmcts-hidden');
  this.menuButton.text(this.options.toggleButton.showText);
};

HMCTSFrontend.FilterToggleButton.prototype.showMenu = function() {
  this.menuButton.attr('aria-expanded', 'true');
  this.options.filter.container.removeClass('hmcts-hidden');
  this.menuButton.text(this.options.toggleButton.hideText);
};

HMCTSFrontend.FilterToggleButton.prototype.onMenuButtonClick = function() {
  this.toggle();
};

HMCTSFrontend.FilterToggleButton.prototype.toggle = function() {
  if(this.menuButton.attr('aria-expanded') == 'false') {
    this.showMenu();
    this.options.filter.container.focus();
  } else {
    this.hideMenu();
  }
};
HMCTSFrontend.FormValidator = function(form, options) {
  this.form = form;
  this.errors = [];
  this.validators = [];
  $(this.form).on('submit', $.proxy(this, 'onSubmit'));
  this.summary = (options && options.summary) ? $(options.summary) : $('.govuk-error-summary');
  this.originalTitle = document.title;
};

HMCTSFrontend.FormValidator.entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

HMCTSFrontend.FormValidator.prototype.escapeHtml = function(string) {
  return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
    return HMCTSFrontend.FormValidator.entityMap[s];
  });
};

HMCTSFrontend.FormValidator.prototype.resetTitle = function() {
  document.title = this.originalTitle;
};

HMCTSFrontend.FormValidator.prototype.updateTitle = function() {
  document.title = "" + this.errors.length + " errors - " + document.title;
};

HMCTSFrontend.FormValidator.prototype.showSummary = function () {
  this.summary.html(this.getSummaryHtml());
  this.summary.removeClass('hmcts-hidden');
  this.summary.attr('aria-labelledby', 'errorSummary-heading');
  this.summary.focus();
};

HMCTSFrontend.FormValidator.prototype.getSummaryHtml = function() {
  var html = '<h2 id="error-summary-title" class="govuk-error-summary__title">There is a problem</h2>';
  html += '<div class="govuk-error-summary__body">';
  html += '<ul class="govuk-list govuk-error-summary__list">';
  for (var i = 0, j = this.errors.length; i < j; i++) {
    var error = this.errors[i];
    html += '<li>';
    html +=   '<a href="#' + this.escapeHtml(error.fieldName) + '">';
    html +=     this.escapeHtml(error.message);
    html +=   '</a>';
    html += '</li>';
  }
  html += '</ul>';
  html += '</div>';
  return html;
};

HMCTSFrontend.FormValidator.prototype.hideSummary = function() {
  this.summary.addClass('hmcts-hidden');
  this.summary.removeAttr('aria-labelledby');
};

HMCTSFrontend.FormValidator.prototype.onSubmit = function (e) {
  this.removeInlineErrors();
  this.hideSummary();
  this.resetTitle();
  if(!this.validate()) {
    e.preventDefault();
    this.updateTitle();
    this.showSummary();
    this.showInlineErrors();
  }
};

HMCTSFrontend.FormValidator.prototype.showInlineErrors = function() {
  for (var i = 0, j = this.errors.length; i < j; i++) {
    this.showInlineError(this.errors[i]);
  }
};

HMCTSFrontend.FormValidator.prototype.showInlineError = function (error) {
  var errorSpanId = error.fieldName + '-error';
  var errorSpan = '<span class="govuk-error-message" id="'+ errorSpanId +'">'+this.escapeHtml(error.message)+'</span>';
  var control = $("#" + error.fieldName);
  var fieldContainer = control.parents(".govuk-form-group");
  var label = fieldContainer.find('label');
  var legend = fieldContainer.find("legend");
  var fieldset = fieldContainer.find("fieldset");
  fieldContainer.addClass('govuk-form-group--error');
  if(legend.length) {
    legend.after(errorSpan);
    fieldContainer.attr('aria-invalid', 'true');
    HMCTSFrontend.addAttributeValue(fieldset[0], 'aria-describedby', errorSpanId);
  } else {
    label.after(errorSpan);
    control.attr('aria-invalid', 'true');
    HMCTSFrontend.addAttributeValue(control[0], 'aria-describedby', errorSpanId);
  }
};

HMCTSFrontend.FormValidator.prototype.removeInlineErrors = function() {
  var error;
  var i;
  for (var i = 0; i < this.errors.length; i++) {
    this.removeInlineError(this.errors[i]);
  }
};

HMCTSFrontend.FormValidator.prototype.removeInlineError = function(error) {
  var control = $("#" + error.fieldName);
  var fieldContainer = control.parents(".govuk-form-group");
  fieldContainer.find('.govuk-error-message').remove();
  fieldContainer.removeClass('govuk-form-group--error');
  fieldContainer.find("[aria-invalid]").attr('aria-invalid', 'false');
  var errorSpanId = error.fieldName + '-error';
  HMCTSFrontend.removeAttributeValue(fieldContainer.find('[aria-describedby]')[0], 'aria-describedby', errorSpanId);
};

HMCTSFrontend.FormValidator.prototype.addValidator = function(fieldName, rules) {
  this.validators.push({
    fieldName: fieldName,
    rules: rules,
    field: this.form.elements[fieldName]
  });
};

HMCTSFrontend.FormValidator.prototype.validate = function() {
  this.errors = [];
  var validator = null,
    validatorReturnValue = true,
    i,
    j;
  for (i = 0; i < this.validators.length; i++) {
    validator = this.validators[i];
    for (j = 0; j < validator.rules.length; j++) {
      validatorReturnValue = validator.rules[j].method(validator.field,
        validator.rules[j].params);

      if (typeof validatorReturnValue === 'boolean' && !validatorReturnValue) {
        this.errors.push({
          fieldName: validator.fieldName,
          message: validator.rules[j].message
        });
        break;
      } else if(typeof validatorReturnValue === 'string') {
        this.errors.push({
          fieldName: validatorReturnValue,
          message: validator.rules[j].message
        });
        break;
      }
    }
  }
  return this.errors.length === 0;
};
HMCTSFrontend.Menu = function(params) {
	this.container = params.container;
	this.menu = this.container.find('.hmcts-menu__wrapper');
	if(params.menuClasses) {
		this.menu.addClass(params.menuClasses);
	}
	this.menu.attr('role', 'menu');
	this.mq = params.mq;
	this.buttonText = params.buttonText;
	this.buttonClasses = params.buttonClasses || '';
	this.keys = { esc: 27, up: 38, down: 40, tab: 9 };
	this.menu.on('keydown', '[role=menuitem]', $.proxy(this, 'onButtonKeydown'));
	this.createToggleButton();
	this.setupResponsiveChecks();
	$(document).on('click', $.proxy(this, 'onDocumentClick'));
};

HMCTSFrontend.Menu.prototype.onDocumentClick = function(e) {
	if(!$.contains(this.container[0], e.target)) {
	  this.hideMenu();
  }
};

HMCTSFrontend.Menu.prototype.createToggleButton = function() {
	this.menuButton = $('<button class="govuk-button hmcts-menu__toggle-button ' + this.buttonClasses + '" type="button" aria-haspopup="true" aria-expanded="false">'+this.buttonText+'</button>');
	this.menuButton.on('click', $.proxy(this, 'onMenuButtonClick'));
	this.menuButton.on('keydown', $.proxy(this, 'onMenuKeyDown'));
};

HMCTSFrontend.Menu.prototype.setupResponsiveChecks = function() {
	this.mql = window.matchMedia(this.mq);
	this.mql.addListener($.proxy(this, 'checkMode'));
	this.checkMode(this.mql);
};

HMCTSFrontend.Menu.prototype.checkMode = function(mql) {
	if(mql.matches) {
		this.enableBigMode();
	} else {
		this.enableSmallMode();
	}
};

HMCTSFrontend.Menu.prototype.enableSmallMode = function() {
	this.container.prepend(this.menuButton);
	this.hideMenu();
	this.removeButtonClasses();
	this.menu.attr('role', 'menu');
	this.container.find('.hmcts-menu__item').attr('role', 'menuitem');
};

HMCTSFrontend.Menu.prototype.enableBigMode = function() {
	this.menuButton.detach();
	this.showMenu();
	this.addButtonClasses();
	this.menu.removeAttr('role');
	this.container.find('.hmcts-menu__item').removeAttr('role');
};

HMCTSFrontend.Menu.prototype.removeButtonClasses = function() {
	this.menu.find('.hmcts-menu__item').each(function(index, el) {
		if($(el).hasClass('hmcts-button--secondary')) {
			$(el).attr('data-secondary', 'true');
			$(el).removeClass('hmcts-button--secondary');
		}
		$(el).removeClass('govuk-button');
	});
};

HMCTSFrontend.Menu.prototype.addButtonClasses = function() {
	this.menu.find('.hmcts-menu__item').each(function(index, el) {
		if($(el).attr('data-secondary') == 'true') {
			$(el).addClass('hmcts-button--secondary');
		}
		$(el).addClass('govuk-button');
	});
};

HMCTSFrontend.Menu.prototype.hideMenu = function() {
	this.menuButton.attr('aria-expanded', 'false');
};

HMCTSFrontend.Menu.prototype.showMenu = function() {
	this.menuButton.attr('aria-expanded', 'true');
};

HMCTSFrontend.Menu.prototype.onMenuButtonClick = function() {
	this.toggle();
};

HMCTSFrontend.Menu.prototype.toggle = function() {
	if(this.menuButton.attr('aria-expanded') == 'false') {
		this.showMenu();
		this.menu.find('[role=menuitem]').first().focus();
	} else {
		this.hideMenu();
		this.menuButton.focus();
	}
};

HMCTSFrontend.Menu.prototype.onMenuKeyDown = function(e) {
	switch (e.keyCode) {
		case this.keys.down:
			this.toggle();
			break;
	}
};

HMCTSFrontend.Menu.prototype.onButtonKeydown = function(e) {
	switch (e.keyCode) {
		case this.keys.up:
			e.preventDefault();
			this.focusPrevious(e.currentTarget);
			break;
		case this.keys.down:
			e.preventDefault();
			this.focusNext(e.currentTarget);
			break;
		case this.keys.esc:
			if(!this.mq.matches) {
				this.menuButton.focus();
				this.hideMenu();
			}
			break;
		case this.keys.tab:
			if(!this.mq.matches) {
				this.hideMenu();
			}
	}
};

HMCTSFrontend.Menu.prototype.focusNext = function(currentButton) {
	var next = $(currentButton).next();
	if(next[0]) {
		next.focus();
	} else {
		this.container.find('[role=menutiem]').first().focus();
	}
};

HMCTSFrontend.Menu.prototype.focusPrevious = function(currentButton) {
	var prev = $(currentButton).prev();
	if(prev[0]) {
		prev.focus();
	} else {
		this.container.find('[role=menutiem]').last().focus();
	}
};
if('contentEditable' in document.documentElement) {
  HMCTSFrontend.RichTextEditor = function(options) {
    this.options = options;
    this.options.toolbar = this.options.toolbar || {
      bold: false,
      italic: false,
      underline: false,
      list: true,
      numbers: true
    };
    this.textarea = this.options.textarea;
    this.container = $(this.textarea).parent();
    this.createToolbar();
    this.hideDefault();
    this.configureToolbar();
    this.keys = {
      left: 37,
      right: 39,
      up: 38,
      down: 40
    };
    this.container.on('click', '.hmcts-rich-text-editor__toolbar-button', $.proxy(this, 'onButtonClick'));
    this.container.find('.hmcts-rich-text-editor__content').on('input', $.proxy(this, 'onEditorInput'));
    this.container.find('label').on('click', $.proxy(this, 'onLabelClick'));
    this.toolbar.on('keydown', $.proxy(this, 'onToolbarKeydown'));
  };

  HMCTSFrontend.RichTextEditor.prototype.onToolbarKeydown = function(e) {
    var focusableButton;
    switch(e.keyCode) {
      case this.keys.right:
      case this.keys.down:
        focusableButton = this.toolbar.find('button[tabindex=0]');
        var nextButton = focusableButton.next('button');
        if(nextButton[0]) {
          nextButton.focus();
          focusableButton.attr('tabindex', '-1');
          nextButton.attr('tabindex', '0');
        }
        break;
      case this.keys.left:
      case this.keys.up:
        focusableButton = this.toolbar.find('button[tabindex=0]');
        var previousButton = focusableButton.prev('button');
        if(previousButton[0]) {
          previousButton.focus();
          focusableButton.attr('tabindex', '-1');
          previousButton.attr('tabindex', '0');
        }
        break;
    }
  };

  HMCTSFrontend.RichTextEditor.prototype.getToolbarHtml = function() {
    var html = '';

    html += '<div class="hmcts-rich-text-editor__toolbar" role="toolbar">';

    if(this.options.toolbar.bold) {
      html += '<button class="hmcts-rich-text-editor__toolbar-button hmcts-rich-text-editor__toolbar-button--bold" type="button" data-command="bold"><span class="govuk-visually-hidden">Bold</span></button>';
    }

    if(this.options.toolbar.italic) {
      html += '<button class="hmcts-rich-text-editor__toolbar-button hmcts-rich-text-editor__toolbar-button--italic" type="button" data-command="italic"><span class="govuk-visually-hidden">Italic</span></button>';
    }

    if(this.options.toolbar.underline) {
      html += '<button class="hmcts-rich-text-editor__toolbar-button hmcts-rich-text-editor__toolbar-button--underline" type="button" data-command="underline"><span class="govuk-visually-hidden">Underline</span></button>';
    }

    if(this.options.toolbar.list) {
      html += '<button class="hmcts-rich-text-editor__toolbar-button hmcts-rich-text-editor__toolbar-button--unordered-list" type="button" data-command="insertUnorderedList"><span class="govuk-visually-hidden">Unordered list</span></button>';
    }

    if(this.options.toolbar.numbers) {
      html += '<button class="hmcts-rich-text-editor__toolbar-button hmcts-rich-text-editor__toolbar-button--ordered-list" type="button" data-command="insertOrderedList"><span class="govuk-visually-hidden">Ordered list</span></button>';
    }

    html += '</div>';
    return html;
  };

  HMCTSFrontend.RichTextEditor.prototype.getEnhancedHtml = function(val) {
    return this.getToolbarHtml() + '<div class="hmcts-rich-text-editor__content" contenteditable="true" spellcheck="false"></div>';
  };

  HMCTSFrontend.RichTextEditor.prototype.hideDefault = function() {
    this.textarea = this.container.find('textarea');
    this.textarea.addClass('govuk-visually-hidden');
    this.textarea.attr('aria-hidden', true);
    this.textarea.attr('tabindex', '-1');
  };

  HMCTSFrontend.RichTextEditor.prototype.createToolbar = function() {
    this.toolbar = document.createElement('div');
    this.toolbar.className = 'hmcts-rich-text-editor';
    this.toolbar.innerHTML = this.getEnhancedHtml();
    this.container.append(this.toolbar);
    this.toolbar = this.container.find('.hmcts-rich-text-editor__toolbar');
    this.container.find('.hmcts-rich-text-editor__content').html(this.textarea.val());
  };

  HMCTSFrontend.RichTextEditor.prototype.configureToolbar = function() {
    this.buttons = this.container.find('.hmcts-rich-text-editor__toolbar-button');
    this.buttons.prop('tabindex', '-1');
    var firstTab = this.buttons.first();
    firstTab.prop('tabindex', '0');
  };

  HMCTSFrontend.RichTextEditor.prototype.onButtonClick = function(e) {
    document.execCommand($(e.currentTarget).data('command'), false, null);
  };

  HMCTSFrontend.RichTextEditor.prototype.getContent = function() {
    return this.container.find('.hmcts-rich-text-editor__content').html();
  };

  HMCTSFrontend.RichTextEditor.prototype.onEditorInput = function(e) {
    this.updateTextarea();
  };

  HMCTSFrontend.RichTextEditor.prototype.updateTextarea = function() {
    document.execCommand('defaultParagraphSeparator', false, 'p');
    this.textarea.val(this.getContent());
  };

  HMCTSFrontend.RichTextEditor.prototype.onLabelClick = function(e) {
    e.preventDefault();
    this.container.find('.hmcts-rich-text-editor__content').focus();
  };

}
HMCTSFrontend.SearchToggleButton = function(options) {
  this.options = options;
  this.toggleButton = $('<button class="hmcts-search-toggle__button" type="button" aria-haspopup="true" aria-expanded="false">'+this.options.toggleButton.text+'</button>');
	this.toggleButton.on('click', $.proxy(this, 'onToggleButtonClick'));
  this.options.toggleButton.container.append(this.toggleButton);
};

HMCTSFrontend.SearchToggleButton.prototype.onToggleButtonClick = function() {
  if(this.toggleButton.attr('aria-expanded') == 'false') {
    this.toggleButton.attr('aria-expanded', 'true');
    this.options.search.container.removeClass('hmcts-hidden');
    this.options.search.container.find('input').first().focus();
	} else {
		this.options.search.container.addClass('hmcts-hidden');
		this.toggleButton.attr('aria-expanded', 'false');
	}
};

HMCTSFrontend.SortableTable = function(params) {
	this.table = $(params.table);
	this.setupOptions(params);
	this.body = this.table.find('tbody');
	this.createHeadingButtons();
	this.createStatusBox();
	this.table.on('click', 'th button', $.proxy(this, 'onSortButtonClick'));
};

HMCTSFrontend.SortableTable.prototype.setupOptions = function(params) {
	params = params || {};
	this.statusMessage = params.statusMessage || 'Sort by %heading% (%direction%)';
	this.ascendingText = params.ascendingText || 'ascending';
	this.descendingText = params.descendingText || 'descending';
};

HMCTSFrontend.SortableTable.prototype.createHeadingButtons = function() {
	var headings = this.table.find('thead th');
	var heading;
	for(var i = 0; i < headings.length; i++) {
		heading = $(headings[i]);
		if(heading.attr('aria-sort')) {
			this.createHeadingButton(heading, i);
		}
	}
};

HMCTSFrontend.SortableTable.prototype.createHeadingButton = function(heading, i) {
	var text = heading.text();
	var button = $('<button type="button" data-index="'+i+'">'+text+'</button>');
	heading.text('');
	heading.append(button);
};

HMCTSFrontend.SortableTable.prototype.createStatusBox = function() {
	this.status = $('<div aria-live="polite" role="status" aria-atomic="true" class="govuk-visually-hidden" />');
	this.table.parent().append(this.status);
};

HMCTSFrontend.SortableTable.prototype.onSortButtonClick = function(e) {
	var columnNumber = e.currentTarget.getAttribute('data-index');
	var sortDirection = $(e.currentTarget).parent().attr('aria-sort');
	var newSortDirection;
	if(sortDirection === 'none' || sortDirection === 'descending') {
		newSortDirection = 'ascending';
	} else {
		newSortDirection = 'descending';
	}
	var rows = this.getTableRowsArray();
	var sortedRows = this.sort(rows, columnNumber, newSortDirection);
	this.addRows(sortedRows);
	this.removeButtonStates();
	this.updateButtonState($(e.currentTarget), newSortDirection);
};

HMCTSFrontend.SortableTable.prototype.updateButtonState = function(button, direction) {
	button.parent().attr('aria-sort', direction);
	var message = this.statusMessage;
	message = message.replace(/%heading%/, button.text());
	message = message.replace(/%direction%/, this[direction+'Text']);
	this.status.text(message);
};

HMCTSFrontend.SortableTable.prototype.removeButtonStates = function() {
	this.table.find('thead th').attr('aria-sort', 'none');
};

HMCTSFrontend.SortableTable.prototype.addRows = function(rows) {
	for(var i = 0; i < rows.length; i++) {
		this.body.append(rows[i]);
	}
};

HMCTSFrontend.SortableTable.prototype.getTableRowsArray = function() {
	var rows = [];
	var trs = this.body.find('tr');
	for (var i = 0; i < trs.length; i++) {
		rows.push(trs[i]);
	}
    return rows;
};

HMCTSFrontend.SortableTable.prototype.sort = function(rows, columnNumber, sortDirection) {
	var newRows = rows.sort($.proxy(function(rowA, rowB) {
		var tdA = $(rowA).find('td').eq(columnNumber);
		var tdB = $(rowB).find('td').eq(columnNumber);
		var valueA = this.getCellValue(tdA);
		var valueB = this.getCellValue(tdB);
		if(sortDirection === 'ascending') {
			if(valueA < valueB) {
				return -1;
			}
			if(valueA > valueB) {
				return 1;
			}
			return 0;
		} else {
			if(valueB < valueA) {
				return -1;
			}
			if(valueB > valueA) {
				return 1;
			}
			return 0;
		}
	}, this));
	return newRows;
};

HMCTSFrontend.SortableTable.prototype.getCellValue = function(cell) {
	var val = cell.attr('data-sort-value');
	val = val || cell.html();
	if($.isNumeric(val)) {
		val = parseInt(val, 10);
	}
	return val;
};