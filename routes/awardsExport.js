const express = require('express');
const axios = require('axios');
const XLSX = require('xlsx');

const router = express.Router();

router.get('/', async function (req, res, next) {
  try {
    const format = req.query.format === 'csv' ? 'csv' : 'xlsx';

    const filters = {
      keyword: req.query.keyword || '',
      ga: req.query.ga || '',
      geoLocation: req.query.geoLocation || ''
    };

    const response = await axios.get(
      beis_url_publicsearch + '/searchResults/awards/export',
      {
        params: filters
      }
    );

    const awards = Array.isArray(response.data)
        ? response.data
        : response.data.awards || [];

    const exportRows = awards.map(toAwardExportRow);

    if (format === 'csv') {
      const worksheet = XLSX.utils.json_to_sheet(exportRows);
      const csv = XLSX.utils.sheet_to_csv(worksheet);

      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="publicsearchawards.csv"');

      return res.send(csv);
    }

    const worksheet = XLSX.utils.json_to_sheet(exportRows);
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
      'attachment; filename="publicsearchawards.xlsx"'
    );

    return res.send(buffer);
  } catch (error) {
    next(error);
  }

  function toAwardExportRow(award) {
    return {
      'Standalone award': award.standaloneAward || '',
  
      'Standalone award title':
        award.standaloneAward === 'Yes'
          ? award.standaloneAwardTitle || ''
          : 'NA',
  
      'Subsidy control number':
        award.subsidyMeasure && award.subsidyMeasure.scNumber
          ? award.subsidyMeasure.scNumber
          : '',
  
      'Subsidies or Schemes of Interest (SSoI) or Subsidies or Schemes of Particular Interest (SSoPI)':
        award.subsidyAwardInterest || '',
  
      'Specific policy objective':
        award.specificPolicyObjective || '',
  
      'Subsidy award description':
        award.subsidyAwardDescription || '',
  
      'Public authority URL':
        award.standaloneAward === 'Yes'
          ? award.authorityURL || ''
          : 'NA',
  
      'Public authority URL Description':
        award.standaloneAward === 'Yes'
          ? award.authorityURLDescription || ''
          : 'NA',
  
      'Subsidy award number':
        award.awardNumber || '',
  
      'Subsidy award status':
        award.status || '',
  
      'Subsidy scheme name':
        award.subsidyMeasure && award.subsidyMeasure.subsidyMeasureTitle
          ? award.subsidyMeasure.subsidyMeasureTitle
          : '',
  
      'Legal basis':
        award.legalBasis || '',
  
      'Services of Public Economic Interest (SPEI)':
        award.spei || '',
  
      'Subsidy purpose':
        parseJsonArray(award.subsidyObjective).join(', '),
  
      'Subsidy form':
        award.subsidyInstrument || '',
  
      'Subsidy element full amount/£':
        award.subsidyFullAmountExact || '',
  
      'Subsidy element full amount range/£':
        award.subsidyFullAmountRange || '',
  
      'Public authority name':
        award.grantingAuthorityResponse && award.grantingAuthorityResponse.grantingAuthorityName
          ? award.grantingAuthorityResponse.grantingAuthorityName
          : '',
  
      'Awarded date':
        award.legalGrantingDate || '',
  
      'Published date':
        award.publishedAwardDate || '',
  
      'Created date':
        award.createdTimestamp || '',
  
      'Last modified date':
        award.lastModifiedTimestamp || '',
  
      'Comments':
        award.rejectReason || '',
  
      'Recipient name':
        award.beneficiary && award.beneficiary.beneficiaryName
          ? award.beneficiary.beneficiaryName
          : '',
  
      'Recipient size':
        award.beneficiary && award.beneficiary.orgSize
          ? award.beneficiary.orgSize
          : '',
  
      'ID type':
        award.beneficiary && award.beneficiary.nationalIdType
          ? award.beneficiary.nationalIdType
          : '',
  
      'ID number':
        award.beneficiary && award.beneficiary.nationalId
          ? award.beneficiary.nationalId
          : '',
  
      'Goods or services':
        award.goodsServicesFilter || '',
  
      'Spending region(s)':
        parseJsonArray(award.spendingRegion).join(', '),
  
      'Spending sector':
        award.spendingSector || ''
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