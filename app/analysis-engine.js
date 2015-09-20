/* functions for analysing the financial statements and turning them into ratios and use benchmarks to provide context */
function calculateDebtToEquityRatio(debt, equity) {
	var DtoEratio = debt / equity;
	return DtoEratio;
}
function calculateProfitMargin(profit, revenue) {
	var margin = profit / revenue;
	return margin;
}
function calculateROA(profit, assets) {
	var ROI = profit / assets;
	return ROI;
}
function calculateROE(profit, equity) {
	var ROE = profit / equity;
	return ROE;
}
function calculateAcidTestRatio(cash, AR, shortLiabilities, currLiabilities) {
	var numerator = cash + AR + shortLiabilities;
	var denominator = currLiabilities;
	var result = numerator / denominator;
	return result;
}
function calculateICRatio(profit, interestExp) {
	var interestCoverRatio = profit / interestExp;
	return interestCoverRatio;
}