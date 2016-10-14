'use strict'
var Diner = function Diner(name) {
  this.dishes = [];
  this.name = name;
};

Diner.prototype.addDish = function addDish(name, cost) {
  this.dishes.push({
    name: name,
    cost: cost
  });
};

Diner.prototype.getTotalDishCost = function getTotalDishCost() {
  return this.dishes.reduce(function _sum(sum, dish) {
    return sum += dish.cost;
  }, 0);
};

Diner.prototype.print = function print() {
  console.log('Diner: ' + this.name + ' total dish cost $' + this.getTotalDishCost().toFixed(2));
};


var Meal = function Meal() {
  this.diners = [];
  this.taxRate = 0.15; 
  this.tipRate = 0.18;
};

Meal.prototype.addDiner = function addDiner(diner) {
  if (diner) {
    this.diners.push(diner);
  }
};

Meal.prototype.setTaxRate = function setTaxRate(taxRate) {
  this.taxRate = (taxRate/100);
};

Meal.prototype.setTipRate = function setTaxRate(tipRate) {
  this.tipRate = tipRate;
};

Meal.prototype.getTotalMealCost = function getTotalMealCost() {
  var baseCost = this.diners.reduce(function(sum, diner) {
    return sum += diner.getTotalDishCost();
  }, 0);

  return baseCost * (1 + this.taxRate + this.tipRate);
};

Meal.prototype.printCostBreakdown = function printCostBreakdown() {
  var baseCost = this.diners.reduce(function(sum, diner) {
    return sum += diner.getTotalDishCost();
  }, 0);

  var tip = baseCost * this.tipRate;
  var tipShare = tip / this.diners.length;
  var tax = baseCost * this.taxRate;

  console.log('Total tip: ' + tip + ' (' + this.tipRate.toFixed(2) + '%)');
  console.log('Total tax: ' + tax + ' (' + this.taxRate.toFixed(2) + '%)');
  console.log('----------------------------------------');
  console.log('BREAKDOWN\n');

  this.diners.forEach(function _printDiner(diner) {
    var dinerCost = (diner.getTotalDishCost() * (1 + this.taxRate)) + tipShare;
    console.log(diner.name + ': $' + dinerCost.toFixed(2));
  }.bind(this));

  var total = baseCost * (1 + this.taxRate + this.tipRate);

  console.log('----------------------------------------');
  console.log('Total: $' + total.toFixed(2));
};





var andrew = new Diner('Andrew');
var claire = new Diner('Claire');
var will = new Diner('Will');

andrew.addDish('pizza', 12);
andrew.addDish('salad', 4);

claire.addDish('burger', 10);
claire.addDish('fries', 3);

will.addDish('fruit', 3);
will.addDish('hotdog', 5);

var teamDinner = new Meal();

teamDinner.addDiner(andrew);
teamDinner.addDiner(claire);
teamDinner.addDiner(will);

teamDinner.setTaxRate(9.25);

console.log('----------------------------------------');
console.log(andrew);
console.log(claire);
console.log(will);

console.log('----------------------------------------');
teamDinner.printCostBreakdown();


module.exports = {
  Diner: Diner,
  Meal: Meal
};
