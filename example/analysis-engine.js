/* functions for analysing the financial statements and turning them into ratios and use benchmarks to provide context */
function calculateDebtToEquityRatio(debt, equity) {
	var DtoEratio = debt / equity;
	return DtoEratio;
}
function calculateROI(revenue, investment) {
	var ROI = revenue / investment;
	return ROI;
}
function calculateROE(revenue, equity) {
	var ROE = revenue / equity;
	return ROE;
}
