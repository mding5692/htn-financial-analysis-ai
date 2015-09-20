/** Reads the analysis and provides pre-prepared recommendation for the user */
var debtToEquityRatioRecommendation = "";

function recommendForDebtToEquity(debtToEquityRatio) {
	if (debtToEquityRatio > 0) {
		debtToEquityRatioRecommendation = "Its good";
	} else if (debtToEquityRatio < 0) {
		debtToEquityRatioRecommendation = "Its bad";
	}
	return debtToEquityRatioRecommendation;
}
