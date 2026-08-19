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

exports.validateDateFromTo = function (fromDate, toDate){
  const error = {
    hasErrors: false,
    errorMsg: "",
    field: null
  };

  const hasFrom = Boolean(fromDate?.trim());
  const hasTo = Boolean(toDate?.trim());

  if(hasFrom !== hasTo ){
    return{
      hasErrors: true,
      errorMsg: "If 'From' date or 'To' are provided, both must be provided",
      field: hasFrom ? "to" : "from"
    }
  }


  
  if (hasFrom && hasTo){
    // check that both are valid
    if(!isDateValid(fromDate) || !isDateValid(toDate)){
      return {
        hasErrors: true,
        errorMsg: "'From' date and 'To' date must be valid dates",
        field: !isDateValid(fromDate) ? "from" : "to"
      };
    }

    // check that to is after from
    const fromDateObj = Date.parse(fromDate);
    const toDateObj = Date.parse(toDate);

    if(fromDateObj > toDateObj){
      return {
        hasErrors: true,
        errorMsg: "'To' date must be after 'From' date",
        field: "to"
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
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self' data:",
      "connect-src 'self' " + url,
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
  var filters = {};
  switch(type){
    case "scheme":
      filters = {
        sort: req.query.sort || defaultSort,
        keyword: req.query.keyword || '',
        pa: req.query.pa || '',
        schemeStatus: req.query.schemeStatus || '',
        schemeStartFromDay: req.query.schemeStartFromDay || '',
        schemeStartFromMonth: req.query.schemeStartFromMonth || '',
        schemeStartFromYear: req.query.schemeStartFromYear || '',
        schemeStartToDay: req.query.schemeStartToDay || '',
        schemeStartToMonth: req.query.schemeStartToMonth || '',
        schemeStartToYear: req.query.schemeStartToYear || '',
        schemeBudgetFromAmount: req.query.schemeBudgetFromAmount || '',
        schemeBudgetToAmount: req.query.schemeBudgetToAmount || '',
        sector: req.query.sector || '',
        subsidyPurpose: req.query.subsidyPurpose || '',
        subsidyPurposeOther: req.query.subsidyPurposeOther || '',
        subsidyInterest: req.query.subsidyInterest || ''
      }
      break;
    case "mfa":
      break;
    case "award":
      break;
  }

  return filters;
}