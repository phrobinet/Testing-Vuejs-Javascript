# RETRY TESTS

Vous pouvez choisir de refaire les tests échoués jusqu'à un certain nombre de fois. Cette fonctionnalité est conçue pour gérer les tests de bout en bout (tests fonctionnels/Selenium...) lorsque les ressources ne peuvent pas être facilement simulées/tubées. **Il n'est pas recommandé d'utiliser cette fonction pour les tests unitaires.


This feature does re-run a failed test and its corresponding `beforeEach/afterEach hooks`, but not `before/after` hooks. `this.retries()` has no effect on failing hooks.
Cette fonctionnalité permet de relancer un test échoué et il correspond à `beforeEach/afterEach hooks`, mais pas les crochets `before/after`. `this.retries()` n'a pas d'effet sur les accrochages qui ont échoué.

NOTE : L'exemple ci-dessous a été écrit en utilisant le pilote web Selenium (qui [écrase les crochets Mocha globaux](https://github.com/SeleniumHQ/selenium/blob/c10e8a955883f004452cdde18096d70738397788/javascript/node/selenium-webdriver/testing/index.js) for Promise chain).

``` js
describe('retries', function () {
  // Réessayer jusqu'à 4 fois tous les tests de cette suite
  this.retries(4);

  beforeEach(function () {
    browser.get('http://www.yahoo.com');
  });

  it('should succeed on the 3rd try', function () {
    // Précisez que ce test ne doit être répété que deux fois au maximum
    this.retries(2);
    expect($('.foo').isDisplayed()).to.eventually.be.true;
  });
});
```
