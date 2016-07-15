#!/bin/bash
node_modules/cucumber-parallel/bin/cucumber-parallel e2e/features/api -r e2e/step-definitions/api --tags=@api --parallel scenarios -f json:report.json
gulp parallel:report
