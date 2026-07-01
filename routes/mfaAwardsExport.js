const express = require('express');
const axios = require('axios');
const XLSX = require('xlsx');
const utils = require("../utils");

const router = express.Router();

router.get('/', async function (req, res, next) {
  try {
    const format = req.query.format === 'csv' ? 'csv' : 'xlsx';

    const filters = {
      keyword: req.query.keyword || '',
    };

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