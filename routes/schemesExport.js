const express = require('express');
const axios = require('axios');
const XLSX = require('xlsx');
const utils = require("../utils");

const router = express.Router();

router.get('/', async function (req, res, next) {
  try {
    const format = req.query.format === 'csv' ? 'csv' : 'xlsx';

    const filters = utils.getFilters(req,"scheme");

    const response = await axios.get(
      beis_url_publicsearch + '/searchResults/schemes/export',
      {
        params: filters
      }
    );

    const schemes = Array.isArray(response.data)
        ? response.data
        : response.data.schemes || [];

    const exportRows = schemes.map(toSchemeExportRow);

    const worksheet = XLSX.utils.json_to_sheet(exportRows);
    if (format === 'csv') {
      
      const csv = XLSX.utils.sheet_to_csv(worksheet);

      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="subsidyschemes.csv"');
      utils.setSecurityHeaders(res, beis_url_publicsearch);

      return res.send(csv);
    }
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Awards');

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
      'attachment; filename="subsidyschemes.xlsx"'
    );

    utils.setSecurityHeaders(res, beis_url_publicsearch);
    return res.send(buffer);
  } catch (error) {
    next(error);
  }

  function toSchemeExportRow(scheme) {
    return {
      'Subsidy control number': scheme.scNumber || '',
  
      'Subsidy scheme name': scheme.subsidyMeasureTitle || '',
  
      'Subsidies or Schemes of Interest (SSoI) or Subsidies or Schemes of Particular Interest (SSoPI)':
        scheme.subsidyMeasure && scheme.subsidyMeasure.scNumber
          ? scheme.subsidyMeasure.scNumber
          : '',
  
      'Subsidies or Schemes of Interest (SSoI) or Subsidies or Schemes of Particular Interest (SSoPI)':
        scheme.subsidySchemeInterest || '',
  
      'Subsidy status':
        scheme.status || '',
  
        'Public authority':
        scheme.grantingAuthorityName || '',
  
      'Subsidy scheme description':
        scheme.subsidySchemeDescription || '',
  
      'Legal basis':
      scheme.legalBasis && scheme.legalBasis.legalBasisText
      ? scheme.legalBasis.legalBasisText
      : '',
  
      'URL':
        scheme.gaSubsidyWebLink || '',
  
      'URL description':
        scheme.gaSubsidyWebLinkDescription || '',
  
      'Budget/£':
        scheme.budget || '',
  
      'Maximum amount given under a scheme':
        scheme.maximumAmountUnderScheme || '',
  
      'Confirmation date':
        scheme.confirmationDate || '',
  
      'Start date':
        scheme.startDate || '',
  
      'End date':
        scheme.endDate || '',
  
      'Duration/days':
        scheme.duration || '',
  
      'Published date':
        scheme.publishedMeasureDate || '',
  
      'Created date':
        scheme.createdTimestamp || '',
  
      'Last modified date':
        scheme.lastModifiedTimestamp || '',
  
      'Spending Sectors':
        parseJsonArray(scheme.spendingSectors).join(', '),
  
      'Purpose':
      parseJsonArray(scheme.purpose).join(', '),
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