const validateDate = require("validate-date");

setURIParameter = function (uri, key, value) {
  var updatedURI = new URL(uri);
  if (updatedURI.searchParams.has(key)) {
    updatedURI.searchParams.set(key, value);
  }
  else {
    updatedURI.searchParams.append(key, value);
  }
  return updatedURI.href;

}

setURIParameters = function (uri, paramValues) {
  Object.entries(paramValues).forEach(([paramKey, paramValue]) => {
    uri = setURIParameter(uri, paramKey, paramValue)
  });

  const returnUrl = new URL(uri);
  return returnUrl.pathname + returnUrl.search + returnUrl.hash;
}

exports.validateFromTo = function (from, to) {
  const error = {
    hasErrors: false,
    errorMsg: "",
    field: null
  };

  const hasFrom = Boolean(from?.trim());
  const hasTo = Boolean(to?.trim());

  if (hasFrom !== hasTo) {
    return{
      hasErrors: true,
      errorMsg: "If 'From' or 'To' are provided, both must be provided",
      field: hasFrom ? "to" : "from"
    }
  }

  if (hasFrom && hasTo) {
    const fromNumber = Number(from);
    const toNumber = Number(to);
  
    if (!Number.isFinite(fromNumber) || !Number.isFinite(toNumber)) {
      return {
        hasErrors: true,
        errorMsg: "'From' and 'To' must be valid numbers",
        field: !Number.isFinite(fromNumber) ? "from" : "to"
      };
    }
  
    if (toNumber < fromNumber) {
      return {
        hasErrors: true,
        errorMsg: "'To' must be greater than or equal to 'From'",
        field: "to"
      };
    }

    if (!Number.isInteger(fromNumber) || !Number.isInteger(toNumber)) {
      return {
        hasErrors: true,
        errorMsg: "'From' and 'To' must be whole numbers",
        field: !Number.isInteger(fromNumber) ? "from" : "to"
      };
    }
  }

  return error;
}

isDateValid = function(date){
  return validateDate(date, responseType="boolean");
}

exports.validateDateFromTo = function (fromDay, fromMonth, fromYear, toDay, toMonth, toYear) {
  const error = {
    hasErrors: false,
    errorMsg: "",
    field: null
  };

  const fromField = 'filter-from-day';
  const toField = 'filter-to-day';

  const fromDate = this.buildDateFromStrings(fromDay, fromMonth, fromYear);
  const toDate = this.buildDateFromStrings(toDay, toMonth, toYear);

  const hasFrom = Boolean(fromDate?.trim());
  const hasTo = Boolean(toDate?.trim());

  if(hasFrom !== hasTo ){
    return{
      hasErrors: true,
      errorMsg: "If 'From' date or 'To' are provided, both must be provided",
      field: hasFrom ? toField : fromField
    }
  }
  
  if (hasFrom && hasTo){
    // check that both are valid
    if(!isDateValid(fromDate) || !isDateValid(toDate)){
      return {
        hasErrors: true,
        errorMsg: "'From' date and 'To' date must be valid dates",
        field: !isDateValid(fromDate) ? fromField : toField
      };
    }

    // check that to is after from
    const fromDateObj = Date.parse(fromDate);
    const toDateObj = Date.parse(toDate);

    if(fromDateObj > toDateObj){
      return {
        hasErrors: true,
        errorMsg: "'To' date must be after 'From' date",
        field: toField
      };
    }
  }

  return error;
}

exports.buildDateFromStrings = function (day, month, year) {
  if (!day && !month && !year) {
    return null;
  }

  return [year, month, day].join("-");
};

exports.setSecurityHeaders = function (res, url) {
  res.set({
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Access-Control-Allow-Origin": url,
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
    "Content-Security-Policy": [
      "default-src 'self'",
      // GTM
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline'",
      // GTM / GA tracking pixels
      "img-src 'self' data: https://www.googletagmanager.com https://*.google-analytics.com",
      "font-src 'self' data:",
      // GTM / GA network calls
      "connect-src 'self' " + url +
        " https://www.googletagmanager.com" +
        " https://*.google-analytics.com" +
        " https://*.analytics.google.com",
      // Required for the GTM <noscript> iframe
      "frame-src https://www.googletagmanager.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'"
    ].join("; "),
    "Referrer-Policy": "origin",
    "Cross-Origin-Resource-Policy": "same-origin",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Cross-Origin-Embedder-Policy": "require-corp",
  });

}

exports.getFilters = function (req, type){
  const defaultSort = 'publishedDate,desc';
  const commonFilters = {
    sort: req.query.sort || defaultSort,
    keyword: req.query.keyword || '',
    fromDay: req.query.fromDay || '',
    fromMonth: req.query.fromMonth || '',
    fromYear: req.query.fromYear || '',
    toDay: req.query.toDay || '',
    toMonth: req.query.toMonth || '',
    toYear: req.query.toYear || '',
  }

  var filters = {};
  switch(type){
    case "scheme":
      filters = {
        pa: req.query.pa || '',
        schemeStatus: req.query.schemeStatus || '',
        schemeBudgetFromAmount: req.query.schemeBudgetFromAmount || '',
        schemeBudgetToAmount: req.query.schemeBudgetToAmount || '',
        sector: req.query.sector || '',
        subsidyPurpose: req.query.subsidyPurpose || '',
        subsidyPurposeOther: req.query.subsidyPurposeOther || '',
        subsidyInterest: req.query.subsidyInterest || ''
      }
      break;
    case "mfa":
      filters = {
        mfaAssistance: req.query.mfaAssistance || '',
        awardFullFromAmount : req.query.awardFullFromAmount || '',
        awardFullToAmount: req.query.awardFullToAmount || '',
      };
      break;
    case "award":
      filters = {
        awardType: req.query.awardType || '',
        pa: req.query.pa || '',
        awardFullFromAmount : req.query.awardFullFromAmount || '',
        awardFullToAmount: req.query.awardFullToAmount || '',
        sector: req.query.sector || '',
        geoLocation: req.query.geoLocation || '',
        subsidyForm: req.query.subsidyForm || '',
        subsidyFormOther: req.query.subsidyFormOther || '',
        subsidyPurpose: req.query.subsidyPurpose || '',
        subsidyPurposeOther: req.query.subsidyPurposeOther || '',
        subsidyInterest: req.query.subsidyInterest || '',
      };
      break;
  }

  filters = {
    ...commonFilters,
    ...filters
  }

  return filters;
}
