var CronJob = require('cron').CronJob;
var zulubet = require('./FINALE SCRAPER/zulubetScraper_final.js');
var predictz = require('./FINALE SCRAPER/predictzScraper.js');
var iqbet = require('./FINALE SCRAPER/iqbetScraper.js');
var betbrain = require('./FINALE SCRAPER/betbrain_awesome.js');
var enetscore = require('./FINALE SCRAPER/enetscoreScraper_post_and_put.js');
var propredictions = require('./FINALE SCRAPER/propredictions_working_final.js');
var statarea = require('./FINALE SCRAPER/statareaScraper_final.js');
var vitisport = require('./FINALE SCRAPER/vitisportScraper_final.js');
var bettingclosed = require('./FINALE SCRAPER/bettingclosedScraper.js');
var windrawwin = require('./FINALE SCRAPER/windrawwinScraper.js');
var oddstake = require('./FINALE SCRAPER/oddstakeScraper.js');
var forebet = require('./FINALE SCRAPER/forebetScraper.js');
var kellymath = require('./kellymath_core.js');
var matchReferencerOdds = require('./matchReferencer_odds.js');
var matchReferencerPredictions = require('./matchReferencer_predictions.js');
var betsplaced = require('./loggingPredictedBets.js');



new CronJob('00 30 15 * * 0-6', function() { 	
  	zulubet.zulubetRun();
  	console.log('Zulubet successfully scraped');
}, null, true);

new CronJob('00 35 15 * * 0-6', function() { 	
  	bettingclosed.bettingclosedRun();
  	console.log('Bettingclosed successfully scraped');
}, null, true);

new CronJob('00 40 15 * * 0-6', function() {
	predictz.predictzRun();
  	console.log('Predictz successfully scraped');
}, null, true);

new CronJob('0 */1 * * *', function() {
  	enetscore.enetscoreRun();
  	console.log('Enetscore successfully scraped');
}, null, true);

new CronJob('00 45 15 * * 0-6', function() { 	
  	vitisport.vitisportRun();
  	console.log('Vitisport successfully scraped');
}, null, true);

new CronJob('00 50 15 * * 0-6', function() { 	
  	propredictions.propredictionsRun();
  	console.log('Propredictions successfully scraped');
}, null, true);

new CronJob('0 */5 * * *', function() { 	
  	betbrain.betbrainRun();
  	console.log('Betbrain successfully scraped');
}, null, true);

new CronJob('00 10 16 * * 0-6', function() { 	
  	windrawwin.windrawwinRun();
  	console.log('Windrawwin successfully scraped');
}, null, true);

new CronJob('00 15 16 * * 0-6', function() { 	
  	statarea.statareaRun();
  	console.log('Statarea successfully scraped');
}, null, true);

new CronJob('00 20 16 * * 0-6', function() { 	
  	oddstake.oddstakeRun();
  	console.log('Oddstake successfully scraped');
}, null, true);

new CronJob('00 25 16 * * 0-6', function() { 	
  	iqbet.iqbetRun();
  	console.log('IQbet successfully scraped');
}, null, true);

new CronJob('00 30 16 * * 0-6', function() { 	
  	forebet.forebetRun();
  	console.log('Forebet successfully scraped');
}, null, true);

new CronJob('00 35 16 * * 0-6', function() { 	
  	matchReferencerOdds.matchReferencerOddsRun();
  	console.log('Odds were successfully added to matches');
}, null, true);

new CronJob('00 45 16 * * 0-6', function() { 	
  	matchReferencerPredictions.matchReferencerPredictionsRun();
  	console.log('Predictions were successfully added to matches');
}, null, true);

new CronJob('00 55 16 * * 0-6', function() { 	
  	kellymath.kellymathRun();
  	console.log('Kelly was successfully calculated');
}, null, true);

new CronJob('00 00 17 * * 0-6', function() { 	
  	betsplaced.betsplacedRun();
  	console.log('Kelly was successfully calculated');
}, null, true);
