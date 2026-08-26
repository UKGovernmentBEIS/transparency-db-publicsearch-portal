const express = require('express');
const axios = require('axios');
const XLSX = require('xlsx');
const utils = require("../utils");

const router = express.Router();

router.get('/', async function (req, res, next) {
  try {
    const format = req.query.format === 'csv' ? 'csv' : 'xlsx';
    var errors = [];

    const filters = utils.getFilters(req,"mfa");

    const confirmationDateFrom = utils.buildDateFromStrings(filters.confirmationFromDay, filters.confirmationFromMonth, filters.confirmationFromYear);
    const confirmationDateTo = utils.buildDateFromStrings(filters.confirmationToDay, filters.confirmationToMonth, filters.confirmationToYear);

    // Validate award full amount from and to
    var awardAmountErrors = utils.validateFromTo(filters.awardFullFromAmount, filters.awardFullToAmount);

    if (awardAmountErrors.hasErrors) {
      const fieldIds = {
        from: "awardFull-from-amount-input",
        to: "awardFull-to-amount-input"
      };
    
      awardAmountErrors.field = fieldIds[awardAmountErrors.field] ?? fieldIds.to;
      errors.push(awardAmountErrors);
    }

    // Validate confirmation date from and to
    var confirmationDateErrors = utils.validateDateFromTo(confirmationDateFrom, confirmationDateTo)
    
    if (confirmationDateErrors.hasErrors){
      const fieldIds = {
        from: "confirmation-filter-from-day",
        to: "confirmation-filter-to-day",
      };

      confirmationDateErrors.field = fieldIds[confirmationDateErrors.field] ?? fieldIds.to;
      errors.push(confirmationDateErrors);
    }

    if(errors.length > 0){
      return res.render("publicusersearch/mfaawards", {
        filters,
        results: [],
        pageCount: 0,
        page: 0,
        size: 10,
        errors
      });
    }

    const response = await axios.get(
      beis_url_publicsearch + '/searchResults/mfaawards/export',
      {
        params: filters
      }
    );

    const awards = Array.isArray(response.data)
        ? response.data
        : response.data.mfaAwards || [];

    const exportRows = awards.map(toAwardExportRow);

    const worksheet = XLSX.utils.json_to_sheet(exportRows);
    if (format === 'csv') {
      
      const csv = XLSX.utils.sheet_to_csv(worksheet);

      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="mfa-spei-awards.csv"');
      utils.setSecurityHeaders(res, beis_url_publicsearch);

      return res.send(csv);
    }
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'MFA SPEI Awards');

    const buffer = XLSX.write(workbook, {
      type: 'buffer',
      bookType: 'xlsx'
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="mfa-spei-awards.xlsx"'
    );

    utils.setSecurityHeaders(res, beis_url_publicsearch);
    return res.send(buffer);
  } catch (error) {
    next(error);
  }

  function toAwardExportRow(award) {
    return {
      'MFA / SPEIA award number': award.mfaAwardNumber || '',
  
      'SPEI assistance award':
        award.isSpeiAssistance  || '',
  
      'MFA grouping name':
        award.mfaGroupingResponse && award.mfaGroupingResponse.mfaGroupingName
          ? award.mfaGroupingResponse.mfaGroupingName
          : 'N/A',
  
      'Award amount':
        award.awardAmount || '',
  
      'Confirmation date':
        award.confirmationDate || '',

      'Public authority name':
      award.grantingAuthorityResponse && award.grantingAuthorityResponse.grantingAuthorityName
        ? award.grantingAuthorityResponse.grantingAuthorityName
        : '',
  
      'Recipient name':
        award.recipientName || '',
  
      'Recipient ID type':
        award.recipientIdType || '',
  
      'Recipient ID':
        award.recipientIdNumber || '',
  
      'Status':
        award.status || '',
  
      'Published date':
        award.publishedDate || '',
  
      'Created date':
        award.createdTimestamp || '',
  
      'Last modified date':
        award.lastModifiedTimestamp || ''
    };
  }
  
  function parseJsonArray(value) {
    if (!value) {
      return [];
    }
  
    if (Array.isArray(value)) {
      return value;
    }
  
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }
});

module.exports = router;