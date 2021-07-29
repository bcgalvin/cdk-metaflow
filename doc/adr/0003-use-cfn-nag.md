# 3. use-cfn-nag

Date: 2021-07-28

## Status

Accepted

## Context
Want to have checks for infra best-practices. Lot of options to choose from, including several from AWS such as guard duty.

## Decision

Use [cfn-nag](https://github.com/stelligent/cfn_nag) on PR builds; lots of examples to follow for using it with CDK so good place to start.

## Consequences

Lot of rules won't apply for this use-case so will be a slight pain to manage the exceptions. 
