const utils = require('./utils');
const parseJsonArray = utils.parseJsonArray;
const XLSX = require('xlsx');

exports.toAwardExportRow = function toAwardExportRow(award) {
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

        'Specific policy objective': award.specificPolicyObjective || '',

        'Subsidy award description': award.subsidyAwardDescription || '',

        'Public authority URL':
            award.standaloneAward === 'Yes' ? award.authorityURL || '' : 'NA',

        'Public authority URL Description':
            award.standaloneAward === 'Yes'
                ? award.authorityURLDescription || ''
                : 'NA',

        'Subsidy award number': award.awardNumber || '',

        'Subsidy award status': award.status || '',

        'Subsidy scheme name':
            award.subsidyMeasure && award.subsidyMeasure.subsidyMeasureTitle
                ? award.subsidyMeasure.subsidyMeasureTitle
                : '',

        'Legal basis': award.legalBasis || '',

        'Services of Public Economic Interest (SPEI)': award.spei || '',

        'Subsidy purpose': parseJsonArray(award.subsidyObjective).join(', '),

        'Subsidy form': award.subsidyInstrument || '',

        'Subsidy element full amount/£': award.subsidyFullAmountExact || '',

        'Subsidy element full amount range/£':
            award.subsidyFullAmountRange || '',

        'Public authority name':
            award.grantingAuthorityResponse &&
            award.grantingAuthorityResponse.grantingAuthorityName
                ? award.grantingAuthorityResponse.grantingAuthorityName
                : '',

        'Awarded date': award.legalGrantingDate || '',

        'Published date': award.publishedAwardDate || '',

        'Created date': award.createdTimestamp || '',

        'Last modified date': award.lastModifiedTimestamp || '',

        Comments: award.rejectReason || '',

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

        'Goods or services': award.goodsServicesFilter || '',

        'Spending region(s)': parseJsonArray(award.spendingRegion).join(', '),

        'Spending sector': award.spendingSector || '',
    };
};

exports.toMfaAwardExportRow = function toMfaAwardExportRow(award) {
    return {
        'MFA / SPEIA award number': award.mfaAwardNumber || '',

        'SPEI assistance award': award.isSpeiAssistance || '',

        'MFA grouping name':
            award.mfaGroupingResponse &&
            award.mfaGroupingResponse.mfaGroupingName
                ? award.mfaGroupingResponse.mfaGroupingName
                : 'N/A',

        'Award amount': award.awardAmount || '',

        'Confirmation date': award.confirmationDate || '',

        'Public authority name':
            award.grantingAuthorityResponse &&
            award.grantingAuthorityResponse.grantingAuthorityName
                ? award.grantingAuthorityResponse.grantingAuthorityName
                : '',

        'Recipient name': award.recipientName || '',

        'Recipient ID type': award.recipientIdType || '',

        'Recipient ID': award.recipientIdNumber || '',

        Status: award.status || '',

        'Published date': award.publishedDate || '',

        'Created date': award.createdTimestamp || '',

        'Last modified date': award.lastModifiedTimestamp || '',
    };
};

exports.toSchemeExportRow = function toSchemeExportRow(scheme) {
    return {
        'Subsidy control number': scheme.scNumber || '',

        'Subsidy scheme name': scheme.subsidyMeasureTitle || '',

        'Subsidies or Schemes of Interest (SSoI) or Subsidies or Schemes of Particular Interest (SSoPI)':
            scheme.subsidySchemeInterest || '',

        'Specific policy objective': scheme.specificPolicyObjective || '',

        'Subsidy status': scheme.status || '',

        'Public authority': scheme.grantingAuthorityName || '',

        'Subsidy scheme description': scheme.subsidySchemeDescription || '',

        'Legal basis':
            scheme.legalBasis && scheme.legalBasis.legalBasisText
                ? scheme.legalBasis.legalBasisText
                : '',

        URL: scheme.gaSubsidyWebLink || '',

        'URL description': scheme.gaSubsidyWebLinkDescription || '',

        'Budget/£': scheme.budget || '',

        'Maximum amount given under a scheme':
            scheme.maximumAmountUnderScheme || '',

        'Confirmation date': scheme.confirmationDate || '',

        'Start date': scheme.startDate || '',

        'End date': scheme.endDate || '',

        'Duration/days': scheme.duration || '',

        'Published date': scheme.publishedMeasureDate || '',

        'Created date': scheme.createdTimestamp || '',

        'Last modified date': scheme.lastModifiedTimestamp || '',

        'Spending Sectors': parseJsonArray(scheme.spendingSectors).join(', '),

        Purpose: parseJsonArray(scheme.purpose).join(', '),
    };
};

exports.processExport = function processExport(
    exportRows,
    format,
    fileName,
    res,
) {
    const worksheet = XLSX.utils.json_to_sheet(exportRows);
    if (format === 'csv') {
        const csv = XLSX.utils.sheet_to_csv(worksheet);

        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader(
            'Content-Disposition',
            'attachment; filename="' + fileName + '.csv"',
        );
        utils.setSecurityHeaders(res);

        return res.send(csv);
    }
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, fileName);

    const buffer = XLSX.write(workbook, {
        type: 'buffer',
        bookType: 'xlsx',
    });

    res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
        'Content-Disposition',
        'attachment; filename="' + fileName + '.xlsx"',
    );

    utils.setSecurityHeaders(res);
    return res.send(buffer);
};
