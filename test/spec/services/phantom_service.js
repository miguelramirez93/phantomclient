'use strict';

describe('Service: phantomService', function () {

  // load the service's module
  beforeEach(module('phantomclientApp'));

  // instantiate service
  var phantomService;
  beforeEach(inject(function (_phantomService_) {
    phantomService = _phantomService_;
  }));

  it('should do something', function () {
    expect(!!phantomService).toBe(true);
  });

});
