var schedule = require('node-schedule');
var zulubet = require('./zulubetScraper_final.js');
var predictz = require('./predictzScraper.js');
//var bettingexpert = require('./bettingexpertScraper.js');
var betbrain = require('./betbrain_awesome.js');
var enetscore = require('./enetscoreScraper_postonly.js');
//var propredictions = require('./propredictionsScraper_working_final.js');
var statarea = require('./statareaScraper_final.js');
var vitisport = require('./vitisportScraper_final.js');
//var math = require('mathjs');

schedule.scheduleJob('*/5 * * * *', function(){
  console.log('Zulubet successfully scraped!');
  zulubet.zulubetRun();
  });

schedule.scheduleJob('12 * * * * *', function(){
  console.log('Enetscore successfully scraped!');
  enetscore.enetscoreRun();
  });

//schedule.scheduleJob('42 * * * * *', function(){
//  console.log('Predictz successfully scraped!');
//  predictz.predictzRun();
//  });