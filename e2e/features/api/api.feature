Feature: Httpbin.org exposes various resources for HTTP request testing

  @api
  Scenario: Setting headers in GET request
    Given I set User-Agent header to apickli
    When I GET /get
    Then response body path $.headers.User-Agent should be apickli

  @api
  Scenario: Setting body payload in POST request
    Given I set body to {"key":"hello-world"}
    When I POST to /post
    Then response body should contain hello-world

  @api
  Scenario: Setting body payload in PUT request
    Given I set body to {"key":"hello-world"}
    When I PUT /put
    Then response body should contain hello-world

  @api
  Scenario: Setting body payload in DELETE request
    Given I set body to {"key":"hello-world"}
    When I DELETE /delete
    Then response body should contain hello-world

  @api
  Scenario: Setting body payload from file
    Given I pipe contents of file /home/travis/build/jaffamonkey/cucumberjs-protractor-kickstart/e2e/step-definitions/fixtures/requestbody.xml to body
    When I POST to /post
    Then response body should contain "data": "<a>b</a>"

  @api
  Scenario: Sending request with basic auth authentication
    Given I have basic authentication credentials username and password
    When I POST to /post
    Then response body path $.headers.Authorization should be Basic dXNlcm5hbWU6cGFzc3dvcmQ=

  @api
  Scenario: Parsing response xml body
    When I GET /xml
    Then response body path /slideshow/slide[1]/title should be Wake up to WonderWidgets!

  @api
  Scenario: Response body content type assertions (xml)
    When I GET /xml
    Then response body should be valid xml

  @api
  Scenario: Response body content type assertions (json)
    When I GET /get
    Then response body should be valid json

  @api
  Scenario: Checking headers in response
    When I GET /xml
    Then response header server should exist
    And response header boo should not exist

  @api
  Scenario: Response code checks
    When I GET /xml
    Then response code should be 200
    And response code should not be 404

  @api
  Scenario: Response header value assertions
    When I GET /xml
    Then response header Content-Type should be application/xml
    And response header Content-Type should be [a-z]/xml
    And response header Connection should not be boo

  @api
  Scenario: Response body text assertions
    When I GET /xml
    Then response body should contain WonderWidgets
    And response body should contain Wonder[Wdgist]
    And response body should not contain boo

  @api
  Scenario: Response body xpath assertions
    When I GET /xml
    Then response body path /slideshow/slide[2]/title should be [a-z]+
    And response body path /slideshow/slide[2]/title should not be \d+

  @api
  Scenario: Response body jsonpath assertions
    Given I set User-Agent header to apickli
    When I GET /get
    Then response body path $.headers.User-Agent should be [a-z]+
    And response body path $.headers.User-Agent should not be \d+

  @api
  Scenario: Access token retrieval from response body (authorization code grant, password, client credentials)
    Given I set Token header to token123
    When I GET /get
    Then I store the value of body path $.headers.Token as access token

  @api
  Scenario: Using access token
    Given I set bearer token
    When I GET /get
    Then response body path $.headers.Authorization should be Bearer token123

  @api
  Scenario: Quota testing - first request
    Given I set X-Quota-Remaining header to 10
    When I GET /get
    Then I store the value of body path $.headers.X-Quota-Remaining as remaining1 in global scope

  @api
  Scenario: Quota testing - second request
    Given I set X-Quota-Remaining header to 9
    When I GET /get
    Then I store the value of body path $.headers.X-Quota-Remaining as remaining2 in global scope

  @api
  Scenario: setting header value as variable
    When I GET /get
    Then I store the value of response header Server as agent in scenario scope
    And value of scenario variable agent should be nginx

  @api
  Scenario: setting body path as variable (xml)
    When I GET /xml
    And I store the value of body path /slideshow/slide[2]/title as title in scenario scope
    Then value of scenario variable title should be Overview

  @api
  Scenario: setting body path as variable (json)
    Given I set User-Agent header to apickli
    When I GET /get
    And I store the value of body path $.headers.User-Agent as agent in scenario scope
    Then value of scenario variable agent should be apickli

  @api
  Scenario: checking values of scenario variables
    Then value of scenario variable title should be undefined
